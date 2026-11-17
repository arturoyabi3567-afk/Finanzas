'use strict';
/* ============ Utilidades ============ */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const sum = (a, f) => a.reduce((t, x) => t + (+f(x) || 0), 0);
const mxn = n => new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 }).format(n || 0);
const usd = n => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n || 0);
const today = () => new Date().toISOString().slice(0, 10);
const ago = n => new Date(Date.now() - n * 864e5).toISOString().slice(0, 10);
const mk = d => String(d).slice(0, 7);
const cls = n => (n < 0 ? 'neg' : 'pos');
const groupSum = (rows, key, val) => rows.reduce((o, r) => ((o[key(r)] = (o[key(r)] || 0) + (+val(r) || 0)), o), {});
function months(n = 6) {
  const out = [], d = new Date();
  for (let i = n - 1; i >= 0; i--) out.push(new Date(d.getFullYear(), d.getMonth() - i, 1).toISOString().slice(0, 7).replace(/^(\d{4})-(\d{2}).*/, '$1-$2'));
  return out;
}

let URL_ = localStorage.getItem('fin_url') || '', D = null, tab = 'resumen', charts = {};
const E = { plat: 'Global', from: '', to: '' };

/* ============ Colores de gráficas ============ */
const C = { sand: '#c9b28a', pos: '#7fb8a6', neg: '#d98b8b', slate: '#6b7a9a', lilac: '#a99cc7', moss: '#8fa98a', mu: '#8b8f98', ln: '#262a31' };
const PAL = [C.sand, C.pos, C.slate, C.neg, C.lilac, C.moss];
Chart.defaults.color = C.mu;
Chart.defaults.font.family = "'Hanken Grotesk', system-ui, sans-serif";
function ch(id, type, data, o = {}) {
  const el = $('#' + id); if (!el) return;
  charts[id]?.destroy();
  const pie = type === 'doughnut';
  charts[id] = new Chart(el, {
    type, data,
    options: {
      responsive: true, maintainAspectRatio: false, indexAxis: o.axis || 'x',
      plugins: { legend: { display: o.leg !== false, position: pie ? 'bottom' : 'top', labels: { usePointStyle: true, boxWidth: 7 } } },
      cutout: pie ? '68%' : undefined,
      scales: pie ? {} : { x: { stacked: !!o.stack, grid: { display: false } }, y: { stacked: !!o.stack, grid: { color: C.ln } } }
    }
  });
}

