// Shift groups, roster, reports hub and attendance-control screens.
import { useState } from 'react'
import { Pencil, Download, FileText, Upload, SlidersHorizontal, Filter, Lock, LockOpen, ChevronDown, Plus, Info, CalendarDays, Fingerprint } from 'lucide-react'
import { Page, Btn, SearchBox, DataTable, Badge, Person, rowsOf } from '../../components/table'
import { Avatar } from '../../components/ui'
import { employees, emp } from '../../data/people'

const DateField = ({ label, value, type = 'date', w = 'w-44' }) => (
  <label className="text-[11px] font-semibold">{label}<input type={type} defaultValue={value} className={`input mt-1 block ${w}`} /></label>
)

export function ShiftGroups() {
  const groups = [['Worker', 'All Department.', 'All Designation.', 'All Category.', 'All Location.', true], ['Security Rotation', 'Male Security, Female Security.', 'Security Officer.', 'Employee.', 'Head Office.', true]]
  return (
    <Page title="Shift Group" actions={<Btn primary>Add Shift Group</Btn>}>
      <div className="grid gap-3 md:grid-cols-2">
        {groups.map(([name, d, des, c, l, on]) => (
          <div key={name} className="rounded-lg bg-base-100 p-4 shadow-sm">
            <div className="flex items-center justify-between border-b border-base-300 pb-3">
              <h3 className="text-base font-bold">{name}</h3>
              <span className="flex items-center gap-3"><input type="checkbox" className="toggle toggle-sm" defaultChecked={on} /><button className="btn btn-ghost btn-xs btn-square bg-base-200"><Pencil size={13} /></button></span>
            </div>
            <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-1 gap-y-1 text-xs">
              {[['Department', d], ['Designation', des], ['Category', c], ['Location', l]].flatMap(([k, v]) => [<dt key={k} className="text-right font-medium">{k}:</dt>, <dd key={k + 'v'}>{v}</dd>])}
            </dl>
          </div>
        ))}
      </div>
    </Page>
  )
}

const chip = { M07: 'bg-violet-500', WO: 'bg-blue-900', WFH: 'bg-green-700', MS: 'bg-amber-500', NS: 'bg-purple-700' }
export function ShiftRoster() {
  const [q, setQ] = useState('')
  const days = Array.from({ length: 31 }, (_, i) => ({ d: i + 1, w: ['Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue', 'Wed'][i % 7] }))
  const rows = employees.slice(0, 10).map((e, i) => ({
    ...e,
    pattern: i % 3 === 1 ? 'PAT&PAT13' : i === 2 ? 'work from home' : '-',
    cells: days.map((x, n) => (i % 3 === 1 ? (['Sat', 'Sun'].includes(x.w) ? 'WO' : 'M07') : i === 2 && n === 1 ? 'WFH' : i % 3 === 0 && i > 0 ? (x.w === 'Fri' ? 'WO' : n % 2 ? 'MS' : 'NS') : null)),
  })).filter((r) => (r.name + r.code).toLowerCase().includes(q.toLowerCase()))
  return (
    <Page title="Shift Roster, Pattern" actions={<><Btn primary>Add Shift Pattern</Btn><Btn primary>Edit Shift Pattern <ChevronDown size={14} /></Btn></>}>
      <div className="mb-2 flex flex-wrap items-end gap-2">
        <DateField label="Month Year" type="month" value="2026-10" />
        <label className="text-[11px] font-semibold">Search<SearchBox value={q} onChange={setQ} placeholder="Search Name, Code" className="mt-1 w-80" /></label>
        <div className="flex-1" />
        <Btn icon={Download}>Download</Btn><Btn icon={Download}>Template</Btn><Btn icon={Download}>Import</Btn><Btn icon={SlidersHorizontal}>Filter</Btn>
      </div>
      <div className="overflow-x-auto rounded-lg bg-base-100 p-3 shadow-sm">
        <table className="table table-sm text-xs">
          <thead><tr>
            <th className="sticky left-0 z-10 min-w-48 bg-base-100">Name</th>
            <th><div className="rounded-md bg-base-100 px-2 py-1 shadow"><span className="text-[10px] font-normal">Pattern</span><div className="text-sm">Name</div></div></th>
            {days.map((x) => <th key={x.d}><div className="min-w-12 rounded-md px-2 py-1 shadow"><span className="text-[10px] font-normal">{x.w}</span><div className="text-sm">{x.d}</div></div></th>)}
          </tr></thead>
          <tbody>{rows.map((r) => (
            <tr key={r.id} className="border-base-300">
              <td className="sticky left-0 z-10 bg-base-100"><div className="flex items-center gap-2"><Avatar name={r.name} color={r.color} /><div><b>{r.name}</b><div className="text-[10px] text-base-content/60">{r.code}</div></div></div></td>
              <td className="text-center font-semibold">{r.pattern}</td>
              {r.cells.map((c, n) => <td key={n} className="text-center">{c ? <span className={`rounded px-1.5 py-1 text-[10px] font-bold text-white ${chip[c]}`}>{c === 'M07' ? 'M07:00' : c}</span> : '-'}</td>)}
            </tr>
          ))}</tbody>
        </table>
      </div>
    </Page>
  )
}

