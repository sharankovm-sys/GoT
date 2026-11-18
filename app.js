
  // Цвета домов как в игре; t — цвет текста поверх.
  window.CB_HOUSES = {
    'Ланнистер': { c: '#cf7766', t: '#10191c' },
    'Баратеон': { c: '#e3c35f', t: '#10191c' },
    'Старк': { c: '#b4c2c8', t: '#10191c' },
    'Грейджой': { c: '#6f8790', t: '#0b1316' },
    'Тирелл': { c: '#8fbf7f', t: '#10191c' },
    'Мартелл': { c: '#e0995e', t: '#10191c' },
    'Аррен': { c: '#86adc2', t: '#10191c' },
    'Таргариен': { c: '#b0606c', t: '#0b1316' },
  };
  window.CB_WIN = 7; // замков для победы в базовой игре
  window.CB_SUPPLY_MAX = 6;
  // масштаб страницы (CSS zoom на широких экранах) — чтобы подсказки стояли у курсора
  window.cbZ = (el) => { const r = el.getBoundingClientRect(); return el.offsetWidth ? (r.width / el.offsetWidth) || 1 : 1; };
  window.cbHouse = (name) => CB_HOUSES[String(name || '').split(' (')[0]] || { c: '#888', t: '#fff' };
  window.cbIcon = (parent, id, cls) => {
    const svg = parent.append('svg').attr('class', cls || 'cb-ico').attr('aria-hidden', 'true');
    svg.append('use').attr('href', '#' + id);
    return svg;
  };

  dash.calc('leaders', {
    inputs: ['houses'], title: 'Лидеры по замкам', description: 'Наибольшее число замков и дома, у которых оно есть.',
    fn: (houses) => {
      if (!houses.length) return [];
      const top = d3.max(houses, (h) => +h.castles);
      const names = houses.filter((h) => +h.castles === top).map((h) => h.house);
      return [{ castles: top, names: names.join(', '), count: names.length }];
    },
  });
  dash.calc('think', {
    inputs: ['actions'], title: 'Время на ходы по игрокам', description: 'Сумма минут на приказы и походы по каждому дому, по убыванию.',
    fn: (actions) => {
      const by = d3.rollups(actions, (v) => ({
        house: v[0].house,
        orders: d3.sum(v.filter((a) => a.kind === 'приказы'), (a) => +a.minutes),
        marches: d3.sum(v.filter((a) => a.kind !== 'приказы'), (a) => +a.minutes),
      }), (a) => a.house + ' (' + a.player + ')');
      return by.map(([who, s]) => ({ who, house: s.house, orders: Math.round(s.orders), marches: Math.round(s.marches), total: Math.round(s.orders + s.marches) }))
        .sort((a, b) => b.total - a.total);
    },
  });
  dash.calc('power', {
    inputs: ['armies', 'cards'], title: 'Военная мощь домов',
    description: 'Сила войск по дому: пехота 1, рыцарь 2, корабль 1, осадная башня 2; суша и море отдельно; сильнейший отряд; сила карт на руке.',
    fn: (armies, cards) => cbPower(armies, cards),
  });
  // Индекс силы: одна формула для гонки и для графиков по раундам. army — Map дом -> сила армии.
  window.cbIndex = function (houses, army) {
    const n = houses.length || 1;
    const best = (f) => Math.max(1, ...houses.map(f));
    const mA = best((h) => army.get(h.house) || 0), mL = best((h) => +h.lands + (+h.seas || 0)), mC = best((h) => +h.crowns || 0), mP = best((h) => +h.power), mM = best((h) => +h.muster || 0);
    return houses.map((h) => {
      const tracks = ((h.throne === 1 ? 1 : 0) + (h.fiefdoms ? (n + 1 - h.fiefdoms) / n : 0) + (h.court && h.court <= 4 ? (5 - h.court) / 4 : 0)) / 3;
      const s = 20 * Math.min(1, h.castles / 7) + 30 * (army.get(h.house) || 0) / mA + 10 * (+h.muster || 0) / mM + 10 * (+h.lands + (+h.seas || 0)) / mL
        + 5 * (+h.crowns || 0) / mC + 10 * Math.min(1, h.supply / 6) + 5 * h.power / mP + 10 * tracks;
      const r1 = (x) => Math.round(x * 10) / 10;
      return { house: h.house, score: Math.round(s),
        castles_pts: r1(20 * Math.min(1, h.castles / 7)), army_pts: r1(30 * (army.get(h.house) || 0) / mA), muster_pts: r1(10 * (+h.muster || 0) / mM),
        lands_pts: r1(10 * (+h.lands + (+h.seas || 0)) / mL), crowns_pts: r1(5 * (+h.crowns || 0) / mC), supply_pts: r1(10 * Math.min(1, h.supply / 6)),
        power_pts: r1(5 * h.power / mP), tracks_pts: r1(10 * tracks) };
    }).sort((a, b) => b.score - a.score);
  };
  dash.calc('strength', {
    inputs: ['houses', 'power'], title: 'Индекс силы дома',
    description: 'Итог 0–100: замки 20% (от 7), армия 30%, найм 10%, земли 10%, короны 5%, снабжение 10% (от 6), власть 5%, места на треках 10%; армия, найм, земли, короны и власть — относительно лучшего дома.',
    fn: (houses, power) => cbIndex(houses, new Map((power || []).map((p) => [p.house, +p.total]))),
  });
  dash.calc('histIndex', {
    inputs: ['history'], title: 'Индекс силы по раундам',
    description: 'Индекс силы каждого дома на последний снимок каждого раунда, по той же формуле, что в гонке за замками.',
    fn: (history) => d3.groups(history || [], (r) => +r.round).flatMap(([round, rows]) =>
      cbIndex(rows, new Map(rows.map((r) => [r.house, +r.army || 0]))).map((s) => ({ round, house: s.house, value: s.score }))),
  });

  dash.calc('winrate', {
    inputs: ['combats'], title: 'Винрейт боёв', description: 'Бои, победы и доля побед по дому, отдельно в нападении и защите.',
    fn: (combats) => cbWinrate(combats),
  });
  dash.calc('luck', {
    inputs: ['combats'], title: 'Удача в приливе битвы',
    description: 'Сумма силы карт прилива против ожидаемой (+0,92 за карту), коэффициент удачи и бои, решённые приливом.',
    fn: (combats) => cbLuck(combats),
  });
  dash.calc('tobDist', {
    inputs: ['combats'], title: 'Выпавшие карты прилива', description: 'Сколько раз выпала каждая карта прилива и сколько ожидалось.',
    fn: (combats) => cbTobDist(combats),
  });
  dash.calc('luckSummary', {
    inputs: ['combats'], title: 'Удача стола', description: 'Число боёв, бои, решённые приливом, средний прилив и общий коэффициент удачи.',
    fn: (combats) => cbLuckSummary(combats),
  });

  window.cbText = function (name, source, field) {
    dash.draw(name, (el) => {
      const d = dash.data(source);
      const rows = Array.isArray(d.data) ? d.data : [];
      if (d.status !== 'ok' || !rows.length) { el.textContent = '—'; return; }
      el.textContent = String(rows[0][field]);
    });
  };
  [['round', 'status', 'round'], ['maxRounds', 'status', 'max_rounds'], ['waiting', 'status', 'waiting'],
   ['snapshot', 'status', 'snapshot_msk'], ['lastMove', 'status', 'last_move_msk'], ['wildlings', 'status', 'wildlings'],
   ['combatsN', 'status', 'combats'], ['raidsN', 'status', 'raids'], ['supportsN', 'status', 'supports'], ['logN', 'status', 'log_entries'],
   ['topCastles', 'leaders', 'castles'], ['topNames', 'leaders', 'names'], ['slowName', 'think', 'who'], ['slowMin', 'think', 'total'],
   ['armyTop', 'power', 'house'], ['armyTopV', 'power', 'total'], ['armyTopU', 'power', 'units'],
   ['lBattles', 'luckSummary', 'battles'], ['lDecided', 'luckSummary', 'decided'], ['lDecidedShare', 'luckSummary', 'decided_share'],
   ['lAvg', 'luckSummary', 'avg'], ['lExp', 'luckSummary', 'expected'], ['lCoef', 'luckSummary', 'coef'],
  ].forEach((a) => cbText(...a));

  // Вкладки
  (function () {
    const ids = ['overview', 'armies', 'battles', 'charts'];
    const show = (id) => {
      document.querySelectorAll('.cb > .cb-panel').forEach((p) => { p.hidden = p.id !== id; });
      document.querySelectorAll('.cb-tab').forEach((t) => t.setAttribute('aria-selected', String(t.dataset.tab === id)));
    };
    document.querySelectorAll('.cb-tab').forEach((t) => t.addEventListener('click', () => { show(t.dataset.tab); dash.setLink(t.dataset.tab); }));
    const h = (location.hash || '').slice(1);
    if (ids.includes(h)) show(h);
  })();

  dash.onData(() => {
    const d = dash.data('combats');
    if (d.status !== 'ok') return;
    const has = d.data.length > 0;
    document.querySelectorAll('#battles-empty').forEach((el) => { el.hidden = has; });
    document.querySelectorAll('#battles-body').forEach((el) => { el.hidden = !has; });
  });

  // Горизонтальные полосы: rows [{label, segs:[{x0,x1,color,opacity,tip}], text}]
  window.cbBars = function (el, rows, opt) {
    opt = opt || {};
    el.replaceChildren();
    const W = Math.max(260, el.clientWidth || 600);
    const rowH = 34, top = 6, bottom = 24;
    const H = top + bottom + rows.length * rowH;
    const svg = d3.select(el).append('svg').attr('width', '100%').attr('height', H).attr('viewBox', `0 0 ${W} ${H}`)
      .attr('role', 'img').attr('aria-label', opt.aria || '');
    const probe = svg.append('g');
    let labelW = 0;
    rows.forEach((r) => { labelW = Math.max(labelW, probe.append('text').text(r.label).node().getComputedTextLength()); });
    probe.remove();
    const narrow = W < 420;
    const left = narrow ? 8 : Math.min(labelW + 14, W * 0.42);
    const right = opt.right || 64;
    const lo = Math.min(0, d3.min(rows, (r) => d3.min(r.segs, (s) => Math.min(s.x0, s.x1))) || 0, opt.min ?? 0);
    const hi = Math.max(d3.max(rows, (r) => d3.max(r.segs, (s) => Math.max(s.x0, s.x1))) || 1, opt.max ?? 0);
    const negLeft = lo < 0 ? 84 : 0;
    const x = d3.scaleLinear().domain(opt.symmetric ? [-Math.max(-lo, hi), Math.max(-lo, hi)] : [lo, hi]).nice().range([left + negLeft, W - right]);
    const y = d3.scaleBand().domain(rows.map((r, i) => i)).range([top, H - bottom]).padding(narrow ? 0.5 : 0.28);
    const ticks = Math.max(2, Math.floor((W - left - right) / 80));
    svg.append('g').selectAll('line').data(x.ticks(ticks)).join('line')
      .attr('x1', (t) => x(t)).attr('x2', (t) => x(t)).attr('y1', top).attr('y2', H - bottom)
      .style('stroke', (t) => (t === 0 ? 'var(--cds-chart-axis)' : 'var(--cds-chart-grid)'));
    svg.append('g').attr('transform', `translate(0,${H - bottom})`)
      .call(d3.axisBottom(x).ticks(ticks).tickSize(0).tickPadding(6).tickFormat(opt.tick || null))
      .call((g) => g.select('.domain').remove());
    const tip = d3.select(el).append('div').attr('class', 'cb-tip').style('opacity', 0);
    const g = svg.append('g');
    rows.forEach((r, i) => {
      const yy = y(i);
      if (narrow) g.append('text').attr('x', left).attr('y', yy - 4).text(r.label);
      else g.append('text').attr('x', left - 10).attr('y', yy + y.bandwidth() / 2).attr('dy', '0.35em').attr('text-anchor', 'end').text(r.label);
      let end = x(0), neg = false;
      r.segs.forEach((s) => {
        const a = x(Math.min(s.x0, s.x1)), b = x(Math.max(s.x0, s.x1));
        g.append('rect').attr('x', a).attr('y', yy).attr('width', Math.max(0, b - a)).attr('height', y.bandwidth()).attr('rx', 3)
          .style('fill', s.color).style('fill-opacity', s.opacity ?? 1)
          .on('pointerenter pointermove', (ev) => {
            const z = cbZ(el); const [mx, my] = d3.pointer(ev, el).map((v) => v / z);
            tip.style('opacity', 1).text(s.tip || r.text)
              .style('left', Math.max(0, Math.min(mx + 12, el.clientWidth - 220)) + 'px').style('top', (my - 34) + 'px');
          })
          .on('pointerleave', () => tip.style('opacity', 0));
        if (s.x1 < 0 || s.x0 < 0) { neg = true; end = Math.min(end, a); } else end = Math.max(end, b);
      });
      g.append('text').attr('class', 'cb-val').attr('x', neg ? end - 6 : end + 6).attr('text-anchor', neg ? 'end' : 'start')
        .attr('y', yy + y.bandwidth() / 2).attr('dy', '0.35em').text(r.text);
    });
  };


  dash.draw('race', (el) => {
    const d = dash.data('houses');
    const p = dash.data('power');
    const s = dash.data('strength');
    el.replaceChildren();
    if (d.status !== 'ok') { el.textContent = '—'; return; }
    const pow = new Map((p.status === 'ok' && Array.isArray(p.data) ? p.data : []).map((r) => [r.house, r]));
    const sc = new Map((s.status === 'ok' && Array.isArray(s.data) ? s.data : []).map((r) => [r.house, r.score]));
    const top = Math.max(0, ...sc.values());
    const rows = d.data.slice().sort((a, b) => ((sc.get(b.house) || 0) - (sc.get(a.house) || 0)) || (+b.castles - +a.castles));
    rows.forEach((r) => {
      const h = cbHouse(r.house);
      const row = d3.select(el).append('div').attr('class', 'cb-rg cb-race-row').style('--hc', h.c).style('--ht', h.t);
      const nm = row.append('div').attr('class', 'cb-rg-name');
      nm.append('b').text(r.house);
      nm.append('span').text(r.player);

      const cs = row.append('div').attr('class', 'cb-rg-cell cb-rg-castles')
        .classed('cb-warn5', +r.castles === 5).classed('cb-warn6', +r.castles >= 6)
        .attr('title', +r.castles >= 6 ? 'До победы остался 1 замок!' : +r.castles === 5 ? 'До победы осталось 2 замка' : null);
      const pips = cs.append('div').attr('class', 'cb-pips').attr('role', 'img').attr('aria-label', r.house + ': ' + r.castles + ' из ' + CB_WIN + ' замков');
      for (let i = 0; i < CB_WIN; i++) {
        const own = i < +r.castles;
        pips.append('svg').attr('class', 'cb-pip').attr('viewBox', '0 0 24 24').append('use')
          .attr('href', own ? '#cbi-castle-fill' : '#cbi-castle')
          .style('fill', own ? h.c : 'none').style('stroke', own ? h.c : 'var(--color-border-line)').style('stroke-width', 1.6);
      }
      cs.append('b').text(r.castles);
      cs.append('small').text('/' + CB_WIN);

      const cell = (cls, label, icon, value) => {
        const c = row.append('div').attr('class', 'cb-rg-cell ' + cls);
        c.append('span').attr('class', 'cb-rg-lbl').text(label);
        if (icon) cbIcon(c, icon);
        c.append('b').text(value);
        return c;
      };
      const mu = cell('cb-rg-muster', 'Найм', 'cbi-towers', r.muster ?? '—');
      if (r.muster != null) mu.attr('title', `Очки найма ${r.muster}: крепостей ${r.strongholds ?? 0} (по 2), замков ${r.muster - 2 * (r.strongholds || 0)} (по 1)`);
      const ld = cell('cb-rg-lands', 'Земли', 'cbi-land', r.lands);
      if (+r.seas) ld.attr('title', `Земли ${r.lands} + моря с кораблями ${r.seas}: в индексе считаются вместе`).append('small').text('+' + r.seas + ' м.');
      cell('cb-rg-crowns', 'Короны', 'cbi-crownline', r.crowns ?? '—');

      const sup = row.append('div').attr('class', 'cb-rg-cell cb-rg-supply').attr('title', 'Снабжение');
      sup.append('span').attr('class', 'cb-rg-lbl').text('Снабжение');
      const bar = sup.append('span').attr('class', 'cb-barrels').attr('role', 'img').attr('aria-label', 'Снабжение ' + r.supply + ' из ' + CB_SUPPLY_MAX);
      for (let i = 0; i < CB_SUPPLY_MAX; i++) {
        const own = i < +r.supply;
        bar.append('svg').attr('class', 'cb-barrel').attr('viewBox', '0 0 24 24').append('use').attr('href', own ? '#cbi-barrel-fill' : '#cbi-barrel')
          .style('fill', own ? '#c49a5c' : 'none').style('stroke', own ? '#c49a5c' : 'var(--color-border-line)').style('stroke-width', 1.6);
      }
      sup.append('b').text(r.supply);

      cell('cb-rg-power', 'Власть', 'cbi-token', r.power);
      const pw = pow.get(r.house);
      cell('cb-rg-army', 'Армия', 'cbi-fist', pw ? pw.total : '—');

      const score = sc.get(r.house);
      const parts = (s.status === 'ok' && Array.isArray(s.data) ? s.data : []).find((x) => x.house === r.house);
      const PARTS = [['castles_pts', 'Замки', '#d9b66d'], ['army_pts', 'Армия', '#cc8c7b'], ['muster_pts', 'Найм', '#87bba5'], ['lands_pts', 'Земли и моря', '#9baf76'],
        ['crowns_pts', 'Короны', '#e0995e'], ['supply_pts', 'Снабжение', '#c49a5c'], ['power_pts', 'Власть', '#afa1ca'], ['tracks_pts', 'Треки', '#86adc2']];
      const ix = row.append('div').attr('class', 'cb-rg-cell cb-rg-index cb-score')
        .attr('title', parts ? PARTS.map(([k, n]) => `${n} ${parts[k]}`).join(' + ') + ` = ${score}` : null);
      ix.append('span').attr('class', 'cb-rg-lbl').text('Индекс силы');
      const track = ix.append('div').attr('class', 'cb-score-track');
      if (parts) PARTS.forEach(([k, , c]) => track.append('div').attr('class', 'cb-score-seg').style('width', parts[k] + '%').style('background', c));
      else track.append('div').attr('class', 'cb-score-fill').style('width', (score ?? 0) + '%');
      ix.append('b').attr('class', score != null && score === top ? 'cb-score-top' : null).text(score ?? '—');
    });
  });

  window.cbTrack = function (name, field) {
    dash.draw(name, (ol) => {
      const d = dash.data('houses');
      ol.replaceChildren();
      if (d.status !== 'ok') return;
      d.data.slice().sort((a, b) => +a[field] - +b[field]).forEach((r) => {
        const h = cbHouse(r.house);
        const li = d3.select(ol).append('li');
        li.append('span').attr('class', 'cb-place').text(r[field]);
        li.append('span').attr('class', 'cb-chip' + (+r[field] === 1 ? ' cb-first' : '')).style('--hc', h.c).style('--ht', h.t).append('span').text(r.house);
        if (+r[field] === 1) cbIcon(li, 'cbi-crown', 'cb-ico cb-crown');
      });
    });
  };
  cbTrack('trackThrone', 'throne');
  cbTrack('trackFiefdoms', 'fiefdoms');
  cbTrack('trackCourt', 'court');

  window.cbTable = function (name, source, cols, opts) {
    opts = opts || {};
    dash.draw(name, (tbody) => {
      const d = dash.data(source);
      const rows = d.status === 'ok' && Array.isArray(d.data) ? d.data : [];
      d3.select(tbody).selectAll('tr').data(rows).join('tr')
        .style('--hc', (r) => cbHouse(r[opts.colorBy || 'house']).c)
        .each(function (r) {
          d3.select(this).selectAll('td').data(cols).join('td')
            .attr('class', (c) => ((opts.left || []).includes(c) ? 'cb-l' : null))
            .each(function (c) {
              const td = d3.select(this);
              td.selectAll('*').remove();
              const v = r[c];
              td.text(opts.fmt && opts.fmt[c] ? opts.fmt[c](v, r) : (v ?? ''));
              if (opts.cls && opts.cls[c]) td.attr('class', [(opts.left || []).includes(c) ? 'cb-l' : '', opts.cls[c](v, r)].join(' ').trim() || null);
            });
        });
    });
  };

  dash.draw('housesBody', (tbody) => {
    const d = dash.data('houses');
    const rows = d.status === 'ok' ? d.data : [];
    const cols = ['house', 'player', 'castles', 'lands', 'supply', 'power', 'footmen', 'knights', 'ships'];
    d3.select(tbody).selectAll('tr').data(rows, (r) => r.house).join('tr')
      .style('--hc', (r) => cbHouse(r.house).c)
      .each(function (r) {
        d3.select(this).selectAll('td').data(cols).join('td')
          .attr('class', (c) => (c === 'player' || c === 'power' ? 'cb-l' : null))
          .each(function (c) {
            const td = d3.select(this);
            td.selectAll('*').remove();
            td.text(c === 'power' ? '' : r[c]);
            if (c === 'castles') td.attr('class', +r.castles >= 6 ? 'cb-warn6' : +r.castles === 5 ? 'cb-warn5' : null);
            if (c === 'power') {
              td.append('span').text(r.power);
              const t = td.append('span').attr('class', 'cb-tokens').attr('aria-hidden', 'true');
              for (let i = 0; i < Math.min(+r.power, 20); i++) t.append('i');
            }
          });
      });
  });

  cbTable('powerBody', 'power', ['house', 'footmen', 'knights', 'ships', 'siege', 'land', 'sea', 'total', 'best_label', 'hand'], { left: ['best_label'] });
  cbTable('luckBody', 'luck', ['house', 'draws', 'sum', 'avg', 'luck', 'coef', 'drawn', 'saved', 'robbed'], {
    left: ['drawn'],
    fmt: { luck: (v) => (v > 0 ? '+' : '') + v, coef: (v) => v + '×' },
    cls: { luck: (v) => (v > 0 ? 'cb-luck-good' : v < 0 ? 'cb-luck-bad' : '') },
  });
  cbTable('battlesBody', 'combats', ['round', 'region', 'attacker', 'attacker_card', 'attacker_tob', 'attacker_total', 'defender', 'defender_card', 'defender_tob', 'defender_total', 'winner'], {
    left: ['region', 'attacker', 'attacker_card', 'defender', 'defender_card', 'winner'], colorBy: 'winner',
  });

  dash.draw('powerChart', (el) => {
    const d = dash.data('power');
    if (d.status !== 'ok' || !Array.isArray(d.data) || !d.data.length) { el.replaceChildren(); el.textContent = d.status === 'error' ? 'Не удалось загрузить' : '—'; return; }
    cbBars(el, d.data.map((r) => {
      const c = cbHouse(r.house).c;
      const parts = [['Пехота', +r.footmen * 1, 1], ['Рыцари', +r.knights * 2, 0.72], ['Корабли', +r.ships * 1, 0.45], ['Осадные башни', +r.siege * 2, 0.25]];
      let acc = 0;
      return {
        label: r.house, text: r.total + ' силы',
        segs: parts.filter((p) => p[1] > 0).map(([k, v, o]) => { const s = { x0: acc, x1: acc + v, color: c, opacity: o, tip: `${r.house} — ${k}: ${v} силы` }; acc += v; return s; }),
      };
    }), { aria: 'Военная мощь домов по родам войск' });
  });

  dash.draw('winChart', (el) => {
    const d = dash.data('winrate');
    if (d.status !== 'ok' || !Array.isArray(d.data) || !d.data.length) { el.replaceChildren(); el.textContent = '—'; return; }
    cbBars(el, d.data.map((r) => ({
      label: r.house, text: `${r.rate}% · ${r.wins}/${r.battles}`,
      segs: [{ x0: 0, x1: r.rate, color: cbHouse(r.house).c,
        tip: `${r.house}: нападение ${r.att_wins}/${r.att}, защита ${r.def_wins}/${r.def}` }],
    })), { max: 100, right: 78, tick: (t) => t + '%', aria: 'Доля выигранных боёв по домам' });
  });

  dash.draw('luckChart', (el) => {
    const d = dash.data('luck');
    if (d.status !== 'ok' || !Array.isArray(d.data) || !d.data.length) { el.replaceChildren(); el.textContent = '—'; return; }
    cbBars(el, d.data.map((r) => ({
      label: r.house, text: `${r.luck > 0 ? '+' : ''}${r.luck} (${r.coef}×)`,
      segs: [{ x0: 0, x1: r.luck, color: cbHouse(r.house).c, tip: `${r.house}: вытянул ${r.draws} карт — ${r.drawn}` }],
    })), { symmetric: true, right: 84, aria: 'Удача в приливе битвы по домам' });
  });

  dash.draw('deck', (el) => {
    const d = dash.data('tobDist');
    el.replaceChildren();
    if (d.status !== 'ok' || !Array.isArray(d.data)) { el.textContent = '—'; return; }
    const tones = { zero: '#8a9ea3', sword: '#cc8c7b', fortification: '#86adc2', two: '#87bba5', three: '#d9b66d', skull: '#73898f' };
    d.data.forEach((r) => {
      const c = d3.select(el).append('div').attr('class', 'cb-tobcard').style('--tc', tones[r.id] || '#888');
      c.append('b').text(r.card);
      c.append('span').text('выпало ' + r.drawn);
      c.append('span').text('ждали ' + r.expected);
    });
  });

  dash.draw('cardsList', (el) => {
    const d = dash.data('cards');
    el.replaceChildren();
    if (d.status !== 'ok') { el.textContent = '—'; return; }
    d3.groups(d.data, (c) => c.house).forEach(([house, cards]) => {
      const h = cbHouse(house);
      const row = d3.select(el).append('div').attr('class', 'cb-cards-row').style('--hc', h.c).style('--ht', h.t);
      row.append('b').text(house);
      const list = row.append('div').attr('class', 'cb-card-list');
      cards.slice().sort((a, b) => +a.strength - +b.strength).forEach((c) => {
        const chip = list.append('span').attr('class', 'cb-hc' + (c.state === 'на руке' ? '' : ' cb-used'));
        chip.append('i').text(c.strength);
        chip.append('span').text(c.card);
      });
      const hand = d3.sum(cards.filter((c) => c.state === 'на руке'), (c) => +c.strength);
      const sum = row.append('div').attr('class', 'cb-sum');
      sum.append('span').text(hand);
      sum.append('small').text(' на руке');
    });
  });

  dash.draw('chronList', (ul) => {
    const d = dash.data('chronicle');
    const rows = d.status === 'ok' ? d.data.slice().reverse() : [];
    const li = d3.select(ul).selectAll('li').data(rows).join('li').style('--hc', (r) => (r.house ? cbHouse(r.house).c : null));
    li.selectAll('time').data((r) => [r]).join('time').text((r) => r.time);
    li.selectAll('span').data((r) => [r]).join('span').text((r) => r.event);
  });

  dash.draw('speedChart', (el) => {
    const d = dash.data('think');
    if (d.status !== 'ok' || !d.data || !d.data.length) { el.replaceChildren(); el.textContent = d.status === 'error' ? 'Не удалось загрузить' : '—'; return; }
    cbBars(el, d.data.map((r) => {
      const c = cbHouse(r.house).c;
      return {
        label: r.who, text: r.total + ' мин',
        segs: [{ x0: 0, x1: r.orders, color: c, opacity: 1, tip: `${r.who} — приказы: ${r.orders} мин` },
               { x0: r.orders, x1: r.total, color: c, opacity: 0.4, tip: `${r.who} — походы: ${r.marches} мин` }],
      };
    }), { aria: 'Минуты на приказы и походы по игрокам' });
  });

  // Графики по раундам с фильтром домов
  window.CB_HIST = { sel: null, data: {} };
  try { const s = JSON.parse(localStorage.getItem('cb-hist-sel') || 'null'); if (Array.isArray(s)) CB_HIST.sel = new Set(s); } catch (e) { /* нет хранилища */ }
  window.cbLine = function (el, rows, aria) {
    el.replaceChildren();
    const sel = CB_HIST.sel;
    const data = rows.filter((r) => !sel || sel.has(r.house));
    if (!rows.length) { el.textContent = 'Пока нет данных по раундам'; return; }
    if (!data.length) { el.textContent = 'Выберите хотя бы один дом'; return; }
    const W = Math.max(320, Math.round(el.clientWidth || 1000)), H = Math.round(Math.min(380, Math.max(240, W * 0.3))), m = { t: 14, r: 150, b: 30, l: 34 };
    const rounds = [...new Set(rows.map((r) => +r.round))].sort((a, b) => a - b);
    const x = d3.scalePoint().domain(rounds).range([m.l + 10, W - m.r]).padding(rounds.length < 2 ? 0.5 : 0);
    const y = d3.scaleLinear().domain([0, Math.max(1, d3.max(data, (r) => +r.value)) * 1.08]).nice().range([H - m.b, m.t]);
    const svg = d3.select(el).append('svg').attr('width', '100%').attr('viewBox', `0 0 ${W} ${H}`).attr('role', 'img').attr('aria-label', aria);
    const ticks = y.ticks(5);
    svg.append('g').selectAll('line').data(ticks).join('line').attr('x1', m.l).attr('x2', W - m.r + 6).attr('y1', y).attr('y2', y)
      .attr('stroke', 'var(--cds-chart-grid, var(--color-border-line))');
    svg.append('g').selectAll('text').data(ticks).join('text').attr('x', m.l - 6).attr('y', y).attr('dy', '0.32em').attr('text-anchor', 'end').text((v) => v);
    svg.append('g').selectAll('text').data(rounds).join('text').attr('x', x).attr('y', H - m.b + 18).attr('text-anchor', 'middle').text((r) => 'Раунд ' + r);
    const tip = d3.select(el).append('div').attr('class', 'cb-tip').style('opacity', 0);
    const series = d3.groups(data, (r) => r.house).map(([house, pts]) => [house, pts.slice().sort((a, b) => a.round - b.round)]);
    const labels = series.map(([house, pts]) => ({ house, last: pts[pts.length - 1], y: y(+pts[pts.length - 1].value) })).sort((a, b) => a.y - b.y);
    for (let i = 1; i < labels.length; i++) if (labels[i].y - labels[i - 1].y < 14) labels[i].y = labels[i - 1].y + 14;
    series.forEach(([house, pts]) => {
      const c = cbHouse(house).c;
      svg.append('path').datum(pts).attr('fill', 'none').attr('stroke', c).attr('stroke-width', 2.5).attr('stroke-linejoin', 'round')
        .attr('d', d3.line().x((p) => x(+p.round)).y((p) => y(+p.value)));
      svg.append('g').selectAll('circle').data(pts).join('circle').attr('cx', (p) => x(+p.round)).attr('cy', (p) => y(+p.value)).attr('r', 5)
        .attr('fill', c).attr('stroke', 'var(--color-panel)').attr('stroke-width', 1.5).style('cursor', 'default')
        .on('mouseenter', (ev, p) => tip.style('opacity', 1).text(`${house}, раунд ${p.round}: ${p.value}`))
        .on('mousemove', (ev) => { const z = cbZ(el); const [mx, my] = d3.pointer(ev, el).map((v) => v / z); tip.style('left', (mx + 12) + 'px').style('top', (my - 12) + 'px'); })
        .on('mouseleave', () => tip.style('opacity', 0));
    });
    labels.forEach((l) => svg.append('text').attr('class', 'cb-val').attr('x', x(+l.last.round) + 10).attr('y', l.y).attr('dy', '0.32em')
      .style('fill', cbHouse(l.house).c).style('font-weight', 600).text(`${l.house} ${l.last.value}`));
  };
  window.cbHistRepaint = () => document.querySelectorAll('[data-hist-name]').forEach((el) => cbLine(el, CB_HIST.data[el.dataset.histName] || [], el.dataset.histAria));
  window.cbHistChips = function (rows) {
    const box = document.getElementById('hist-filter');
    if (!box) return;
    const order = Object.keys(CB_HOUSES);
    const houses = [...new Set(rows.map((r) => r.house))].sort((a, b) => order.indexOf(a) - order.indexOf(b));
    const on = (h) => !CB_HIST.sel || CB_HIST.sel.has(h);
    const save = () => { try { localStorage.setItem('cb-hist-sel', JSON.stringify(CB_HIST.sel ? [...CB_HIST.sel] : null)); } catch (e) { /* нет хранилища */ } };
    const root = d3.select(box);
    root.selectAll('*').remove();
    root.append('button').attr('type', 'button').attr('class', 'cb-fchip cb-fall').attr('aria-pressed', String(houses.every(on))).text('Все дома')
      .on('click', () => { CB_HIST.sel = houses.every(on) ? new Set() : null; save(); cbHistChips(rows); cbHistRepaint(); });
    houses.forEach((h) => {
      const b = root.append('button').attr('type', 'button').attr('class', 'cb-fchip').attr('aria-pressed', String(on(h)))
        .style('--hc', cbHouse(h).c).on('click', () => {
          if (!CB_HIST.sel) CB_HIST.sel = new Set(houses);
          if (CB_HIST.sel.has(h)) CB_HIST.sel.delete(h); else CB_HIST.sel.add(h);
          if (houses.every((x) => CB_HIST.sel.has(x))) CB_HIST.sel = null;
          save(); cbHistChips(rows); cbHistRepaint();
        });
      b.append('i');
      b.append('span').text(h);
    });
  };
  [['histIndexChart', 'histIndex', null, 'Индекс силы домов по раундам'],
   ['histPowerChart', 'history', 'power', 'Жетоны власти домов по раундам'],
   ['histArmyChart', 'history', 'army', 'Сила армии домов по раундам']].forEach(([name, src, field, aria]) => {
    dash.draw(name, (el) => {
      const d = dash.data(src);
      const raw = d.status === 'ok' && Array.isArray(d.data) ? d.data : [];
      CB_HIST.data[name] = field ? raw.map((r) => ({ round: +r.round, house: r.house, value: +r[field] || 0 })) : raw;
      el.dataset.histName = name;
      el.dataset.histAria = aria;
      if (src === 'history') cbHistChips(raw);
      cbLine(el, CB_HIST.data[name], aria);
    });
  });
