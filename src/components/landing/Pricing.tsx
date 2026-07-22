const plans = [
  {
    name: "Solo",
    price: "$19",
    period: "/mo",
    users: "1 user",
    leads: "Up to 100 active leads",
    features: [
      "Lead pipeline",
      "Follow-up reminders",
      "Message templates",
      "Basic reporting",
    ],
    cta: "Start Free Trial",
    featured: false,
  },
  {
    name: "Team",
    price: "$49",
    period: "/mo",
    users: "Up to 5 users",
    leads: "Unlimited active leads",
    features: [
      "Everything in Solo",
      "Team assignments",
      "Rescue alerts",
      "Estimate tracking",
      "Revenue-at-risk dashboard",
      "Email notifications",
      "Advanced reporting",
    ],
    cta: "Start Free Trial",
    featured: true,
  },
  {
    name: "Pro",
    price: "$99",
    period: "/mo",
    users: "Up to 15 users",
    leads: "Unlimited active leads",
    features: [
      "Everything in Team",
      "AI follow-up assistant",
      "Custom lead stages",
      "Manager dashboards",
      "CSV import/export",
      "Priority support",
      "Future integrations",
    ],
    cta: "Start Free Trial",
    featured: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="section-padding bg-white">
      <div className="section-container">
        <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Simple, Transparent Pricing
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-center text-lg text-gray-600">
          Start with a 14-day free trial. No credit card required.
        </p>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-2xl border-2 p-6 shadow-sm transition-all hover:shadow-md sm:p-8 ${
                plan.featured
                  ? "border-brand-500 bg-white ring-1 ring-brand-500"
                  : "border-gray-200 bg-white"
              }`}
            >
              {plan.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-600 px-4 py-1 text-xs font-bold text-white shadow-sm">
                  MOST POPULAR
                </span>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-gray-900">
                    {plan.price}
                  </span>
                  <span className="text-gray-500">{plan.period}</span>
                </div>
                <p className="mt-1 text-sm text-gray-500">{plan.users}</p>
                <p className="text-sm text-gray-500">{plan.leads}</p>
              </div>

              <ul className="mb-8 flex-1 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-gray-600">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      className="mt-0.5 shrink-0 text-brand-500"
                      aria-hidden="true"
                    >
                      <circle cx="8" cy="8" r="7" fill="#ccfbf1" />
                      <path
                        d="M5 8l2 2 4-4"
                        stroke="#0d9488"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href="#"
                className={`block rounded-xl px-6 py-3 text-center text-sm font-semibold transition-all ${
                  plan.featured
                    ? "bg-brand-600 text-white shadow-md hover:bg-brand-700 hover:shadow-lg"
                    : "border-2 border-gray-200 text-gray-700 hover:border-brand-300 hover:text-brand-600"
                }`}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-gray-400">
          14-day free trial. No credit card required.
        </p>
      </div>
    </section>
  );
}
