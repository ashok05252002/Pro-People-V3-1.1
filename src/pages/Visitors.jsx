import { useState } from 'react'
import { Users, CalendarDays, Clock, LogOut, ArrowDownLeft, UserPlus, Truck, RefreshCw, Search, Plus, SlidersHorizontal, User, IdCard, ShieldCheck, Info, Settings2, Download, Filter } from 'lucide-react'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts'
import { Page, Btn, SearchBox, DataTable, Badge, rowsOf } from '../components/table'
import { Avatar } from '../components/ui'

const visitors = rowsOf(['pass', 'name', 'mobile', 'host', 'dept', 'location', 'in', 'out', 'vehicle', 'status', 'approver', 'type', 'company'], [
  ['VP-1024', 'Ramesh Babu', '9840012345', 'Arun Kumar', 'Finance', 'Head Office', '23/10/2026 11:38 AM', '-', '-', 'Pending', '-', 'PRE-VISIT', 'Acme Corp'],
  ['VP-1023', 'Shalini Devi', '9840023456', 'Priya Raman', 'Human Resources', 'Head Office', '23/10/2026 10:05 AM', '23/10/2026 01:20 PM', 'TN09AB1234', 'Approved', 'Security Desk', 'WALK-IN', 'Bright Logistics'],
  ['VP-1022', 'Joseph Mathew', '9840034567', 'Vijay Shankar', 'Engineering & Technology', 'Development Center', '22/10/2026 03:10 PM', '22/10/2026 05:45 PM', '-', 'Approved', 'Vijay Shankar', 'PRE-VISIT', 'Nova Systems'],
  ['VP-1021', 'Anand Raj', '9840045678', 'Lakshmi Iyer', 'Front Office', 'Head Office', '16/10/2026 11:40 AM', '-', 'TN10CD5678', 'Rejected', '-', 'WALK-IN', 'Acme Corp'],
])

const Name = ({ r }) => <span className="flex items-center gap-2"><Avatar name={r.name} color="#475569" size="size-7" /><b>{r.name}</b></span>
const Status = ({ s }) => <span className={`text-[10px] font-bold uppercase ${s === 'Approved' ? 'text-emerald-600' : s === 'Rejected' ? 'text-rose-500' : 'text-amber-500'}`}>{s}</span>

function Stat({ icon: I, label, value, sub, tag, tint, dark }) {
  return (
    <div className={`rounded-lg p-4 shadow-sm ${dark ? 'bg-indigo-700 text-white' : 'bg-base-100'}`}>
      <div className="flex justify-between"><span className={`grid size-8 place-items-center rounded-md ${dark ? 'bg-white/20' : tint}`}><I size={15} /></span>{tag && <span className="text-[9px] text-base-content/40">{tag}</span>}</div>
      <div className={`mt-3 text-xs ${sub ? 'font-semibold' : 'text-[10px] font-semibold uppercase'}`}>{label}</div>
      <div className="text-2xl font-black">{value} {sub && <span className="text-[10px] font-normal text-base-content/50">{sub}</span>}</div>
    </div>
  )
}

