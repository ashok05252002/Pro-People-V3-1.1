// Reads the first sheet of an .xlsx or .csv file into rows of cell strings (no library:
// .xlsx is a zip, unzipped with the browser's DecompressionStream).

async function unzip(buf) {
  const v = new DataView(buf)
  let eocd = buf.byteLength - 22
  while (eocd >= 0 && v.getUint32(eocd, true) !== 0x06054b50) eocd--
  if (eocd < 0) throw new Error('Not an Excel file')
  const files = {}
  let p = v.getUint32(eocd + 16, true)
  for (let n = v.getUint16(eocd + 10, true); n > 0; n--) {
    const method = v.getUint16(p + 10, true), size = v.getUint32(p + 20, true)
    const nameLen = v.getUint16(p + 28, true), local = v.getUint32(p + 42, true)
    const name = new TextDecoder().decode(new Uint8Array(buf, p + 46, nameLen))
    files[name] = { method, size, local }
    p += 46 + nameLen + v.getUint16(p + 30, true) + v.getUint16(p + 32, true)
  }
  return async (name) => {
    const f = files[name]
    if (!f) return null
    const start = f.local + 30 + v.getUint16(f.local + 26, true) + v.getUint16(f.local + 28, true)
    const raw = new Uint8Array(buf, start, f.size)
    const data = f.method === 0 ? raw
      : new Uint8Array(await new Response(new Blob([raw]).stream().pipeThrough(new DecompressionStream('deflate-raw'))).arrayBuffer())
    return new TextDecoder().decode(data)
  }
}

const colIndex = (ref) => [...ref.replace(/\d+/g, '')].reduce((n, ch) => n * 26 + ch.charCodeAt(0) - 64, 0) - 1

async function readXlsx(buf) {
  const read = await unzip(buf)
  const xml = (s) => new DOMParser().parseFromString(s, 'application/xml')
  const shared = [...xml((await read('xl/sharedStrings.xml')) || '<sst/>').getElementsByTagName('si')].map((si) => si.textContent)
  const sheet = await read('xl/worksheets/sheet1.xml')
  if (!sheet) throw new Error('No sheet found in the file')
  return [...xml(sheet).getElementsByTagName('row')].map((row) => {
    const out = []
    for (const c of row.getElementsByTagName('c')) {
      const t = c.getAttribute('t'), v = c.getElementsByTagName('v')[0]?.textContent ?? ''
      out[colIndex(c.getAttribute('r'))] = t === 's' ? shared[+v] : t === 'inlineStr' ? c.textContent : v
    }
    return Array.from(out, (x) => (x ?? '').trim())
  })
}

function readCsv(text) {
  const rows = [[]]
  let cell = '', quoted = false
  for (let i = 0; i < text.length; i++) {
    const ch = text[i]
    if (quoted) {
      if (ch === '"' && text[i + 1] === '"') { cell += '"'; i++ } else if (ch === '"') quoted = false; else cell += ch
    } else if (ch === '"') quoted = true
    else if (ch === ',') { rows.at(-1).push(cell.trim()); cell = '' }
    else if (ch === '\n') { rows.at(-1).push(cell.trim()); cell = ''; rows.push([]) }
    else if (ch !== '\r') cell += ch
  }
  rows.at(-1).push(cell.trim())
  return rows
}

// -> { header: [...], rows: [{ [header]: value }] } with blank lines dropped.
export async function readSheet(file) {
  const grid = /\.csv$/i.test(file.name) ? readCsv(await file.text()) : await readXlsx(await file.arrayBuffer())
  const [header = [], ...body] = grid.filter((r) => r.some((c) => c))
  return { header, rows: body.map((r) => Object.fromEntries(header.map((h, i) => [h, r[i] ?? '']))) }
}

// Excel serial day, yyyy-mm-dd, dd-mm-yyyy or dd/mm/yyyy -> yyyy-mm-dd ('' if unreadable).
export function toIsoDate(v) {
  if (/^\d{5}(\.\d+)?$/.test(v)) return new Date(Date.UTC(1899, 11, 30) + Math.floor(+v) * 864e5).toISOString().slice(0, 10)
  let m = v.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/)
  if (m) return `${m[1]}-${m[2].padStart(2, '0')}-${m[3].padStart(2, '0')}`
  m = v.match(/^(\d{1,2})[-/](\d{1,2})[-/](\d{4})$/)
  return m ? `${m[3]}-${m[2].padStart(2, '0')}-${m[1].padStart(2, '0')}` : ''
}

export function downloadCsv(name, rows) {
  const text = rows.map((r) => r.map((c) => (/[",\n]/.test(c) ? `"${c.replace(/"/g, '""')}"` : c)).join(',')).join('\r\n')
  const a = Object.assign(document.createElement('a'), { href: URL.createObjectURL(new Blob([text], { type: 'text/csv' })), download: name })
  a.click()
  URL.revokeObjectURL(a.href)
}
