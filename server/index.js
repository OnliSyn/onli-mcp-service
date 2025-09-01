const express = require('express');

// If using Node 18 or above, fetch is globally available. Otherwise require node-fetch.
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

// Hardcoded rule responses
const RULES = [
  {
    match: q => /(price|pricing|cost).*developer/i.test(q),
    answer: "Developers: $500/month or $6,000/year for a team of 3. Treasury: $50,000 per billion units (sold in billion-unit increments) + $0.05 per issue. No other fees."
  },
  {
    match: q => /treasury.*(fee|price|cost)/i.test(q),
    answer: "Treasury: $50,000 per billion units (sold in billion-unit increments) + $0.05 per issue. No other fees."
  },
  {
    match: q => /(founders?|founded|founding)/i.test(q),
    answer: "Onli was founded in 2010 by Dhryl Anton, Michael Mcfall, Peter Jenson Haxel, and Michaela Katherine Anton."
  },
  {
    match: q => /^what\s+is\s+onli\??$/i.test(q),
    answer: "ONLI transfers possession of unique digital objects (Genomes) using Genes (identity) in Vaults (self-contained execution). It is not a blockchain or cryptocurrency."
  },
];

// Load knowledge base from GitHub raw file
async function loadKB() {
  try {
    const res = await fetch('https://raw.githubusercontent.com/OnliSyn/onli-mcp-service/main/docs/onli_knowledge_base.md');
    return await res.text();
  } catch (err) {
    return '';
  }
}

async function loadKB2() {
  try {
    const res = await fetch('https://raw.githubusercontent.com/OnliSyn/onli-mcp-service/main/docs/onli_comprehensive_knowledge_base.md');
    return await res.text();
  } catch (err) {
    return '';
  }
}

// Placeholder for LLM call; implement with your provider
async function callLLM(messages) {
  // Example: return { content: "LLM answer placeholder" };
  return { content: "This is a placeholder response. Please integrate with your LLM provider." };
}

// Express server
const app = express();
app.use(express.json());

app.post('/chat', async (req, res) => {
  const query = String(req.body?.query || '').trim();
  // Check rules
  for (const rule of RULES) {
    if (rule.match(query)) {
      return res.json({ source: 'rule', answer: rule.answer });
    }
  }

  // Default: call LLM with knowledge base context
  const kb = await loadKB();
  const kb2 = await loadKB2();
  const messages = [
    { role: 'system', content: 'You are an ONLI assistant. Use the provided context to answer.' },
    { role: 'user', content: `Question: ${query}\n\nContext:\n${kb}\n\n${kb2}` },
  ];
  const result = await callLLM(messages);
  res.json({ source: 'llm', answer: result.content });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Chat server listening on port ${PORT}`);
});