/* ============ Datos de prueba ============ */
function mock() {
  let s = 11; const r = () => (s = (s * 16807) % 2147483647) / 2147483647;
  const pick = a => a[Math.floor(r() * a.length)];
  const cfg = [
    ...[['Mercado Libre', 17], ['TikTok Shop', 8], ['Amazon', 15], ['Facebook Marketplace', 0], ['Venta Directa', 0]].map(([v, e]) => ({ tipo: 'plataforma', valor: v, extra: e })),
    ...['Renta', 'Servicios', 'Gimnasio'].map(v => ({ tipo: 'cat_fijo', valor: v, extra: '' })),
    ...['Alimentación', 'Transporte', 'Cuidado Personal'].map(v => ({ tipo: 'cat_variable', valor: v, extra: '' })),
    { tipo: 'cat_ahorro', valor: 'Fondo de emergencia', extra: '' },
    { tipo: 'cuenta_trading', valor: 'Fondeo 100K', extra: '' }, { tipo: 'cuenta_trading', valor: 'Fondeo 50K', extra: '' },
    ...['Servicios técnicos', 'Proyectos independientes', 'Eventos'].map(v => ({ tipo: 'cat_ingreso', valor: v, extra: '' })),
    { tipo: 'retencion', valor: 'SAT (reserva %)', extra: 10 }, { tipo: 'saldo_inicial', valor: 'Saldo inicial banco', extra: 25000 }
  ];
  const inv = [
    ['AUD-01', 'Audífonos Bluetooth', 180, 35, 150, 459], ['LMP-02', 'Lámpara LED escritorio', 95, 28, 120, 289],
    ['SMW-03', 'Smartwatch deportivo', 310, 55, 60, 799], ['CAM-04', 'Cámara de seguridad', 220, 40, 70, 599],
    ['CBL-05', 'Cable USB-C trenzado', 25, 8, 300, 99]
  ].map(([sku, producto, c, e, st, p]) => ({ sku, producto, costo_unitario: c, costo_envio_prorrateado: e, stock_inicial: st, stock_actual: st, precio_sugerido: p, stock_minimo: 15 }));
  inv[2].stock_inicial = 28; inv[2].stock_actual = 28;
  const plats = cfg.filter(x => x.tipo === 'plataforma');
  const ventas = [];
  for (let d = 89; d >= 0; d--) for (let k = 0; k < Math.floor(r() * 3); k++) {
    const p = pick(plats), i = pick(inv), u = 1 + Math.floor(r() * 3), bruto = i.precio_sugerido * u;
    if (i.stock_actual < u) continue;
    const comision = Math.round(bruto * p.extra / 100), envio = p.extra ? 45 : 0, imp = Math.round(bruto * .05);
    const costo = (i.costo_unitario + i.costo_envio_prorrateado) * u; i.stock_actual -= u;
    ventas.push({ fecha: ago(d), plataforma: p.valor, sku: i.sku, unidades: u, precio_bruto: bruto, comision, envio, impuestos: imp, costo_producto: costo, utilidad_neta: bruto - comision - envio - imp - costo, estado_cobro: d > 8 ? 'Cobrado' : 'En tránsito' });
  }
  const bit = [];
  for (let d = 89; d >= 0; d--) { const w = new Date(ago(d)).getUTCDay(); if (w === 0 || w === 6 || r() < .2) continue;
    const win = r() < .56, pips = Math.round((win ? 10 + r() * 25 : -(8 + r() * 12)) * 10) / 10;
    bit.push({ fecha: ago(d), cuenta: pick(['Fondeo 100K', 'Fondeo 50K']), instrumento: pick(['Nasdaq', 'EUR/USD', 'USD/JPY']), direccion: pick(['Buy', 'Sell']), riesgo_pct: 1, resultado_usd: Math.round(pips * 22), resultado_pips: pips, fase: d > 50 ? 'Fase 1' : d > 25 ? 'Fase 2' : 'Fondeada', notas: '' }); }
  const ret = [[60, 'Recibido', 480], [35, 'Recibido', 620], [12, 'Recibido', 350], [3, 'En tránsito', 540]].map(([d, estado, m]) => ({ fecha: ago(d), cuenta: 'Fondeo 100K', monto_usd: m, comision_red: 1, tipo_cambio: 17.4, neto_mxn: (m - 1) * 17.4, estado }));
  const otros = [[70, 'Servicios técnicos', 1800], [48, 'Proyectos independientes', 4500], [26, 'Eventos', 2200], [9, 'Servicios técnicos', 1500]].map(([d, c, m]) => ({ fecha: ago(d), concepto: c, categoria: c, monto_bruto: m, impuestos: m * .1, monto_neto: m * .9 }));
  const fin = [];
  for (let m = 0; m < 4; m++) { const f = ago(m * 30 + 2);
    fin.push({ fecha: f, tipo: 'Gasto Fijo', categoria: 'Renta', descripcion: 'Renta', monto_mxn: 5500, metodo_pago: 'SPEI' }, { fecha: f, tipo: 'Gasto Fijo', categoria: 'Servicios', descripcion: 'Luz e internet', monto_mxn: 900, metodo_pago: 'Tarjeta' }, { fecha: f, tipo: 'Gasto Fijo', categoria: 'Gimnasio', descripcion: 'Mensualidad', monto_mxn: 600, metodo_pago: 'Tarjeta' }, { fecha: f, tipo: 'Ahorro/Reserva', categoria: 'Fondo de emergencia', descripcion: 'Aportación', monto_mxn: 1000, metodo_pago: 'SPEI' });
    for (let k = 0; k < 8; k++) fin.push({ fecha: ago(m * 30 + k * 3), tipo: 'Gasto Variable', categoria: pick(['Alimentación', 'Transporte', 'Cuidado Personal']), descripcion: 'Gasto', monto_mxn: Math.round(120 + r() * 500), metodo_pago: pick(['Efectivo', 'Tarjeta']) }); }
  const cuentas = [[88, 'Fondeo 100K', 'FundedFirm', 100000, 1800, 'Fase 1'], [60, 'Fondeo 100K', '', 0, 0, 'Fase 2'], [40, 'Fondeo 100K', '', 0, 0, 'Fondeada'], [45, 'Fondeo 50K', 'FundedFirm', 50000, 950, 'Fase 1'], [30, 'Fondeo 50K', '', 0, 0, 'Perdida'], [20, 'Fondeo 50K', 'FundedFirm', 50000, 950, 'Fase 1']].map(([d, cuenta, fondeadora, tamano_usd, costo_mxn, estado]) => ({ fecha: ago(d), cuenta, fondeadora, tamano_usd, costo_mxn, estado }));
  return { Configuracion: cfg, Inventario: inv, Ventas_Ecommerce: ventas, Trading_Bitacora: bit, Trading_Retiros: ret, Otros_Ingresos: otros, Finanzas_Personales: fin, Trading_Cuentas: cuentas };
}

