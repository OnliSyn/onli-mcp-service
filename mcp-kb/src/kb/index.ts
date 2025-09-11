import fs from "node:fs/promises";
import path from "node:path";
import { compile } from "./compiler";

export async function loadKB() {
  const dir = path.join(__dirname, "data");
  const files = ["onli-kb-condensed.md", "onli-kb-comprehensive.md"];
  const docs = await Promise.all(
    files.map(async f => ({
      id: f,
      body: await fs.readFile(path.join(dir, f), "utf8"),
      source: f.includes("condensed") ? "CONDENSED" : "COMPREHENSIVE"
    }))
  );
  return compile(docs);
}
