import bcrypt from "bcryptjs";
import { db, schema } from "~/db/index.server";
import { eq, and } from "drizzle-orm";
import type { users } from "~/db/schema";

const SALT_ROUNDS = 10;
const SESSION_EXPIRY_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

export function makeToken(): string {
  const buf = new Uint8Array(32);
  crypto.getRandomValues(buf);
  return Buffer.from(buf).toString("hex");
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function createUser(data: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  companyId: number;
  role?: "owner" | "manager" | "member";
}): Promise<typeof users.$inferSelect> {
  const passwordHash = await hashPassword(data.password);
  const verificationToken = makeToken();

  const [user] = await db
    .insert(schema.users)
    .values({
      email: data.email.toLowerCase().trim(),
      passwordHash,
      firstName: data.firstName,
      lastName: data.lastName,
      role: data.role ?? "member",
      companyId: data.companyId,
      emailVerified: false,
      verificationToken,
    })
    .returning();

  return user;
}

export async function verifyUserEmail(token: string): Promise<boolean> {
  const [user] = await db
    .select()
    .from(schema.users)
    .where(eq(schema.users.verificationToken, token))
    .limit(1);

  if (!user) return false;

  await db
    .update(schema.users)
    .set({ emailVerified: true, verificationToken: null, updatedAt: new Date().toISOString() })
    .where(eq(schema.users.id, user.id));

  return true;
}

export async function authenticateUser(
  email: string,
  password: string,
): Promise<typeof users.$inferSelect | null> {
  const [user] = await db
    .select()
    .from(schema.users)
    .where(eq(schema.users.email, email.toLowerCase().trim()))
    .limit(1);

  if (!user) return null;

  const valid = await verifyPassword(password, user.passwordHash);
  if (!valid) return null;

  return user;
}

export async function createSession(userId: number): Promise<string> {
  const token = makeToken();
  const expiresAt = new Date(Date.now() + SESSION_EXPIRY_MS).toISOString();

  await db.insert(schema.sessions).values({
    userId,
    token,
    expiresAt,
  });

  return token;
}

export async function getSession(token: string) {
  const [session] = await db
    .select()
    .from(schema.sessions)
    .where(eq(schema.sessions.token, token))
    .limit(1);

  if (!session) return null;
  if (new Date(session.expiresAt) < new Date()) {
    await db.delete(schema.sessions).where(eq(schema.sessions.id, session.id));
    return null;
  }

  return session;
}

export async function getUserFromSession(token: string) {
  const session = await getSession(token);
  if (!session) return null;

  const [user] = await db
    .select()
    .from(schema.users)
    .where(eq(schema.users.id, session.userId))
    .limit(1);

  return user;
}

export async function deleteSession(token: string): Promise<void> {
  await db.delete(schema.sessions).where(eq(schema.sessions.token, token));
}

export async function createPasswordReset(email: string): Promise<string | null> {
  const [user] = await db
    .select()
    .from(schema.users)
    .where(eq(schema.users.email, email.toLowerCase().trim()))
    .limit(1);

  if (!user) return null;

  const token = makeToken();
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000).toISOString(); // 1 hour

  await db.insert(schema.passwordResets).values({
    userId: user.id,
    token,
    expiresAt,
  });

  return token;
}

export async function resetPassword(token: string, newPassword: string): Promise<boolean> {
  const [reset] = await db
    .select()
    .from(schema.passwordResets)
    .where(
      and(eq(schema.passwordResets.token, token), eq(schema.passwordResets.usedAt, null as unknown as string)),
    )
    .limit(1);

  if (!reset) return false;
  if (new Date(reset.expiresAt) < new Date()) return false;

  const passwordHash = await hashPassword(newPassword);

  await db
    .update(schema.users)
    .set({ passwordHash, updatedAt: new Date().toISOString() })
    .where(eq(schema.users.id, reset.userId));

  await db
    .update(schema.passwordResets)
    .set({ usedAt: new Date().toISOString() })
    .where(eq(schema.passwordResets.id, reset.id));

  return true;
}

export async function createCompany(data: {
  name: string;
  industry?: string;
  employeeCount?: number;
  phone?: string;
  email?: string;
  typicalLeadValue?: number;
  timezone?: string;
}): Promise<typeof schema.companies.$inferSelect> {
  const [company] = await db
    .insert(schema.companies)
    .values({
      name: data.name,
      industry: data.industry,
      employeeCount: data.employeeCount,
      phone: data.phone,
      email: data.email,
      typicalLeadValue: data.typicalLeadValue,
      timezone: data.timezone,
    })
    .returning();

  return company;
}

export async function getCompany(companyId: number) {
  const [company] = await db
    .select()
    .from(schema.companies)
    .where(eq(schema.companies.id, companyId))
    .limit(1);
  return company;
}

export async function updateCompany(
  companyId: number,
  data: Partial<typeof schema.companies.$inferInsert>,
) {
  await db
    .update(schema.companies)
    .set({ ...data, updatedAt: new Date().toISOString() })
    .where(eq(schema.companies.id, companyId));
}

export async function setUserOnboarded(userId: number) {
  await db
    .update(schema.users)
    .set({ updatedAt: new Date().toISOString() })
    .where(eq(schema.users.id, userId));
}

export async function createInvitation(data: {
  companyId: number;
  email: string;
  role: string;
  invitedByUserId: number;
}) {
  const token = makeToken();
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();

  const [invitation] = await db
    .insert(schema.invitations)
    .values({
      companyId: data.companyId,
      email: data.email.toLowerCase().trim(),
      role: data.role as "owner" | "manager" | "member",
      token,
      invitedByUserId: data.invitedByUserId,
      expiresAt,
    })
    .returning();

  return invitation;
}

export async function getInvitation(token: string) {
  const [invitation] = await db
    .select()
    .from(schema.invitations)
    .where(eq(schema.invitations.token, token))
    .limit(1);

  if (!invitation) return null;
  if (new Date(invitation.expiresAt) < new Date()) return null;
  if (invitation.acceptedAt) return null;

  return invitation;
}

export async function acceptInvitation(invitationId: number, userId: number) {
  await db
    .update(schema.invitations)
    .set({ acceptedAt: new Date().toISOString() })
    .where(eq(schema.invitations.id, invitationId));

  await db
    .update(schema.users)
    .set({ updatedAt: new Date().toISOString() })
    .where(eq(schema.users.id, userId));
}

export async function getCompanyInvitations(companyId: number) {
  return db
    .select()
    .from(schema.invitations)
    .where(eq(schema.invitations.companyId, companyId))
    .orderBy(schema.invitations.createdAt);
}

export async function getCompanyUsers(companyId: number) {
  return db
    .select()
    .from(schema.users)
    .where(eq(schema.users.companyId, companyId));
}

export async function setPipelineStages(companyId: number, stages: { name: string; sortOrder: number }[]) {
  await db.delete(schema.pipelineStages).where(eq(schema.pipelineStages.companyId, companyId));
  if (stages.length > 0) {
    await db.insert(schema.pipelineStages).values(
      stages.map((s) => ({ ...s, companyId })),
    );
  }
}

export async function getPipelineStages(companyId: number) {
  return db
    .select()
    .from(schema.pipelineStages)
    .where(eq(schema.pipelineStages.companyId, companyId))
    .orderBy(schema.pipelineStages.sortOrder);
}
