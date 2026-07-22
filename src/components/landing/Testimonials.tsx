const testimonials = [
  {
    quote:
      "LeadRescue showed us that thousands of dollars in estimates were sitting untouched. We closed two of them during our first week.",
    author: "HVAC Business Owner",
    initial: "M",
    color: "bg-brand-100 text-brand-700",
  },
  {
    quote:
      "Our office finally has one place to see who called, who received an estimate, and who still needs a response.",
    author: "Plumbing Company Manager",
    initial: "J",
    color: "bg-alert-100 text-alert-700",
  },
  {
    quote:
      "It gives my team a clear list of who needs attention without forcing us to learn a complicated CRM.",
    author: "Local IT Services Owner",
    initial: "D",
    color: "bg-green-100 text-green-700",
  },
];

export default function Testimonials() {
  return (
    <section className="section-padding bg-gray-50">
      <div className="section-container">
        <div className="mb-2 text-center">
          <span className="inline-block rounded-full border border-gray-300 px-3 py-1 text-xs font-medium text-gray-500">
            Sample testimonials
          </span>
        </div>
        <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Trusted by Local Business Owners
        </h2>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <div
              key={t.author}
              className="flex flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
            >
              {/* Quote icon */}
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                className="mb-3 text-brand-200"
                aria-hidden="true"
              >
                <path
                  d="M10 8C6.686 8 4 10.686 4 14v6h8v-6H8c0-2.21 1.79-4 4-4V8zm14 0c-3.314 0-6 2.686-6 6v6h8v-6h-4c0-2.21 1.79-4 4-4V8z"
                  fill="#99f6e4"
                />
              </svg>
              <p className="flex-1 text-sm leading-relaxed text-gray-600">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-4 flex items-center gap-3 border-t border-gray-100 pt-4">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold ${t.color}`}
                >
                  {t.initial}
                </div>
                <p className="text-sm font-semibold text-gray-800">{t.author}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
