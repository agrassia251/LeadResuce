import { json } from "@tanstack/react-start";
import { createPasswordReset } from "~/lib/auth.server";
export async function POST({ request }: { request: Request }) {
  const body = await request.json() as { email: string };
  if (!body.email) return json({ error: "Email is required" }, { status: 400 });
  const token = await createPasswordReset(body.email);
  if (token) { console.log(`[Password Reset] ${body.email}: ${token}`); }
  return json({ ok: true, message: "If an account with that email exists, a reset link has been sent." });
}
