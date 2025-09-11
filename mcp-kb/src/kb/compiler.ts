import { rank } from "../util/rank";

export type Passage = {
  id: string;
  title: string;
  section: string;
  source: "CONDENSED" | "COMPREHENSIVE";
  text: string;
  href?: string;
};

type Doc = { id: string; body: string; source: Passage["source"] };

export function compile(docs: Doc[]) {
  const passages: Passage[] = [];
  for (const doc of docs) {
    const parts = doc.body.split(/\n(?=##\s+)/g);
    for (const block of parts) {
      const m = block.match(/^##+\s+(.+)$/m);
      if (!m) continue;
      const title = m[1].trim();
      const id = title.toLowerCase().replace(/\s+/g, "-");
      const body = block.replace(/^##+\s+.+\n?/, "").trim();
      passages.push({ id, title, section: "", source: doc.source, text: body });
    }
  }
  const byTitle = new Map<string, Passage>();
  for (const p of passages) {
    const k = p.title.toLowerCase();
    if (!byTitle.has(k) || byTitle.get(k)!.source === "COMPREHENSIVE") byTitle.set(k, p);
  }
  const canonical = Array.from(byTitle.values());

  function search(query: string, limit = 5) {
    return rank(query, canonical, (p) => p.text, limit);
  }

  const byId = new Map(canonical.map(p => [p.id, p]));
  return { passages: canonical, byId, search };
}
