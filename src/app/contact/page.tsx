import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
  return (
    <div className="pt-28 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping-slow absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary" />
            </span>
            <span className="text-primary text-sm font-medium">
              Available for Hire
            </span>
          </div>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-sage mb-4">
            Get in <span className="text-primary">touch</span>
          </h1>
          <p className="text-sage/50 text-lg max-w-xl mx-auto">
            Have a project in mind? Let&apos;s discuss how we can work together
            to bring your ideas to life.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Left sidebar */}
          <div className="space-y-6">
            {/* Quick intro */}
            <div className="glass-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="material-icons text-primary">
                  quick_reference_all
                </span>
                <h3 className="font-heading font-semibold text-sage">
                  Quick Introduction?
                </h3>
              </div>
              <p className="text-sage/50 text-sm leading-relaxed mb-4">
                Prefer a face-to-face conversation? Book a quick discovery call
                to discuss your project needs.
              </p>
              <a
                href="#"
                className="inline-flex items-center gap-2 text-primary text-sm font-medium hover:text-primary-light transition-colors"
              >
                <span className="material-icons text-sm">calendar_today</span>
                Book a 15-min Discovery Call
              </a>
            </div>

            {/* Social links */}
            <div className="glass-card p-6">
              <h3 className="font-heading font-semibold text-sage mb-4">
                Connect
              </h3>
              <div className="space-y-3">
                {[
                  {
                    icon: "work",
                    label: "LinkedIn",
                    href: "https://linkedin.com/in/alianilalan",
                    handle: "@alianilalan",
                  },
                  {
                    icon: "alternate_email",
                    label: "X (Twitter)",
                    href: "https://x.com/alianilalan",
                    handle: "@alianilalan",
                  },
                  {
                    icon: "code",
                    label: "GitHub",
                    href: "https://github.com/alianilalan7-lgtm",
                    handle: "@alianilalan",
                  },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-forest-lighter transition-colors group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-forest-lighter border border-glass-border flex items-center justify-center group-hover:border-primary/30 transition-colors">
                      <span className="material-icons text-sage/50 text-lg group-hover:text-primary transition-colors">
                        {social.icon}
                      </span>
                    </div>
                    <div>
                      <p className="text-sage text-sm font-medium">
                        {social.label}
                      </p>
                      <p className="text-sage/40 text-xs">{social.handle}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <div className="glass-card p-8">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
