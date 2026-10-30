// Apply Leave: one leave from the form, or many from an uploaded Excel/CSV sheet (Bulk Upload).
// Applications go into the 'leaveApplications' store, so they also show on Time Tracker > Leaves Requests.
import { useState } from 'react'
import { Send, Trash2, Upload, FileSpreadsheet, Download, CircleCheck, CircleAlert } from 'lucide-react'
import { Page, Btn, DataTable, Person } from '../../components/table'
import { FormGrid, Modal, readForm, toast, useOpen } from '../../components/forms'
import { useRows, val } from '../../data/store'
import { employees, emp } from '../../data/people'
import { readSheet, toIsoDate, downloadCsv } from '../../data/sheet'

export const leaveTypes = ['Annual Leave', 'Sick Leave', 'Casual Leave', 'Special Leave - Accompany Patient', 'Bereavement Leave']
const dayTypes = ['Full Day', 'First Half', 'Second Half']
const active = employees.filter((e) => e.status === 'Active')
const today = new Date().toISOString().slice(0, 10)

const fmt = (d) => new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: '2-digit' })
const daysOf = (from, to, dayType) => {
  const n = Math.max(1, Math.round((new Date(to || from) - new Date(from)) / 864e5) + 1)
  return dayType === 'Full Day' ? n : n - 0.5
}
const appliedNow = () => new Date().toLocaleString('en-US', { month: 'short', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })

// One application row per employee.
const applicationOf = (e, v, mode) => {
  const from = v['From Date'] || today, to = v['To Date'] || from
  const days = daysOf(from, to, v['Day Type'] || 'Full Day')
  return {
    e, type: v['Leave Type'] || leaveTypes[0], from, to, days,
    dates: from === to ? fmt(from) : `${fmt(from)} - ${fmt(to)}`,
    dayType: v['Day Type'] || 'Full Day', reason: val(v.Reason), mode, applied: appliedNow(), status: 'Pending',
  }
}

export const useApplications = () => useRows('leaveApplications', () => [
  [2, 'Annual Leave', '2026-11-09', '2026-11-11', 'Single'], [7, 'Sick Leave', '2026-10-29', '2026-10-29', 'Single'],
  [12, 'Casual Leave', '2026-11-14', '2026-11-14', 'Bulk Upload'], [15, 'Casual Leave', '2026-11-14', '2026-11-14', 'Bulk Upload'],
].map(([i, type, from, to, mode], n) => ({
  ...applicationOf(emp(i), { 'Leave Type': type, 'From Date': from, 'To Date': to, Reason: 'Personal work' }, mode),
  id: n + 1, applied: 'Oct 28, 2026 10:15 AM',
})))

const leaveFields = [
  { label: 'Leave Type', type: 'select', options: leaveTypes, value: leaveTypes[0], req: true },
  { label: 'Day Type', type: 'radio', options: dayTypes, value: 'Full Day' },
  { label: 'From Date', type: 'date', value: today, req: true },
  { label: 'To Date', type: 'date', value: today, req: true },
  { label: 'Reason', type: 'textarea', placeholder: 'Reason for leave', span: true },
]

// ---- Bulk Upload ----
const columns = ['Employee Code', 'Leave Type', 'From Date', 'To Date', 'Day Type', 'Reason']
const template = () => downloadCsv('leave-bulk-upload-template.csv', [columns,
  [active[0].code, 'Annual Leave', '2026-11-16', '2026-11-18', 'Full Day', 'Family function'],
  [active[1].code, 'Sick Leave', '2026-11-05', '2026-11-05', 'First Half', 'Medical checkup']])

const pickType = (s, list) => list.find((t) => t.toLowerCase() === s.toLowerCase())

// Sheet row -> { e, values, error }
function checkRow(r) {
  const code = r['Employee Code'] || ''
  const e = employees.find((x) => x.code.toLowerCase() === code.toLowerCase())
  const type = pickType(r['Leave Type'] || '', leaveTypes)
  const dayType = r['Day Type'] ? pickType(r['Day Type'], dayTypes) : 'Full Day'
  const from = toIsoDate(r['From Date'] || ''), to = r['To Date'] ? toIsoDate(r['To Date']) : from
  const error = !e ? `Employee "${code || 'blank'}" not found`
    : !type ? `Unknown leave type "${r['Leave Type'] || 'blank'}"`
      : !from ? 'From Date missing or unreadable'
        : !to ? 'To Date unreadable'
          : to < from ? 'To Date is before From Date'
            : !dayType ? `Unknown day type "${r['Day Type']}"` : ''
  return { code, e, error, values: { 'Leave Type': type, 'From Date': from, 'To Date': to, 'Day Type': dayType, Reason: r.Reason } }
}

