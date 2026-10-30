// Shift groups, roster, reports hub and time adjustment screens.
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Pencil, Download, FileText, Upload, SlidersHorizontal, Filter, Lock, LockOpen, ChevronDown, Plus, Info, CalendarDays, Fingerprint, ArrowLeft, Check } from 'lucide-react'
import { Page, Btn, SearchBox, DataTable, Badge, Person } from '../../components/table'
import { Avatar } from '../../components/ui'
import { AddModal, AddDrawer, FormGrid, useOpen, toast } from '../../components/forms'
import { useRows, val } from '../../data/store'
import { employees, emp } from '../../data/people'
import { applicable, applicableOf, shiftRows, GroupCards, groupOf } from './Setup'

const DateField = ({ label, value, type = 'date', w = 'w-44' }) => (
  <label className="text-[11px] font-semibold">{label}<input type={type} defaultValue={value} className={`input mt-1 block ${w}`} /></label>
)

export function ShiftGroups() {
  const [open, show, hide] = useOpen()
  const [shifts] = useRows('shifts', shiftRows)
  const [groups, addGroup] = useRows('shiftGroups', () => [
    groupOf('Worker', ['All Department.', 'All Designation.', 'All Category.', 'All Location.']),
    groupOf('Security Rotation', ['Male Security, Female Security.', 'Security Officer.', 'Employee.', 'Head Office.']),
  ].map((g, i) => ({ id: i + 1, ...g })))
  const save = (v) => addGroup(groupOf(val(v.Name), applicableOf(v), true, [['Shift', val(v.Shift)], ['Week Off', val(v['Week Off'])]]))
  return (
    <Page title="Shift Group" actions={<Btn primary onClick={show}>Add Shift Group</Btn>}>
      <AddDrawer open={open} onClose={hide} title="Add Shift Group" onSave={save}>
        <FormGrid cols={2} fields={[
          { label: 'Name', span: true }, { label: 'Shift', type: 'select', placeholder: 'None', options: shifts.map((r) => r.name) },
          { label: 'Week Off', type: 'select', placeholder: 'None', options: ['Sunday', 'Saturday', 'Friday', 'Saturday, Sunday'] },
        ]} />
        <div className="mt-5 border-b border-base-300 pb-2 text-[13px] font-semibold">Applicable</div>
        <div className="mt-3"><FormGrid fields={applicable} /></div>
      </AddDrawer>
      <GroupCards groups={groups} action={<button className="btn btn-ghost btn-xs btn-square bg-base-200"><Pencil size={13} /></button>} />
    </Page>
  )
}

const chip = { M07: 'bg-violet-500', WO: 'bg-blue-900', WFH: 'bg-green-700', MS: 'bg-amber-500', NS: 'bg-purple-700' }
export function ShiftRoster() {
  const [q, setQ] = useState('')
  const days = Array.from({ length: 31 }, (_, i) => ({ d: i + 1, w: ['Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue', 'Wed'][i % 7] }))
  const [patterns] = useRows('rosterPatterns', [])
  const [shifts] = useRows('shifts', shiftRows)
  const color = Object.fromEntries(shifts.map((r) => [r.code, r.color]))
  const base = employees.slice(0, 10).map((e, i) => ({
    ...e,
    pattern: i % 3 === 1 ? 'PAT&PAT13' : i === 2 ? 'work from home' : '-',
    cells: days.map((x, n) => (i % 3 === 1 ? (['Sat', 'Sun'].includes(x.w) ? 'WO' : 'M07') : i === 2 && n === 1 ? 'WFH' : i % 3 === 0 && i > 0 ? (x.w === 'Fri' ? 'WO' : n % 2 ? 'MS' : 'NS') : null)),
  }))
  // Saved patterns (newest first) override the roster of the employees they were assigned to.
  const saved = patterns.flatMap((p) => p.empIds).filter((id) => !base.some((e) => e.id === id)).map((id) => ({ ...employees.find((e) => e.id === id), pattern: '-', cells: days.map(() => null) }))
  const rows = [...saved, ...base].map((r) => {
    const p = patterns.find((x) => x.empIds.includes(r.id))
    return p ? { ...r, pattern: p.name, cells: days.map((x, n) => p.cells[x.d] || (p.override ? null : r.cells[n])) } : r
  }).filter((r) => (r.name + r.code).toLowerCase().includes(q.toLowerCase()))
  return (
    <Page title="Shift Roster, Pattern" actions={<><Link to="/timetracker/roster/create"><Btn primary>Add Shift Pattern</Btn></Link><Btn primary>Edit Shift Pattern <ChevronDown size={14} /></Btn></>}>
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
              {r.cells.map((c, n) => <td key={n} className="text-center">{c ? <span className={`rounded px-1.5 py-1 text-[10px] font-bold text-white ${chip[c] || ''}`} style={chip[c] ? {} : { background: color[c] || '#6b7280' }}>{c === 'M07' ? 'M07:00' : c}</span> : '-'}</td>)}
            </tr>
          ))}</tbody>
        </table>
      </div>
    </Page>
  )
}

