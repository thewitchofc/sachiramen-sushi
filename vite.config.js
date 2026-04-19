import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

function escapeHtmlAttr(value) {
  return String(value).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const rawGa = (env.VITE_GA_MEASUREMENT_ID || "").trim();
  const gaId = /^G-[A-Z0-9]+$/i.test(rawGa) ? rawGa : "";
  const gaIdJs = gaId ? JSON.stringify(gaId) : "";

  return {
    plugins: [
      react(),
      {
        name: "inject-ga4-index-html",
        transformIndexHtml(html) {
          if (!gaId) return html;
          const idAttr = escapeHtmlAttr(gaId);
          const injection = `    <!-- Google tag (gtag.js) — GA4 (מזהה מ־VITE_GA_MEASUREMENT_ID) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=${idAttr}"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag("consent", "default", {
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
        analytics_storage: "granted"
      });
      gtag("js", new Date());
      gtag("config", ${gaIdJs}, {
        send_page_view: true,
        cookie_flags: "SameSite=Lax;Secure"
      });
    </script>`;
          return html.replace("</head>", `${injection}\n  </head>`);
        },
      },
    ],
  };
});
