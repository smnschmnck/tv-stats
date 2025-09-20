import type { NextConfig } from "next";
import { fileURLToPath } from "node:url";
import createJiti from "jiti";
import createNextIntlPlugin from "next-intl/plugin";
const jiti = createJiti(fileURLToPath(import.meta.url));

jiti("./src/env");

const nextConfig: NextConfig = {
  experimental: {
    useCache: true,
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
