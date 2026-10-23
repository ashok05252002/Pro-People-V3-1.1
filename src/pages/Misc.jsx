// OfficeDoc, Notice, Audit, Dev Tools, UserGuide and Settings > Users.
import { useState } from 'react'
import { Plus, Link2, Filter, Terminal, Trash2, Play, BookOpen, Radio, ShieldCheck } from 'lucide-react'
import { Page, Btn, SearchBox, DataTable, Badge, rowsOf, actionsCol } from '../components/table'

export function OfficeDocuments() {
  const rows = rowsOf(['name', 'expiry', 'desc', 'reminder'], [
    ['Head Office Lease Agreement', '2027-03-31', 'Lease from 31 Mar 2025 to 31 Mar 2027.', '30 days'],
    ['Municipality Trade License', '2026-10-15', 'Trade license valid till 15 Oct 2026.', '30 days'],
    ['Fire Safety NOC', '2026-06-30', 'Fire department NOC for head office.', '30 days'],
    ['Cafeteria Vendor Contract', '2027-03-31', 'Vendor contract from 31 Mar 2026 to 31 Mar 2027.', '15 days'],
  ])
  return (
    <Page title="Office Document" actions={<Btn primary icon={Plus}>Add Document</Btn>}>
      <DataTable rows={rows} selectable={false} columns={[
        { key: 'name', label: 'Name' }, { key: 'doc', label: 'Document', render: () => <a className="flex items-center gap-1 text-blue-600 underline"><Link2 size={13} />link</a> },
        { key: 'expiry', label: 'Expiry Date' }, { key: 'desc', label: 'Description', render: (r) => <div className="max-w-72 text-xs">{r.desc}</div> },
        { key: 'reminder', label: 'reminder days' }, actionsCol({ view: false }),
      ]} />
    </Page>
  )
}

export function Notices() {
  const rows = rowsOf(['title', 'audience', 'from', 'to', 'status'], [
    ['Diwali office closure', 'All Employees', '20-10-2026', '10-11-2026', 'Published'],
    ['Fire drill on Friday', 'Head Office', '17-10-2026', '24-10-2026', 'Published'],
    ['New leave policy 2027', 'All Employees', '01-11-2026', '31-12-2026', 'Draft'],
  ])
  return (
    <Page title="Notices" actions={<Btn primary icon={Plus}>Add Notice</Btn>}>
      <DataTable rows={rows} selectable={false} columns={[
        { key: 'title', label: 'Title' }, { key: 'audience', label: 'Audience' }, { key: 'from', label: 'Publish From' }, { key: 'to', label: 'Publish To' },
        { key: 'status', label: 'Status', render: (r) => <Badge>{r.status}</Badge> }, actionsCol(),
      ]} />
    </Page>
  )
}

const registry = ['Document', 'Location', 'ModelHasLock', 'Role', 'Setting', 'User', 'MetaData', 'Approval', 'EmployeePayrollInput', 'PayrollComponent', 'Employee',
  'EmployeeGroup', 'EmployeeRequiredField', 'Geolocation', 'ContractType', 'GratuityComponentMapping', 'GratuityPolicy', 'GratuityProvision', 'GratuitySettlement',
  'GratuitySlab', 'LatePolicy', 'OfficeDocument', 'Category', 'Department', 'Designation', 'Vendor', 'Device', 'DeviceGroup', 'EmployeeShiftOverride',
  'InvalidTimeLog', 'LeaveCredit', 'LeaveGroup']

