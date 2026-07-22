import { json } from "@tanstack/react-start";
import { createInvitation, getUserFromSession } from "~/lib/auth.server";
export async function POST({ request }: { request: Request }) {
  const cookie = request.headers.get("cookie") || "";
  const m = cookie.match(/leadrescue_session=([^;]+)/);
  if (!m) return json({ error: "Unauthorized" }, { status: 401 });
  const user = await getUserFromSession(m[1]);
  if (!user) return json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json() as { email: string; role: string };
  if (!body.email || !body.role) return json({ error: "Email and role required" }, { status: 400 });
  const inv = await createInvitation({ companyId: user.companyId!, email: body.email, role: body.role, invitedByUserId: user.id });
  console.log(`[Team Invite] ${body.email}: ${inv.token}`);
  return json({ invitation: inv });
}