/* ============ Conexión ============ */
async function load() {
  if (URL_) {
    const res = await (await fetch(URL_ + '?action=all')).json();
    if (!res.ok) throw new Error(res.error);
    D = res.data;
  } else D = mock();
  D.Trading_Cuentas ||= [];
  $('#banner').hidden = !!URL_;
}
async function post(sheet, row) {
  if (!URL_) return;
  const res = await (await fetch(URL_, { method: 'POST', body: JSON.stringify({ action: 'add', sheet, row }) })).json();
  if (!res.ok) alert('No se pudo guardar en la hoja: ' + res.error);
}
const cfg = t => D.Configuracion.filter(x => x.tipo === t).map(x => x.valor);
const cfgNum = (t, d = 0) => +(D.Configuracion.find(x => x.tipo === t)?.extra ?? d);

/* ============ Cálculos ============ */
const netoVenta = x => x.precio_bruto - x.comision - x.envio - x.impuestos;
function calc() {
  const V = D.Ventas_Ecommerce, T = D.Trading_Retiros, O = D.Otros_Ingresos, F = D.Finanzas_Personales, cur = mk(today());
  const liquido = cfgNum('saldo_inicial') + sum(V.filter(x => x.estado_cobro === 'Cobrado'), netoVenta) + sum(T.filter(x => x.estado === 'Recibido'), x => x.neto_mxn) + sum(O, x => x.monto_neto) - sum(F, x => x.monto_mxn) - sum(D.Trading_Cuentas, x => x.costo_mxn);
  const transito = sum(V.filter(x => x.estado_cobro !== 'Cobrado'), netoVenta) + sum(T.filter(x => x.estado !== 'Recibido'), x => x.neto_mxn);
  const muerto = sum(D.Inventario, i => i.stock_actual * (+i.costo_unitario + +i.costo_envio_prorrateado));
  const ing = sum(V.filter(x => mk(x.fecha) === cur), x => x.utilidad_neta) + sum(T.filter(x => mk(x.fecha) === cur), x => x.neto_mxn) + sum(O.filter(x => mk(x.fecha) === cur), x => x.monto_neto);
  const egr = sum(F.filter(x => mk(x.fecha) === cur), x => x.monto_mxn) + sum(D.Trading_Cuentas.filter(x => mk(x.fecha) === cur), x => x.costo_mxn);
  return { liquido, transito, muerto, ing, egr, balance: ing - egr, sat: Math.max(0, ing) * cfgNum('retencion', 10) / 100 };
}
const kpi = (l, v, sub = '', c = '', hero = '') => `<div class="card kpi ${hero}"><span class="mu">${l}</span><b class="${c}">${v}</b><small>${sub}</small></div>`;
const tbl = (cols, rows) => `<div class="scroll"><table><tr>${cols.map(c => `<th class="${c[2] || ''}">${c[0]}</th>`).join('')}</tr>${rows.map(r => `<tr>${cols.map(c => `<td class="${c[2] || ''}">${c[1](r)}</td>`).join('')}</tr>`).join('')}</table></div>`;
const chartCard = (id, t, span = '') => `<div class="card ${span}"><h4>${t}</h4><div class="chart"><canvas id="${id}"></canvas></div></div>`;

