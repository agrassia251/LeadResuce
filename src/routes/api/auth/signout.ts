import { json } from "@tanstack/react-start";
export async function POST() {
  const response = json({ ok: true });
  response.headers.set("Set-Cookie", "leadrescue_session=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0");
  return response;
}
