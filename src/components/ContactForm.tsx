"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

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
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name */}
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-sage/70 mb-2"
        >
          {t("fullName")}
        </label>
        <input
          type="text"
          id="name"
          required
          value={formData.name}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, name: e.target.value }))
          }
          className="w-full px-4 py-3 rounded-xl bg-forest-lighter border border-glass-border text-sage placeholder-sage/30 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all"
          placeholder={t("namePlaceholder")}
        />
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-sage/70 mb-2"
        >
          {t("emailAddress")}
        </label>
        <input
          type="email"
          id="email"
          required
          value={formData.email}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, email: e.target.value }))
          }
          className="w-full px-4 py-3 rounded-xl bg-forest-lighter border border-glass-border text-sage placeholder-sage/30 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all"
          placeholder={t("emailPlaceholder")}
        />
      </div>

      {/* Subject */}
      <div>
        <label
          htmlFor="subject"
          className="block text-sm font-medium text-sage/70 mb-2"
        >
          {t("subject")}
        </label>
        <select
          id="subject"
          required
          value={formData.subject}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, subject: e.target.value }))
          }
          className="w-full px-4 py-3 rounded-xl bg-forest-lighter border border-glass-border text-sage focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all appearance-none"
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
      </div>

      {/* Message */}
      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-sage/70 mb-2"
        >
          {t("message")}
        </label>
        <textarea
          id="message"
          required
          rows={5}
          value={formData.message}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, message: e.target.value }))
          }
          className="w-full px-4 py-3 rounded-xl bg-forest-lighter border border-glass-border text-sage placeholder-sage/30 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all resize-none"
          placeholder={t("messagePlaceholder")}
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-primary text-forest font-semibold rounded-xl hover:bg-primary-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "sending" ? (
          <>
            <span className="material-icons animate-spin text-lg">
              autorenew
            </span>
            {t("sending")}
          </>
        ) : (
          <>
            {t("sendMessage")}
            <span className="material-icons text-lg">send</span>
          </>
        )}
      </button>

      {/* Status messages */}
      {status === "success" && (
        <div className="flex items-center gap-2 p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm">
          <span className="material-icons text-lg">check_circle</span>
          {t("successMessage")}
        </div>
      )}
      {status === "error" && (
        <div className="flex items-center gap-2 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          <span className="material-icons text-lg">error</span>
          {t("errorMessage")}
        </div>
      )}
    </form>
  );
}