const reportGroups = [
  ['Attendance', ['Daily Report', 'Monthly Report', 'Late Report', 'Late Monthly Report', 'Late Summary Report', 'Comprehensive Summary Report',
    'Muster Report', 'TimeLog Report', 'Manual Record Report', 'Invalid TimeLog Report']],
  ['Leave', ['Leave Balance Report', 'Leave Application Report']],
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
          <Btn primary icon={Filter} onClick={() => toast(`${name} generated`)}>Generate</Btn><Btn icon={Download}>Excel</Btn><Btn icon={FileText}>PDF</Btn>
        </div>
        <table className="table table-sm text-xs">
          <thead><tr><th>Employee</th><th>Code</th><th>Department</th><th>Present</th><th>Absent</th><th>Late</th></tr></thead>
          <tbody>{rows.map((r) => <tr key={r.id}><td>{r.name}</td><td>{r.code}</td><td>{r.department}</td><td>{r.a}</td><td>{r.b}</td><td>{r.c}</td></tr>)}</tbody>
        </table>
      </div>
    </div>
  )
}

export function TimeAdjustment() {
  const [open, show, hide] = useOpen()
  const [rows, addRow] = useRows('timeAdjustments', () => [[2, '05-10-2026', '09:42 AM', '09:00 AM', 'Device sync delay'], [6, '09-10-2026', '-', '06:05 PM', 'Missed out punch'], [10, '15-10-2026', '10:15 AM', '09:30 AM', 'Client meeting']]
    .map(([i, date, before, after, reason], n) => ({ ...emp(i), id: n + 1, date, before, after, reason })))
  const people = employees.slice(0, 10)
  const save = (v) => {
    const e = people.find((p) => p.name === v.Employee) || emp(0)
    addRow({ ...e, date: val(v.Date && v.Date.split('-').reverse().join('-')), before: val(v['Original Time']), after: val(v['Adjusted Time']), reason: val(v.Reason) })
  }
  return (
    <Page title="Manual Time Adjustments">
      <AddModal open={open} onClose={hide} title="Add Time Adjustment" cols={2} onSave={save} fields={[
        { label: 'Employee', type: 'select', placeholder: 'Select Employee', options: people.map((e) => e.name), span: true, req: true },
        { label: 'Date', type: 'date', req: true }, { label: 'Punch Type', type: 'radio', options: ['IN', 'OUT'], value: 'IN' },
        { label: 'Original Time', type: 'time' }, { label: 'Adjusted Time', type: 'time', req: true },
        { label: 'Reason', type: 'textarea', span: true },
      ]} />
      <div className="mb-2 flex flex-wrap items-end gap-2">
        <DateField label="From" value="2026-10-01" /><DateField label="To" value="2026-10-31" />
        <label className="flex-1 text-[11px] font-semibold">Employee<select className="select mt-1 block w-full"><option>Search ...</option>{people.map((e) => <option key={e.id}>{e.name}</option>)}</select></label>
        <Btn primary icon={Filter}>Filter</Btn><Btn icon={Plus} onClick={show}>Add</Btn><Btn className="px-3"><Info size={15} /></Btn>
      </div>
      <DataTable rows={rows} selectable={false} columns={[
        { key: 'name', label: 'Employee', render: (e) => <Person e={e} badges={<span className="text-[11px] text-base-content/60">{e.code}</span>} /> },
        { key: 'date', label: 'Date' }, { key: 'before', label: 'Original Time' }, { key: 'after', label: 'Adjusted Time' }, { key: 'reason', label: 'Reason' },
      ]} />
    </Page>
  )
}

