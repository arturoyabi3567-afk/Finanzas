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
const SCHEMA = {
  Configuracion:       ['tipo', 'valor', 'extra'],
  Inventario:          ['sku', 'producto', 'costo_unitario', 'costo_envio_prorrateado',
                        'stock_inicial', 'stock_actual', 'precio_sugerido', 'stock_minimo'],
  Ventas_Ecommerce:    ['fecha', 'plataforma', 'sku', 'unidades', 'precio_bruto', 'comision',
                        'envio', 'impuestos', 'costo_producto', 'utilidad_neta', 'estado_cobro'],
  Trading_Bitacora:    ['fecha', 'cuenta', 'instrumento', 'direccion', 'riesgo_pct',
                        'resultado_usd', 'resultado_pips', 'fase', 'notas'],
  Trading_Retiros:     ['fecha', 'cuenta', 'monto_usd', 'comision_red', 'tipo_cambio',
                        'neto_mxn', 'estado'],
  Trading_Cuentas:     ['fecha', 'cuenta', 'fondeadora', 'tamano_usd', 'costo_mxn', 'estado'],
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
    const out = {};
    Object.keys(SCHEMA).forEach(n => out[n] = readSheet_(n));
    return json_({ ok: true, data: out });
  } catch (err) { return json_({ ok: false, error: String(err) }); }
}

/** POST {action:'add', sheet, row:{...}} -> agrega una fila */
function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(15000);
  try {
    const body = JSON.parse(e.postData.contents);
    if (body.action !== 'add' || !SCHEMA[body.sheet]) throw new Error('Petición inválida');
    const sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(body.sheet);
    const cols = SCHEMA[body.sheet];
    sh.appendRow(cols.map(c => body.row[c] === undefined ? '' : body.row[c]));
    if (body.sheet === 'Ventas_Ecommerce') discountStock_(body.row.sku, Number(body.row.unidades));
    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  } finally { lock.releaseLock(); }
}

/** Descuenta unidades vendidas del stock actual en Inventario */
function discountStock_(sku, units) {
  const sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Inventario');
  const rows = sh.getDataRange().getValues();
  const col = SCHEMA.Inventario.indexOf('stock_actual') + 1;
  for (let i = 1; i < rows.length; i++) {
    if (rows[i][0] === sku) {
      sh.getRange(i + 1, col).setValue(Number(rows[i][col - 1]) - units);
      return;
    }
  }
}

/** Lee una hoja como arreglo de objetos; las fechas salen como yyyy-MM-dd */
function readSheet_(name) {
  const sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(name);
  const [head, ...rows] = sh.getDataRange().getValues();
  const tz = Session.getScriptTimeZone();
  return rows.filter(r => r.some(c => c !== '')).map(r => {
    const o = {};
    head.forEach((h, i) => {
      o[h] = r[i] instanceof Date ? Utilities.formatDate(r[i], tz, 'yyyy-MM-dd') : r[i];
    });
    return o;
  });
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