export function AuditLogs() {
  const [type, setType] = useState('Employee')
  const rows = Array.from({ length: 14 }, (_, i) => ({
    id: i + 1, name: type, desc: `${type} #${100 + i} ${['updated', 'created', 'deleted'][i % 3]}`, event: ['updated', 'created', 'deleted'][i % 3],
    user: ['admin', 'hr.manager', 'indigo'][i % 3], at: `${String(23 - (i % 10)).padStart(2, '0')}-10-2026 ${String(9 + (i % 8)).padStart(2, '0')}:${String((i * 7) % 60).padStart(2, '0')}`,
  }))
  return (
    <Page title="Audit Logs">
      <div className="grid gap-3 md:grid-cols-[220px_1fr]">
        <div className="max-h-[70vh] overflow-y-auto rounded-lg bg-base-100 p-2 shadow-sm">
          <div className="px-2 py-2 text-[11px] font-bold uppercase text-base-content/60">Registry Types</div>
          {registry.map((r) => <button key={r} onClick={() => setType(r)} className={`block w-full rounded-md px-3 py-1.5 text-left text-[13px] ${type === r ? 'bg-primary/10 font-semibold text-primary' : 'hover:bg-base-200'}`}>{r}</button>)}
        </div>
        <DataTable rows={rows} selectable={false} columns={[
          { key: 'name', label: 'Name' }, { key: 'desc', label: 'Description' },
          { key: 'event', label: 'Event', render: (r) => <span className={`rounded px-2 py-0.5 text-[11px] ${r.event === 'deleted' ? 'bg-rose-50 text-rose-500' : r.event === 'created' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'}`}>{r.event}</span> },
          { key: 'user', label: 'User Name' }, { key: 'at', label: 'Created At' },
        ]} />
      </div>
    </Page>
  )
}

const DarkPanel = ({ title, badge, children, right }) => (
  <div className="mx-auto max-w-7xl overflow-hidden rounded-lg bg-slate-900 text-slate-200 shadow">
    <div className="flex flex-wrap items-center gap-3 border-b border-slate-700 px-4 py-3">
      <Terminal size={16} className="text-emerald-400" /><span className="text-sm font-bold tracking-wide">{title}</span>
      {badge && <span className="flex items-center gap-1 rounded bg-emerald-500/15 px-2 py-0.5 text-[10px] font-semibold text-emerald-400"><Radio size={11} />{badge}</span>}
      <div className="flex-1" />{right}
    </div>
    {children}
  </div>
)

export function ArtisanRunner() {
  const [cmd, setCmd] = useState('list')
  const [out, setOut] = useState('')
  const quick = ['optimize', 'config:cache', 'route:cache', 'view:cache', 'migrate']
  return (
    <DarkPanel title="ARTISAN COMMAND RUNNER" right={<span className="flex items-center gap-1 text-[10px] text-amber-400"><ShieldCheck size={12} />Restricted Context</span>}>
      <div className="space-y-3 p-4">
        <div className="flex flex-wrap gap-2">{quick.map((q) => <button key={q} onClick={() => setCmd(q)} className="rounded border border-slate-600 px-3 py-1 font-mono text-xs hover:bg-slate-800">{q}</button>)}</div>
        <div className="text-[11px] text-slate-400">Manual Input: enter command name, arguments, and options. "php artisan" is not needed.</div>
        <div className="flex gap-2">
          <input value={cmd} onChange={(e) => setCmd(e.target.value)} className="flex-1 rounded border border-slate-600 bg-slate-950 px-3 py-2 font-mono text-sm outline-none" />
          <button onClick={() => setOut(`$ php artisan ${cmd}\n\n  INFO  Command "${cmd}" executed (static demo, nothing was run).`)} className="btn btn-sm h-10 gap-1 border-none bg-emerald-600 text-white"><Play size={14} />Execute Command</button>
          <button onClick={() => setOut('')} className="btn btn-sm h-10 border-slate-600 bg-transparent text-slate-200">Clear Output</button>
        </div>
        <pre className="min-h-64 rounded bg-slate-950 p-3 font-mono text-xs text-emerald-300">{out || 'Output will appear here.'}</pre>
      </div>
    </DarkPanel>
  )
}

export function ProsyncLogs() {
  return (
    <DarkPanel title="PROSYNC WEBHOOK LOG WATCHER" badge="LIVE POLLING (5S)" right={<>
      <select className="select select-xs bg-slate-800 text-slate-200"><option>All Event Types</option><option>attendance</option><option>enrollment</option></select>
      <span className="text-[11px] text-slate-400">Cached: 3 / 50</span><button className="btn btn-xs border-slate-600 bg-transparent text-slate-200"><Trash2 size={12} />Clear Logs</button></>}>
      <div className="divide-y divide-slate-800 font-mono text-xs">
        {[['10:42:18', 'attendance', 'DEMO520496017', 'EMP104 punch IN'], ['10:40:02', 'attendance', 'DEMO520496016', 'EMP087 punch OUT'], ['10:31:55', 'enrollment', 'DEMO520496017', 'EMP120 face enrolled']].map(([t, ev, dev, msg]) => (
          <div key={t} className="flex gap-4 px-4 py-2"><span className="text-slate-500">{t}</span><span className="text-sky-400">{ev}</span><span className="text-slate-400">{dev}</span><span>{msg}</span></div>
        ))}
      </div>
    </DarkPanel>
  )
}

