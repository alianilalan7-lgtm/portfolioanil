import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Available badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping-slow absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary" />
          </span>
          <span className="text-primary text-sm font-medium">
            Available for new projects
          </span>
        </div>

        {/* Main heading */}
        <h1 className="font-heading text-5xl md:text-7xl font-bold text-sage leading-tight mb-6">
          Crafting Digital
          <br />
          <span className="text-primary">Experiences</span>
        </h1>

        <p className="text-sage/60 text-lg md:text-xl max-w-2xl leading-relaxed mb-10">
          Full-stack developer specializing in building modern web applications
          with a focus on performance, accessibility, and elegant user
          interfaces.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-4">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-forest font-semibold rounded-xl hover:bg-primary-light transition-colors"
          >
            View Projects
            <span className="material-icons text-lg">arrow_forward</span>
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 border border-glass-border text-sage rounded-xl hover:border-primary/30 hover:text-primary transition-all glass-card"
          >
            Get in Touch
            <span className="material-icons text-lg">mail_outline</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