const reportGroups = [
  ['Attendance', ['Geo Tracking Report', 'Daily Report', 'Monthly Report', 'Late Report', 'Late Monthly Report', 'Late Summary Report', 'Concise Summary Report',
    'Comprehensive Summary Report', 'Muster Report', 'Mobile Attendance Report', 'OT Employee Wise Summary Report', 'OT Summary Report', 'Daily Present Report',
    'Daily Absent Report', 'Punch Request Report', 'TimeLog Report', 'Long Absence Report', 'Punch Movement Report', 'Absent with Punch Report',
    'Manual Record Report', 'Invalid TimeLog Report', 'No Punch Report', 'Shift Count Report', 'Yearly Report', 'Attendance Percentage Report', 'List of Logs Report']],
  ['Employee', ['Employee Joining Report', 'Employee Wise Report', 'Department Wise Report', 'Omanization Status Report', 'Employee Document Expiry Report']],
  ['Late Policy', ['Late Policy Deduction Report']],
  ['Zone', ['Employee Movement Report', 'Zone Occupancy Report', 'Location Transfer Report', 'Invalid Zone Report']],
  ['Leave', ['Encashment Statement Report', 'Leave Balance Report', 'Leave Tracker', 'Monthly Leave Report', 'Leave Application Report', 'Leave Slab Report']],
  ['Permission', ['Permission Report']],
  ['Organization', ['New Employees Report', 'Exit Employees Report', 'Attrition Summary Report']],
]

export function ReportsHub({ title = 'TimeTracker Reports', groups = reportGroups }) {
  const [open, setOpen] = useState(null)
  return (
    <Page title={title}>
      <div className="space-y-4">
        {groups.map(([g, items]) => (
          <section key={g} className="rounded-lg bg-base-100 p-3 shadow-sm">
            <h2 className="mb-3 text-[15px] font-semibold">{g}</h2>
            <div className="grid gap-2 md:grid-cols-3">
              {items.map((r) => (
                <button key={r} onClick={() => setOpen(r)} className="flex items-center gap-3 rounded-md border border-base-300 px-3 py-2 text-left shadow-sm hover:bg-base-200">
                  {r.startsWith('Punch') ? <Fingerprint size={18} /> : <CalendarDays size={18} />}
                  <span><span className="block text-[13px] font-medium">{r}</span><span className="text-[10px] text-base-content/50">Click to view report</span></span>
                </button>
              ))}
            </div>
          </section>
        ))}
      </div>
      {open && <ReportModal name={open} onClose={() => setOpen(null)} />}
    </Page>
  )
}

function ReportModal({ name, onClose }) {
  const rows = employees.slice(0, 8).map((e, i) => ({ ...e, a: 20 + (i % 4), b: i % 3, c: (i * 2) % 5 }))
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/30 p-6" onClick={onClose}>
      <div className="w-full max-w-4xl rounded-lg bg-base-100 p-5 shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="mb-4 flex items-center justify-between"><h3 className="text-lg font-bold">{name}</h3><button className="btn btn-ghost btn-sm" onClick={onClose}>✕</button></div>
        <div className="mb-3 flex flex-wrap items-end gap-2">
          <DateField label="From" value="2026-10-01" /><DateField label="To" value="2026-10-31" />
          <label className="text-[11px] font-semibold">Department<select className="select mt-1 block w-44"><option>All Departments</option></select></label>
          <Btn primary icon={Filter}>Generate</Btn><Btn icon={Download}>Excel</Btn><Btn icon={FileText}>PDF</Btn>
        </div>
        <table className="table table-sm text-xs">
          <thead><tr><th>Employee</th><th>Code</th><th>Department</th><th>Present</th><th>Absent</th><th>Late</th></tr></thead>
          <tbody>{rows.map((r) => <tr key={r.id}><td>{r.name}</td><td>{r.code}</td><td>{r.department}</td><td>{r.a}</td><td>{r.b}</td><td>{r.c}</td></tr>)}</tbody>
        </table>
      </div>
    </div>
  )
}

