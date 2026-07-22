const footerLinks = [
  {
    title: "Product",
    links: ["Features", "How It Works", "Dashboard", "Integrations"],
  },
  {
    title: "Resources",
    links: ["Help Center", "Blog", "Guides", "API Docs"],
  },
  {
    title: "Company",
    links: ["About", "Contact", "Careers", "Privacy Policy", "Terms of Service"],
  },
  {
    title: "Industries",
    links: ["HVAC", "Plumbing", "Electrical", "Roofing", "Landscaping"],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="section-container py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <a href="#" className="flex items-center gap-2 text-lg font-bold text-brand-700">
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <rect width="32" height="32" rx="8" fill="#0d9488" />
                <path d="M10 20V14C10 10.6863 12.6863 8 16 8C19.3137 8 22 10.6863 22 14V20" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M8 20H24" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                <circle cx="16" cy="14" r="2" fill="white" />
              </svg>
              LeadRescue
            </a>
            <p className="mt-3 text-sm leading-relaxed text-gray-500">
              Every lead deserves a follow-up.
            </p>
          </div>

          {/* Link columns */}
          {footerLinks.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-bold uppercase tracking-wide text-gray-400">
                {col.title}
              </h4>
              <ul className="mt-4 space-y-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-gray-500 transition-colors hover:text-brand-600"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-gray-100 pt-6 text-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} LeadRescue. Every Lead Deserves a
            Follow-Up.
          </p>
        </div>
      </div>
    </footer>
  );
}
