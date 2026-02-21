"use client";

import { FormEvent, useState } from "react";
import { useLocale } from "next-intl";

type Status = "idle" | "sending" | "success" | "error";

export default function LeadMagnetSection() {
  const locale = useLocale();
  const isTr = locale === "tr";
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("sending");

    try {
      const payload = {
        name: "Lead Magnet Request",
        email,
        subject: "SaaS Checklist PDF Request",
        message:
          "I want to receive the SaaS development checklist PDF from the website lead magnet form.",
      };

      const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto glass-card p-8 md:p-10">
        <p className="text-primary text-sm font-medium mb-2">
          {isTr ? "Ücretsiz Kaynak" : "Free Resource"}
        </p>
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-sage mb-3">
          {isTr
            ? "SaaS Geliştirme Checklist PDF"
            : "SaaS Development Checklist PDF"}
        </h2>
        <p className="text-sage/55 mb-6">
          {isTr
            ? "E-posta bırak, checklist'i indir ve MVP sürecini daha net planla."
            : "Drop your email, download the checklist, and plan your MVP process with clarity."}
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={isTr ? "ornek@mail.com" : "you@example.com"}
            className="flex-1 px-4 py-3 rounded-xl bg-forest-lighter border border-glass-border text-sage placeholder-sage/30 focus:outline-none focus:border-primary/50"
          />
          <button
            type="submit"
            disabled={status === "sending"}
            className="px-6 py-3 rounded-xl bg-primary text-forest font-semibold hover:bg-primary-light transition-colors disabled:opacity-60"
          >
            {status === "sending"
              ? isTr
                ? "Gönderiliyor"
                : "Sending"
              : isTr
              ? "E-posta Bırak"
              : "Leave Email"}
          </button>
        </form>

        {status === "success" && (
          <div className="mt-4 text-sm text-primary">
            <a
              href="/downloads/saas-gelistirme-checklist.pdf"
              download
              className="inline-flex items-center gap-2 hover:text-primary-light transition-colors"
            >
              <span className="material-icons text-sm">download</span>
              {isTr ? "PDF indir" : "Download PDF"}
            </a>
          </div>
        )}

        {status === "error" && (
          <p className="mt-4 text-sm text-red-400">
            {isTr
              ? "Şu anda gönderilemedi. Lütfen biraz sonra tekrar dene."
              : "Could not submit right now. Please try again shortly."}
          </p>
        )}
      </div>
    </section>
  );
}
