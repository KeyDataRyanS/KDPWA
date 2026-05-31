import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "KeyData PWA",
    short_name: "KeyData",
    description: "Key Data Dashboard — tablet-first progressive web app",
    start_url: "/",
    display: "standalone",
    background_color: "#080d14",
    theme_color: "#080d14",
    orientation: "any",
    icons: [
      {
        src: "/icons/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/icons/icon-512x512-maskable.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
