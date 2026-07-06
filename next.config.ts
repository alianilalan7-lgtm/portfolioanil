import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/tr/sitemap.xml",
        destination: "/sitemap.xml",
      },
    ];
  },

  async redirects() {
    return [
      // 'add AI to your business/app' post was removed as a duplicate (commit
      // 5f06732) after it had already been auto-shared on LinkedIn. Point the
      // dead share URL at the surviving post that covers the same thesis so the
      // link no longer 404s and its SEO value is preserved.
      {
        source: "/:locale(tr|en)/blog/how-to-add-ai-to-your-business-or-app",
        destination: "/:locale/blog/how-to-integrate-llm-into-web-app",
        permanent: true,
      },
    ];
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
