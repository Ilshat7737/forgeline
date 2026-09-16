import type { NextConfig } from "next";

/** Sent on every response. No CSP yet — see docs/deployment.md before adding one. */
const securityHeaders = [
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
];

const nextConfig: NextConfig = {
  // Self-hosted deployment: `.next/standalone/server.js` runs without node_modules on the server.
  output: "standalone",
  poweredByHeader: false,
  // AGENTS.md is curated for this project; stop `next dev` from appending its own block.
  agentRules: false,
  logging: {
    // Server function logging prints action arguments, which would expose enquiry content in the terminal.
    serverFunctions: false,
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
