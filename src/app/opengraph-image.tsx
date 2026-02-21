import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background:
            "radial-gradient(circle at 20% 20%, rgba(132,165,157,0.35) 0%, rgba(26,28,26,1) 45%), linear-gradient(135deg, #1A1C1A 0%, #242724 100%)",
          color: "#D1D9D1",
          padding: "64px",
          fontFamily:
            "Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            border: "1px solid rgba(132,165,157,0.2)",
            margin: "24px",
            borderRadius: "28px",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            height: "100%",
            zIndex: 2,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
            }}
          >
            <div
              style={{
                width: "72px",
                height: "72px",
                borderRadius: "16px",
                background: "rgba(132,165,157,0.18)",
                border: "1px solid rgba(132,165,157,0.35)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#84A59D",
                fontSize: "42px",
                fontWeight: 700,
              }}
            >
              A
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "6px",
              }}
            >
              <div style={{ fontSize: "40px", fontWeight: 700, lineHeight: 1.1 }}>
                Ali Anil Alan
              </div>
              <div
                style={{
                  fontSize: "22px",
                  color: "rgba(209,217,209,0.78)",
                }}
              >
                Freelance AI & SaaS Developer
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "14px",
              maxWidth: "980px",
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: "54px",
                fontWeight: 700,
                lineHeight: 1.08,
                letterSpacing: "-0.02em",
              }}
            >
              AI-Powered SaaS, Dashboards and Automation Systems
            </div>
            <div
              style={{
                display: "flex",
                fontSize: "26px",
                color: "rgba(209,217,209,0.86)",
                lineHeight: 1.3,
              }}
            >
              MVP delivery for startups and businesses with production-ready quality.
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              fontSize: "24px",
              color: "rgba(209,217,209,0.65)",
            }}
          >
            <div style={{ display: "flex" }}>alianil.com</div>
            <div style={{ display: "flex" }}>Next.js • SaaS • AI</div>
          </div>
        </div>
      </div>
    ),
    size
  );
}

