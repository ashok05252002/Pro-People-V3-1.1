// Leave Application module: apply leave for one employee, or bulk apply for many.
// Applications go into the 'leaveApplications' store, so they also show on Time Tracker > Leaves Requests.
import { useMemo, useState } from 'react'
import { Send, Users, Search, CalendarDays, Trash2 } from 'lucide-react'
import { Page, Btn, DataTable, Person } from '../../components/table'
import { FormGrid, readForm, toast } from '../../components/forms'
import { useRows, val } from '../../data/store'
import { employees, emp, departments, locations } from '../../data/people'

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
  [12, 'Casual Leave', '2026-11-14', '2026-11-14', 'Bulk'], [15, 'Casual Leave', '2026-11-14', '2026-11-14', 'Bulk'],
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

function Applications({ filter }) {
  const [rows, , , remove] = useApplications()
  const list = filter ? rows.filter(filter) : rows
  return (
    <div className="mt-6">
      <h3 className="mb-2 text-base font-semibold">Applications <span className="text-base-content/50">({list.length})</span></h3>
      <DataTable rows={list} selectable={false} searchKeys={[]} columns={[
        { key: 'name', label: 'Employee', render: (r) => <Person e={r.e} badges={<span className="text-[11px] text-base-content/60">{r.e.code}</span>} /> },
        { key: 'type', label: 'Leave Type' }, { key: 'dates', label: 'Dates' },
        { key: 'days', label: 'Days', render: (r) => `${r.days} ${r.days === 1 ? 'day' : 'days'}` },
        { key: 'mode', label: 'Applied As', render: (r) => <span className={`rounded px-2 py-0.5 text-[11px] ${r.mode === 'Bulk' ? 'bg-secondary text-secondary-content' : 'bg-base-300'}`}>{r.mode}</span> },
        { key: 'applied', label: 'Applied On' },
        { key: 'status', label: 'Status', render: (r) => <span className="rounded bg-amber-100 px-2 py-0.5 text-[11px] text-amber-800">{r.status}</span> },
        { key: '_a', label: '', render: (r) => <button onClick={() => { remove(r.id); toast('Application withdrawn') }} className="btn btn-ghost btn-xs btn-square text-error"><Trash2 size={14} /></button> },
      ]} />
    </div>
  )
}

const balances = [['Annual Leave', 12, 4], ['Sick Leave', 6, 1], ['Casual Leave', 6, 2], ['Special Leave', 3, 0]]

export function ApplyLeave() {
  const [, add] = useApplications()
  const [who, setWho] = useState(active[0].id)
  const [key, setKey] = useState(0)
  const e = employees.find((x) => x.id === Number(who))
  const submit = (ev) => {
    ev.preventDefault()
    add(applicationOf(e, readForm(ev.target), 'Single'))
    toast(`Leave applied for ${e.name}`)
    setKey(key + 1)
  }
  return (
    <Page title="Apply Leave" subtitle="Submit a leave request for an employee">
      <div className="mb-4 grid grid-cols-2 gap-3 md:grid-cols-4">
        {balances.map(([t, total, used]) => (
          <div key={t} className="rounded-box border-l-4 border-primary bg-base-100 p-4 shadow-sm">
            <p className="text-[12px] text-base-content/60">{t}</p>
            <p className="mt-1 text-2xl font-bold">{total - used}<span className="text-sm font-normal text-base-content/50"> / {total}</span></p>
            <p className="text-[11px] text-base-content/50">{used} used</p>
          </div>
        ))}
      </div>
      <form key={key} onSubmit={submit} className="rounded-box bg-base-100 p-5 shadow-sm">
        <div className="mb-4 flex flex-col gap-1.5 text-[13px]">
          <span className="font-medium">Employee <span className="text-error">*</span></span>
          <select value={who} onChange={(ev) => setWho(ev.target.value)} className="select w-full">
            {active.map((x) => <option key={x.id} value={x.id}>{x.name} ({x.code})</option>)}
          </select>
        </div>
        <FormGrid fields={leaveFields} cols={2} />
        <div className="mt-5 flex justify-end gap-2">
          <Btn type="reset">Clear</Btn><Btn primary type="submit" icon={Send}>Apply Leave</Btn>
        </div>
      </form>
      <Applications filter={(r) => r.mode === 'Single'} />
    </Page>
  )
}

