<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Cum back 2 — сводка партии</title>
<meta name="robots" content="noindex">
<style>
  :root {
    --font-anthropic-sans: system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif;
    --font-anthropic-serif: Georgia, "Times New Roman", serif;
    --cds-font-size-caption: 12.5px; --cds-font-size-body: 14.5px; --cds-font-size-heading: 18px; --cds-font-size-title: 28px;
    --cds-font-weight-medium: 600;
    --cds-gap-xs: 4px; --cds-gap-sm: 8px; --cds-gap-md: 12px; --cds-gap-lg: 18px; --cds-gap-xl: 28px;
    --cds-pad-xs: 4px; --cds-pad-sm: 8px; --cds-pad-md: 12px; --cds-pad-lg: 16px; --cds-pad-xl: 24px;
    --cds-radius: 10px;
    --color-bg: #f6f4ef; --color-panel: #ffffff; --color-fg: #1f1d1a; --color-fg-muted: #6b665e; --color-border-line: #e3ded4;
    --color-ok: #2f9e57; --color-bad: #c0392b;
    --cds-text-secondary: #6b665e; --cds-surface-popover: #ffffff; --cds-border: #e3ded4; --cds-shadow-popover: 0 4px 16px rgba(0,0,0,.12);
    --cds-chart-grid: #ece8e0; --cds-chart-axis: #cfc9bd;
    color-scheme: light dark;
  }
  @media (prefers-color-scheme: dark) {
    :root { --color-bg: #1b1a18; --color-panel: #252320; --color-fg: #ece8e1; --color-fg-muted: #a39d93; --color-border-line: #3a3732;
            --color-ok: #4cc27a; --color-bad: #e2604f; --cds-text-secondary: #a39d93; --cds-surface-popover: #2c2a26; --cds-border: #3a3732;
            --cds-chart-grid: #34312c; --cds-chart-axis: #4a463f; }
  }
  html, body { margin: 0; background: #10191c; color: #edf0e7; min-height: 100%; }
  body { padding: 0; }
  .cb-page { min-height: 100vh; }
  [hidden] { display: none !important; }
</style>
<script src="d3.min.js"></script>
<script>window.CB_V = Math.floor(Date.now() / 60000); /* свежие файлы, а не копия из кэша браузера */
document.write('<script src="data.js?v=' + CB_V + '"><\/script><script src="shim.js?v=' + CB_V + '"><\/script>');</script>
</head>
<body>
<div class="cb-page">
<style>
    .cb-shell { container-type: inline-size; }
  .cb { --cb-bg: #10191c; --cb-side: #0b1316; --cb-surface: #152126; --cb-surface2: #1a292e; --cb-line: #2b3c40; --cb-text: #edf0e7; --cb-muted: #a3b4b6; --cb-faint: #73898f;
        --cb-gold: #d9b66d; --cb-ice: #86adc2; --cb-blood: #cc8c7b; --cb-ember: #e0995e; --cb-moss: #87bba5; --cb-violet: #afa1ca; --cb-olive: #9baf76;
        --cb-serif: Georgia, "Times New Roman", var(--font-anthropic-serif), serif;
        --color-fg: var(--cb-text); --color-fg-muted: var(--cb-muted); --color-bg: var(--cb-bg); --color-panel: var(--cb-surface); --color-border-line: var(--cb-line);
        --color-ok: var(--cb-moss); --color-bad: var(--cb-blood); --color-warn: var(--cb-gold);
        --cds-text-secondary: var(--cb-muted); --cds-chart-grid: #1f2f34; --cds-chart-axis: var(--cb-line); --cds-chart-reference: var(--cb-faint);
        --cds-surface-popover: var(--cb-surface2); --cds-border: var(--cb-line); --cds-shadow-popover: 0 8px 24px rgba(0,0,0,.45);
        color-scheme: dark; background: var(--cb-bg); color: var(--cb-text); font-family: var(--font-anthropic-sans);
        display: grid; grid-template-columns: minmax(0, 1fr); grid-template-areas: "head" "side" "main" "notes"; min-height: 100%; }
  .cb ::selection { background: color-mix(in srgb, var(--cb-gold) 40%, transparent); }
  .cb-ico { width: 1em; height: 1em; flex: none; fill: none; stroke: currentColor; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
  .cb > header { grid-area: head; }
  .cb > .cb-side { grid-area: side; }
  .cb > .cb-panel { grid-area: main; }
  .cb > .cb-details { grid-area: notes; }
  .cb > header, .cb > .cb-panel, .cb > .cb-details { padding-inline: clamp(16px, 4cqi, 48px); }
  .cb-panel[hidden] { display: none !important; }
  .cb-panel .cb-panel { padding: 0; }

  /* side: brand + chapters */
  .cb-side { padding: var(--cds-pad-sm) clamp(16px, 4cqi, 48px) 0; }
  .cb-brand, .cb-side-cap, .cb-side-foot { display: none; }
  .cb-tabs { display: flex; gap: 2px; overflow-x: auto; border-bottom: 1px solid var(--cb-line); scrollbar-width: none; }
  .cb-tab { display: inline-flex; align-items: center; gap: 8px; flex: none; border: 0; background: none; color: var(--cb-muted); font: inherit; font-size: 13px;
            padding: 10px 12px; cursor: pointer; border-bottom: 2px solid transparent; margin-bottom: -1px; border-radius: 3px 3px 0 0; }
  .cb-tab .cb-num { font-size: 11px; color: var(--cb-faint); font-variant-numeric: tabular-nums; letter-spacing: .04em; }
  .cb-tab .cb-ico { width: 16px; height: 16px; color: var(--cb-faint); }
  .cb-tab:hover { color: var(--cb-text); }
  .cb-tab[aria-selected=true] { color: var(--cb-gold); border-bottom-color: var(--cb-gold); background: color-mix(in srgb, var(--cb-gold) 9%, transparent); }
  .cb-tab[aria-selected=true] .cb-num, .cb-tab[aria-selected=true] .cb-ico { color: var(--cb-gold); }
  .cb-tab:focus-visible { outline: 2px solid var(--cb-gold); outline-offset: -2px; }

  @container (min-width: 980px) {
    .cb { grid-template-columns: 220px minmax(0, 1fr); grid-template-areas: "side head" "side main" "side notes"; }
    .cb-side { background: var(--cb-side); border-right: 1px solid var(--cb-line); padding: 0; }
    .cb-side-in { position: sticky; top: 0; padding: 22px 14px 18px; display: flex; flex-direction: column; gap: 14px; }
    .cb-brand { display: flex; align-items: center; gap: 10px; padding: 0 6px 14px; border-bottom: 1px solid var(--cb-line); }
    .cb-mono { display: grid; place-items: center; width: 38px; height: 38px; border: 1px solid var(--cb-gold); color: var(--cb-gold); font-family: var(--cb-serif); font-size: 22px; flex: none;
               background: color-mix(in srgb, var(--cb-gold) 8%, transparent); }
    .cb-brand b { display: block; font-family: var(--cb-serif); font-weight: 400; font-size: 17px; line-height: 1.15; }
    .cb-brand small { display: block; color: var(--cb-gold); font-size: 10px; letter-spacing: .18em; text-transform: uppercase; margin-top: 3px; }
    .cb-side-cap { display: block; margin: 4px 6px -6px; color: var(--cb-faint); font-size: 10px; letter-spacing: .18em; text-transform: uppercase; }
    .cb-tabs { flex-direction: column; border: 0; overflow: visible; gap: 2px; }
    .cb-tab { padding: 9px 10px; border: 0; border-left: 2px solid transparent; margin: 0; border-radius: 0 3px 3px 0; }
    .cb-tab[aria-selected=true] { border-left-color: var(--cb-gold); background: color-mix(in srgb, var(--cb-gold) 12%, transparent); }
    .cb-side-foot { display: block; margin: 8px 6px 0; padding-top: 14px; border-top: 1px solid var(--cb-line); color: var(--cb-faint); font-size: 11px; line-height: 1.5; }
    .cb-side-foot i { display: inline-block; width: 6px; height: 6px; border-radius: 50%; background: var(--cb-moss); margin-right: 6px; vertical-align: 1px; box-shadow: 0 0 0 3px color-mix(in srgb, var(--cb-moss) 20%, transparent); }
  }

  /* header */
  .cb-hero { position: relative; padding-block: clamp(20px, 3cqi, 34px) 0; }
  .cb-kicker { margin: 0 0 6px; color: var(--cb-gold); font-size: 11px; letter-spacing: .18em; text-transform: uppercase; }
  .cb-title { font-family: var(--cb-serif); font-weight: 400; font-size: clamp(28px, 3.4cqi, 40px); line-height: 1.1; margin: 0 0 12px; letter-spacing: -.01em; }
  .cb-lede { font-size: 15px; margin: 0 0 8px; line-height: 1.65; max-width: 75ch; }
  .cb-lede b { font-weight: 600; color: var(--cb-text); }
  .cb-lede b[data-source] { color: var(--cb-gold); font-family: var(--cb-serif); font-weight: 400; font-size: 1.08em; }
  .cb-pill-now { display: inline-block; padding: 0 9px; border-radius: 3px; border: 1px solid color-mix(in srgb, var(--cb-gold) 60%, transparent);
                 background: color-mix(in srgb, var(--cb-gold) 12%, transparent); font-family: var(--font-anthropic-sans) !important; font-size: 13px !important; }
  .cb-muted { color: var(--cb-muted); font-size: 12px; margin: 0; }
  .cb-banner { display: flex; height: 3px; margin-top: 18px; opacity: .9; }
  .cb-banner i { flex: 1; }

  /* panel head */
  .cb-panel { display: flex; flex-direction: column; gap: 36px; padding-block: 26px 32px; }
  .cb-phead { display: flex; align-items: baseline; justify-content: space-between; gap: 12px; flex-wrap: wrap; border-bottom: 1px solid var(--cb-line); padding-bottom: 12px; margin-bottom: -10px; }
  .cb-phead .cb-kicker { margin-bottom: 4px; }
  .cb-ptitle { font-family: var(--cb-serif); font-weight: 400; font-size: 26px; margin: 0; }
  .cb-phead small { color: var(--cb-faint); font-size: 11px; letter-spacing: .08em; }

  /* section heads */
  .cb-h { display: flex; align-items: center; gap: 10px; font-family: var(--cb-serif); font-weight: 400; font-size: 20px; margin: 0 0 6px; }
  .cb-h::after { content: ""; flex: 1; height: 1px; background: linear-gradient(90deg, color-mix(in srgb, var(--cb-gold) 45%, transparent), transparent 70%); margin-left: 6px; }
  .cb-h .cb-ico { box-sizing: content-box; width: 15px; height: 15px; padding: 5px; color: var(--cb-gold); border: 1px solid color-mix(in srgb, var(--cb-gold) 45%, transparent);
                  background: color-mix(in srgb, var(--cb-gold) 8%, transparent); border-radius: 3px; }
  .cb-sub { color: var(--cb-muted); font-size: 13px; margin: 0 0 14px; line-height: 1.55; max-width: 95ch; }

  /* KPI row */
  .cb-tiles { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); border-top: 1px solid var(--cb-line); border-bottom: 1px solid var(--cb-line); clip-path: inset(0 0 0 1px); }
  .cb-tile { position: relative; padding: 16px 18px 16px 18px; border-left: 1px solid var(--cb-line); }
  .cb-tile-label { display: flex; align-items: center; gap: 7px; color: var(--cb-muted); font-size: 11px; letter-spacing: .06em; text-transform: uppercase; }
  .cb-tile-label .cb-ico { color: var(--acc); width: 14px; height: 14px; }
  .cb-tile-value { font-family: var(--cb-serif); font-weight: 400; font-size: 36px; line-height: 1.1; color: var(--acc, var(--cb-text)); font-variant-numeric: tabular-nums; margin-top: 8px; }
  .cb-tile-value small { font-family: var(--font-anthropic-sans); }
  .cb-tile::after { content: ""; position: absolute; left: 18px; bottom: -1px; width: 28px; height: 2px; background: var(--acc); }

  /* castle race */
  .cb-race { display: flex; flex-direction: column; gap: 4px; }
  .cb-rg { display: grid; grid-template-columns: minmax(150px, 1.3fr) minmax(170px, 1.3fr) minmax(58px, .5fr) minmax(58px, .5fr) minmax(58px, .5fr) minmax(110px, .9fr) minmax(58px, .5fr) minmax(58px, .5fr) minmax(150px, 1.4fr);
           align-items: center; column-gap: 14px; }
  .cb-race-head { color: var(--cb-faint); font-size: 10px; letter-spacing: .08em; text-transform: uppercase; padding: 0 14px 4px 17px; }
  .cb-race-head span { display: inline-flex; align-items: center; gap: 4px; justify-content: center; }
  .cb-race-head span:first-child { justify-content: flex-start; }
  .cb-race-head .cb-ico { width: 13px; height: 13px; }
  .cb-race-row { padding: 9px 14px; background: var(--cb-surface); border: 1px solid var(--cb-line); border-left: 3px solid var(--hc); border-radius: 3px; transition: background .15s; }
  .cb-race-row:hover { background: var(--cb-surface2); }
  .cb-race-row:first-child { border-color: color-mix(in srgb, var(--cb-gold) 45%, var(--cb-line)); border-left-color: var(--hc);
                             background: linear-gradient(90deg, color-mix(in srgb, var(--cb-gold) 7%, var(--cb-surface)), var(--cb-surface) 40%); }
  .cb-rg-name { display: flex; flex-direction: column; min-width: 0; line-height: 1.25; }
  .cb-rg-name b { font-family: var(--cb-serif); font-weight: 400; font-size: 16px; }
  .cb-rg-name span { color: var(--cb-muted); font-size: 12px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .cb-rg-cell { display: flex; align-items: center; justify-content: center; gap: 5px; font-variant-numeric: tabular-nums; min-width: 0; }
  .cb-rg-cell b { font-family: var(--cb-serif); font-weight: 400; font-size: 19px; line-height: 1; }
  .cb-rg-cell small { color: var(--cb-muted); font-size: 11px; }
  .cb-rg-cell .cb-ico { width: 15px; height: 15px; color: var(--hc); }
  .cb-rg-lbl { display: none; color: var(--cb-faint); font-size: 11px; }
  .cb-rg-castles.cb-warn5, .cb-rg-castles.cb-warn6 { border-radius: 3px; padding: 4px 8px; justify-self: center; }
  .cb-rg-castles.cb-warn5 { background: color-mix(in srgb, var(--cb-gold) 16%, transparent); box-shadow: inset 0 0 0 1px var(--cb-gold); }
  .cb-rg-castles.cb-warn6 { background: color-mix(in srgb, #e0604d 20%, transparent); box-shadow: inset 0 0 0 1px #e0604d; animation: cb-pulse 1.6s ease-in-out infinite; }
  .cb-rg-castles.cb-warn5 > b { color: var(--cb-gold); }
  .cb-rg-castles.cb-warn6 > b { color: #f08a78; }
  .cb-table td.cb-warn5 { background: color-mix(in srgb, var(--cb-gold) 16%, transparent); color: var(--cb-gold); font-weight: 700; }
  .cb-table td.cb-warn6 { background: color-mix(in srgb, #e0604d 20%, transparent); color: #f08a78; font-weight: 700; }
  @keyframes cb-pulse { 50% { box-shadow: inset 0 0 0 1px #e0604d, 0 0 0 4px color-mix(in srgb, #e0604d 25%, transparent); } }
  @media (prefers-reduced-motion: reduce) { .cb-rg-castles.cb-warn6 { animation: none; } }
  .cb-pips { display: flex; gap: 2px; }
  .cb-pip { width: 16px; height: 16px; }
  .cb-barrels { display: inline-flex; gap: 0; }
  .cb-barrel { width: 12px; height: 14px; }
  .cb-score { display: flex; align-items: center; gap: 10px; }
  .cb-score-track { flex: 1; height: 8px; border-radius: 1px; background: #1f2f34; overflow: hidden; display: flex; gap: 1px; }
  .cb-score-fill { height: 100%; background: var(--hc); }
  .cb-score-seg { height: 100%; flex: none; }
  .cb-score b { flex: none; width: 3.4ch; padding: 3px 0; border-radius: 3px; text-align: center; font-family: var(--cb-serif); font-weight: 400; font-size: 18px; font-variant-numeric: tabular-nums; }
  .cb-score b.cb-score-top { background: var(--cb-gold); color: #10191c; box-shadow: 0 0 0 3px color-mix(in srgb, var(--cb-gold) 22%, transparent); }
  .cb-formula { margin-top: 14px; padding: 16px; border: 1px solid var(--cb-line); border-radius: 3px; background: var(--cb-surface); }
  .cb-formula-head { display: flex; align-items: baseline; flex-wrap: wrap; gap: 4px 10px; margin-bottom: 10px; }
  .cb-formula-head b { font-family: var(--cb-serif); font-weight: 400; font-size: 16px; }
  .cb-formula-head span { color: var(--cb-muted); font-size: 12px; }
  .cb-formula-bar { display: flex; gap: 2px; }
  .cb-formula-bar > span { display: flex; flex-direction: column; align-items: center; min-width: 0; padding: 7px 4px; border-top: 3px solid var(--fc);
                            background: color-mix(in srgb, var(--fc) 10%, var(--cb-surface2)); font-size: 12px; text-align: center; white-space: nowrap; }
  .cb-formula-bar b { font-family: var(--cb-serif); font-weight: 400; font-size: 19px; line-height: 1.1; color: var(--fc); }
  .cb-formula-bar small { color: var(--cb-muted); font-size: 10px; }
  .cb-formula .cb-sub { margin: 10px 0 0; }
  @media (max-width: 760px) { .cb-formula-bar { flex-wrap: wrap; } .cb-formula-bar > span { flex: 1 1 28% !important; } }
  @container (max-width: 860px) {
    .cb-rg { grid-template-columns: repeat(3, minmax(0, 1fr)); row-gap: 8px; }
    .cb-race-head { display: none; }
    .cb-rg-name, .cb-rg-castles, .cb-rg-index { grid-column: 1 / -1; }
    .cb-rg-cell { justify-content: flex-start; }
    .cb-rg-lbl { display: inline; }
  }

  /* tracks */
  .cb-tracks { display: grid; grid-template-columns: repeat(auto-fit, minmax(210px, 1fr)); gap: 12px; }
  .cb-track { background: var(--cb-surface); border: 1px solid var(--cb-line); border-top: 2px solid var(--tc); border-radius: 3px; overflow: hidden; }
  .cb-track-head { display: flex; align-items: center; gap: 10px; padding: 12px 14px; border-bottom: 1px solid var(--cb-line); }
  .cb-track-head .cb-badge { display: grid; place-items: center; width: 32px; height: 32px; border-radius: 3px; border: 1px solid var(--tc); background: color-mix(in srgb, var(--tc) 14%, transparent); color: var(--tc); }
  .cb-track-head .cb-badge .cb-ico { width: 18px; height: 18px; }
  .cb-track-head b { font-family: var(--cb-serif); font-weight: 400; font-size: 16px; }
  .cb-track-head span { display: block; color: var(--cb-muted); font-size: 11px; }
  .cb-track ol { list-style: none; margin: 0; padding: 10px 12px; display: flex; flex-direction: column; gap: 6px; }
  .cb-track li { display: flex; align-items: center; gap: 10px; }
  .cb-place { width: 20px; text-align: center; font-variant-numeric: tabular-nums; color: var(--cb-faint); font-family: var(--cb-serif); font-size: 14px; }
  .cb-chip { display: inline-flex; align-items: center; gap: 6px; padding: 3px 10px; border-radius: 3px; background: color-mix(in srgb, var(--hc) 85%, transparent); color: var(--ht); font-size: 12px; font-weight: 600; }
  .cb-chip.cb-first { box-shadow: 0 0 0 2px var(--cb-surface), 0 0 0 3px var(--cb-gold); }
  .cb-crown { width: 16px; height: 16px; color: var(--cb-gold); }

  /* table */
  .cb-wrap { overflow-x: auto; border: 1px solid var(--cb-line); border-radius: 3px; background: var(--cb-surface); }
  .cb-table { width: 100%; border-collapse: separate; border-spacing: 0; font-size: 13px; font-variant-numeric: tabular-nums; }
  .cb-table th { text-align: right; font-weight: 500; color: var(--cb-faint); font-size: 10px; letter-spacing: .08em; text-transform: uppercase; padding: 10px 12px; border-bottom: 1px solid var(--cb-line); white-space: nowrap; background: var(--cb-surface2); }
  .cb-table th .cb-ico { width: 13px; height: 13px; vertical-align: -2px; margin-right: 4px; }
  .cb-table td { text-align: right; padding: 9px 12px; border-bottom: 1px solid color-mix(in srgb, var(--cb-line) 70%, transparent); white-space: nowrap; }
  .cb-table tbody tr:last-child td { border-bottom: 0; }
  .cb-table th:first-child, .cb-table td:first-child, .cb-table .cb-l { text-align: left; }
  .cb-table tbody tr:hover td { background: color-mix(in srgb, var(--hc, var(--cb-gold)) 8%, transparent); }
  .cb-table td:first-child { border-left: 3px solid var(--hc, transparent); font-family: var(--cb-serif); font-size: 14px; }
  .cb-tokens { display: inline-flex; gap: 2px; margin-left: 6px; vertical-align: middle; }
  .cb-tokens i { width: 6px; height: 6px; border-radius: 50%; background: var(--hc); }

  /* chart */
  .cb-chart { position: relative; min-height: 220px; }
  .cb-chart svg text { fill: var(--cb-muted); font-size: 11px; }
  .cb-chart svg .cb-val { fill: var(--cb-text); font-variant-numeric: tabular-nums; }
  .cb-tip { position: absolute; pointer-events: none; background: var(--cb-surface2); border: 1px solid color-mix(in srgb, var(--cb-gold) 40%, var(--cb-line)); box-shadow: var(--cds-shadow-popover); border-radius: 3px; padding: 5px 9px; font-size: 12px; white-space: nowrap; color: var(--cb-text); }
  .cb-legend { display: flex; flex-wrap: wrap; gap: 14px; font-size: 11px; color: var(--cb-muted); margin-bottom: 10px; }
  .cb-legend span { display: inline-flex; align-items: center; gap: 6px; }
  .cb-legend i { width: 14px; height: 8px; border-radius: 1px; background: var(--cb-gold); }
  .cb-legend i.cb-light { opacity: .4; }

  /* chronicle */
  .cb-chron { list-style: none; margin: 0; padding: 0 0 0 10px; font-size: 13px; border-left: 1px solid var(--cb-line); max-height: 560px; overflow-y: auto; }
  .cb-chron li { position: relative; display: grid; grid-template-columns: 86px 1fr; gap: 10px; padding: 7px 0 7px 10px; border-bottom: 1px solid color-mix(in srgb, var(--cb-line) 50%, transparent); }
  .cb-chron li::before { content: ""; position: absolute; left: -15px; top: 13px; width: 8px; height: 8px; border-radius: 1px; transform: rotate(45deg); background: var(--hc, var(--cb-faint)); box-shadow: 0 0 0 3px var(--cb-bg); }
  .cb-chron time { color: var(--cb-gold); font-size: 11px; font-variant-numeric: tabular-nums; padding-top: 2px; letter-spacing: .02em; }

  .cb-empty { display: flex; gap: 14px; align-items: center; background: var(--cb-surface); border: 1px dashed color-mix(in srgb, var(--cb-gold) 40%, var(--cb-line)); border-radius: 3px; padding: 18px; color: var(--cb-muted); margin: 0; }
  .cb-empty .cb-ico { width: 30px; height: 30px; color: var(--cb-gold); }
  .cb-details { padding-block: 0 28px; }
  .cb-details summary { cursor: pointer; color: var(--cb-muted); font-size: 12px; padding: 12px 0; border-top: 1px solid var(--cb-line); }
  .cb-details summary:hover { color: var(--cb-gold); }
  .cb-details ul { font-size: 12px; color: var(--cb-muted); padding-left: 1.2em; line-height: 1.6; max-width: 110ch; }

  /* cards */
  .cb-cards { display: flex; flex-direction: column; gap: 6px; }
  .cb-cards-row { display: grid; grid-template-columns: minmax(110px, 160px) 1fr auto; gap: 14px; align-items: center; padding: 10px 14px; background: var(--cb-surface); border: 1px solid var(--cb-line); border-left: 3px solid var(--hc); border-radius: 3px; }
  .cb-cards-row > :first-child { font-family: var(--cb-serif); font-size: 15px; }
  .cb-card-list { display: flex; flex-wrap: wrap; gap: 6px; }
  .cb-hc { display: inline-flex; align-items: center; gap: 6px; font-size: 12px; padding: 2px 8px 2px 2px; border-radius: 3px; border: 1px solid color-mix(in srgb, var(--hc) 50%, var(--cb-line)); background: color-mix(in srgb, var(--hc) 7%, transparent); }
  .cb-hc i { display: grid; place-items: center; width: 20px; height: 20px; border-radius: 2px; background: var(--hc); color: var(--ht); font-style: normal; font-weight: 700; }
  .cb-hc.cb-used { opacity: .4; text-decoration: line-through; }
  .cb-sum { font-family: var(--cb-serif); font-size: 19px; white-space: nowrap; color: var(--cb-gold); }
  .cb-sum small { color: var(--cb-muted); font-family: var(--font-anthropic-sans); font-size: 11px; }
  @media (max-width: 560px) { .cb-cards-row { grid-template-columns: 1fr auto; } .cb-card-list { grid-column: 1 / -1; } }

  /* luck */
  .cb-grid2 { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 14px; }
  .cb-card { background: var(--cb-surface); border: 1px solid var(--cb-line); border-radius: 3px; padding: 18px; }
  .cb-card .cb-h { font-size: 17px; }
  .cb-luck-good { color: var(--cb-moss); }
  .cb-luck-bad { color: var(--cb-blood); }
  .cb-deck { display: grid; grid-template-columns: repeat(6, minmax(0, 1fr)); gap: 6px; }
  .cb-tobcard { display: flex; flex-direction: column; align-items: center; gap: 2px; padding: 10px 2px; border-radius: 3px; border: 1px solid var(--cb-line); border-top: 3px solid var(--tc);
                background: color-mix(in srgb, var(--tc) 9%, var(--cb-surface)); font-variant-numeric: tabular-nums; }
  .cb-tobcard b { font-family: var(--cb-serif); font-weight: 400; font-size: 20px; color: var(--tc); }
  .cb-tobcard span { font-size: 11px; color: var(--cb-muted); }
  .cb-filter { display: flex; flex-wrap: wrap; gap: 6px; align-items: center; }
  .cb-fchip { display: inline-flex; align-items: center; gap: 6px; padding: 5px 12px; border-radius: 3px; border: 1px solid var(--cb-line); background: var(--cb-surface);
              color: var(--cb-text); font: inherit; font-size: 12px; cursor: pointer; }
  .cb-fchip i { width: 9px; height: 9px; border-radius: 1px; background: var(--hc); }
  .cb-fchip[aria-pressed=true] { background: color-mix(in srgb, var(--hc, var(--cb-gold)) 16%, var(--cb-surface)); border-color: var(--hc, var(--cb-gold)); }
  .cb-fchip[aria-pressed=false] { opacity: .5; }
  .cb-fchip.cb-fall { --hc: var(--cb-gold); }
  [data-dash-source-state=refreshing] { opacity: .5; }
  @media print { .cb-side { display: none; } .cb { grid-template-columns: 1fr; grid-template-areas: "head" "main" "notes"; } }
  /* компоновка: ограниченная ширина, крупнее, две колонки на широком экране */
  .cb { font-size: 15px; }
  .cb > header, .cb > .cb-panel, .cb > .cb-details { justify-self: center; width: 100%; max-width: 1400px; box-sizing: border-box; }
  .cb-kicker { font-size: 12px; }
  .cb-title { font-size: clamp(32px, 3.6cqi, 48px); margin-bottom: 14px; }
  .cb-lede { font-size: 17px; max-width: 80ch; }
  .cb-muted { font-size: 13px; }
  .cb-banner { height: 4px; margin-top: 22px; }
  .cb-panel { gap: 44px; padding-block: 30px 40px; }
  .cb-ptitle { font-size: 32px; }
  .cb-phead small { font-size: 12px; }
  .cb-h { font-size: 24px; margin-bottom: 8px; }
  .cb-h .cb-ico { width: 17px; height: 17px; padding: 6px; }
  .cb-sub { font-size: 14px; }
  .cb-tile { padding: 20px 22px; }
  .cb-tile::after { left: 22px; width: 34px; }
  .cb-tile-label { font-size: 12px; }
  .cb-tile-label .cb-ico { width: 16px; height: 16px; }
  .cb-tile-value { font-size: 48px; margin-top: 10px; }
  .cb-race { gap: 6px; }
  .cb-race-head { font-size: 11px; padding: 0 16px 6px 19px; }
  .cb-race-head .cb-ico { width: 15px; height: 15px; }
  .cb-race-row { padding: 13px 16px; }
  .cb-rg-name b { font-size: 19px; }
  .cb-rg-name span { font-size: 13px; }
  .cb-rg-cell b { font-size: 23px; }
  .cb-rg-cell small { font-size: 12px; }
  .cb-rg-cell .cb-ico { width: 17px; height: 17px; }
  .cb-pip { width: 20px; height: 20px; }
  .cb-barrel { width: 14px; height: 17px; }
  .cb-score-track { height: 10px; }
  .cb-score b { font-size: 21px; }
  .cb-formula { padding: 20px; }
  .cb-formula-head b { font-size: 18px; }
  .cb-formula-head span { font-size: 13px; }
  .cb-formula-bar > span { font-size: 13px; padding: 9px 4px; }
  .cb-formula-bar b { font-size: 23px; }
  .cb-formula-bar small { font-size: 11px; }
  .cb-tracks { gap: 16px; }
  .cb-track-head { padding: 14px 16px; }
  .cb-track-head .cb-badge { width: 38px; height: 38px; }
  .cb-track-head .cb-badge .cb-ico { width: 21px; height: 21px; }
  .cb-track-head b { font-size: 19px; }
  .cb-track-head span { font-size: 12px; }
  .cb-track ol { padding: 12px 16px; gap: 8px; }
  .cb-place { font-size: 17px; width: 22px; }
  .cb-chip { font-size: 14px; padding: 4px 12px; }
  .cb-table { font-size: 15px; }
  .cb-table th { font-size: 11px; padding: 12px 14px; }
  .cb-table td { padding: 12px 14px; }
  .cb-table td:first-child { font-size: 17px; }
  .cb-tokens i { width: 7px; height: 7px; }
  .cb-legend { font-size: 12px; }
  .cb-legend i { width: 16px; height: 9px; }
  .cb-chart svg text { font-size: 13px; }
  .cb-tip { font-size: 13px; }
  .cb-chron { font-size: 14.5px; }
  .cb-chron li { grid-template-columns: 100px 1fr; padding: 9px 0 9px 12px; }
  .cb-chron time { font-size: 12.5px; }
  .cb-cards-row { padding: 12px 16px; }
  .cb-cards-row > :first-child { font-size: 18px; }
  .cb-hc { font-size: 13px; }
  .cb-hc i { width: 22px; height: 22px; }
  .cb-sum { font-size: 23px; }
  .cb-card { padding: 22px; }
  .cb-card .cb-h { font-size: 20px; }
  .cb-tobcard b { font-size: 26px; }
  .cb-tobcard span { font-size: 12px; }
  .cb-fchip { font-size: 13px; padding: 6px 14px; }
  .cb-empty { font-size: 15px; }
  .cb-details summary { font-size: 13px; }
  .cb-details ul { font-size: 13px; }
  .cb-tab { font-size: 14.5px; }
  @container (min-width: 980px) {
    .cb { grid-template-columns: 240px minmax(0, 1fr); }
    .cb-brand b { font-size: 19px; }
    .cb-tab { padding: 11px 12px; }
    .cb-side-foot { font-size: 12px; }
  }
  @container (min-width: 1800px) { .cb { zoom: 1.18; } }
  @container (min-width: 2200px) { .cb { zoom: 1.34; } }
  @container (min-width: 2600px) { .cb { zoom: 1.5; } }
  @container (min-width: 3000px) { .cb { zoom: 1.7; } }
  @container (min-width: 3600px) { .cb { zoom: 1.9; } }
  @container (min-width: 1400px) {
    #charts:not([hidden]) { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 24px 24px; }
    #charts > * { grid-column: 1 / -1; }
    #charts > #hist-power { grid-column: 1; }
    #charts > #hist-army { grid-column: 2; }
  }
</style>

<svg width="0" height="0" style="position:absolute" aria-hidden="true">
  <defs>
    <symbol id="cbi-throne" viewBox="0 0 24 24"><path d="M6 21v-9h12v9M6 12V4l2 2.5L10 3l2 3.5L14 3l2 3.5L18 4v8M9 21v-4.5h6V21M4 21h16"/></symbol>
    <symbol id="cbi-sword" viewBox="0 0 24 24"><path d="M20 4l-9.5 9.5M20 4h-4M20 4v4M7.5 12.5l4 4M9.5 14.5L4 20M4 20l-0.5 0.5"/></symbol>
    <symbol id="cbi-raven" viewBox="0 0 24 24"><path d="M21 7l-3-1c-1-1.5-3-2-4.5-1C11 6.5 10 9 10 11l-6 6 4.5-1L7 20l4-3c4 0 8-3 8-8l2-2z"/><circle cx="16" cy="7.5" r="0.6"/></symbol>
    <symbol id="cbi-castle" viewBox="0 0 24 24"><path d="M4 21V9h2.5V6H9v3h2V6h2v3h2V6h2.5v3H20v12zM10 21v-4a2 2 0 0 1 4 0v4"/></symbol>
    <symbol id="cbi-castle-fill" viewBox="0 0 24 24"><path d="M4 21V9h2.5V6H9v3h2V6h2v3h2V6h2.5v3H20v12h-6v-4a2 2 0 0 0-4 0v4z"/></symbol>
    <symbol id="cbi-snow" viewBox="0 0 24 24"><path d="M12 3v18M4.2 7.5l15.6 9M4.2 16.5l15.6-9M9.5 4.5L12 6.5l2.5-2M9.5 19.5L12 17.5l2.5 2"/></symbol>
    <symbol id="cbi-swords" viewBox="0 0 24 24"><path d="M4 4l10 10M4 4h3.5M4 4v3.5M20 4L10 14M20 4h-3.5M20 4v3.5M12.5 17.5l4 4M15 20l-2.5-2.5 5-5L20 15M11.5 17.5l-4 4M9 20l2.5-2.5-5-5L4 15"/></symbol>
    <symbol id="cbi-flame" viewBox="0 0 24 24"><path d="M12 3c.8 3.5 5 5.2 5 10a5 5 0 0 1-10 0c0-2.6 1.5-3.8 2-5.8.8 1 1.4 1.6 2.4 1.6C12.5 7 11.6 5 12 3z"/></symbol>
    <symbol id="cbi-shield" viewBox="0 0 24 24"><path d="M12 3l8 3v6c0 5-3.6 8-8 9-4.4-1-8-4-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/></symbol>
    <symbol id="cbi-scroll" viewBox="0 0 24 24"><path d="M7 4h10.5A2.5 2.5 0 0 1 20 6.5V17a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V6a2 2 0 1 1 4 0v12M10 8h7M10 12h7M10 16h4"/></symbol>
    <symbol id="cbi-hourglass" viewBox="0 0 24 24"><path d="M6 3h12M6 21h12M7 3c0 5 5 6 5 9s-5 4-5 9M17 3c0 5-5 6-5 9s5 4 5 9"/></symbol>
    <symbol id="cbi-crown" viewBox="0 0 24 24"><path d="M3 8l4.5 4L12 5l4.5 7L21 8l-2 11H5z" fill="currentColor"/></symbol>
    <symbol id="cbi-banner" viewBox="0 0 24 24"><path d="M6 21V3M6 4h12l-3 4 3 4H6"/></symbol>
    <symbol id="cbi-barrel" viewBox="0 0 24 24"><path d="M7 3h10c1.5 3 1.5 15 0 18H7C5.5 18 5.5 6 7 3zM6.2 8h11.6M6.2 16h11.6"/></symbol>
    <symbol id="cbi-barrel-fill" viewBox="0 0 24 24"><path d="M7 3h10c1.5 3 1.5 15 0 18H7C5.5 18 5.5 6 7 3z"/></symbol>
    <symbol id="cbi-token" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5l1.4 2.9 3.1.4-2.3 2.2.6 3.1-2.8-1.5-2.8 1.5.6-3.1-2.3-2.2 3.1-.4z"/></symbol>
    <symbol id="cbi-fist" viewBox="0 0 24 24"><path d="M5 20l5-5M12 4l8 8-5 5-8-8zM14 2l8 8M9.5 14.5l-3-3"/></symbol>
    <symbol id="cbi-dice" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="3"/><circle cx="9" cy="9" r="1" fill="currentColor"/><circle cx="15" cy="15" r="1" fill="currentColor"/><circle cx="15" cy="9" r="1" fill="currentColor"/><circle cx="9" cy="15" r="1" fill="currentColor"/><circle cx="12" cy="12" r="1" fill="currentColor"/></symbol>
    <symbol id="cbi-cards" viewBox="0 0 24 24"><rect x="3" y="6" width="11" height="15" rx="2"/><path d="M8 3h11a2 2 0 0 1 2 2v13"/></symbol>
    <symbol id="cbi-compass" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2 5-5 2 2-5z"/></symbol>
    <symbol id="cbi-crownline" viewBox="0 0 24 24"><path d="M3 8l4.5 4L12 5l4.5 7L21 8l-2 11H5z"/></symbol>
    <symbol id="cbi-land" viewBox="0 0 24 24"><path d="M3 19l6-10 4 6 2.5-3.5L21 19z"/><circle cx="16.5" cy="6.5" r="1.5"/></symbol>
    <symbol id="cbi-chart" viewBox="0 0 24 24"><path d="M4 4v16h16M7.5 15l3.5-4 3 2.5L19 7.5"/></symbol>
    <symbol id="cbi-gauge" viewBox="0 0 24 24"><path d="M4 18a8 8 0 1 1 16 0M12 18l4-6"/></symbol>
    <symbol id="cbi-towers" viewBox="0 0 24 24"><path d="M3 21V7h1.5V5H6v2h1.5V5H9v2h1.5v14M13.5 21V11H15V9h1.5v2H18V9h1.5v2H21v10M2 21h20M6.75 21v-3a1 1 0 0 1 1.5 0v3"/></symbol>
  </defs>
</svg>

<div class="cb-shell">
<div class="cb">
  <header id="summary" class="cb-hero">
    <p class="cb-kicker">Swords and Ravens · летопись партии</p>
    <h1 class="cb-title">Cum back 2 — сводка партии</h1>
    <p class="cb-lede">
      Раунд <b data-draw="round" data-source="status" data-field="round" data-row="0">—</b> из <b data-draw="maxRounds" data-source="status" data-field="max_rounds" data-row="0">—</b>.
      Больше всего замков (<b data-draw="topCastles" data-source="leaders" data-field="castles" data-row="0">—</b>) у: <b data-draw="topNames" data-source="leaders" data-field="names" data-row="0">—</b>.
      Дольше всех думал <b data-draw="slowName" data-source="think" data-field="who" data-row="0">—</b>: <b data-draw="slowMin" data-source="think" data-field="total" data-row="0">—</b> мин.
      Сейчас ждём: <b class="cb-pill-now" data-draw="waiting" data-source="status" data-field="waiting" data-row="0">—</b>
    </p>
    <p class="cb-muted">Снимок партии от <span data-draw="snapshot" data-source="status" data-field="snapshot_msk" data-row="0">—</span> МСК, последний ход в логе: <span data-draw="lastMove" data-source="status" data-field="last_move_msk" data-row="0">—</span>. Обновляется автоматически, пока работает бот.</p>
    <div class="cb-banner" aria-hidden="true">
      <i style="background:#cf7766"></i><i style="background:#e3c35f"></i><i style="background:#b4c2c8"></i><i style="background:#6f8790"></i><i style="background:#8fbf7f"></i><i style="background:#e0995e"></i>
    </div>
  </header>

  <aside class="cb-side" id="side">
    <div class="cb-side-in">
      <div class="cb-brand" aria-hidden="true"><span class="cb-mono">C</span><span><b>Cum back 2</b><small>летопись партии</small></span></div>
      <p class="cb-side-cap" aria-hidden="true">Разделы</p>
    <nav class="cb-tabs" role="tablist" id="tabs" aria-label="Разделы">
      <button class="cb-tab" role="tab" aria-selected="true" aria-controls="overview" data-tab="overview" id="tab-overview"><span class="cb-num">01</span><svg class="cb-ico"><use href="#cbi-compass"/></svg>Обзор</button>
      <button class="cb-tab" role="tab" aria-selected="false" aria-controls="armies" data-tab="armies" id="tab-armies"><span class="cb-num">02</span><svg class="cb-ico"><use href="#cbi-fist"/></svg>Армии</button>
      <button class="cb-tab" role="tab" aria-selected="false" aria-controls="battles" data-tab="battles" id="tab-battles"><span class="cb-num">03</span><svg class="cb-ico"><use href="#cbi-dice"/></svg>Бои и удача</button>
      <button class="cb-tab" role="tab" aria-selected="false" aria-controls="charts" data-tab="charts" id="tab-charts"><span class="cb-num">04</span><svg class="cb-ico"><use href="#cbi-chart"/></svg>Графики</button>
    </nav>
      <p class="cb-side-foot"><i></i>Данные из бота, обновление каждые 10 минут</p>
    </div>
  </aside>

  <div class="cb-panel" id="overview" role="tabpanel" aria-labelledby="tab-overview">
    <div class="cb-phead"><div><p class="cb-kicker">Раздел 01 / 04</p><div class="cb-ptitle">Обзор</div></div><small>положение, треки, хроника</small></div>
    <section id="kpi" class="cb-tiles">
      <div class="cb-tile" id="kpi-wildlings" style="--acc: var(--cb-ice)"><div class="cb-tile-label"><svg class="cb-ico"><use href="#cbi-snow"/></svg>Сила одичалых</div><div class="cb-tile-value" data-draw="wildlings" data-source="status" data-field="wildlings" data-row="0">—</div></div>
      <div class="cb-tile" id="kpi-combats" style="--acc: var(--cb-blood)"><div class="cb-tile-label"><svg class="cb-ico"><use href="#cbi-swords"/></svg>Боёв</div><div class="cb-tile-value" data-draw="combatsN" data-source="status" data-field="combats" data-row="0">—</div></div>
      <div class="cb-tile" id="kpi-raids" style="--acc: var(--cb-ember)"><div class="cb-tile-label"><svg class="cb-ico"><use href="#cbi-flame"/></svg>Набегов</div><div class="cb-tile-value" data-draw="raidsN" data-source="status" data-field="raids" data-row="0">—</div></div>
      <div class="cb-tile" id="kpi-supports" style="--acc: var(--cb-moss)"><div class="cb-tile-label"><svg class="cb-ico"><use href="#cbi-shield"/></svg>Поддержек в боях</div><div class="cb-tile-value" data-draw="supportsN" data-source="status" data-field="supports" data-row="0">—</div></div>
      <div class="cb-tile" id="kpi-log" style="--acc: var(--cb-violet)"><div class="cb-tile-label"><svg class="cb-ico"><use href="#cbi-scroll"/></svg>Записей в логе</div><div class="cb-tile-value" data-draw="logN" data-source="status" data-field="log_entries" data-row="0">—</div></div>
    </section>

    <section id="race">
      <h2 class="cb-h"><svg class="cb-ico"><use href="#cbi-castle"/></svg>Гонка за замками</h2>
      <p class="cb-sub">Вся сила дома в одной строке, сверху — самый сильный по индексу. Для победы нужно 7 замков и крепостей: у кого 5 — подсвечено жёлтым, у кого 6 — красным. Короны — сколько корон в землях дома (дают власть при сборе власти и при «Игре престолов»). Найм — очки сбора войск: обычный замок даёт 1, крепость 2. Армия — сила войск на карте. «+2 м.» у земель — морские области с кораблями дома, в индексе они считаются вместе с землями. Индекс силы — итог по всем факторам от 0 до 100, как он считается — внизу страницы.</p>
      <div class="cb-rg cb-race-head" aria-hidden="true">
        <span>Дом</span>
        <span><svg class="cb-ico"><use href="#cbi-castle"/></svg>Замки</span>
        <span><svg class="cb-ico"><use href="#cbi-towers"/></svg>Найм</span>
        <span><svg class="cb-ico"><use href="#cbi-land"/></svg>Земли</span>
        <span><svg class="cb-ico"><use href="#cbi-crownline"/></svg>Короны</span>
        <span><svg class="cb-ico"><use href="#cbi-barrel"/></svg>Снабжение</span>
        <span><svg class="cb-ico"><use href="#cbi-token"/></svg>Власть</span>
        <span><svg class="cb-ico"><use href="#cbi-fist"/></svg>Армия</span>
        <span><svg class="cb-ico"><use href="#cbi-gauge"/></svg>Индекс силы</span>
      </div>
      <div class="cb-race" data-draw="race" data-source="houses power strength"></div>
      <div class="cb-formula" id="formula">
        <div class="cb-formula-head"><b>Как считается индекс силы</b><span>сумма восьми частей, максимум 100 баллов; цвета совпадают с полосками индекса выше</span></div>
        <div class="cb-formula-bar">
          <span style="flex: 20; --fc: #d9b66d"><b>20</b>Замки<small>из 7 для победы</small></span>
          <span style="flex: 30; --fc: #cc8c7b"><b>30</b>Армия<small>к лучшему дому</small></span>
          <span style="flex: 10; --fc: #87bba5"><b>10</b>Найм<small>к лучшему</small></span>
          <span style="flex: 10; --fc: #9baf76"><b>10</b>Земли<small>+ моря, к лучшему</small></span>
          <span style="flex: 5; --fc: #e0995e"><b>5</b>Короны<small>к лучшему</small></span>
          <span style="flex: 10; --fc: #c49a5c"><b>10</b>Снабж.<small>из 6</small></span>
          <span style="flex: 5; --fc: #afa1ca"><b>5</b>Власть<small>к лучшему</small></span>
          <span style="flex: 10; --fc: #86adc2"><b>10</b>Треки<small>места</small></span>
        </div>
        <p class="cb-sub">Пример: 3 замка из 7 дают 20 × 3/7 ≈ 9 баллов, а армия 6 при лучшей армии 6 даёт все 30. Найм — очки сбора войск: обычный замок даёт 1, крепость 2. «К лучшему» — доля от самого сильного дома по этому показателю. Треки — до 10 баллов, по трети на трек: Железный трон даёт очки только за 1-е место; Королевский двор — за 1–4-е места (1-е — полная треть, 2-е — ¾, 3-е — ½, 4-е — ¼, 5-е и 6-е — ничего); Вотчины — за все места, от полной трети за 1-е до 1/6 за 6-е. Наведите на индекс дома, чтобы увидеть его разбивку. Это оценка дашборда, а не правило игры.</p>
      </div>
    </section>

    <section id="tracks">
      <h2 class="cb-h"><svg class="cb-ico"><use href="#cbi-banner"/></svg>Треки влияния</h2>
      <p class="cb-sub">Первое место на Железном троне ходит первым и решает ничьи, в Вотчинах — побеждает в бою при равной силе, при Королевском дворе — получает больше звёздных приказов.</p>
      <div class="cb-tracks" data-source="houses">
        <div class="cb-track" id="track-throne" style="--tc: #d9b66d">
          <div class="cb-track-head"><div class="cb-badge"><svg class="cb-ico"><use href="#cbi-throne"/></svg></div><div><b>Железный трон</b><span>порядок хода, ничьи</span></div></div>
          <ol data-draw="trackThrone"></ol>
        </div>
        <div class="cb-track" id="track-fiefdoms" style="--tc: #cc8c7b">
          <div class="cb-track-head"><div class="cb-badge"><svg class="cb-ico"><use href="#cbi-sword"/></svg></div><div><b>Вотчины</b><span>сила в бою, меч</span></div></div>
          <ol data-draw="trackFiefdoms"></ol>
        </div>
        <div class="cb-track" id="track-court" style="--tc: #86adc2">
          <div class="cb-track-head"><div class="cb-badge"><svg class="cb-ico"><use href="#cbi-raven"/></svg></div><div><b>Королевский двор</b><span>звёздные приказы, ворон</span></div></div>
          <ol data-draw="trackCourt"></ol>
        </div>
      </div>
    </section>

    <section id="standings">
      <h2 class="cb-h"><svg class="cb-ico"><use href="#cbi-shield"/></svg>Положение домов</h2>
      <p class="cb-sub">Власть — жетоны власти в запасе. Войска — юниты на карте.</p>
      <div class="cb-wrap">
        <table class="cb-table" data-source="houses" data-row-key="house">
          <thead><tr>
            <th data-field="house">Дом</th>
            <th data-field="player" class="cb-l">Игрок</th>
            <th data-field="castles">Замки</th>
            <th data-field="lands">Земли</th>
            <th data-field="supply">Снабжение</th>
            <th data-field="power" class="cb-l">Власть</th>
            <th data-field="footmen">Пехота</th>
            <th data-field="knights">Рыцари</th>
            <th data-field="ships">Корабли</th>
          </tr></thead>
          <tbody data-draw="housesBody"></tbody>
        </table>
      </div>
    </section>

    <section id="speed">
      <h2 class="cb-h"><svg class="cb-ico"><use href="#cbi-hourglass"/></svg>Кто сколько думал</h2>
      <p class="cb-sub">Минуты на приказы и походы за всю партию. Для приказов — от начала фазы замыслов до последней отправки, для похода — от предыдущего события в логе.</p>
      <div class="cb-legend"><span id="leg-orders"><i></i>Приказы</span><span id="leg-marches"><i class="cb-light"></i>Походы</span></div>
      <div class="cb-chart" id="speed-chart" data-draw="speedChart" data-source="think actions"></div>
    </section>

    <section id="chronicle">
      <h2 class="cb-h"><svg class="cb-ico"><use href="#cbi-scroll"/></svg>Хроника</h2>
      <p class="cb-sub">События из лога игры, сначала новые. Время московское.</p>
      <ul class="cb-chron" data-draw="chronList" data-source="chronicle"></ul>
    </section>
  </div>

  <div class="cb-panel" id="armies" role="tabpanel" aria-labelledby="tab-armies" hidden>
    <div class="cb-phead"><div><p class="cb-kicker">Раздел 02 / 04</p><div class="cb-ptitle">Армии</div></div><small>войска и карты домов</small></div>
    <section id="army-power">
      <h2 class="cb-h"><svg class="cb-ico"><use href="#cbi-fist"/></svg>Военная мощь домов</h2>
      <p class="cb-lede">Сильнее всех на карте — <b data-draw="armyTop" data-source="power" data-field="house" data-row="0">—</b>: <b data-draw="armyTopV" data-source="power" data-field="total" data-row="0">—</b> силы в <b data-draw="armyTopU" data-source="power" data-field="units" data-row="0">—</b> юнитах.</p>
      <p class="cb-sub">Сила войск по правилам базовой игры: пехота 1, рыцарь 2, корабль 1, осадная башня 2 (в игре 4 только при штурме замка, здесь — средняя оценка). Без приказов, поддержки, гарнизонов и карт.</p>
      <div class="cb-legend"><span><i style="opacity:1"></i>Пехота</span><span><i style="opacity:.72"></i>Рыцари</span><span><i style="opacity:.45"></i>Корабли</span><span><i style="opacity:.25"></i>Осадные башни</span></div>
      <div class="cb-chart" id="power-chart" data-draw="powerChart" data-source="power"></div>
    </section>

    <section id="army-table">
      <h2 class="cb-h"><svg class="cb-ico"><use href="#cbi-shield"/></svg>Состав армий</h2>
      <div class="cb-wrap">
        <table class="cb-table" data-source="power" data-row-key="house">
          <thead><tr>
            <th data-field="house">Дом</th>
            <th data-field="footmen">Пехота</th>
            <th data-field="knights">Рыцари</th>
            <th data-field="ships">Корабли</th>
            <th data-field="siege">Осадные</th>
            <th data-field="land">Сила на суше</th>
            <th data-field="sea">Сила на море</th>
            <th data-field="total">Всего</th>
            <th data-field="best_label" class="cb-l">Сильнейший отряд</th>
            <th data-field="hand">Карты на руке</th>
          </tr></thead>
          <tbody data-draw="powerBody"></tbody>
        </table>
      </div>
    </section>

    <section id="army-cards">
      <h2 class="cb-h"><svg class="cb-ico"><use href="#cbi-cards"/></svg>Карты домов</h2>
      <p class="cb-sub">Число в кружке — сила карты в бою. Зачёркнутые уже сыграны и вернутся, когда дом разыграет все карты.</p>
      <div class="cb-cards" data-draw="cardsList" data-source="cards"></div>
    </section>
  </div>

  <div class="cb-panel" id="battles" role="tabpanel" aria-labelledby="tab-battles" hidden>
    <div class="cb-phead"><div><p class="cb-kicker">Раздел 03 / 04</p><div class="cb-ptitle">Бои и удача</div></div><small>сражения и прилив битвы</small></div>
    <p class="cb-empty" id="battles-empty"><svg class="cb-ico"><use href="#cbi-swords"/></svg><span>Боёв пока не было. После первых сражений здесь появятся винрейт боёв, карты прилива битвы, коэффициент удачи каждого дома и бои, которые решил рандом.</span></p>
    <div class="cb-panel" id="battles-body" hidden>
      <section id="luck-kpi" class="cb-tiles">
        <div class="cb-tile" style="--acc: var(--cb-blood)"><div class="cb-tile-label"><svg class="cb-ico"><use href="#cbi-swords"/></svg>Боёв</div><div class="cb-tile-value" data-draw="lBattles" data-source="luckSummary" data-field="battles" data-row="0">—</div></div>
        <div class="cb-tile" style="--acc: var(--cb-gold)"><div class="cb-tile-label"><svg class="cb-ico"><use href="#cbi-dice"/></svg>Решил прилив</div><div class="cb-tile-value"><span data-draw="lDecided" data-source="luckSummary" data-field="decided" data-row="0">—</span> <small class="cb-muted">(<span data-draw="lDecidedShare" data-source="luckSummary" data-field="decided_share" data-row="0">—</span>%)</small></div></div>
        <div class="cb-tile" style="--acc: var(--cb-ice)"><div class="cb-tile-label"><svg class="cb-ico"><use href="#cbi-cards"/></svg>Средний прилив</div><div class="cb-tile-value">+<span data-draw="lAvg" data-source="luckSummary" data-field="avg" data-row="0">—</span> <small class="cb-muted">ожидается +<span data-draw="lExp" data-source="luckSummary" data-field="expected" data-row="0">—</span></small></div></div>
        <div class="cb-tile" style="--acc: var(--cb-moss)"><div class="cb-tile-label"><svg class="cb-ico"><use href="#cbi-token"/></svg>Общий коэффициент удачи</div><div class="cb-tile-value"><span data-draw="lCoef" data-source="luckSummary" data-field="coef" data-row="0">—</span>×</div></div>
      </section>

      <div class="cb-grid2">
        <section class="cb-card" id="winrate">
          <h2 class="cb-h"><svg class="cb-ico"><use href="#cbi-swords"/></svg>Винрейт боёв</h2>
          <p class="cb-sub">Доля выигранных боёв, нападение и защита вместе. Наведите на полосу — покажет раздельно.</p>
          <div class="cb-chart" data-draw="winChart" data-source="winrate"></div>
        </section>
        <section class="cb-card" id="luck">
          <h2 class="cb-h"><svg class="cb-ico"><use href="#cbi-dice"/></svg>Удача в приливе</h2>
          <p class="cb-sub">Сколько силы дом вытянул сверх среднего (+0,92 за карту). В скобках — коэффициент удачи: 1× — как в среднем, 2× — вдвое больше.</p>
          <div class="cb-chart" data-draw="luckChart" data-source="luck"></div>
        </section>
      </div>

      <section id="deck">
        <h2 class="cb-h"><svg class="cb-ico"><use href="#cbi-cards"/></svg>Колода прилива битвы</h2>
        <p class="cb-sub">Сколько раз выпала каждая карта и сколько должно было при честной колоде из 24 карт.</p>
        <div class="cb-deck" data-draw="deck" data-source="tobDist"></div>
      </section>

      <section id="luck-table">
        <h2 class="cb-h"><svg class="cb-ico"><use href="#cbi-token"/></svg>Удача по домам</h2>
        <div class="cb-wrap">
          <table class="cb-table" data-source="luck" data-row-key="house">
            <thead><tr>
              <th data-field="house">Дом</th>
              <th data-field="draws">Карт</th>
              <th data-field="sum">Сумма</th>
              <th data-field="avg">В среднем</th>
              <th data-field="luck">Удача</th>
              <th data-field="coef">Коэффициент</th>
              <th data-field="drawn" class="cb-l">Что вытянул</th>
              <th data-field="saved">Выиграл благодаря</th>
              <th data-field="robbed">Проиграл из-за</th>
            </tr></thead>
            <tbody data-draw="luckBody"></tbody>
          </table>
        </div>
      </section>

      <section id="battle-list">
        <h2 class="cb-h"><svg class="cb-ico"><use href="#cbi-scroll"/></svg>Все бои</h2>
        <div class="cb-wrap">
          <table class="cb-table" data-source="combats" data-row-key="id">
            <thead><tr>
              <th data-field="round">Раунд</th>
              <th data-field="region" class="cb-l">Где</th>
              <th data-field="attacker" class="cb-l">Нападал</th>
              <th data-field="attacker_card" class="cb-l">Карта</th>
              <th data-field="attacker_tob">Прилив</th>
              <th data-field="attacker_total">Сила</th>
              <th data-field="defender" class="cb-l">Защищался</th>
              <th data-field="defender_card" class="cb-l">Карта</th>
              <th data-field="defender_tob">Прилив</th>
              <th data-field="defender_total">Сила</th>
              <th data-field="winner" class="cb-l">Победил</th>
            </tr></thead>
            <tbody data-draw="battlesBody"></tbody>
          </table>
        </div>
      </section>
    </div>
  </div>

  <div class="cb-panel" id="charts" role="tabpanel" aria-labelledby="tab-charts" hidden>
    <div class="cb-phead"><div><p class="cb-kicker">Раздел 04 / 04</p><div class="cb-ptitle">Графики</div></div><small>динамика по раундам</small></div>
    <section id="hist-intro">
      <h2 class="cb-h"><svg class="cb-ico"><use href="#cbi-chart"/></svg>Как менялась партия</h2>
      <p class="cb-sub">Точка — последний снимок раунда. Нажимайте на дома, чтобы скрыть или показать их на всех трёх графиках; выбор запоминается в этом браузере. Раунды 1–3 восстановлены по сохранённым снимкам (для 3-го — снимок середины раунда), дальше бот записывает их сам.</p>
      <div class="cb-filter" id="hist-filter" aria-label="Фильтр домов"></div>
    </section>
    <section class="cb-card" id="hist-index">
      <h2 class="cb-h"><svg class="cb-ico"><use href="#cbi-gauge"/></svg>Индекс силы</h2>
      <p class="cb-sub">Итог 0–100 по той же формуле, что в гонке за замками.</p>
      <div class="cb-chart" data-draw="histIndexChart" data-source="histIndex"></div>
    </section>
    <section class="cb-card" id="hist-power">
      <h2 class="cb-h"><svg class="cb-ico"><use href="#cbi-token"/></svg>Влияние — жетоны власти</h2>
      <p class="cb-sub">Сколько жетонов власти у дома в запасе.</p>
      <div class="cb-chart" data-draw="histPowerChart" data-source="history"></div>
    </section>
    <section class="cb-card" id="hist-army">
      <h2 class="cb-h"><svg class="cb-ico"><use href="#cbi-fist"/></svg>Сила армии</h2>
      <p class="cb-sub">Пехота 1, рыцарь 2, корабль 1, осадная башня 2.</p>
      <div class="cb-chart" data-draw="histArmyChart" data-source="history"></div>
    </section>
  </div>

  <details class="cb-details" id="notes">
    <summary>Откуда данные и как считается</summary>
    <ul>
      <li>Данные взяты из лога и состояния партии на swordsandravens.net ботом и выкладываются на эту страницу автоматически.</li>
      <li>Замки, земли и снабжение — из публичной страницы игры; власть, войска и треки — из состояния партии.</li>
      <li>Время на ход: если игрок отправил приказы, а потом переотправил, считается последняя отправка.</li>
      <li>Мощь армии: пехота 1, рыцарь 2, корабль 1, осадная башня 2 (в игре она даёт 4 только при штурме замка или крепости и 0 в остальных боях, здесь берётся 2).</li>
      <li>Удача в приливе: сумма силы вытянутых карт минус ожидаемая (+0,92 за карту при колоде из 24 карт). Коэффициент — во сколько раз больше среднего. Бой «решил прилив», если без карт прилива победитель проиграл бы или вышла бы ничья.</li>
      <li>Короны и земли: земля принадлежит дому, если там его войска или жетон власти; родовые земли (Винтерфелл, Ланниспорт, Пайк, Хайгарден, Солнечное Копьё, Драконий Камень) остаются за домом, пока их никто не занял. Короны и замки взяты из карты игры.</li>
      <li>Индекс силы (0–100) — оценка дашборда, а не правило игры: замки 20% (от 7 для победы), армия 30%, найм 10% (замок 1, крепость 2), земли и занятые кораблями моря 10%, короны 5%, снабжение 10% (от 6), жетоны власти 5%, треки 10% (трон — только 1-е место, двор — 1–4-е, вотчины — все места). Армия, найм, земли, короны и власть считаются относительно лучшего дома.</li>
      <li>Иконки нарисованы для этого дашборда, это не иконки игры.</li>
    </ul>
  </details>
</div>

</div>
</div>
<script>document.write('<script src="calcs.js?v=' + CB_V + '"><\/script><script src="app.js?v=' + CB_V + '"><\/script>');</script>
<script>dash._run();</script>
</body>
</html>
