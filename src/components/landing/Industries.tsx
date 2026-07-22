const industries = [
  {
    emoji: "🔥",
    name: "HVAC",
    desc: "Follow up on service requests and estimates before customers call someone else.",
  },
  {
    emoji: "🔧",
    name: "Plumbing",
    desc: "Track emergency calls and scheduled jobs so nothing falls through the cracks.",
  },
  {
    emoji: "⚡",
    name: "Electrical",
    desc: "Manage service calls, quotes, and inspections in one place.",
  },
  {
    emoji: "🏠",
    name: "Roofing",
    desc: "Keep estimates organized and follow up before the season ends.",
  },
  {
    emoji: "🌿",
    name: "Landscaping",
    desc: "Turn seasonal inquiries into booked jobs with consistent follow-up.",
  },
  {
    emoji: "🧹",
    name: "Cleaning",
    desc: "Respond quickly to new client requests and recurring service check-ins.",
  },
  {
    emoji: "🐜",
    name: "Pest Control",
    desc: "Schedule follow-ups for recurring treatments and new customer quotes.",
  },
  {
    emoji: "💻",
    name: "IT Services",
    desc: "Track support requests, proposals, and contract renewals without a complex CRM.",
  },
];

export default function Industries() {
  return (
    <section id="industries" className="section-padding bg-gray-50">
      <div className="section-container">
        <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Built for Businesses That Keep Communities Running
        </h2>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {industries.map((ind) => (
            <div
              key={ind.name}
              className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:shadow-md"
            >
              <span className="text-3xl">{ind.emoji}</span>
              <h3 className="mt-3 text-base font-bold text-gray-900">
                {ind.name} Companies
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-gray-500">
                {ind.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
