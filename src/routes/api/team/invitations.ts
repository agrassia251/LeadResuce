import { json } from "@tanstack/react-start";
import { getCompanyInvitations, getUserFromSession } from "~/lib/auth.server";
export async function GET({ request }: { request: Request }) {
  const cookie = request.headers.get("cookie") || "";
  const m = cookie.match(/leadrescue_session=([^;]+)/);
  if (!m) return json({ invitations: [] }, { status: 401 });
  const user = await getUserFromSession(m[1]);
  if (!user) return json({ invitations: [] }, { status: 401 });
  return json({ invitations: await getCompanyInvitations(user.companyId!) });
}
