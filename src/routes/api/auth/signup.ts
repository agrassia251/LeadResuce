import { json } from "@tanstack/react-start";
import { createCompany, createUser, createSession, verifyUserEmail } from "~/lib/auth.server";

export async function POST({ request }: { request: Request }) {
  const body = await request.json() as { companyName: string; industry: string; employeeCount: string; firstName: string; lastName: string; email: string; password: string };
  const { companyName, industry, employeeCount, firstName, lastName, email, password } = body;
  if (!companyName || !firstName || !lastName || !email || !password) return json({ error: "All required fields must be filled" }, { status: 400 });
  if (password.length < 8) return json({ error: "Password must be at least 8 characters" }, { status: 400 });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json({ error: "Please enter a valid email address" }, { status: 400 });
  const company = await createCompany({ name: companyName, industry, employeeCount: employeeCount ? parseInt(employeeCount, 10) : undefined });
  const user = await createUser({ email, password, firstName, lastName, companyId: company.id, role: "owner" });
  await verifyUserEmail(user.verificationToken!);
  const token = await createSession(user.id);
  const response = json({ ok: true, redirect: "/onboarding" });
  response.headers.set("Set-Cookie", `leadrescue_session=${token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${7 * 24 * 60 * 60}`);
  return response;
}
