import { json } from "@tanstack/react-start";
import { getUserFromSession } from "~/lib/auth.server";
export async function GET({ request }: { request: Request }) {
  const cookie = request.headers.get("cookie") || "";
  const m = cookie.match(/leadrescue_session=([^;]+)/);
  if (!m) return json({ user: null }, { status: 401 });
  const user = await getUserFromSession(m[1]);
  if (!user) return json({ user: null }, { status: 401 });
  return json({ user: { id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName, role: user.role, companyId: user.companyId } });
}
