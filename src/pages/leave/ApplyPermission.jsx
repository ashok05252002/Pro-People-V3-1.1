// Apply Permission: short time-off in minutes, one from the form or many from an Excel/CSV sheet (Bulk Upload).
// Limits come from Time Tracker > Leave > Permission Settings.
import { useState } from 'react'
import { Send, Upload, Info } from 'lucide-react'
import { Page, Btn, DataTable } from '../../components/table'
import { FormGrid, readForm, toast, useOpen } from '../../components/forms'
import { BulkUpload, empCell } from '../../components/bulk'
import { useRows, val } from '../../data/store'
import { employees, emp } from '../../data/people'
import { toIsoDate, toMinutes } from '../../data/sheet'
import { active, today, fmt, appliedNow, findEmp, EmployeeSelect, appliedCols } from './LeaveApplication'

const limits = { min: 60, max: 120, count: 2 }
const clock = (m) => { const h = Math.floor(m / 60), mm = String(m % 60).padStart(2, '0'); return `${((h + 11) % 12) + 1}:${mm} ${h < 12 ? 'AM' : 'PM'}` }
const hhmm = (m) => `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`

// '' when the time range fits the permission rules, else the reason.
const ruleError = (from, to) => to <= from ? 'To Time must be after From Time'
  : to - from < limits.min ? `Shorter than the ${limits.min} min minimum`
    : to - from > limits.max ? `Longer than the ${limits.max} min maximum` : ''

const permissionOf = (e, { date, from, to, reason }, mode) => ({
  e, date, day: fmt(date), time: `${clock(from)} - ${clock(to)}`, minutes: to - from,
  reason: val(reason), mode, applied: appliedNow(), status: 'Pending',
})

const usePermissions = () => useRows('permissionApplications', () => [
  [4, '2026-11-03', 960, 1080, 'Single'], [9, '2026-10-29', 540, 600, 'Single'], [13, '2026-11-06', 1020, 1080, 'Bulk Upload'],
].map(([i, date, from, to, mode], n) => ({ ...permissionOf(emp(i), { date, from, to, reason: 'Personal work' }, mode), id: n + 1, applied: 'Oct 28, 2026 11:40 AM' })))

const timeInput = (name, value) => ({ label: name, req: true, type: 'custom', render: () => <input name={name} type="time" defaultValue={value} className="input w-full" /> })
const fields = [
  { label: 'Date', type: 'date', value: today, req: true, span: true },
  timeInput('From Time', '16:00'), timeInput('To Time', '17:00'),
  { label: 'Reason', type: 'textarea', placeholder: 'Reason for permission', span: true },
]

function checkPermission(r) {
  const code = r['Employee Code'] || ''
  const e = findEmp(code)
  const date = toIsoDate(r.Date || '')
  const from = toMinutes(r['From Time'] || ''), to = toMinutes(r['To Time'] || '')
  const error = !e ? `Employee "${code || 'blank'}" not found`
    : !date ? 'Date missing or unreadable'
      : from === null || to === null ? 'Time missing or unreadable (use HH:MM)'
        : ruleError(from, to)
  return {
    e, error, values: { date, from, to, reason: r.Reason },
    cells: [empCell(e, code), date && fmt(date), from !== null && to !== null ? `${clock(from)} - ${clock(to)}` : '', from !== null && to > from ? `${to - from} min` : ''],
  }
}

export function ApplyPermission() {
  const [rows, add, , remove] = usePermissions()
  const [who, setWho] = useState(active[0].id)
  const [key, setKey] = useState(0)
  const [upload, showUpload, hideUpload] = useOpen()
  const e = employees.find((x) => x.id === Number(who))
  const submit = (ev) => {
    ev.preventDefault()
    const v = readForm(ev.target)
    const from = toMinutes(v['From Time']), to = toMinutes(v['To Time'])
    const error = from === null || to === null ? 'Enter From and To time' : ruleError(from, to)
    if (error) return toast(error)
    add(permissionOf(e, { date: v.Date || today, from, to, reason: v.Reason }, 'Single'))
    toast(`Permission applied for ${e.name}`)
    setKey(key + 1)
  }
  return (
    <Page title="Apply Permission" subtitle="Request a short time-off in minutes, or upload many from Excel"
      actions={<Btn icon={Upload} onClick={showUpload}>Bulk Upload</Btn>}>
      <form key={key} onSubmit={submit} className="rounded-box bg-base-100 p-5 shadow-sm">
        <EmployeeSelect value={who} onChange={setWho} />
        <FormGrid fields={fields} cols={2} />
        <p className="mt-4 flex items-center gap-2 rounded-md bg-base-200 px-3 py-2 text-[12px] text-base-content/70">
          <Info size={14} className="shrink-0" />Each permission can be {limits.min} to {limits.max} minutes, up to {limits.count} per month (Permission Settings).
        </p>
        <div className="mt-5 flex justify-end gap-2">
          <Btn type="reset">Clear</Btn><Btn primary type="submit" icon={Send}>Apply Permission</Btn>
        </div>
      </form>

      <div className="mt-6">
        <h3 className="mb-2 text-base font-semibold">Applications <span className="text-base-content/50">({rows.length})</span></h3>
        <DataTable rows={rows} selectable={false} searchKeys={[]} columns={appliedCols(remove, [
          { key: 'day', label: 'Date' }, { key: 'time', label: 'Time' }, { key: 'minutes', label: 'Duration', render: (r) => `${r.minutes} min` },
        ])} />
      </div>
      <BulkUpload open={upload} onClose={hideUpload} title="Bulk Upload Permission" noun="permission" file="permission-bulk-upload-template.csv"
        columns={['Employee Code', 'Date', 'From Time', 'To Time', 'Reason']}
        required={['Employee Code', 'Date', 'From Time', 'To Time']}
        sample={[[active[0].code, '2026-11-10', hhmm(960), hhmm(1050), 'Bank work'], [active[1].code, '2026-11-12', hhmm(540), hhmm(600), 'School visit']]}
        hint={`Date as YYYY-MM-DD or DD-MM-YYYY, time as HH:MM. ${limits.min}-${limits.max} minutes each.`}
        head={['Employee', 'Date', 'Time', 'Duration']} check={checkPermission}
        onImport={(valid) => valid.forEach((r) => add(permissionOf(r.e, r.values, 'Bulk Upload')))} />
    </Page>
  )
}