function BulkUpload({ open, onClose }) {
  const [, add] = useApplications()
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
      const missing = ['Employee Code', 'Leave Type', 'From Date'].filter((c) => !header.includes(c))
      if (missing.length) return setError(`Missing column${missing.length > 1 ? 's' : ''}: ${missing.join(', ')}. Use the template.`)
      if (!data.length) return setError('The sheet has no rows.')
      setRows(data.map(checkRow))
    } catch {
      setError('Could not read this file. Upload an .xlsx or .csv file.')
    }
  }
  const valid = rows ? rows.filter((r) => !r.error) : []
  const importRows = () => {
    valid.forEach((r) => add(applicationOf(r.e, r.values, 'Bulk Upload')))
    toast(`${valid.length} leave${valid.length === 1 ? '' : 's'} imported`)
    close()
  }

  return (
    <Modal open={open} onClose={close} title="Bulk Upload Leave" size="max-w-3xl"
      footer={<><Btn onClick={close}>Cancel</Btn><Btn primary icon={Upload} onClick={importRows} className={valid.length ? '' : 'btn-disabled'}>Import {valid.length || ''} Leave{valid.length === 1 ? '' : 's'}</Btn></>}>
      <div className="mb-4 flex items-center justify-between gap-3 rounded-lg bg-base-200 px-4 py-3 text-[13px]">
        <span>Fill the template in Excel, then upload it here.<span className="block text-[11px] text-base-content/60">Columns: {columns.join(', ')}. Dates as YYYY-MM-DD or DD-MM-YYYY.</span></span>
        <Btn icon={Download} onClick={template} className="shrink-0">Template</Btn>
      </div>

      <label className="flex cursor-pointer flex-col items-center gap-2 rounded-lg border-2 border-dashed border-base-300 px-4 py-7 text-center hover:border-primary hover:bg-primary/5"
        onDragOver={(e) => e.preventDefault()} onDrop={(e) => { e.preventDefault(); pick(e.dataTransfer.files[0]) }}>
        <FileSpreadsheet size={30} className="text-primary" />
        {file ? <span className="font-semibold">{file.name}</span> : <span className="font-semibold">Drop the Excel file here or click to choose</span>}
        <span className="text-[11px] text-base-content/60">.xlsx or .csv</span>
        <input type="file" accept=".xlsx,.csv" className="hidden" onChange={(e) => { pick(e.target.files[0]); e.target.value = '' }} />
      </label>

      {error && <p className="mt-3 flex items-center gap-2 rounded-md bg-error/10 px-3 py-2 text-[13px] text-error"><CircleAlert size={15} />{error}</p>}

      {rows && (
        <div className="mt-4">
          <p className="mb-2 text-[13px]"><b className="text-success">{valid.length} ready</b>{rows.length > valid.length && <>, <b className="text-error">{rows.length - valid.length} with errors</b> (skipped)</>}</p>
          <div className="max-h-72 overflow-auto rounded-lg border border-base-300">
            <table className="table table-sm text-[12px]">
              <thead className="sticky top-0 bg-base-100"><tr><th>#</th><th>Employee</th><th>Leave Type</th><th>Dates</th><th>Day Type</th><th>Status</th></tr></thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={i} className={r.error ? 'bg-error/5' : ''}>
                    <td>{i + 1}</td>
                    <td>{r.e ? <>{r.e.name}<span className="block text-[11px] text-base-content/50">{r.e.code}</span></> : r.code || '-'}</td>
                    <td>{r.values['Leave Type'] || '-'}</td>
                    <td>{r.values['From Date'] ? (r.values['To Date'] && r.values['To Date'] !== r.values['From Date'] ? `${fmt(r.values['From Date'])} - ${fmt(r.values['To Date'])}` : fmt(r.values['From Date'])) : '-'}</td>
                    <td>{r.values['Day Type'] || '-'}</td>
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

export function ApplyLeave() {
  const [rows, add, , remove] = useApplications()
  const [who, setWho] = useState(active[0].id)
  const [key, setKey] = useState(0)
  const [upload, showUpload, hideUpload] = useOpen()
  const e = employees.find((x) => x.id === Number(who))
  const submit = (ev) => {
    ev.preventDefault()
    add(applicationOf(e, readForm(ev.target), 'Single'))
    toast(`Leave applied for ${e.name}`)
    setKey(key + 1)
  }
  return (
    <Page title="Apply Leave" subtitle="Submit a leave request, or upload many from Excel"
      actions={<Btn icon={Upload} onClick={showUpload}>Bulk Upload</Btn>}>
      <form key={key} onSubmit={submit} className="rounded-box bg-base-100 p-5 shadow-sm">
        <div className="mb-4 flex flex-col gap-1.5 text-[13px]">
          <span className="font-medium">Employee <span className="text-rose-500">*</span></span>
          <select value={who} onChange={(ev) => setWho(ev.target.value)} className="select w-full">
            {active.map((x) => <option key={x.id} value={x.id}>{x.name} ({x.code})</option>)}
          </select>
        </div>
        <FormGrid fields={leaveFields} cols={2} />
        <div className="mt-5 flex justify-end gap-2">
          <Btn type="reset">Clear</Btn><Btn primary type="submit" icon={Send}>Apply Leave</Btn>
        </div>
      </form>

      <div className="mt-6">
        <h3 className="mb-2 text-base font-semibold">Applications <span className="text-base-content/50">({rows.length})</span></h3>
        <DataTable rows={rows} selectable={false} searchKeys={[]} columns={[
          { key: 'name', label: 'Employee', render: (r) => <Person e={r.e} badges={<span className="text-[11px] text-base-content/60">{r.e.code}</span>} /> },
          { key: 'type', label: 'Leave Type' }, { key: 'dates', label: 'Dates' },
          { key: 'days', label: 'Days', render: (r) => `${r.days} ${r.days === 1 ? 'day' : 'days'}` },
          { key: 'mode', label: 'Applied As', render: (r) => <span className={`rounded px-2 py-0.5 text-[11px] ${r.mode === 'Single' ? 'bg-base-300' : 'bg-neutral text-neutral-content'}`}>{r.mode}</span> },
          { key: 'applied', label: 'Applied On' },
          { key: 'status', label: 'Status', render: (r) => <span className="rounded bg-amber-100 px-2 py-0.5 text-[11px] text-amber-800">{r.status}</span> },
          { key: '_a', label: '', render: (r) => <button onClick={() => { remove(r.id); toast('Application withdrawn') }} className="btn btn-ghost btn-xs btn-square text-error"><Trash2 size={14} /></button> },
        ]} />
      </div>
      <BulkUpload open={upload} onClose={hideUpload} />
    </Page>
  )
}
