const steps = [
  {
    num: 1,
    icon: "📥",
    title: "Capture the Lead",
    desc: "Add leads manually, through a website form, by email, or through future integrations.",
  },
  {
    num: 2,
    icon: "👤",
    title: "Assign the Next Step",
    desc: "Set an owner, follow-up date, estimated value, and next action.",
  },
  {
    num: 3,
    icon: "🚨",
    title: "Get Rescue Alerts",
    desc: "LeadRescue warns the team when a lead, estimate, or callback is about to be forgotten.",
  },
  {
    num: 4,
    icon: "🏆",
    title: "Win More Business",
    desc: "Track follow-up activity, improve response times, and recover revenue.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="section-padding bg-white">
      <div className="section-container">
        <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          How It Works
        </h2>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <div key={step.num} className="relative text-center">
              {/* Number badge */}
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-600 text-xl font-extrabold text-white shadow-md">
                {step.num}
              </div>
              {/* Connector line (desktop only) */}
              {step.num < 4 && (
                <div className="absolute left-[calc(50%+2rem)] top-7 hidden h-0.5 w-[calc(100%-4rem)] bg-brand-200 lg:block" />
              )}
              <span className="mt-5 block text-3xl">{step.icon}</span>
              <h3 className="mt-3 text-lg font-bold text-gray-900">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-500">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
