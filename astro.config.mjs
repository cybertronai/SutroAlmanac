// @ts-check
import {
  defineConfig,
  fontProviders,
  passthroughImageService,
} from "astro/config";
import sitemap from "@astrojs/sitemap";

// GitHub Pages serves this project repo under /SutroAlmanac. The base is gated
// behind an env var so local `astro dev` stays at the root the team already
// uses; only the Pages build (which sets SUTRO_BASE) gets the project path.
const base = process.env.SUTRO_BASE || "/";

// Prefix root-absolute links and images inside rendered markdown with the base.
// Astro does not rewrite markdown hrefs for `base`, so without this the in-site
// links from the recaps/challenges/etc. would 404 on the deployed path.
function rehypeBaseLinks() {
  if (base === "/") return () => {};
  const fix = (v) =>
    typeof v === "string" && v.startsWith("/") && !v.startsWith("//")
      ? base.replace(/\/$/, "") + v
      : v;
  const walk = (node) => {
    if (node.type === "element" && node.properties) {
      if (node.tagName === "a") node.properties.href = fix(node.properties.href);
      if (node.tagName === "img" || node.tagName === "source")
        node.properties.src = fix(node.properties.src);
    }
    (node.children || []).forEach(walk);
  };
  return (tree) => walk(tree);
}

// https://astro.build/config
export default defineConfig({
  site: "https://cybertronai.github.io",
  base,
  integrations: [sitemap()],
  scopedStyleStrategy: "where",
  image: {
    // All artwork is plain <img> from /public, so there is nothing to optimize.
    // Passthrough skips the sharp image service and its native build dependency.
    service: passthroughImageService(),
  },
  markdown: {
    // Keep ASCII punctuation as-is. Without this, "--"/"---" become en/em-dashes
    // and "..." becomes an ellipsis char in the built HTML.
    smartypants: false,
    rehypePlugins: [rehypeBaseLinks],
  },
  experimental: {
    fonts: [
      {
        provider: fontProviders.google(),
        name: "Roboto Slab",
        cssVariable: "--font-roboto-slab",
        weights: ["100 900"],
      },
      {
        provider: fontProviders.google(),
        name: "Inter",
        cssVariable: "--font-inter",
        weights: ["100 900"],
      },
    ],
  },
});
