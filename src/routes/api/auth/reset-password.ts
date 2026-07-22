import { json } from "@tanstack/react-start";
import { resetPassword } from "~/lib/auth.server";
export async function POST({ request }: { request: Request }) {
  const body = await request.json() as { token: string; password: string };
  if (!body.token || !body.password) return json({ error: "Token and new password required" }, { status: 400 });
  if (body.password.length < 8) return json({ error: "Password must be at least 8 characters" }, { status: 400 });
  const ok = await resetPassword(body.token, body.password);
  if (!ok) return json({ error: "Invalid or expired reset token" }, { status: 400 });
  return json({ ok: true, message: "Password has been reset." });
}
