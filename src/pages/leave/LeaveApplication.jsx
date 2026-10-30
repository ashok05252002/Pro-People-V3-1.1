// Apply Leave: one leave from the form, or many from an uploaded Excel/CSV sheet (Bulk Upload).
// Applications go into the 'leaveApplications' store, so they also show on Time Tracker > Leaves Requests.
import { useState } from 'react'
import { Send, Trash2, Upload } from 'lucide-react'
import { Page, Btn, DataTable, Person } from '../../components/table'
import { FormGrid, readForm, toast, useOpen } from '../../components/forms'
import { BulkUpload, empCell } from '../../components/bulk'
import { useRows, val } from '../../data/store'
import { employees, emp } from '../../data/people'
import { toIsoDate } from '../../data/sheet'

export const leaveTypes = ['Annual Leave', 'Sick Leave', 'Casual Leave', 'Special Leave - Accompany Patient', 'Bereavement Leave']
const dayTypes = ['Full Day', 'First Half', 'Second Half']
export const active = employees.filter((e) => e.status === 'Active')
export const today = new Date().toISOString().slice(0, 10)

export const fmt = (d) => new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: '2-digit' })
const daysOf = (from, to, dayType) => {
  const n = Math.max(1, Math.round((new Date(to || from) - new Date(from)) / 864e5) + 1)
  return dayType === 'Full Day' ? n : n - 0.5
}
export const appliedNow = () => new Date().toLocaleString('en-US', { month: 'short', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })
export const findEmp = (code) => employees.find((x) => x.code.toLowerCase() === code.toLowerCase())
export const pickOf = (s, list) => list.find((t) => t.toLowerCase() === s.toLowerCase())

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

// Sheet row -> { e, values, error, cells }
function checkLeave(r) {
  const code = r['Employee Code'] || ''
  const e = findEmp(code)
  const type = pickOf(r['Leave Type'] || '', leaveTypes)
  const dayType = r['Day Type'] ? pickOf(r['Day Type'], dayTypes) : 'Full Day'
  const from = toIsoDate(r['From Date'] || ''), to = r['To Date'] ? toIsoDate(r['To Date']) : from
  const error = !e ? `Employee "${code || 'blank'}" not found`
    : !type ? `Unknown leave type "${r['Leave Type'] || 'blank'}"`
      : !from ? 'From Date missing or unreadable'
        : !to ? 'To Date unreadable'
          : to < from ? 'To Date is before From Date'
            : !dayType ? `Unknown day type "${r['Day Type']}"` : ''
  return {
    e, error, values: { 'Leave Type': type, 'From Date': from, 'To Date': to, 'Day Type': dayType, Reason: r.Reason },
    cells: [empCell(e, code), type, from && (to && to !== from ? `${fmt(from)} - ${fmt(to)}` : fmt(from)), dayType],
  }
}

// Employee picker shared by the apply forms.
export function EmployeeSelect({ value, onChange }) {
  return (
    <div className="mb-4 flex flex-col gap-1.5 text-[13px]">
      <span className="font-medium">Employee <span className="text-rose-500">*</span></span>
      <select value={value} onChange={(ev) => onChange(ev.target.value)} className="select w-full">
        {active.map((x) => <option key={x.id} value={x.id}>{x.name} ({x.code})</option>)}
      </select>
    </div>
  )
}

export const appliedCols = (remove, middle) => [
  { key: 'name', label: 'Employee', render: (r) => <Person e={r.e} badges={<span className="text-[11px] text-base-content/60">{r.e.code}</span>} /> },
  ...middle,
  { key: 'mode', label: 'Applied As', render: (r) => <span className={`rounded px-2 py-0.5 text-[11px] ${r.mode === 'Single' ? 'bg-base-300' : 'bg-neutral text-neutral-content'}`}>{r.mode}</span> },
  { key: 'applied', label: 'Applied On' },
  { key: 'status', label: 'Status', render: (r) => <span className="rounded bg-amber-100 px-2 py-0.5 text-[11px] text-amber-800">{r.status}</span> },
  { key: '_a', label: '', render: (r) => <button onClick={() => { remove(r.id); toast('Application withdrawn') }} className="btn btn-ghost btn-xs btn-square text-error"><Trash2 size={14} /></button> },
]

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
        <EmployeeSelect value={who} onChange={setWho} />
        <FormGrid fields={leaveFields} cols={2} />
        <div className="mt-5 flex justify-end gap-2">
          <Btn type="reset">Clear</Btn><Btn primary type="submit" icon={Send}>Apply Leave</Btn>
        </div>
      </form>

      <div className="mt-6">
        <h3 className="mb-2 text-base font-semibold">Applications <span className="text-base-content/50">({rows.length})</span></h3>
        <DataTable rows={rows} selectable={false} searchKeys={[]} columns={appliedCols(remove, [
          { key: 'type', label: 'Leave Type' }, { key: 'dates', label: 'Dates' },
          { key: 'days', label: 'Days', render: (r) => `${r.days} ${r.days === 1 ? 'day' : 'days'}` },
        ])} />
      </div>
      <BulkUpload open={upload} onClose={hideUpload} title="Bulk Upload Leave" noun="leave" file="leave-bulk-upload-template.csv"
        columns={['Employee Code', 'Leave Type', 'From Date', 'To Date', 'Day Type', 'Reason']}
        required={['Employee Code', 'Leave Type', 'From Date']}
        sample={[[active[0].code, 'Annual Leave', '2026-11-16', '2026-11-18', 'Full Day', 'Family function'],
          [active[1].code, 'Sick Leave', '2026-11-05', '2026-11-05', 'First Half', 'Medical checkup']]}
        hint="Dates as YYYY-MM-DD or DD-MM-YYYY."
        head={['Employee', 'Leave Type', 'Dates', 'Day Type']} check={checkLeave}
        onImport={(valid) => valid.forEach((r) => add(applicationOf(r.e, r.values, 'Bulk Upload')))} />
    </Page>
  )
}
