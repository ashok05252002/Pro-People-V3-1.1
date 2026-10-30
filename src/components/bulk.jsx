// Bulk Upload popup: template download, .xlsx/.csv upload, per-row check with preview, import of the valid rows.
import { useState } from 'react'
import { Upload, FileSpreadsheet, Download, CircleCheck, CircleAlert } from 'lucide-react'
import { Btn } from './table'
import { Modal, toast } from './forms'
import { readSheet, downloadCsv } from '../data/sheet'

/**
 * columns: template header; required: columns that must exist in the file; sample: example template rows
 * check(row) -> { error, cells } where cells are preview values matching head; onImport(validChecks)
 */
export function BulkUpload({ open, onClose, title, noun, file: templateName, columns, required, sample, hint, head, check, onImport }) {
  const [file, setFile] = useState(null)
  const [rows, setRows] = useState(null)
  const [error, setError] = useState('')
  const reset = () => { setFile(null); setRows(null); setError('') }
  const close = () => { reset(); onClose() }

  const pick = async (f) => {
    reset()
    if (!f) return
    setFile(f)
    try {
      const { header, rows: data } = await readSheet(f)
      const missing = required.filter((c) => !header.includes(c))
      if (missing.length) return setError(`Missing column${missing.length > 1 ? 's' : ''}: ${missing.join(', ')}. Use the template.`)
      if (!data.length) return setError('The sheet has no rows.')
      setRows(data.map(check))
    } catch {
      setError('Could not read this file. Upload an .xlsx or .csv file.')
    }
  }
  const valid = rows ? rows.filter((r) => !r.error) : []
  const plural = (n) => `${noun}${n === 1 ? '' : 's'}`
  const importRows = () => {
    onImport(valid)
    toast(`${valid.length} ${plural(valid.length)} imported`)
    close()
  }

  return (
    <Modal open={open} onClose={close} title={title} size="max-w-3xl"
      footer={<><Btn onClick={close}>Cancel</Btn><Btn primary icon={Upload} onClick={importRows} className={valid.length ? '' : 'btn-disabled'}>Import {valid.length || ''} {plural(valid.length).replace(/^./, (c) => c.toUpperCase())}</Btn></>}>
      <div className="mb-4 flex items-center justify-between gap-3 rounded-lg bg-base-200 px-4 py-3 text-[13px]">
        <span>Fill the template in Excel, then upload it here.<span className="block text-[11px] text-base-content/60">Columns: {columns.join(', ')}. {hint}</span></span>
        <Btn icon={Download} onClick={() => downloadCsv(templateName, [columns, ...sample])} className="shrink-0">Template</Btn>
      </div>

      <label className="flex cursor-pointer flex-col items-center gap-2 rounded-lg border-2 border-dashed border-base-300 px-4 py-7 text-center hover:border-primary hover:bg-primary/5"
        onDragOver={(e) => e.preventDefault()} onDrop={(e) => { e.preventDefault(); pick(e.dataTransfer.files[0]) }}>
        <FileSpreadsheet size={30} className="text-primary" />
        <span className="font-semibold">{file ? file.name : 'Drop the Excel file here or click to choose'}</span>
        <span className="text-[11px] text-base-content/60">.xlsx or .csv</span>
        <input type="file" accept=".xlsx,.csv" className="hidden" onChange={(e) => { pick(e.target.files[0]); e.target.value = '' }} />
      </label>

      {error && <p className="mt-3 flex items-center gap-2 rounded-md bg-error/10 px-3 py-2 text-[13px] text-error"><CircleAlert size={15} />{error}</p>}

      {rows && (
        <div className="mt-4">
          <p className="mb-2 text-[13px]"><b className="text-success">{valid.length} ready</b>{rows.length > valid.length && <>, <b className="text-error">{rows.length - valid.length} with errors</b> (skipped)</>}</p>
          <div className="max-h-72 overflow-auto rounded-lg border border-base-300">
            <table className="table table-sm text-[12px]">
              <thead className="sticky top-0 bg-base-100"><tr><th>#</th>{head.map((h) => <th key={h}>{h}</th>)}<th>Status</th></tr></thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={i} className={r.error ? 'bg-error/5' : ''}>
                    <td>{i + 1}</td>
                    {r.cells.map((c, j) => <td key={j}>{c || '-'}</td>)}
                    <td>{r.error ? <span className="flex items-center gap-1 text-error"><CircleAlert size={13} />{r.error}</span> : <span className="flex items-center gap-1 text-success"><CircleCheck size={13} />Ready</span>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </Modal>
  )
}

// Employee cell for the preview table.
export const empCell = (e, code) => (e ? <>{e.name}<span className="block text-[11px] text-base-content/50">{e.code}</span></> : code)