export function ExcludeLate() {
  const [q, setQ] = useState('')
  const rows = [[0, '01/10/2026', 'MAD1', '04:00', '', '', 'Not Excluded', 'Policy Excluded'], [0, '02/10/2026', 'MAD1', '02:00', '', '04:00', 'Not Excluded', 'Deductible (4h)'],
    [3, '12/10/2026', 'MAD1', '08:01', '', '', 'Not Excluded', 'Policy Excluded'], [7, '14/10/2026', 'MAD2', '06:50', '', '', 'Not Excluded', 'Policy Excluded'],
    [11, '16/10/2026', 'MS', '00:25', '00:10', '', 'Excluded', 'Policy Excluded']]
    .map(([i, date, shift, late, early, ded, status, policy], n) => ({ ...emp(i), id: n + 1, date, shift: `${shift}`, late, early, ded, status, policy }))
  return (
    <Page title="Exclude Late Deduction">
      <div className="mb-2 flex flex-wrap items-end gap-2">
        <DateField label="From" value="2026-10-01" /><DateField label="To" value="2026-10-31" />
        <label className="flex-1 text-[11px] font-semibold">Search<SearchBox value={q} onChange={setQ} placeholder="Search employee..." className="mt-1" /></label>
        <Btn primary icon={Filter}>Filter</Btn><Btn icon={SlidersHorizontal}>More Filter</Btn>
      </div>
      <DataTable rows={rows} query={q} searchKeys={['name', 'code']} columns={[
        { key: 'date', label: 'Date' }, { key: 'name', label: 'Employee Name' }, { key: 'code', label: 'Employee Code' }, { key: 'shift', label: 'Shift' },
        { key: 'late', label: 'Actual Late' }, { key: 'early', label: 'Early Out' }, { key: 'ded', label: 'Late Deduction' },
        { key: 'status', label: 'Status', render: (r) => <span className={`rounded px-1.5 py-0.5 text-[10px] ${r.status === 'Excluded' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-500'}`}>{r.status}</span> },
        { key: 'policy', label: 'Policy Status', render: (r) => <span className={`rounded px-1.5 py-0.5 text-[10px] ${r.policy.startsWith('Deduct') ? 'bg-rose-50 text-rose-500' : 'bg-base-200'}`}>{r.policy}</span> },
      ]} />
    </Page>
  )
}

export function LockAttendance() {
  const locks = [['01 Sep 2026 → 30 Sep 2026', true], ['01 Apr 2026 → 30 Apr 2026', true], ['01 Apr 2026 → 24 May 2026', false]]
  const [open, setOpen] = useState(null)
  return (
    <Page title="Lock Attendance">
      <div className="space-y-3 rounded-lg bg-base-100 p-3 shadow-sm">
        <select className="select w-full text-xs"><option>Select location</option><option>Head Office</option><option>Regional Office</option></select>
        <div className="flex flex-wrap items-end gap-2 rounded-lg bg-base-200/60 p-3">
          <DateField label="From" value="2026-10-01" /><DateField label="To" value="2026-10-23" />
          <div className="flex-1" /><Btn primary icon={Lock}>Lock</Btn>
        </div>
        <div className="rounded-md bg-base-200/60 p-3 text-[11px] text-base-content/70"><b>Note:</b> Attendance records will be locked for the selected period. Please note that the lock will be applied to all employees in the selected locations. The chosen input matched records will be highlighted in green.</div>
        <div className="divide-y divide-base-300 rounded-lg border border-base-300">
          {locks.map(([range, locked], i) => (
            <div key={range}>
              <button onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center gap-3 px-3 py-3 text-[13px] font-semibold">
                {locked ? <Lock size={14} className="opacity-60" /> : <LockOpen size={14} className="opacity-60" />}<span className="flex-1 text-left">{range}</span><ChevronDown size={15} className={open === i ? 'rotate-180' : ''} />
              </button>
              {open === i && <div className="px-9 pb-3 text-xs text-base-content/70">Locations: Head Office, Regional Office · Locked by HR Admin on {range.slice(-11)} · {locked ? <Badge>Locked</Badge> : <Badge>Open</Badge>}</div>}
            </div>
          ))}
        </div>
      </div>
    </Page>
  )
}

export function TimeAdjustment() {
  const rows = [[2, '05-10-2026', '09:42 AM', '09:00 AM', 'Device sync delay'], [6, '09-10-2026', '-', '06:05 PM', 'Missed out punch'], [10, '15-10-2026', '10:15 AM', '09:30 AM', 'Client meeting']]
    .map(([i, date, before, after, reason], n) => ({ ...emp(i), id: n + 1, date, before, after, reason }))
  return (
    <Page title="Manual Time Adjustments">
      <div className="mb-2 flex flex-wrap items-end gap-2">
        <DateField label="From" value="2026-10-01" /><DateField label="To" value="2026-10-31" />
        <label className="flex-1 text-[11px] font-semibold">Employee<select className="select mt-1 block w-full"><option>Search ...</option>{employees.slice(0, 10).map((e) => <option key={e.id}>{e.name}</option>)}</select></label>
        <Btn primary icon={Filter}>Filter</Btn><Btn icon={Plus} className="opacity-60">Add</Btn><Btn className="px-3"><Info size={15} /></Btn>
      </div>
      <DataTable rows={rows} selectable={false} columns={[
        { key: 'name', label: 'Employee', render: (e) => <Person e={e} badges={<span className="text-[11px] text-base-content/60">{e.code}</span>} /> },
        { key: 'date', label: 'Date' }, { key: 'before', label: 'Original Time' }, { key: 'after', label: 'Adjusted Time' }, { key: 'reason', label: 'Reason' },
      ]} />
    </Page>
  )
}

