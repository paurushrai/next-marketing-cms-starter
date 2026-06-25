import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enables the `use cache` directive, cacheTag, and cacheLife — the
  // foundation of per-page caching and on-demand revalidation at scale.
  cacheComponents: true,
};

export default nextConfig;
