import { json } from "@tanstack/react-start";
import { getInvitation } from "~/lib/auth.server";
import { db, schema } from "~/db/index.server";
import { eq } from "drizzle-orm";
export async function POST({ request }: { request: Request }) {
  const token = new URL(request.url).searchParams.get("token");
  if (!token) return json({ invalid: true }, { status: 400 });
  const inv = await getInvitation(token);
  if (!inv) return json({ invalid: true }, { status: 400 });
  const [co] = await db.select({ name: schema.companies.name }).from(schema.companies).where(eq(schema.companies.id, inv.companyId)).limit(1);
  const [eu] = await db.select().from(schema.users).where(eq(schema.users.email, inv.email)).limit(1);
  if (eu) {
    await db.update(schema.users).set({ companyId: inv.companyId, role: inv.role as "owner"|"manager"|"member", updatedAt: new Date().toISOString() }).where(eq(schema.users.id, eu.id));
    await db.update(schema.invitations).set({ acceptedAt: new Date().toISOString() }).where(eq(schema.invitations.id, inv.id));
    return json({ ok: true });
  }
  return json({ needSignup: true, invitation: { email: inv.email, role: inv.role, companyName: co?.name || "Unknown", token } });
}
