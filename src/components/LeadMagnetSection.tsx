"use client";

import { FormEvent, useState } from "react";
import { useLocale } from "next-intl";
import SectionHeader from "@/components/fx/SectionHeader";
import Reveal from "@/components/fx/Reveal";

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
    <section className="max-w-7xl mx-auto px-6 py-24 md:py-32">
      <SectionHeader
        index="07"
        label={isTr ? "KAYNAK" : "RESOURCE"}
        meta={isTr ? "PDF / ÜCRETSİZ" : "PDF / FREE"}
      />

      <Reveal className="mt-12 bg-surface-2 border border-line p-8 md:p-12">
        <p className="eyebrow mb-5">
          // {isTr ? "ÜCRETSİZ KAYNAK" : "FREE RESOURCE"}
        </p>
        <h2 className="font-display uppercase font-bold text-paper tracking-tight leading-[1.05] text-2xl md:text-4xl mb-4">
          {isTr
            ? "SaaS Geliştirme Checklist PDF"
            : "SaaS Development Checklist PDF"}
        </h2>
        <p className="font-mono text-sm text-muted max-w-2xl leading-relaxed mb-8">
          {isTr
            ? "E-posta bırak, checklist'i indir ve MVP sürecini daha net planla."
            : "Drop your email, download the checklist, and plan your MVP process with clarity."}
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3 max-w-2xl"
        >
          <label htmlFor="lead-email" className="sr-only">
            {isTr ? "E-posta adresi" : "Email address"}
          </label>
          <input
            id="lead-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={isTr ? "ornek@mail.com" : "you@example.com"}
            className="flex-1 bg-surface border border-line px-4 py-3 font-mono text-sm text-paper placeholder-faint transition-colors focus:outline-none focus:border-lime"
          />
          <button
            type="submit"
            disabled={status === "sending"}
            className="btn-term btn-term--solid disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {status === "sending"
              ? isTr
                ? "> GÖNDERİLİYOR…"
                : "> SENDING…"
              : isTr
              ? "> E-POSTA_BIRAK"
              : "> LEAVE_EMAIL"}
          </button>
        </form>

        {status === "success" && (
          <p className="mt-6 font-mono text-sm text-lime" role="status">
            <a
              href="/downloads/saas-gelistirme-checklist.pdf"
              download
              className="underline-offset-4 hover:underline"
            >
              &gt; {isTr ? "PDF_İNDİR" : "DOWNLOAD_PDF"}
            </a>
          </p>
        )}

        {status === "error" && (
          <p className="mt-6 font-mono text-sm text-red-400" role="alert">
            [ERROR]{" "}
            {isTr
              ? "Şu anda gönderilemedi. Lütfen biraz sonra tekrar dene."
              : "Could not submit right now. Please try again shortly."}
          </p>
        )}
      </Reveal>
    </section>
  );
}
