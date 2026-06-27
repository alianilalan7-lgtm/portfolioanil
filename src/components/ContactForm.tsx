"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

const LABEL_CLASS =
  "block font-mono text-[11px] uppercase tracking-[0.18em] text-faint mb-2";
const FIELD_CLASS =
  "w-full bg-surface border border-line px-4 py-3 font-mono text-sm text-paper placeholder-faint transition-colors focus:outline-none focus:border-lime";

export default function ContactForm() {
  const t = useTranslations("ContactForm");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  const subjects = [
    { value: "Project Inquiry", label: t("subjectProjectInquiry") },
    { value: "Freelance Opportunity", label: t("subjectFreelance") },
    { value: "Collaboration", label: t("subjectCollaboration") },
    { value: "General Question", label: t("subjectGeneral") },
    { value: "Other", label: t("subjectOther") },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Failed to send");
      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      console.error("Contact form error:", err);
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      {/* Name */}
      <div>
        <label htmlFor="name" className={LABEL_CLASS}>
          {t("fullName")}
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          value={formData.name}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, name: e.target.value }))
          }
          className={FIELD_CLASS}
          placeholder={t("namePlaceholder")}
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className={LABEL_CLASS}>
          {t("emailAddress")}
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={formData.email}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, email: e.target.value }))
          }
          className={FIELD_CLASS}
          placeholder={t("emailPlaceholder")}
        />
      </div>

      {/* Subject */}
      <div>
        <label htmlFor="subject" className={LABEL_CLASS}>
          {t("subject")}
        </label>
        <div className="relative">
          <select
            id="subject"
            name="subject"
            required
            value={formData.subject}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, subject: e.target.value }))
            }
            className={`${FIELD_CLASS} appearance-none pr-10`}
          >
            <option value="" disabled>
              {t("selectSubject")}
            </option>
            {subjects.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 font-mono text-sm text-faint"
          >
            ▾
          </span>
        </div>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className={LABEL_CLASS}>
          {t("message")}
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={formData.message}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, message: e.target.value }))
          }
          className={`${FIELD_CLASS} resize-none`}
          placeholder={t("messagePlaceholder")}
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={status === "sending"}
        className="btn-term btn-term--solid w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "sending"
          ? `> ${t("sending")}`
          : `> ${t("sendMessage")}`}
      </button>

      {/* Status messages */}
      {status === "success" && (
        <p
          role="status"
          className="border border-lime/40 bg-lime/5 px-4 py-3 font-mono text-sm text-lime"
        >
          &gt; {t("successMessage")}
        </p>
      )}
      {status === "error" && (
        <p
          role="alert"
          className="border border-red-500/40 bg-red-500/5 px-4 py-3 font-mono text-sm text-red-400"
        >
          [ERROR] {t("errorMessage")}
        </p>
      )}
    </form>
  );
}
