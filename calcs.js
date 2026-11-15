// Колода «Прилив битвы» на swordsandravens.net (базовая комплектация)
window.CB_TOB = {
  zero: { v: 0, label: '0', n: 8 },
  sword: { v: 1, label: '+1⚔', n: 4 },
  fortification: { v: 1, label: '+1🏰', n: 4 },
  two: { v: 2, label: '+2', n: 4 },
  three: { v: 3, label: '+3', n: 2 },
  skull: { v: 0, label: '💀', n: 2 },
};
window.CB_TOB_TOTAL = Object.values(CB_TOB).reduce((s, c) => s + c.n, 0);
window.CB_TOB_EXP = Object.values(CB_TOB).reduce((s, c) => s + c.v * c.n, 0) / CB_TOB_TOTAL;

window.cbSides = function (r) {
  return [
    { house: r.attacker, role: 'att', tob: r.attacker_tob_id, v: r.attacker_tob_value, total: +r.attacker_total, win: r.winner === r.attacker },
    { house: r.defender, role: 'def', tob: r.defender_tob_id, v: r.defender_tob_value, total: +r.defender_total, win: r.winner === r.defender },
  ];
}
window.cbHasTob = function (s) { return s.tob && s.v !== null && s.v !== '' && s.v !== undefined; }
window.cbDecided = function (r) {
  const [a, d] = cbSides(r);
  if (!cbHasTob(a) || !cbHasTob(d)) return false;
  const w = a.win ? a : d, l = a.win ? d : a;
  const bw = w.total - +w.v, bl = l.total - +l.v;
  return bw < bl || (bw === bl && w.total > l.total);
}

window.cbWinrate = (combats) => {
  const m = new Map();
  combats.forEach((r) => cbSides(r).forEach((s) => {
    if (!s.house) return;
    const o = m.get(s.house) || { house: s.house, battles: 0, wins: 0, att: 0, att_wins: 0, def: 0, def_wins: 0 };
    o.battles++; if (s.win) o.wins++;
    o[s.role]++; if (s.win) o[s.role + '_wins']++;
    m.set(s.house, o);
  }));
  return [...m.values()].map((o) => ({ ...o, rate: Math.round((o.wins / o.battles) * 100) }))
    .sort((a, b) => b.rate - a.rate || b.battles - a.battles);
};

window.cbLuck = (combats) => {
  const m = new Map();
  combats.forEach((r) => {
    const dec = cbDecided(r);
    cbSides(r).forEach((s) => {
      if (!s.house || !cbHasTob(s)) return;
      const o = m.get(s.house) || { house: s.house, draws: 0, sum: 0, skulls: 0, threes: 0, saved: 0, robbed: 0, drawn: [] };
      o.draws++; o.sum += +s.v; o.drawn.push((CB_TOB[s.tob] || {}).label || s.tob);
      if (s.tob === 'skull') o.skulls++;
      if (s.tob === 'three') o.threes++;
      if (dec && s.win) o.saved++;
      if (dec && !s.win) o.robbed++;
      m.set(s.house, o);
    });
  });
  return [...m.values()].map((o) => ({
    house: o.house, draws: o.draws, sum: o.sum,
    avg: Math.round((o.sum / o.draws) * 100) / 100,
    luck: Math.round((o.sum - CB_TOB_EXP * o.draws) * 10) / 10,
    coef: Math.round((o.sum / (CB_TOB_EXP * o.draws)) * 100) / 100,
    skulls: o.skulls, threes: o.threes, saved: o.saved, robbed: o.robbed, drawn: o.drawn.join(' · '),
  })).sort((a, b) => b.luck - a.luck);
};

window.cbTobDist = (combats) => {
  const cnt = {}; let n = 0;
  combats.forEach((r) => cbSides(r).forEach((s) => { if (cbHasTob(s)) { cnt[s.tob] = (cnt[s.tob] || 0) + 1; n++; } }));
  return Object.entries(CB_TOB).map(([id, c]) => ({
    card: c.label, id, drawn: cnt[id] || 0, expected: Math.round((n * c.n / CB_TOB_TOTAL) * 10) / 10,
  }));
};

window.cbLuckSummary = (combats) => {
  let n = 0, sum = 0;
  combats.forEach((r) => cbSides(r).forEach((s) => { if (cbHasTob(s)) { n++; sum += +s.v; } }));
  const decided = combats.filter(cbDecided).length;
  return [{
    battles: combats.length, draws: n, decided,
    decided_share: combats.length ? Math.round((decided / combats.length) * 100) : 0,
    avg: n ? Math.round((sum / n) * 100) / 100 : 0,
    expected: Math.round(CB_TOB_EXP * 100) / 100,
    coef: n ? Math.round((sum / (CB_TOB_EXP * n)) * 100) / 100 : 0,
  }];
};

window.cbPower = (armies, cards) => {
  const m = new Map();
  armies.forEach((a) => {
    const o = m.get(a.house) || { house: a.house, footmen: 0, knights: 0, ships: 0, siege: 0, land: 0, sea: 0, total: 0, units: 0, best: 0, best_region: '' };
    o.footmen += +a.footmen; o.knights += +a.knights; o.ships += +a.ships; o.siege += +a.siege;
    o.units += +a.footmen + +a.knights + +a.ships + +a.siege;
    if (a.kind === 'море') o.sea += +a.strength; else o.land += +a.strength;
    o.total += +a.strength;
    if (+a.strength > o.best) { o.best = +a.strength; o.best_region = a.region; }
    m.set(a.house, o);
  });
  cards.forEach((c) => {
    const o = m.get(c.house); if (!o) return;
    if (c.state === 'на руке') o.hand = (o.hand || 0) + +c.strength;
  });
  return [...m.values()].map((o) => ({ ...o, hand: o.hand || 0, best_label: o.best + ' — ' + o.best_region }))
    .sort((a, b) => b.total - a.total || b.units - a.units);
};
