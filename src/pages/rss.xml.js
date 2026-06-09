// RSS feed of the recaps (monthly + weekly), newest first. The feed link is
// site-rooted, so items carry the deploy base explicitly.
import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context) {
  const base = (process.env.SUTRO_BASE || "/").replace(/\/?$/, "/");
  const docs = await getCollection("docs");

  const items = docs
    .filter((d) => /^recaps\/(\d{4}-\d{2}|weekly\/\d{4}-\d{2}-\d{2})$/.test(d.id))
    .map((d) => {
      const tail = d.id.split("/").pop();
      const date = tail.length === 7 ? `${tail}-01` : tail;
      return {
        title: d.data.title,
        description: d.data.description ?? "",
        link: `${base}${d.id}/`,
        pubDate: new Date(date + "T12:00:00Z"),
      };
    })
    .sort((a, b) => b.pubDate.valueOf() - a.pubDate.valueOf());

  return rss({
    title: "Sutro Almanac",
    description:
      "Monthly and weekly recaps of the Sutro Group, an energy-efficient-AI study group. Every claim traces back to a source.",
    site: context.site,
    items,
    customData: "<language>en</language>",
  });
}
