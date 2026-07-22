const problems = [
  {
    icon: "📞",
    title: "Missed Calls Never Returned",
    desc: "A customer called about a job. Nobody called them back. They hired someone else.",
  },
  {
    icon: "🌐",
    title: "Website Inquiries Sit Unanswered",
    desc: "Contact form submissions pile up in an inbox no one checks regularly.",
  },
  {
    icon: "📋",
    title: "Estimates Sent But Never Followed Up",
    desc: "You sent a quote two weeks ago and forgot to check in. That lead has gone cold.",
  },
  {
    icon: "🧠",
    title: "Employees Forget Promised Callbacks",
    desc: "\"I'll call them tomorrow\" turns into never — and a lost opportunity.",
  },
];

export default function Problem() {
  return (
    <section className="section-padding bg-white">
      <div className="section-container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Most Leads Aren't Lost Because of Price
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-gray-600">
            They're lost because no one followed up, the estimate was forgotten, or
            the customer waited too long for a response.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {problems.map((p) => (
            <div
              key={p.title}
              className="flex gap-4 rounded-2xl border border-red-100 bg-red-50/50 p-5"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-2xl shadow-sm">
                {p.icon}
              </span>
              <div>
                <h3 className="font-bold text-gray-900">{p.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-gray-600">
                  {p.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-10 text-center text-lg font-semibold text-brand-600">
          LeadRescue keeps every opportunity visible until it is won or closed.
        </p>
      </div>
    </section>
  );
}
