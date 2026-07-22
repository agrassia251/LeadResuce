const features = [
  {
    icon: "📬",
    title: "Unified Lead Inbox",
    desc: "Keep new inquiries, callbacks, and estimate requests in one organized location.",
  },
  {
    icon: "📊",
    title: "Visual Sales Pipeline",
    desc: "Move leads through stages: New, Contacted, Estimate Sent, Follow-Up Due, Won, Lost.",
  },
  {
    icon: "🚨",
    title: "Rescue Alerts",
    desc: "Automatically flag leads that haven't received a response or are becoming inactive.",
  },
  {
    icon: "📋",
    title: "Estimate Follow-Up",
    desc: "Track open estimates and remind employees when customers need to be contacted.",
  },
  {
    icon: "💰",
    title: "Revenue at Risk",
    desc: "Show the total estimated value of leads and estimates currently waiting for action.",
  },
  {
    icon: "🔔",
    title: "Follow-Up Reminders",
    desc: "Create automatic reminders for calls, emails, appointments, and promised callbacks.",
  },
  {
    icon: "📝",
    title: "Message Templates",
    desc: "Reusable email and text-message templates for common customer follow-ups.",
  },
  {
    icon: "✅",
    title: "Daily Action List",
    desc: "Show each employee exactly which customers need attention today.",
  },
  {
    icon: "👥",
    title: "Team Accountability",
    desc: "Track lead ownership, response time, overdue actions, and completed follow-ups.",
  },
  {
    icon: "📈",
    title: "Lead Analytics",
    desc: "Display conversion rate, average response time, won/lost revenue, and common lost-lead reasons.",
  },
];

export default function Features() {
  return (
    <section id="features" className="section-padding bg-gray-50">
      <div className="section-container">
        <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Everything You Need to Rescue More Leads
        </h2>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md"
            >
              <span className="text-2xl">{f.icon}</span>
              <h3 className="mt-3 text-base font-bold text-gray-900">
                {f.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-500">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
