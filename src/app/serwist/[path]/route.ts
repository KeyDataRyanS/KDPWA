import { createSerwistRoute } from "@serwist/turbopack";

import nextConfig from "../../../../next.config";

export const { GET, dynamic, dynamicParams, revalidate } = createSerwistRoute({
  swSrc: "src/app/sw.ts",
  globDirectory: ".next",
  nextConfig,
  useNativeEsbuild: true,
});