// Add Shift Pattern: pick shifts into an October calendar, then choose employees by filter.
export function ShiftPatternCreate() {
  const go = useNavigate()
  const [, addPattern] = useRows('rosterPatterns', [])
  const [name, setName] = useState('')
  const [override, setOverride] = useState(false)
  const [pick, setPick] = useState('WO')
  const [cells, setCells] = useState({})
  const [sel, setSel] = useState({})
  const [q, setQ] = useState('')
  const [shifts] = useRows('shifts', shiftRows)
  const patternShifts = [['WO', 'Week Off (WO)', '', 'bg-blue-900'], ['WFH', 'Work From Home', '', 'bg-green-700'],
    ...shifts.slice().reverse().map((r) => [r.code, r.name, `${r.start} - ${r.end}`, ''])]
  const color = Object.fromEntries(shifts.map((r) => [r.code, r.color]))
  const chipStyle = (code) => (color[code] ? { background: color[code] } : {})
  const chipClass = (code) => patternShifts.find((p) => p[0] === code)?.[3] || ''
  const days = Array.from({ length: 35 }, (_, i) => i - 3)
  const list = employees.filter((e) => (e.name + e.code).toLowerCase().includes(q.toLowerCase()))
  const save = () => {
    const empIds = employees.filter((e) => sel[e.id]).map((e) => e.id)
    addPattern({ name: name.trim() || 'New Pattern', cells, empIds, override })
    toast(`Roster saved for ${empIds.length} employee${empIds.length === 1 ? '' : 's'}`)
    go('/timetracker/roster')
  }
  const multi = (label, icon) => (
    <label className="text-[11px] font-semibold">{label}<select className="select select-sm mt-1 w-full"><option>{icon} 0 selected</option></select></label>
  )
  return (
    <div className="mx-auto max-w-7xl">
      <Link to="/timetracker/roster" className="mb-6 flex items-center gap-2 text-[13px] font-semibold"><ArrowLeft size={16} />Add Shift Pattern</Link>
      <div className="grid gap-3 rounded-lg bg-base-100 p-3 shadow-sm lg:grid-cols-2">
        <div className="rounded-md bg-base-200/50 p-3">
          <input placeholder="# Name" value={name} onChange={(e) => setName(e.target.value)} className="input mb-3 w-full" />
          <div className="mb-3 grid grid-cols-2 gap-2">
            <DateField label="From Date" value="2026-10-01" w="w-full" /><DateField label="To Date" value="2026-10-29" w="w-full" />
          </div>
          <div className="mb-3 max-h-56 space-y-1 overflow-y-auto rounded-md bg-base-100 p-2">
            {patternShifts.map(([code, name, time]) => (
              <label key={code} className="flex cursor-pointer items-start gap-3 rounded px-2 py-1.5 text-xs hover:bg-base-200">
                <input type="radio" name="shift" className="radio radio-sm mt-0.5" checked={pick === code} onChange={() => setPick(code)} />
                <span><b className="font-medium">{name}</b>{time && <span className="block text-[10px] text-base-content/60">{time}</span>}</span>
              </label>
            ))}
          </div>
          <div className="rounded-md bg-base-100 p-3">
            <div className="mb-2 flex flex-wrap justify-center gap-1">
              {patternShifts.map(([code]) => <span key={code} className={`rounded px-1 py-0.5 text-[10px] font-bold text-white ${chipClass(code)}`} style={chipStyle(code)}>{code}</span>)}
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-xs">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => <div key={d} className="font-semibold">{d}</div>)}
              {days.map((d) => d < 1 || d > 29 ? <div key={d} /> : (
                <button key={d} onClick={() => setCells((c) => ({ ...c, [d]: c[d] === pick ? undefined : pick }))}
                  className="flex h-12 flex-col items-start rounded border border-base-300 p-1 text-[10px] text-base-content/60 hover:border-primary">
                  {d}{cells[d] && <span className={`mt-auto self-center rounded px-1 font-bold text-white ${chipClass(cells[d])}`} style={chipStyle(cells[d])}>{cells[d]}</span>}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col rounded-md bg-base-200/50 p-3">
          <div className="mb-3 grid grid-cols-2 gap-2">
            {multi('Department', '▦')}{multi('Designation', '☆')}{multi('Categories', '⚇')}{multi('Locations', '⌖')}{multi('Vendor', '▣')}
          </div>
          <div className="flex flex-1 flex-col rounded-md bg-base-100 p-3">
            <div className="mb-2 flex gap-2"><SearchBox value={q} onChange={setQ} placeholder="Search employees..." className="flex-1" /></div>
            <div className="mb-1 flex items-center justify-between text-xs">
              <span className="font-semibold">Selected Employees <span className="badge badge-primary badge-xs">{Object.values(sel).filter(Boolean).length}</span></span>
              <label className="flex items-center gap-1"><input type="checkbox" className="checkbox checkbox-xs" onChange={(e) => setSel(Object.fromEntries(list.map((x) => [x.id, e.target.checked])))} />All</label>
            </div>
            <div className="mb-2 flex items-center gap-1 text-[11px] text-emerald-600"><Check size={12} />Found {list.length} employees</div>
            <div className="grid max-h-80 gap-x-3 overflow-y-auto sm:grid-cols-2">
              {list.map((e) => (
                <label key={e.id} className="flex items-center gap-2 py-1.5 text-xs">
                  <input type="checkbox" className="checkbox checkbox-sm" checked={!!sel[e.id]} onChange={(ev) => setSel((s) => ({ ...s, [e.id]: ev.target.checked }))} />
                  {e.name} <span className="text-[10px] text-base-content/50">({e.code})</span>
                </label>
              ))}
            </div>
          </div>
          <div className="mt-3 flex items-center justify-end gap-4">
            <label className="flex items-start gap-2 text-xs"><input type="checkbox" className="checkbox checkbox-sm" checked={override} onChange={(e) => setOverride(e.target.checked)} />
              <span><b className="font-medium">Override existing rosters</b><span className="block text-[10px] text-base-content/60">Replace any conflicting shift assignments</span></span></label>
            <Btn primary icon={Check} onClick={save}>Save Roster</Btn>
          </div>
        </div>
      </div>
    </div>
  )
}
