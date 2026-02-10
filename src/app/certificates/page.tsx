import { certificates } from "@/data/certificates";

export default function CertificatesPage() {
  return (
    <div className="pt-28 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-sage">
              Certificates
            </h1>
            <span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
              {certificates.length}
            </span>
          </div>
          <p className="text-sage/50 text-lg max-w-2xl">
            Professional certifications and completed training programs.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert) => (
            <div key={cert.id} className="glass-card glass-card-hover p-6 flex flex-col">
              {/* Issuer icon */}
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20">
                  <span className="material-icons text-primary text-xl">
                    workspace_premium
                  </span>
                </div>
                <div>
                  <p className="text-sage/40 text-xs uppercase tracking-wider">
                    {cert.issuer}
                  </p>
                  <p className="text-sage/30 text-xs">{cert.date}</p>
                </div>
              </div>

              {/* Title */}
              <h3 className="font-heading font-semibold text-sage text-lg mb-4 flex-1">
                {cert.title}
              </h3>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-5">
                {cert.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 text-xs rounded-md bg-forest-lighter text-sage/60 border border-glass-border"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary text-forest text-sm font-semibold rounded-lg hover:bg-primary-light transition-colors"
                >
                  <span className="material-icons text-sm">verified</span>
                  Verify
                </a>
                <a
                  href={cert.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 border border-glass-border text-sage/70 text-sm rounded-lg hover:border-primary/30 hover:text-primary transition-all"
                >
                  <span className="material-icons text-sm">picture_as_pdf</span>
                  PDF
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