/* ============ Vistas ============ */
function viewResumen() {
  const k = calc(), M = months();
  $('#t-resumen').innerHTML = `<div class="grid g4">
    <div class="span2">${kpi('Dinero líquido en banco (SPEI)', mxn(k.liquido), 'Disponible para gastar', '', 'hero')}</div>
    ${kpi('En tránsito / por cobrar', mxn(k.transito), 'Plataformas y retiros en camino')}
    ${kpi('Capital en inventario', mxn(k.muerto), 'Stock físico en bodega')}
    ${kpi('Balance neto del mes', mxn(k.balance), `Ingresos ${mxn(k.ing)} · Egresos ${mxn(k.egr)}`, cls(k.balance))}
    ${kpi('Reserva para SAT (mes)', mxn(k.sat), 'Estimado sobre ingresos del mes')}
  </div>
  <h2>Flujo de caja</h2><div class="grid">${chartCard('c-flow', 'Ingresos por fuente vs. egresos, últimos 6 meses')}</div>`;
  const by = (rows, v) => M.map(m => sum(rows.filter(x => mk(x.fecha) === m), v));
  ch('c-flow', 'bar', {
    labels: M, datasets: [
      { label: 'E-commerce', data: by(D.Ventas_Ecommerce, x => x.utilidad_neta), backgroundColor: C.sand, stack: 'i' },
      { label: 'Trading', data: by(D.Trading_Retiros, x => x.neto_mxn), backgroundColor: C.pos, stack: 'i' },
      { label: 'Otros', data: by(D.Otros_Ingresos, x => x.monto_neto), backgroundColor: C.slate, stack: 'i' },
      { label: 'Egresos', type: 'line', data: by(D.Finanzas_Personales, x => x.monto_mxn).map((v, i) => v + sum(D.Trading_Cuentas.filter(x => mk(x.fecha) === M[i]), x => x.costo_mxn)), borderColor: C.neg, backgroundColor: C.neg, tension: .3 }]
  }, { stack: true });
}

function viewEcom() {
  const V = D.Ventas_Ecommerce.filter(x => (E.plat === 'Global' || x.plataforma === E.plat) && (!E.from || x.fecha >= E.from) && (!E.to || x.fecha <= E.to));
  const plats = ['Global', ...cfg('plataforma')];
  $('#t-ecommerce').innerHTML = `<div class="bar" style="margin-top:6px">
    <select id="f-plat">${plats.map(p => `<option ${p === E.plat ? 'selected' : ''}>${p}</option>`).join('')}</select>
    <input type="date" id="f-from" value="${E.from}" aria-label="Desde"><input type="date" id="f-to" value="${E.to}" aria-label="Hasta"></div>
  <div class="grid g3">${kpi('Ventas brutas', mxn(sum(V, x => x.precio_bruto)), `${sum(V, x => x.unidades)} unidades`)}${kpi('Utilidad neta', mxn(sum(V, x => x.utilidad_neta)), 'Después de comisión, envío, impuestos y costo', 'pos')}${kpi('Margen', (sum(V, x => x.precio_bruto) ? sum(V, x => x.utilidad_neta) / sum(V, x => x.precio_bruto) * 100 : 0).toFixed(1) + '%')}</div>
  <div class="grid g2" style="margin-top:14px">${chartCard('c-pl', 'Ventas brutas vs. utilidad neta por plataforma')}${chartCard('c-share', 'Participación de ingresos por canal')}${chartCard('c-top', 'Productos más rentables', 'span2')}</div>
  <h2>Inventario</h2><div class="card">${tbl([['SKU', i => i.sku], ['Producto', i => i.producto], ['Stock', i => i.stock_actual <= i.stock_minimo ? `<span class="chip">${i.stock_actual} · bajo</span>` : i.stock_actual, 'r'], ['Valor en bodega', i => mxn(i.stock_actual * (+i.costo_unitario + +i.costo_envio_prorrateado)), 'r']], D.Inventario)}</div>`;
  const P = cfg('plataforma'), g = (f) => P.map(p => sum(V.filter(x => x.plataforma === p), f));
  ch('c-pl', 'bar', { labels: P, datasets: [{ label: 'Bruta', data: g(x => x.precio_bruto), backgroundColor: C.slate, borderRadius: 4 }, { label: 'Neta', data: g(x => x.utilidad_neta), backgroundColor: C.sand, borderRadius: 4 }] });
  ch('c-share', 'doughnut', { labels: P, datasets: [{ data: g(x => x.precio_bruto), backgroundColor: PAL, borderWidth: 0 }] });
  const top = Object.entries(groupSum(V, x => x.sku, x => x.utilidad_neta)).sort((a, b) => b[1] - a[1]).slice(0, 5);
  ch('c-top', 'bar', { labels: top.map(t => D.Inventario.find(i => i.sku === t[0])?.producto || t[0]), datasets: [{ data: top.map(t => t[1]), backgroundColor: C.pos, borderRadius: 4 }] }, { axis: 'y', leg: false });
  $('#f-plat').onchange = e => { E.plat = e.target.value; viewEcom(); };
  $('#f-from').onchange = e => { E.from = e.target.value; viewEcom(); };
  $('#f-to').onchange = e => { E.to = e.target.value; viewEcom(); };
}

