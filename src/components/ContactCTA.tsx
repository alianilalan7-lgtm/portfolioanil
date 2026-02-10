import Link from "next/link";

export default function ContactCTA() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <div className="glass-card p-12 md:p-16">
          <span className="material-icons text-4xl text-primary mb-4">
            handshake
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-sage mb-4">
            Let&apos;s build something{" "}
            <span className="text-primary">together</span>
          </h2>
          <p className="text-sage/50 text-lg max-w-xl mx-auto mb-8">
            Have a project in mind or want to collaborate? I&apos;d love to hear
            from you. Let&apos;s turn your ideas into reality.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-forest font-semibold rounded-xl hover:bg-primary-light transition-colors"
            >
              Start a Conversation
              <span className="material-icons text-lg">arrow_forward</span>
            </Link>
            <a
              href="mailto:hello@alianilalan.dev"
              className="inline-flex items-center gap-2 px-8 py-3.5 border border-glass-border text-sage rounded-xl hover:border-primary/30 hover:text-primary transition-all"
            >
              <span className="material-icons text-lg">mail_outline</span>
              hello@alianilalan.dev
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
