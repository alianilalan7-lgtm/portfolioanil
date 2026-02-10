import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-glass-border bg-forest/80 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center border border-primary/30">
                <span className="text-primary font-heading font-bold text-sm">A</span>
              </div>
              <span className="font-heading font-semibold text-sage">
                ali<span className="text-primary">.dev</span>
              </span>
            </Link>
            <p className="text-sage/50 text-sm leading-relaxed">
              Full-stack developer crafting digital experiences with modern web
              technologies.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-sage text-sm mb-4">
              Quick Links
            </h4>
            <div className="flex flex-col gap-2">
              {[
                { href: "/", label: "Home" },
                { href: "/projects", label: "Projects" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sage/50 text-sm hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-heading font-semibold text-sage text-sm mb-4">
              Connect
            </h4>
            <div className="flex gap-3">
              {[
                {
                  href: "https://github.com/alianilalan7-lgtm",
                  icon: "code",
                  label: "GitHub",
                },
                {
                  href: "https://linkedin.com/in/alianilalan",
                  icon: "work",
                  label: "LinkedIn",
                },
                {
                  href: "https://x.com/alianilalan",
                  icon: "alternate_email",
                  label: "X",
                },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-forest-light border border-glass-border flex items-center justify-center text-sage/50 hover:text-primary hover:border-primary/30 transition-all"
                  aria-label={social.label}
                >
                  <span className="material-icons text-lg">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-glass-border mt-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sage/40 text-xs">
            &copy; {new Date().getFullYear()} Ali Anil Alan. All rights
            reserved.
          </p>
          <div className="flex gap-4">
            <span className="text-sage/40 text-xs hover:text-sage/60 transition-colors cursor-pointer">
              Privacy Policy
            </span>
            <span className="text-sage/40 text-xs hover:text-sage/60 transition-colors cursor-pointer">
              Terms of Service
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
