import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // AGENTS.md is curated for this project; stop `next dev` from appending its own block.
  agentRules: false,
  logging: {
    // Server function logging prints action arguments, which would expose enquiry content in the terminal.
    serverFunctions: false,
  },
};

export default nextConfig;
