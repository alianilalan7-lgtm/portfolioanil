import * as React from "react";

interface ContactEmailProps {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactEmail({
  name,
  email,
  subject,
  message,
}: ContactEmailProps) {
  return (
    <div
      style={{
        fontFamily: "Inter, sans-serif",
        maxWidth: "600px",
        margin: "0 auto",
        padding: "40px 20px",
        backgroundColor: "#1A1C1A",
        color: "#D1D9D1",
      }}
    >
      <div
        style={{
          backgroundColor: "#242724",
          borderRadius: "16px",
          padding: "32px",
          border: "1px solid rgba(132, 165, 157, 0.15)",
        }}
      >
        <h1
          style={{
            fontSize: "24px",
            color: "#84A59D",
            marginBottom: "8px",
          }}
        >
          New Contact Message
        </h1>
        <p style={{ color: "#9CA3AF", fontSize: "14px", marginBottom: "24px" }}>
          You received a new message from your portfolio site.
        </p>

        <div style={{ marginBottom: "16px" }}>
          <p style={{ fontSize: "12px", color: "#6B7280", marginBottom: "4px" }}>
            FROM
          </p>
          <p style={{ fontSize: "16px", margin: 0 }}>
            {name} ({email})
          </p>
        </div>

        <div style={{ marginBottom: "16px" }}>
          <p style={{ fontSize: "12px", color: "#6B7280", marginBottom: "4px" }}>
            SUBJECT
          </p>
          <p style={{ fontSize: "16px", margin: 0 }}>{subject}</p>
        </div>

        <div
          style={{
            borderTop: "1px solid rgba(132, 165, 157, 0.15)",
            paddingTop: "16px",
            marginTop: "16px",
          }}
        >
          <p style={{ fontSize: "12px", color: "#6B7280", marginBottom: "4px" }}>
            MESSAGE
          </p>
          <p style={{ fontSize: "15px", lineHeight: "1.6", whiteSpace: "pre-wrap" }}>
            {message}
          </p>
        </div>
      </div>

      <p
        style={{
          textAlign: "center" as const,
          fontSize: "12px",
          color: "#6B7280",
          marginTop: "24px",
        }}
      >
        This email was sent from your portfolio contact form.
      </p>
    </div>
  );
}
