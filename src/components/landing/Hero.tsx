export default function Hero() {
  return (
    <section className="section-padding relative overflow-hidden bg-gradient-to-b from-brand-50/50 to-white">
      <div className="section-container">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: copy */}
          <div className="flex flex-col gap-6">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              Stop Letting Good Leads Go Cold
            </h1>
            <p className="max-w-lg text-lg leading-relaxed text-gray-600 sm:text-xl">
              LeadRescue helps local service businesses respond faster, follow up
              consistently, and turn more inquiries and estimates into paying
              customers.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href="#"
                className="inline-flex items-center justify-center rounded-xl bg-brand-600 px-6 py-3.5 text-base font-semibold text-white shadow-md transition-all hover:bg-brand-700 hover:shadow-lg"
              >
                Start Your Free Trial
              </a>
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center rounded-xl border-2 border-gray-200 px-6 py-3.5 text-base font-semibold text-gray-700 transition-all hover:border-brand-300 hover:text-brand-600"
              >
                See How It Works
              </a>
            </div>
          </div>

          {/* Right: dashboard mockup */}
          <div className="relative">
            <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-xl sm:p-6">
              {/* Mock browser bar */}
              <div className="mb-4 flex items-center gap-1.5">
                <div className="h-3 w-3 rounded-full bg-red-400" />
                <div className="h-3 w-3 rounded-full bg-yellow-400" />
                <div className="h-3 w-3 rounded-full bg-green-400" />
                <div className="ml-2 flex-1 rounded-md bg-gray-100 px-3 py-1 text-xs text-gray-400">
                  app.leadrescue.com
                </div>
              </div>

              {/* Alert banner */}
              <div className="mb-4 flex items-center gap-2 rounded-lg border border-alert-200 bg-alert-50 px-3 py-2.5 sm:px-4">
                <span className="text-lg">⚠️</span>
                <p className="text-xs font-semibold text-alert-700 sm:text-sm">
                  You have <span className="font-extrabold">$18,450</span> in
                  estimates waiting for follow-up.
                </p>
              </div>

              {/* Metric cards */}
              <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <MetricCard label="New Leads" value="12" color="brand" />
                <MetricCard label="Need Attention" value="7" color="alert" />
                <MetricCard label="Open Estimates" value="$34K" color="brand" />
                <MetricCard label="Revenue at Risk" value="$18.4K" color="alert" />
              </div>

              {/* Recent contacts list */}
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Recently Contacted
                </p>
                <div className="space-y-2">
                  <ContactRow name="Jordan Miller" detail="HVAC estimate — follow up Tue" time="2h ago" />
                  <ContactRow name="Greenway Apartments" detail="Plumbing inspection" time="5h ago" />
                  <ContactRow name="Melissa Carter" detail="Website inquiry — roofing" time="Yesterday" />
                </div>
              </div>
            </div>

            {/* Decorative background glow */}
            <div className="absolute -right-8 -top-8 -z-10 h-64 w-64 rounded-full bg-brand-200/40 blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
}

function MetricCard({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: "brand" | "alert";
}) {
  const textClass = color === "alert" ? "text-alert-600" : "text-brand-600";
  const bgClass = color === "alert" ? "bg-alert-50" : "bg-brand-50";
  return (
    <div className={`rounded-xl ${bgClass} p-3 text-center`}>
      <p className={`text-lg font-bold sm:text-xl ${textClass}`}>{value}</p>
      <p className="text-[10px] font-medium uppercase tracking-wide text-gray-500 sm:text-xs">
        {label}
      </p>
    </div>
  );
}

function ContactRow({
  name,
  detail,
  time,
}: {
  name: string;
  detail: string;
  time: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-gray-100 px-3 py-2 text-sm">
      <div>
        <p className="font-semibold text-gray-800">{name}</p>
        <p className="text-xs text-gray-500">{detail}</p>
      </div>
      <span className="text-xs text-gray-400">{time}</span>
    </div>
  );
}