const TR = { modo: 'Todas' };
function viewTrading() {
  const all = [...D.Trading_Bitacora].sort((a, b) => a.fecha.localeCompare(b.fecha)), R = D.Trading_Retiros, Cu = D.Trading_Cuentas;
  const B = all.filter(x => TR.modo === 'Todas' || (TR.modo === 'Fondeada') === (x.fase === 'Fondeada'));
  const w = B.filter(x => x.resultado_usd > 0), l = B.filter(x => x.resultado_usd < 0);
  const gw = sum(w, x => x.resultado_usd), gl = Math.abs(sum(l, x => x.resultado_usd));
  const last = {};
  [...Cu].sort((a, b) => a.fecha.localeCompare(b.fecha)).forEach(x => { const p = last[x.cuenta] || {}; last[x.cuenta] = { ...x, fondeadora: x.fondeadora || p.fondeadora, tamano_usd: +x.tamano_usd || p.tamano_usd }; });
  const ac = Object.values(last).map(x => ({ ...x, gastado: sum(Cu.filter(c => c.cuenta === x.cuenta), c => c.costo_mxn), pnl: sum(all.filter(t => t.cuenta === x.cuenta), t => t.resultado_usd) }));
  const n = e => ac.filter(x => x.estado === e).length, inv = sum(Cu, x => x.costo_mxn), ret = sum(R.filter(x => x.estado === 'Recibido'), x => x.neto_mxn);
  $('#t-trading').innerHTML = `<div class="grid g4" style="margin-top:6px">
    ${kpi('Invertido en evaluaciones', mxn(inv), 'Cuenta como gasto, no como ingreso', 'neg')}
    ${kpi('Retirado a banco', mxn(ret), 'Único dinero de trading que cuenta como ingreso', 'pos')}
    ${kpi('Resultado real', mxn(ret - inv), 'Retirado menos invertido', cls(ret - inv))}
    ${kpi('Cuentas', `${n('Fase 1') + n('Fase 2')} · ${n('Fondeada')} · ${n('Perdida')}`, 'En evaluación · fondeadas · perdidas')}</div>
  <div class="bar" style="margin-top:14px"><select id="f-modo" aria-label="Tipo de cuenta">${['Todas', 'Evaluación', 'Fondeada'].map(m => `<option ${m === TR.modo ? 'selected' : ''}>${m}</option>`).join('')}</select></div>
  <p class="mu" style="margin-bottom:12px;font-size:13px">${TR.modo === 'Fondeada' ? 'Operaciones en cuentas fondeadas.' : 'Las operaciones en evaluación son simuladas: se muestran aquí pero no suman a tus ingresos.'}</p>
  <div class="grid g4">
    ${kpi('Win rate', (B.length ? w.length / B.length * 100 : 0).toFixed(1) + '%', `${w.length} ganadas · ${l.length} perdidas`)}
    ${kpi('Profit factor', gl ? (gw / gl).toFixed(2) : '–')}
    ${kpi('Ganancia vs. pérdida promedio', `${usd(w.length ? gw / w.length : 0)} / ${usd(l.length ? -gl / l.length : 0)}`)}
    ${kpi('Resultado acumulado', usd(gw - gl), TR.modo === 'Fondeada' ? '' : 'Incluye simulación', cls(gw - gl))}</div>
  <div class="grid g2" style="margin-top:14px">${chartCard('c-eq', 'Curva de equidad y drawdown (USD)')}${chartCard('c-day', 'Resultado diario (USD)')}</div>
  <h2>Cuentas y evaluaciones</h2><div class="card">${tbl([['Cuenta', x => x.cuenta], ['Fondeadora', x => x.fondeadora || '–'], ['Tamaño', x => usd(x.tamano_usd), 'r'], ['Estado', x => x.estado === 'Perdida' ? `<span class="chip">Perdida</span>` : x.estado], ['Invertido', x => mxn(x.gastado), 'r'], ['P&L USD', x => `<span class="${x.estado === 'Fondeada' ? cls(x.pnl) : 'mu'}">${usd(x.pnl)}</span>`, 'r']], ac)}</div>
  <h2>Retiros</h2><div class="card">${tbl([['Fecha', x => x.fecha], ['Cuenta', x => x.cuenta], ['USD', x => usd(x.monto_usd), 'r'], ['Neto MXN', x => mxn(x.neto_mxn), 'r'], ['Estado', x => x.estado]], [...R].reverse())}</div>`;
  let acc = 0, peak = 0; const eq = B.map(x => (acc += +x.resultado_usd)), dd = eq.map(v => (peak = Math.max(peak, v), v - peak));
  ch('c-eq', 'line', { labels: B.map(x => x.fecha), datasets: [{ label: 'Equidad', data: eq, borderColor: C.sand, pointRadius: 0, tension: .25 }, { label: 'Drawdown', data: dd, borderColor: C.neg, backgroundColor: 'rgba(217,139,139,.15)', fill: true, pointRadius: 0, tension: .25 }] });
  const day = groupSum(B, x => x.fecha, x => x.resultado_usd), k = Object.keys(day);
  ch('c-day', 'bar', { labels: k, datasets: [{ data: k.map(d => day[d]), backgroundColor: k.map(d => day[d] >= 0 ? C.pos : C.neg), borderRadius: 3 }] }, { leg: false });
  $('#f-modo').onchange = e => { TR.modo = e.target.value; viewTrading(); };
}

