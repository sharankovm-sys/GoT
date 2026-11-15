// Мини-движок вместо хранилища Claude: данные берутся из data.js рядом со страницей.
(function () {
  const raw = window.CB_DATA || {};
  const calcs = [], draws = [], dataCbs = [], cache = {};
  const get = (name) => {
    if (name in cache) return cache[name];
    if (Array.isArray(raw[name])) return (cache[name] = { status: 'ok', data: raw[name] });
    const c = calcs.find((x) => x.name === name);
    if (!c) return { status: 'missing', data: [] };
    cache[name] = { status: 'loading', data: [] };
    try {
      const args = c.inputs.map((i) => get(i).data);
      cache[name] = { status: 'ok', data: c.fn(...args) || [] };
    } catch (e) { console.error(name, e); cache[name] = { status: 'error', data: [] }; }
    return cache[name];
  };
  window.dash = {
    calc: (name, o) => calcs.push({ name, inputs: o.inputs || [], fn: o.fn }),
    data: get,
    draw: (name, fn) => draws.push({ name, fn }),
    onData: (fn) => dataCbs.push(fn),
    setLink: (id) => { try { history.replaceState(null, '', '#' + id); } catch (e) {} },
    _run: () => {
      draws.forEach(({ name, fn }) => document.querySelectorAll('[data-draw="' + name + '"]').forEach((el) => {
        try { fn(el); } catch (e) { console.error(name, e); }
      }));
      dataCbs.forEach((fn) => { try { fn(); } catch (e) { console.error(e); } });
    },
  };
})();