export function LaravelLog() {
  const lines = ['[2026-10-23 10:41:07] staging.INFO: Payroll cache cleared for October 2026', '[2026-10-23 10:39:44] staging.WARNING: Device DEMO520496018 did not respond within 30s',
    '[2026-10-23 10:22:10] staging.ERROR: Example exception message (static demo)', '#0 /var/www/html/app/Http/Kernel.php(200): Router->dispatch()', '#1 {main}',
    '[2026-10-23 09:58:31] staging.INFO: Scheduled job app:apply-leave-policies finished']
  return (
    <DarkPanel title="LARAVEL LOGS" badge="LIVE POLLING (5S)" right={<>
      <select className="select select-xs bg-slate-800 text-slate-200"><option>laravel.log</option></select>
      <button className="btn btn-xs border-slate-600 bg-transparent text-slate-200"><Trash2 size={12} />Clear Logs</button></>}>
      <div className="px-4 pt-2 text-[11px] text-slate-400">Showing the last 300 lines of the selected log file.</div>
      <pre className="max-h-[65vh] overflow-auto p-4 font-mono text-xs leading-relaxed">{lines.map((l) => <div key={l} className={l.includes('ERROR') ? 'text-rose-400' : l.includes('WARNING') ? 'text-amber-300' : ''}>{l}</div>)}</pre>
    </DarkPanel>
  )
}

const guides = [['Getting Started', 'Log in, set your profile and find your way around the dashboard.'], ['Employees', 'Add employees, bulk upload and manage profiles.'],
  ['Attendance & Leave', 'Shifts, rosters, leave requests and approvals.'], ['Payroll', 'Run payroll, generate payslips and settlements.']]

export function UserGuide() {
  const [g, setG] = useState(null)
  return (
    <Page title="User Guide">
      <div className="grid gap-3 md:grid-cols-[240px_1fr]">
        <div className="rounded-lg bg-base-100 p-2 shadow-sm">
          {guides.map(([t]) => <button key={t} onClick={() => setG(t)} className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-[13px] ${g === t ? 'bg-primary/10 font-semibold text-primary' : 'hover:bg-base-200'}`}><BookOpen size={14} />{t}</button>)}
        </div>
        <div className="min-h-80 rounded-lg bg-base-100 p-6 shadow-sm">
          {g ? <><h2 className="mb-2 text-lg font-bold">{g}</h2><p className="text-[13px] text-base-content/70">{guides.find(([t]) => t === g)[1]}</p></>
            : <div className="grid h-full place-items-center text-[13px] text-base-content/50">Select a document from the sidebar to read.</div>}
        </div>
      </div>
    </Page>
  )
}

export function Users() {
  const [q, setQ] = useState('')
  const rows = rowsOf(['n', 'username', 'email', 'role', 'protected'], [[1, 'admin', 'admin@example.com', 'Super Admin', true], [7, 'EMP104', '', 'User', false], [70, 'hr.manager', 'hr@example.com', 'User', false],
    [71, 'indigo', '', 'Super Admin', false], [73, 'EMP120', '', 'User', false]])
  return (
    <Page title="Users">
      <div className="mb-2 flex gap-2"><SearchBox value={q} onChange={setQ} placeholder="Search" className="flex-1" /><Btn primary icon={Filter}>Filter</Btn></div>
      <DataTable rows={rows} query={q} searchKeys={['username', 'email']} selectable={false} columns={[
        { key: 'n', label: '#' }, { key: 'username', label: 'Username' }, { key: 'email', label: 'Email' },
        { key: 'role', label: 'Role / Status', render: (r) => <span className="flex gap-1"><span className={`rounded px-2 py-0.5 text-[11px] ${r.role === 'Super Admin' ? 'bg-indigo-50 text-indigo-600' : 'bg-base-200'}`}>{r.role}</span>{r.protected && <span className="rounded bg-amber-50 px-2 py-0.5 text-[11px] text-amber-600">Protected</span>}</span> },
        actionsCol({ view: false }),
      ]} />
    </Page>
  )
}