export function BulkApply() {
  const [, add] = useApplications()
  const [q, setQ] = useState('')
  const [dept, setDept] = useState('')
  const [loc, setLoc] = useState('')
  const [picked, setPicked] = useState(() => new Set())
  const [key, setKey] = useState(0)
  const list = useMemo(() => active.filter((e) =>
    (e.name + e.code).toLowerCase().includes(q.toLowerCase()) && (!dept || e.department === dept) && (!loc || e.location === loc)), [q, dept, loc])
  const allOn = list.length > 0 && list.every((e) => picked.has(e.id))
  const toggle = (ids, on) => setPicked((s) => { const n = new Set(s); ids.forEach((id) => (on ? n.add(id) : n.delete(id))); return n })

  const submit = (ev) => {
    ev.preventDefault()
    if (!picked.size) return toast('Select at least one employee')
    const v = readForm(ev.target)
    active.filter((e) => picked.has(e.id)).forEach((e) => add(applicationOf(e, v, 'Bulk')))
    toast(`Leave applied for ${picked.size} employee${picked.size > 1 ? 's' : ''}`)
    setPicked(new Set()); setKey(key + 1)
  }
  return (
    <Page title="Bulk Leave Apply" subtitle="Apply the same leave to many employees at once">
      <form key={key} onSubmit={submit} className="grid gap-4 lg:grid-cols-[1fr_1.2fr]">
        <div className="rounded-box bg-base-100 p-5 shadow-sm">
          <h3 className="mb-4 flex items-center gap-2 text-base font-semibold"><CalendarDays size={17} className="text-primary" />Leave Details</h3>
          <FormGrid fields={leaveFields} cols={2} />
          <div className="mt-5 flex items-center justify-between gap-2 rounded-lg bg-primary/5 px-3 py-2.5">
            <span className="text-[13px]"><b className="text-primary">{picked.size}</b> employee{picked.size === 1 ? '' : 's'} selected</span>
            <Btn primary type="submit" icon={Send}>Apply to Selected</Btn>
          </div>
        </div>

        <div className="rounded-box bg-base-100 p-5 shadow-sm">
          <h3 className="mb-3 flex items-center gap-2 text-base font-semibold"><Users size={17} className="text-primary" />Select Employees</h3>
          <div className="mb-3 flex flex-wrap gap-2">
            <label className="input input-sm h-9 min-w-44 flex-1 gap-2"><Search size={13} className="opacity-50" /><input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by Name, Code" /></label>
            <select value={dept} onChange={(e) => setDept(e.target.value)} className="select select-sm h-9 w-44"><option value="">All Departments</option>{departments.map((d) => <option key={d}>{d}</option>)}</select>
            <select value={loc} onChange={(e) => setLoc(e.target.value)} className="select select-sm h-9 w-36"><option value="">All Locations</option>{locations.map((d) => <option key={d}>{d}</option>)}</select>
          </div>
          <label className="flex items-center gap-2.5 border-b border-base-300 px-2 pb-2 text-[12px] font-semibold">
            <input type="checkbox" checked={allOn} onChange={(e) => toggle(list.map((x) => x.id), e.target.checked)} className="checkbox checkbox-sm checkbox-primary" />
            Select all ({list.length})
          </label>
          <ul className="max-h-[26rem] overflow-y-auto">
            {list.map((e) => (
              <li key={e.id}>
                <label className={`flex cursor-pointer items-center gap-3 rounded-md px-2 py-2 hover:bg-base-200 ${picked.has(e.id) ? 'bg-primary/5' : ''}`}>
                  <input type="checkbox" checked={picked.has(e.id)} onChange={(ev) => toggle([e.id], ev.target.checked)} className="checkbox checkbox-sm checkbox-primary" />
                  <Person e={e} badges={<span className="text-[11px] text-base-content/60">{e.code} · {e.department}</span>} />
                </label>
              </li>
            ))}
            {!list.length && <li className="py-8 text-center text-base-content/50">No employees found</li>}
          </ul>
        </div>
      </form>
      <Applications filter={(r) => r.mode === 'Bulk'} />
    </Page>
  )
}