export function AttendanceUploads() {
  const [q, setQ] = useState('')
  const rows = employees.slice(0, 12).map((e, i) => ({ ...e, present: 22 - (i % 3), absent: i % 3, leave: i % 2, ot: `${(i % 5) * 2}:00`, uploaded: '05-10-2026' }))
  return (
    <Page title="Monthly Upload">
      <div className="mb-2 flex flex-wrap items-end gap-2">
        <DateField label="Month" type="month" value="2026-10" />
        <SearchBox value={q} onChange={setQ} placeholder="Search by Name, Code" className="flex-1" />
        <Btn primary icon={Filter}>Filter</Btn><Btn icon={Upload}>Import</Btn><Btn>Download <ChevronDown size={14} /></Btn><Btn icon={SlidersHorizontal}>More Filter</Btn>
      </div>
      <DataTable rows={rows} query={q} searchKeys={['name', 'code']} columns={[
        { key: 'name', label: 'Employee', sortable: true, render: (e) => <Person e={e} badges={<span className="text-[11px] text-base-content/60">{e.code}</span>} /> },
        { key: 'present', label: 'Present Days' }, { key: 'absent', label: 'Absent Days' }, { key: 'leave', label: 'Leave Days' }, { key: 'ot', label: 'OT Hours' }, { key: 'uploaded', label: 'Uploaded On' },
      ]} />
    </Page>
  )
}

export function LatePolicySetup() {
  const slabs = rowsOf(['from', 'to', 'count', 'deduct', 'type'], [['00:01', '00:15', '3 times', '0.5 day', 'Leave'], ['00:16', '00:30', '2 times', '0.5 day', 'Leave'], ['00:31', '01:00', '1 time', '0.5 day', 'Salary'], ['01:01', '—', '1 time', '1 day', 'Salary']])
  return (
    <Page title="Late Policy Setup" actions={<Btn primary>Add Policy</Btn>}>
      <div className="mb-4 grid gap-3 rounded-lg bg-base-100 p-4 shadow-sm md:grid-cols-4">
        {[['Policy Name', 'Standard Late Policy'], ['Applies To', 'All Employees'], ['Grace Period', '10 minutes'], ['Cycle', 'Monthly']].map(([k, v]) => (
          <div key={k}><div className="text-[11px] text-base-content/60">{k}</div><div className="text-[13px] font-semibold">{v}</div></div>
        ))}
      </div>
      <DataTable rows={slabs} selectable={false} columns={[
        { key: 'from', label: 'Late From' }, { key: 'to', label: 'Late To' }, { key: 'count', label: 'Occurrences' }, { key: 'deduct', label: 'Deduction' },
        { key: 'type', label: 'Deduct From' }, { key: '_a', label: '', render: () => <Pencil size={15} /> },
      ]} />
    </Page>
  )
}

export function ProcessLeaveCredits() {
  const rows = employees.slice(0, 10).map((e, i) => ({ ...e, lates: i % 6, deduction: [0, 0, 0.5, 0.5, 1, 1][i % 6], balance: 12 - (i % 4), status: i % 6 > 1 ? 'Pending' : 'Completed' }))
  return (
    <Page title="Process Leave Credits">
      <div className="mb-2 flex flex-wrap items-end gap-2">
        <DateField label="Month" type="month" value="2026-10" />
        <div className="flex-1" /><Btn primary>Process</Btn>
      </div>
      <DataTable rows={rows} columns={[
        { key: 'name', label: 'Employee', render: (e) => <Person e={e} badges={<span className="text-[11px] text-base-content/60">{e.code}</span>} /> },
        { key: 'lates', label: 'Late Count' }, { key: 'deduction', label: 'Leave Deduction' }, { key: 'balance', label: 'Leave Balance' },
        { key: 'status', label: 'Status', render: (r) => <Badge>{r.status}</Badge> },
      ]} />
    </Page>
  )
}

export function ZoneReports() {
  return <ReportsHub title="Zone Reports" groups={[['Zone', ['Employee Movement Report', 'Zone Occupancy Report', 'Location Transfer Report', 'Invalid Zone Report', 'Zone Dwell Time Report', 'Unauthorized Access Report']]]} />
}

