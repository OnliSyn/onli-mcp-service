export function rank<T>(query: string, items: T[], getter: (t: T)=>string, limit=5) {
  const q = query.toLowerCase().split(/\s+/).filter(Boolean);
  const scored = items.map(it => {
    const text = getter(it).toLowerCase();
    let s = 0;
    for (const term of q) if (text.includes(term)) s += Math.sqrt(term.length);
    return { it, s };
  });
  return scored.sort((a,b)=>b.s-a.s).slice(0, limit).map(x=>x.it);
}
