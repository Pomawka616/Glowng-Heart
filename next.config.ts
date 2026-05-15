import type { NextConfig } from "next";

const repository = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const repoName = process.env.REPO_NAME ?? repository;
const isUserPages = repoName.endsWith(".github.io");
const enablePages = process.env.GITHUB_PAGES === "true";
const basePath =
  enablePages && repoName && !isUserPages ? `/${repoName}` : "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  reactStrictMode: true,
  productionBrowserSourceMaps: false,
  images: {
    unoptimized: true
  },
  basePath,
  assetPrefix: basePath || undefined,
  experimental: {
    webpackBuildWorker: false,
    serverSourceMaps: false
  }
};

export default nextConfig;
