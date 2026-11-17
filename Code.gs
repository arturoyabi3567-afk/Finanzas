/**
 * API REST sobre Google Sheets.
 * Despliegue: Implementar > Nueva implementación > Aplicación web
 *   Ejecutar como: Yo  |  Quién tiene acceso: Cualquier persona
 * Primero ejecuta setup() una vez para crear las pestañas.
 *
 * CORS: el frontend envía POST con Content-Type text/plain (sin preflight)
 * y Apps Script responde con cabeceras abiertas para peticiones GET/POST simples.
 */

// Estructura exacta de columnas por pestaña (fila 1 de cada hoja)
// Clave secreta opcional. Si la llenas, la app debe enviarla (campo Token). Vacía = sin protección.
const TOKEN = '';

const SCHEMA = {
  Configuracion:       ['tipo', 'valor', 'extra'],
  Inventario:          ['sku', 'producto', 'costo_unitario', 'costo_envio_prorrateado',
                        'stock_inicial', 'stock_actual', 'precio_sugerido', 'stock_minimo'],
  Ventas_Ecommerce:    ['fecha', 'plataforma', 'sku', 'unidades', 'precio_bruto', 'comision',
                        'envio', 'impuestos', 'costo_producto', 'utilidad_neta', 'estado_cobro'],
  Compras_Inventario:  ['fecha', 'sku', 'unidades', 'costo_mxn', 'proveedor'],
  Trading_Bitacora:    ['fecha', 'cuenta', 'instrumento', 'direccion', 'riesgo_pct',
                        'resultado_usd', 'resultado_pips', 'fase', 'notas'],
  Trading_Retiros:     ['fecha', 'cuenta', 'monto_usd', 'comision_red', 'tipo_cambio',
                        'neto_mxn', 'estado'],
  Trading_Cuentas:     ['fecha', 'cuenta', 'fondeadora', 'tamano_usd', 'costo_mxn', 'estado', 'meta_pct', 'dd_max_pct'],
  Otros_Ingresos:      ['fecha', 'concepto', 'categoria', 'monto_bruto', 'impuestos', 'monto_neto'],
  Finanzas_Personales: ['fecha', 'tipo', 'categoria', 'descripcion', 'monto_mxn', 'metodo_pago']
};

// Catálogos iniciales (se pueden ampliar desde la web)
const SEED = [
  ['plataforma', 'Mercado Libre', 17], ['plataforma', 'TikTok Shop', 8],
  ['plataforma', 'Amazon', 15], ['plataforma', 'Facebook Marketplace', 0],
  ['plataforma', 'Venta Directa', 0],
  ['cat_fijo', 'Renta', ''], ['cat_fijo', 'Servicios', ''], ['cat_fijo', 'Gimnasio', ''],
  ['cat_variable', 'Alimentación', ''], ['cat_variable', 'Transporte', ''],
  ['cat_variable', 'Cuidado Personal', ''],
  ['cat_ahorro', 'Fondo de emergencia', ''],
  ['cuenta_trading', 'Cuenta Fondeo 1', ''],
  ['cat_ingreso', 'Servicios técnicos', ''], ['cat_ingreso', 'Proyectos independientes', ''],
  ['cat_ingreso', 'Eventos', ''],
  ['retencion', 'SAT (reserva %)', 10], ['saldo_inicial', 'Saldo inicial banco', 0]
];

/** Crea las pestañas y encabezados. Ejecutar una sola vez. */
function setup() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  Object.keys(SCHEMA).forEach(name => {
    const sh = ss.getSheetByName(name) || ss.insertSheet(name);
    sh.getRange(1, 1, 1, SCHEMA[name].length).setValues([SCHEMA[name]]).setFontWeight('bold');
    sh.setFrozenRows(1);
  });
  const cfg = ss.getSheetByName('Configuracion');
  if (cfg.getLastRow() < 2) cfg.getRange(2, 1, SEED.length, 3).setValues(SEED);
}

/** GET ?action=all  -> todas las pestañas como JSON */
function doGet(e) {
  try {
    if (TOKEN && e.parameter.token !== TOKEN) throw new Error('No autorizado: revisa el token');
    const out = {};
    Object.keys(SCHEMA).forEach(n => out[n] = readSheet_(n));
    return json_({ ok: true, data: out });
  } catch (err) { return json_({ ok: false, error: String(err) }); }
}

/** POST {action:'add'|'update'|'delete', sheet, row, _row} */
function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(15000);
  try {
    const b = JSON.parse(e.postData.contents);
    if (TOKEN && b.token !== TOKEN) throw new Error('No autorizado: revisa el token');
    if (!SCHEMA[b.sheet]) throw new Error('Hoja inválida');
    const sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(b.sheet);
    const cols = SCHEMA[b.sheet];
    const toRow = o => cols.map(c => o[c] === undefined ? '' : o[c]);
    if (b.action === 'add') {
      sh.appendRow(toRow(b.row)); stock_(b.sheet, b.row, 1);
    } else if (b.action === 'update' || b.action === 'delete') {
      const r = Number(b._row);
      if (!(r >= 2 && r <= sh.getLastRow())) throw new Error('Fila inválida');
      const old = {}; sh.getRange(r, 1, 1, cols.length).getValues()[0].forEach((v, i) => old[cols[i]] = v);
      stock_(b.sheet, old, -1);                       // revierte el efecto del registro anterior
      if (b.action === 'delete') sh.deleteRow(r);
      else { sh.getRange(r, 1, 1, cols.length).setValues([toRow(b.row)]); stock_(b.sheet, b.row, 1); }
    } else throw new Error('Acción inválida');
    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  } finally { lock.releaseLock(); }
}

/** Ajusta stock_actual: las ventas restan, las compras suman. dir=1 aplica, dir=-1 revierte */
function stock_(sheet, row, dir) {
  if (sheet !== 'Ventas_Ecommerce' && sheet !== 'Compras_Inventario') return;
  const sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Inventario');
  const rows = sh.getDataRange().getValues();
  const col = SCHEMA.Inventario.indexOf('stock_actual') + 1;
  const u = Number(row.unidades) * (sheet === 'Ventas_Ecommerce' ? -1 : 1) * dir;
  for (let i = 1; i < rows.length; i++) {
    if (rows[i][0] === row.sku) { sh.getRange(i + 1, col).setValue(Number(rows[i][col - 1]) + u); return; }
  }
}

/** Lee una hoja como objetos; _row es el número de fila real (para editar/borrar) */
function readSheet_(name) {
  const sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(name);
  const [head, ...rows] = sh.getDataRange().getValues();
  const tz = Session.getScriptTimeZone();
  return rows.map((r, i) => ({ r, n: i + 2 })).filter(x => x.r.some(c => c !== '')).map(x => {
    const o = { _row: x.n };
    head.forEach((h, i) => { o[h] = x.r[i] instanceof Date ? Utilities.formatDate(x.r[i], tz, 'yyyy-MM-dd') : x.r[i]; });
    return o;
  });
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