function viewFin() {
  const F = D.Finanzas_Personales, O = D.Otros_Ingresos, M = months(), tipos = ['Gasto Fijo', 'Gasto Variable', 'Ahorro/Reserva'];
  const cats = [...new Set(F.filter(x => x.tipo !== 'Ahorro/Reserva').map(x => x.categoria))];
  $('#t-finanzas').innerHTML = `<div class="grid g3" style="margin-top:6px">${kpi('Gastos del mes', mxn(sum(F.filter(x => mk(x.fecha) === mk(today()) && x.tipo !== 'Ahorro/Reserva'), x => x.monto_mxn)))}${kpi('Ahorro acumulado', mxn(sum(F.filter(x => x.tipo === 'Ahorro/Reserva'), x => x.monto_mxn)), '', 'pos')}${kpi('Otros ingresos netos', mxn(sum(O, x => x.monto_neto)), `${O.length} registros`)}</div>
  <div class="grid g2" style="margin-top:14px">${chartCard('c-type', 'Fijos vs. variables')}${chartCard('c-cat', 'Evolución mensual por categoría')}</div>
  <h2>Otros ingresos</h2><div class="card">${tbl([['Fecha', x => x.fecha], ['Concepto', x => x.concepto], ['Categoría', x => x.categoria], ['Neto', x => mxn(x.monto_neto), 'r']], [...O].reverse())}</div>`;
  ch('c-type', 'doughnut', { labels: tipos, datasets: [{ data: tipos.map(t => sum(F.filter(x => x.tipo === t), x => x.monto_mxn)), backgroundColor: [C.sand, C.slate, C.pos], borderWidth: 0 }] });
  ch('c-cat', 'bar', { labels: M, datasets: cats.map((c, i) => ({ label: c, data: M.map(m => sum(F.filter(x => x.categoria === c && mk(x.fecha) === m), x => x.monto_mxn)), backgroundColor: PAL[i % 6] })) }, { stack: true });
}

const VIEWS = { resumen: viewResumen, ecommerce: viewEcom, trading: viewTrading, finanzas: viewFin };
function render() { VIEWS[tab](); }

