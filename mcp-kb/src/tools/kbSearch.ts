export const kbSearchTool = (kb: any) => async (input: { query: string; limit?: number }) => {
  const hits = kb.search(input.query, input.limit ?? 5);
  return {
    passages: hits.map((p: any) => ({
      id: p.id,
      title: p.title,
      source: p.source,
      excerpt: p.text.slice(0, 600) + (p.text.length > 600 ? "…" : "")
    }))
  };
};