export function VisitorDashboard() {
  const [q, setQ] = useState('')
  const dist = Array.from({ length: 31 }, (_, i) => ({ d: i + 1, v: [16, 23].includes(i + 1) ? 1 : [3, 9, 22].includes(i + 1) ? 2 : 0 }))
  const list = visitors.filter((v) => (v.name + v.pass).toLowerCase().includes(q.toLowerCase()))
  return (
    <div className="mx-auto max-w-7xl space-y-4">
      <div className="grid gap-3 md:grid-cols-4">
        <Stat icon={Users} label="All Visitors" value={4} sub="Total" tag="GROUP.01" tint="bg-emerald-50 text-emerald-600" />
        <Stat icon={CalendarDays} label="Monthly Visitors" value={4} sub="Entries" tag="LOG.02" tint="bg-fuchsia-50 text-fuchsia-600" />
        <Stat icon={Clock} label="Today's Visitors" value={2} sub="Active" tag="LIVE.04" tint="bg-amber-50 text-amber-600" />
        <Stat icon={LogOut} label="Left Visitors" value={1} tint="bg-rose-50 text-rose-500" />
        <Stat icon={ArrowDownLeft} label="Inside Premises" value={1} dark />
        <Stat icon={UserPlus} label="Walk-In Entry" value={2} tint="bg-violet-50 text-violet-600" />
        <Stat icon={Truck} label="Vehicle Entry" value={2} tint="bg-base-200" />
      </div>
      <div className="grid gap-4 lg:grid-cols-[1fr_1.6fr]">
        <div className="rounded-xl bg-base-100 p-5 shadow-sm">
          <h3 className="font-bold">Today's Presence</h3><p className="text-[11px] text-base-content/50">Visitor stay duration summary</p>
          <div className="mt-3 text-2xl font-black">02 <span className="text-[10px] font-normal uppercase text-base-content/50">Total visitors</span></div>
          <div className="mt-3 space-y-2 text-[11px]">
            {[['< 1 Hour', 0], ['1 - 2 Hours', 0], ['2 - 5 Hours', 2], ['> 5 Hours', 0]].map(([l, v]) => (
              <div key={l} className="flex items-center gap-2"><span className="w-16 text-right">{l}</span><div className="h-4 flex-1 border-l border-base-300"><div className="h-4 bg-amber-500" style={{ width: `${v * 50}%` }} /></div></div>
            ))}
          </div>
        </div>
        <div className="rounded-xl bg-base-100 p-5 shadow-sm">
          <div className="flex justify-between">
            <div><h3 className="font-bold">Visitor Distribution</h3><p className="text-[11px] text-base-content/50">Date-wise entry activity</p></div>
            <div className="flex gap-2"><select className="select select-sm w-28 text-xs"><option>Year 2026</option></select><button className="btn btn-sm btn-neutral">October</button></div>
          </div>
          <div className="mt-3 h-40"><ResponsiveContainer><BarChart data={dist} margin={{ left: -25 }}><CartesianGrid vertical={false} stroke="#f0f0f0" /><XAxis dataKey="d" tick={{ fontSize: 9 }} interval={0} /><YAxis tick={{ fontSize: 9 }} /><Bar dataKey="v" fill="#818cf8" /></BarChart></ResponsiveContainer></div>
        </div>
      </div>
      <div className="rounded-xl bg-base-100 shadow-sm">
        <div className="flex flex-wrap items-center gap-2 p-4">
          <RefreshCw size={15} />
          {['All Locations', 'All Types', 'All Status'].map((s) => <select key={s} className="select select-sm w-32 text-xs"><option>{s}</option></select>)}
          <div className="flex-1" />
          <label className="flex h-8 w-52 items-center gap-2 rounded-md border border-base-300 px-2 text-xs"><Search size={13} /><input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search..." className="flex-1 outline-none" /></label>
        </div>
        <div className="overflow-x-auto">
          <table className="table text-xs">
            <thead><tr className="text-[11px] uppercase">{['Pass No', 'Visitor Name', 'Mobile', 'Visitor Photo', 'Visitor ID Proof', 'Employee', 'In Time', 'Out Time', 'Vehicle No', 'Status', 'Approved By', 'Rejected By'].map((h) => <th key={h} className="whitespace-nowrap">{h}</th>)}</tr></thead>
            <tbody>{list.map((r) => (
              <tr key={r.id}><td>{r.pass}</td><td><Name r={r} /></td><td>{r.mobile}</td><td><span className="grid size-7 place-items-center rounded bg-base-200"><User size={13} /></span></td>
                <td><span className="grid size-7 place-items-center rounded bg-base-200"><IdCard size={13} /></span></td><td>{r.host}</td><td>{r.in}</td><td>{r.out}</td><td>{r.vehicle}</td>
                <td><Status s={r.status} /></td><td>{r.approver}</td><td>{r.status === 'Rejected' ? 'Security Desk' : '-'}</td></tr>
            ))}</tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function VisitorList({ title, rows }) {
  const [q, setQ] = useState('')
  return (
    <Page title={title} actions={<Btn primary icon={Plus}>Add New</Btn>}>
      <div className="mb-2 flex gap-2"><SearchBox value={q} onChange={setQ} placeholder="Search by Name, Pass ID" className="flex-1" /><Btn icon={SlidersHorizontal}>Filter</Btn></div>
      <DataTable rows={rows} query={q} searchKeys={['name', 'pass']} columns={[
        { key: 'id', label: '#', sortable: true }, { key: 'name', label: 'Visitor Name', sortable: true, render: (r) => <Name r={r} /> },
        { key: 'pass', label: 'Pass No', sortable: true }, { key: 'mobile', label: 'Mobile No', sortable: true }, { key: 'host', label: 'Host Name', sortable: true },
        { key: 'in', label: 'In Time', sortable: true }, { key: 'out', label: 'Out Time', sortable: true }, { key: 'vehicle', label: 'Vehicle No', sortable: true },
        { key: 'status', label: 'Status', sortable: true, render: (r) => <span className="rounded bg-base-200 px-1.5 py-0.5"><Status s={r.status} /></span> },
        { key: 'approver', label: 'Approver', sortable: true }, { key: 'type', label: 'Type', sortable: true },
      ]} />
    </Page>
  )
}

export const PreEntry = () => <VisitorList title="Pre Visitor Entry" rows={visitors.filter((v) => v.type === 'PRE-VISIT')} />
export const WalkIn = () => <VisitorList title="Walk-In Entry" rows={visitors.filter((v) => v.type === 'WALK-IN')} />

function ToggleSetting({ title, icon: I, question, help, notes }) {
  return (
    <Page title={title}>
      <div className="mx-auto max-w-4xl rounded-lg bg-base-100 p-4 shadow-sm">
        <div className="mb-4 flex items-center gap-2 font-semibold"><I size={16} />{title.includes('Approval') ? 'Security Approval Policy' : 'General Settings'}</div>
        <div className="flex items-center justify-between rounded-md bg-base-200/60 p-3">
          <div><div className="font-semibold">{question}</div><div className="text-[11px] italic text-base-content/60">{help}</div></div>
          <input type="checkbox" className="toggle toggle-sm" />
        </div>
        <div className="mt-5 rounded-md border-t border-base-300 bg-cyan-50 p-3 text-[11px] text-cyan-700">
          <div className="flex items-center gap-2 font-bold"><Info size={13} />Note:</div>
          <ul className="ml-6 mt-1 list-disc space-y-1">{notes.map((n) => <li key={n}>{n}</li>)}</ul>
        </div>
      </div>
    </Page>
  )
}

export const ApprovalSettings = () => <ToggleSetting title="Visitor Approval Settings" icon={ShieldCheck} question="Can Security Approve Visitor?"
  help="If enabled, security staff with appropriate designations can directly approve/reject visitor entries."
  notes={['Disabling this will redirect all visitor approval workflows to the respective host department managers.', 'Even when enabled, security staff can only approve visitors for their assigned locations.']} />

export const VisitorConfig = () => <ToggleSetting title="Visitor CONFIGURATION" icon={Settings2} question="OTP verification needed?"
  help="If enabled, OTP verification will be required on the walk-in entry page while adding a visitor."
  notes={['Disabling this will skip the OTP verification step for new walk-in visitors.', 'This setting does not affect pre-entry visitors where OTP is already skipped.']} />

export function PassSettings() {
  const [q, setQ] = useState('')
  return (
    <Page title="Pass Number Settings" actions={<Btn primary icon={Plus}>Add New</Btn>}>
      <SearchBox value={q} onChange={setQ} placeholder="Search..." className="mb-2 w-80" />
      <DataTable rows={rowsOf(['location', 'prefix', 'next', 'status'], [['Head Office', 'HO-', '1025', 'Active'], ['Development Center', 'DC-', '0310', 'Active']])} query={q} searchKeys={['location', 'prefix']} selectable={false} columns={[
        { key: 'location', label: 'Location' }, { key: 'prefix', label: 'Prefix' }, { key: 'next', label: 'Next Number' }, { key: 'status', label: 'Status', render: (r) => <Badge>{r.status}</Badge> },
      ]} />
    </Page>
  )
}

export function VisitorPolicy() {
  return (
    <Page title="Edit Visitor Policy" subtitle="Enter the rules and policies that will be printed on every visitor pass.">
      <div className="rounded-lg bg-base-100 p-4 shadow-sm">
        <div className="mb-1.5 text-xs font-semibold">Policy Content<span className="text-rose-500">*</span></div>
        <textarea className="textarea h-56 w-full" defaultValue={'1. Visitors must carry this pass at all times inside the premises.\n2. Photography is not allowed without permission.\n3. Visitors must be accompanied by the host employee.\n4. Return the pass at the security desk while leaving.'} />
        <div className="mt-3 flex justify-end"><Btn primary>Save Policy</Btn></div>
      </div>
    </Page>
  )
}

export function VisitorCompanies() {
  const [q, setQ] = useState('')
  return (
    <Page title="Companies" actions={<Btn primary icon={Plus}>Add New</Btn>}>
      <SearchBox value={q} onChange={setQ} placeholder="Search by Company Name..." className="mb-2 w-80" />
      <DataTable rows={rowsOf(['n', 'name', 'created'], [[3, 'Nova Systems', '22/10/2026 03:05 PM'], [2, 'Acme Corp', '23/10/2026 11:38 AM'], [1, 'Bright Logistics', '16/10/2026 11:41 AM']])}
        query={q} searchKeys={['name']} selectable={false} columns={[{ key: 'n', label: '#' }, { key: 'name', label: 'COMPANY NAME', sortable: true }, { key: 'created', label: 'CREATED AT', sortable: true }]} />
    </Page>
  )
}

export function VisitorReports() {
  const [q, setQ] = useState('')
  return (
    <Page title="Visitor Reports" actions={<><Btn icon={Download}>Download</Btn><Btn primary icon={Filter}>Filter</Btn></>}>
      <SearchBox value={q} onChange={setQ} placeholder="Search by Name or Pass ID..." className="mb-2 w-80" />
      <DataTable rows={visitors} query={q} searchKeys={['name', 'pass']} selectable={false} columns={[
        { key: 'photo', label: 'PHOTO', render: (r) => <Avatar name={r.name} color="#475569" size="size-7" /> }, { key: 'name', label: 'NAME', sortable: true },
        { key: 'pass', label: 'PASS NUMBER' }, { key: 'mobile', label: 'MOBILE' }, { key: 'host', label: 'EMPLOYEE' }, { key: 'dept', label: 'DEPARTMENT' },
        { key: 'location', label: 'LOCATION' }, { key: 'in', label: 'IN TIME' }, { key: 'out', label: 'OUT TIME' }, { key: 'vehicle', label: 'VEHICLE NO' },
        { key: 'status', label: 'STATUS', render: (r) => <Status s={r.status} /> }, { key: 'approver', label: 'APPROVED BY' }, { key: 'type', label: 'BOOKING TYPE' },
      ]} />
    </Page>
  )
}
