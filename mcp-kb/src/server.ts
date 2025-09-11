import { createServer } from "@modelcontextprotocol/sdk/server";
import { kbSearchTool } from "./tools/kbSearch";
import { kbAnswerTool } from "./tools/kbAnswer";
import { loadKB } from "./kb/index";

async function main() {
  const kb = await loadKB();
  const server = createServer({ name: "onli-kb-mcp", version: "0.1.0" });
  server.tool("kb.search", kbSearchTool(kb));
  server.tool("kb.answer", kbAnswerTool(kb));
  await server.start();
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
