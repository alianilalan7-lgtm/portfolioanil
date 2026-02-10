export default function AboutSection() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left - Image placeholder */}
          <div className="glass-card p-2">
            <div className="h-80 rounded-xl bg-forest-lighter flex items-center justify-center">
              <div className="text-center">
                <span className="material-icons text-6xl text-sage/20 mb-2">
                  person
                </span>
                <p className="text-sage/30 text-sm">Profile Photo</p>
              </div>
            </div>
          </div>

          {/* Right - Content */}
          <div>
            <p className="text-primary text-sm font-medium mb-2">About Me</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-sage mb-6">
              Passionate about building{" "}
              <span className="text-primary">meaningful</span> digital products
            </h2>
            <div className="space-y-4 text-sage/60 leading-relaxed">
              <p>
                I&apos;m a full-stack developer with a passion for creating
                elegant, performant web applications that solve real-world
                problems. With expertise in modern JavaScript frameworks and
                cloud technologies, I bring ideas to life through clean code and
                thoughtful design.
              </p>
              <p>
                When I&apos;m not coding, you&apos;ll find me exploring nature,
                contributing to open-source projects, or experimenting with AI
                and machine learning to push the boundaries of what&apos;s
                possible on the web.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-8">
              {[
                { number: "3+", label: "Years Experience" },
                { number: "20+", label: "Projects Built" },
                { number: "10+", label: "Happy Clients" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="font-heading text-2xl font-bold text-primary">
                    {stat.number}
                  </p>
                  <p className="text-sage/40 text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
