import { json } from "@tanstack/react-start";
import { authenticateUser, createSession } from "~/lib/auth.server";

export async function POST({ request }: { request: Request }) {
  const body = await request.json() as { email: string; password: string };
  const { email, password } = body;
  if (!email || !password) return json({ error: "Email and password are required" }, { status: 400 });
  const user = await authenticateUser(email, password);
  if (!user) return json({ error: "Invalid email or password" }, { status: 401 });
  if (!user.emailVerified) return json({ error: "Please verify your email before signing in" }, { status: 403 });
  const token = await createSession(user.id);
  const response = json({ ok: true, redirect: "/dashboard" });
  response.headers.set("Set-Cookie", `leadrescue_session=${token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${7 * 24 * 60 * 60}`);
  return response;
}
