export default function DashboardPreview() {
  return (
    <section className="section-padding bg-white">
      <div className="section-container">
        <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          See Where Your Revenue Is Hiding
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-center text-lg text-gray-600">
          A clear dashboard that shows exactly which leads need attention — and
          what&apos;s at stake.
        </p>

        {/* Dashboard mockup */}
        <div className="mt-10 overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 shadow-xl">
          {/* Top bar */}
          <div className="flex items-center gap-1.5 border-b border-gray-200 bg-white px-4 py-3">
            <div className="h-3 w-3 rounded-full bg-red-400" />
            <div className="h-3 w-3 rounded-full bg-yellow-400" />
            <div className="h-3 w-3 rounded-full bg-green-400" />
            <span className="ml-3 text-xs text-gray-400">LeadRescue Dashboard</span>
          </div>

          <div className="p-4 sm:p-6">
            {/* KPI row */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
              <KpiCard label="Total New Leads" value="34" />
              <KpiCard label="Need Attention" value="8" highlight />
              <KpiCard label="Open Est. Value" value="$56,200" />
              <KpiCard label="Revenue at Risk" value="$18,450" highlight />
              <KpiCard label="Avg Response" value="2.4 hrs" />
              <KpiCard label="Conversion" value="38%" />
              <KpiCard label="Follow-ups Today" value="5" highlight />
            </div>

            {/* Alert card */}
            <div className="mt-5 flex items-center gap-3 rounded-xl border-2 border-alert-300 bg-alert-50 p-4">
              <span className="text-2xl">⚠️</span>
              <div>
                <p className="text-sm font-bold text-alert-700">
                  Revenue Waiting for Follow-Up: $18,450
                </p>
                <p className="text-xs text-alert-600">
                  7 estimates and 4 leads have not been contacted in the last 5 days.
                </p>
              </div>
            </div>

            {/* Pipeline + Rescue List */}
            <div className="mt-5 grid gap-5 lg:grid-cols-5">
              {/* Pipeline mini chart */}
              <div className="rounded-xl border border-gray-200 bg-white p-4 lg:col-span-2">
                <h4 className="mb-3 text-sm font-bold text-gray-700">
                  Leads by Pipeline Stage
                </h4>
                <div className="space-y-2">
                  <PipelineBar label="New" count={12} pct={35} color="bg-brand-500" />
                  <PipelineBar label="Contacted" count={8} pct={24} color="bg-brand-400" />
                  <PipelineBar label="Estimate Sent" count={7} pct={21} color="bg-alert-400" />
                  <PipelineBar label="Follow-Up Due" count={5} pct={15} color="bg-alert-500" />
                  <PipelineBar label="Won" count={2} pct={5} color="bg-green-500" />
                </div>
              </div>

              {/* Rescue list */}
              <div className="rounded-xl border border-gray-200 bg-white p-4 lg:col-span-3">
                <h4 className="mb-3 text-sm font-bold text-gray-700">
                  Today&apos;s Rescue List
                </h4>
                <div className="space-y-2">
                  <RescueItem
                    action="Call"
                    name="Jordan Miller"
                    detail="HVAC estimate — $12,500 — sent 5 days ago"
                    urgent
                  />
                  <RescueItem
                    action="Follow up"
                    name="Greenway Apartments"
                    detail="Plumbing inspection — promised callback Monday"
                  />
                  <RescueItem
                    action="Respond"
                    name="Melissa Carter"
                    detail="Website inquiry — roofing — unanswered for 2 days"
                    urgent
                  />
                  <RescueItem
                    action="Send reminder"
                    name="Jackson Plumbing Project"
                    detail="Second estimate reminder — quote expires Friday"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function KpiCard({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-xl p-3 text-center ${
        highlight
          ? "border border-alert-200 bg-alert-50"
          : "border border-gray-100 bg-white"
      }`}
    >
      <p
        className={`text-lg font-extrabold ${
          highlight ? "text-alert-600" : "text-gray-900"
        }`}
      >
        {value}
      </p>
      <p className="text-[11px] font-medium leading-tight text-gray-500">
        {label}
      </p>
    </div>
  );
}

function PipelineBar({
  label,
  count,
  pct,
  color,
}: {
  label: string;
  count: number;
  pct: number;
  color: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-20 text-xs font-medium text-gray-600">{label}</span>
      <div className="flex-1 rounded-full bg-gray-100">
        <div
          className={`h-2 rounded-full ${color}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="w-8 text-right text-xs font-semibold text-gray-700">
        {count}
      </span>
    </div>
  );
}

function RescueItem({
  action,
  name,
  detail,
  urgent,
}: {
  action: string;
  name: string;
  detail: string;
  urgent?: boolean;
}) {
  return (
    <div
      className={`flex items-start gap-3 rounded-lg border p-3 ${
        urgent ? "border-red-200 bg-red-50/60" : "border-gray-100 bg-gray-50/50"
      }`}
    >
      <span
        className={`mt-0.5 rounded-md px-2 py-0.5 text-[10px] font-bold uppercase ${
          urgent
            ? "bg-red-100 text-red-700"
            : "bg-brand-100 text-brand-700"
        }`}
      >
        {action}
      </span>
      <div>
        <p className="text-sm font-semibold text-gray-800">{name}</p>
        <p className="text-xs text-gray-500">{detail}</p>
      </div>
    </div>
  );
}