/* ============ Formularios ============ */
const catKey = v => 'cat_' + ({ 'Gasto Fijo': 'fijo', 'Gasto Variable': 'variable', 'Ahorro/Reserva': 'ahorro' }[v.tipo] || 'fijo');
const FORMS = {
  venta: { sheet: 'Ventas_Ecommerce', title: 'Venta', f: [['fecha', 'Fecha', 'date'], ['plataforma', 'Plataforma', 'cfg:plataforma'], ['sku', 'Producto', 'sku'], ['unidades', 'Unidades', 'num'], ['precio_bruto', 'Precio de venta bruto', 'num'], ['comision', 'Comisión de plataforma', 'num'], ['envio', 'Envío / logística', 'num'], ['impuestos', 'Impuestos retenidos (ISR/IVA)', 'num'], ['estado_cobro', 'Estado del pago', 'opt:En tránsito,Cobrado']] },
  cuenta: { sheet: 'Trading_Cuentas', title: 'Cuenta / evaluación', f: [['fecha', 'Fecha', 'date'], ['cuenta', 'Cuenta', 'cfg:cuenta_trading'], ['fondeadora', 'Fondeadora (solo si es nueva)', 'text'], ['tamano_usd', 'Tamaño de cuenta USD (si es nueva)', 'num'], ['costo_mxn', 'Costo pagado MXN (evaluación o reset)', 'num'], ['estado', 'Estado actual', 'opt:Fase 1,Fase 2,Fondeada,Perdida']] },
  producto: { sheet: 'Inventario', title: 'Producto', f: [['sku', 'SKU', 'text'], ['producto', 'Nombre', 'text'], ['costo_unitario', 'Costo unitario', 'num'], ['costo_envio_prorrateado', 'Envío prorrateado', 'num'], ['stock_inicial', 'Stock inicial', 'num'], ['precio_sugerido', 'Precio sugerido', 'num'], ['stock_minimo', 'Alerta de stock bajo', 'num']] },
  operacion: { sheet: 'Trading_Bitacora', title: 'Operación', f: [['fecha', 'Fecha', 'date'], ['cuenta', 'Cuenta', 'cfg:cuenta_trading'], ['instrumento', 'Instrumento', 'text'], ['direccion', 'Dirección', 'opt:Buy,Sell'], ['riesgo_pct', 'Riesgo %', 'num'], ['resultado_usd', 'Resultado USD', 'num'], ['resultado_pips', 'Pips / puntos', 'num'], ['fase', 'Estado de la cuenta', 'opt:Fase 1,Fase 2,Fondeada'], ['notas', 'Notas', 'text']] },
  retiro: { sheet: 'Trading_Retiros', title: 'Retiro', f: [['fecha', 'Fecha de solicitud', 'date'], ['cuenta', 'Cuenta', 'cfg:cuenta_trading'], ['monto_usd', 'Monto bruto USD', 'num'], ['comision_red', 'Comisión de red (USDT TRC20)', 'num'], ['tipo_cambio', 'Tipo de cambio', 'num'], ['estado', 'Estado', 'opt:Solicitado,En tránsito,Recibido']] },
  ingreso: { sheet: 'Otros_Ingresos', title: 'Ingreso', f: [['fecha', 'Fecha', 'date'], ['concepto', 'Concepto', 'text'], ['categoria', 'Categoría', 'cfg:cat_ingreso'], ['monto_bruto', 'Monto bruto', 'num'], ['impuestos', 'Impuestos / retenciones', 'num']] },
  gasto: { sheet: 'Finanzas_Personales', title: 'Gasto', f: [['fecha', 'Fecha', 'date'], ['tipo', 'Tipo', 'opt:Gasto Fijo,Gasto Variable,Ahorro/Reserva'], ['categoria', 'Categoría', 'cfg:*'], ['descripcion', 'Descripción', 'text'], ['monto_mxn', 'Monto MXN', 'num'], ['metodo_pago', 'Método de pago', 'opt:Efectivo,Tarjeta,SPEI']] }
};
const TABFORMS = { resumen: ['venta', 'operacion', 'retiro', 'ingreso', 'gasto'], ecommerce: ['venta', 'producto'], trading: ['operacion', 'cuenta', 'retiro'], finanzas: ['gasto', 'ingreso'] };

