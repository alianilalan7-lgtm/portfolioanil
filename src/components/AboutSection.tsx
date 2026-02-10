import { projects } from "@/data/projects";

export default function AboutSection() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <p className="text-primary text-sm font-medium mb-2">About Me</p>
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-sage mb-6">
          Building working products rooted in{" "}
          <span className="text-primary">real-world</span> problems
        </h2>
        <div className="space-y-4 text-sage/60 text-lg leading-relaxed">
          <p>
            I spent 10+ years inside retail operations — team leadership,
            KPIs, shift planning, high-tempo environments, and crisis
            management. That experience shaped a simple principle for me:
            a solution only matters if it works in real life.
          </p>
          <p>
            Today, I combine that operational mindset with software and AI
            to build practical web applications and MVPs. I care less about
            trends and more about choosing the right tool for the right
            problem.
          </p>
          <p>
            My main focus areas include planning &amp; optimization,
            dashboards and automation, and AI-powered briefing workflows.
          </p>
        </div>

        {/* Stats */}
        <div className="flex gap-12 mt-10 pt-8 border-t border-glass-border">
          {[
            { number: "10+", label: "Years in Operations" },
            { number: `${projects.length}`, label: "Projects Built" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="font-heading text-3xl font-bold text-primary">
                {stat.number}
              </p>
              <p className="text-sage/40 text-sm mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
