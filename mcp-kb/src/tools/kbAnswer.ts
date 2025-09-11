export const kbAnswerTool = (kb: any) => async (input: { question: string; limit?: number }) => {
  const hits = kb.search(input.question, input.limit ?? 6);
  const take = hits.slice(0, 3);
  const answer = take.map((p: any) => p.text.split("\n")[0]).join(" ");
  return {
    answer,
    citations: take.map((p: any) => ({ id: p.id, title: p.title, source: p.source }))
  };
};