function optionsFor(f, vals) {
  const t = f[2];
  if (t.startsWith('opt:')) return t.slice(4).split(',');
  const key = t === 'cfg:*' ? catKey(vals) : t.slice(4);
  return [...cfg(key), '＋ Agregar nuevo…'];
}
function openForm(name) {
  const F = FORMS[name], names = TABFORMS[tab];
  $('#sheet').innerHTML = `<div class="tabs">${names.map(n => `<button class="${n === name ? 'on' : ''}" data-form="${n}">${FORMS[n].title}</button>`).join('')}</div>
  <form id="form">${F.f.map(f => `<label>${f[1]}</label>${fieldHtml(f)}`).join('')}<div class="row"><button type="button" class="ghost" id="cancel">Cancelar</button><button>Guardar</button></div></form>`;
  $('#modal').hidden = false;
  $$('[data-form]').forEach(b => b.onclick = () => openForm(b.dataset.form));
  $('#cancel').onclick = () => ($('#modal').hidden = true);
  const form = $('#form'), vals = () => Object.fromEntries(new FormData(form));
  const refill = () => $$('select[data-cfg]', form).forEach(s => { const f = F.f.find(x => x[0] === s.name); s.innerHTML = optionsFor(f, vals()).map(o => `<option>${o}</option>`).join(''); });
  $$('select', form).forEach(s => s.onchange = async () => {
    if (s.value.startsWith('＋')) {
      const v = prompt('Nombre del nuevo elemento'); const f = F.f.find(x => x[0] === s.name);
      if (v) { const key = f[2] === 'cfg:*' ? catKey(vals()) : f[2].slice(4); const row = { tipo: key, valor: v.trim(), extra: '' }; D.Configuracion.push(row); post('Configuracion', row); refill(); s.value = v.trim(); } else refill();
    } else if (s.name === 'tipo') refill();
  });
  form.onsubmit = async e => {
    e.preventDefault();
    const row = vals(); F.f.forEach(f => { if (f[2] === 'num') row[f[0]] = +row[f[0]] || 0; });
    derive(name, row);
    D[F.sheet].push(row); $('#modal').hidden = true; render();
    try { await post(F.sheet, row); } catch (err) { alert('Error de red: ' + err.message); }
  };
}
function fieldHtml(f) {
  const t = f[2], n = f[0];
  if (t === 'date') return `<input type="date" name="${n}" value="${today()}" required>`;
  if (t === 'num') return `<input type="number" step="any" name="${n}" inputmode="decimal">`;
  if (t === 'text') return `<input name="${n}">`;
  if (t === 'sku') return `<select name="${n}">${D.Inventario.map(i => `<option value="${i.sku}">${i.producto} (${i.stock_actual})</option>`).join('')}</select>`;
  const o = optionsFor(f, { tipo: 'Gasto Fijo' });
  return `<select name="${n}" ${t.startsWith('cfg') ? 'data-cfg' : ''}>${o.map(x => `<option>${x}</option>`).join('')}</select>`;
}
function derive(name, r) {
  if (name === 'venta') { const i = D.Inventario.find(x => x.sku === r.sku); r.costo_producto = (+i.costo_unitario + +i.costo_envio_prorrateado) * r.unidades; r.utilidad_neta = r.precio_bruto - r.comision - r.envio - r.impuestos - r.costo_producto; i.stock_actual -= r.unidades; }
  if (name === 'retiro') r.neto_mxn = (r.monto_usd - r.comision_red) * r.tipo_cambio;
  if (name === 'ingreso') r.monto_neto = r.monto_bruto - r.impuestos;
  if (name === 'producto') r.stock_actual = r.stock_inicial;
}

/* ============ Arranque ============ */
function show(app) { $('#setup').hidden = app; $('#app').hidden = !app; }
async function start() {
  try { await load(); show(true); render(); }
  catch (e) { show(false); $('#err').textContent = 'No se pudo conectar: ' + e.message + '. Revisa que la implementación sea pública.'; }
}
$('#connect').onclick = () => { URL_ = $('#url').value.trim(); localStorage.setItem('fin_url', URL_); localStorage.removeItem('fin_demo'); start(); };
$('#demo').onclick = () => { URL_ = ''; localStorage.removeItem('fin_url'); localStorage.setItem('fin_demo', '1'); start(); };
$('#settings').onclick = () => { $('#url').value = URL_; show(false); };
$('#fab').onclick = () => openForm(TABFORMS[tab][0]);
$('#modal').onclick = e => { if (e.target.id === 'modal') $('#modal').hidden = true; };
$$('#nav button').forEach(b => b.onclick = () => {
  tab = b.dataset.tab; $$('#nav button').forEach(x => x.classList.toggle('on', x === b));
  Object.keys(VIEWS).forEach(t => ($('#t-' + t).hidden = t !== tab)); render();
});
if (URL_ || localStorage.getItem('fin_demo')) start(); else show(false);
