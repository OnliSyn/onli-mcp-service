# Onli KB — Minimal MCP Service

This adds a compact **Model Context Protocol (MCP)** server to serve the **Onli Knowledge Base**.

## Quickstart

```bash
cd mcp-kb
pnpm install   # or npm i / yarn
pnpm run build
pnpm start
```

Tools:
- `kb.search(query, limit=5)`
- `kb.answer(question, limit=6)`

Sources:
- `src/kb/data/onli-kb-condensed.md`
- `src/kb/data/onli-kb-comprehensive.md`
