import { json } from "@tanstack/react-start";
import { getUserFromSession, updateCompany, setPipelineStages } from "~/lib/auth.server";
export async function POST({ request }: { request: Request }) {
  const cookie = request.headers.get("cookie") || "";
  const m = cookie.match(/leadrescue_session=([^;]+)/);
  if (!m) return json({ error: "Unauthorized" }, { status: 401 });
  const user = await getUserFromSession(m[1]);
  if (!user) return json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json() as { industry?: string; employeeCount?: string; typicalLeadValue?: number; phone?: string; timezone?: string; stages?: string[] };
  await updateCompany(user.companyId!, { industry: body.industry, employeeCount: body.employeeCount ? parseInt(body.employeeCount, 10) : undefined, typicalLeadValue: body.typicalLeadValue, phone: body.phone, timezone: body.timezone });
  if (body.stages?.length) await setPipelineStages(user.companyId!, body.stages.map((name, i) => ({ name, sortOrder: i })));
  return json({ ok: true, redirect: "/dashboard" });
}
