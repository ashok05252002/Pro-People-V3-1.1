import { useState } from 'react'
import { IdCard, CalendarDays, Banknote, FileText, Paperclip, Filter, Download, Upload, Trash2, Search, SlidersHorizontal, Eye, Plus, Pencil, UserSearch } from 'lucide-react'
import { ApprovalBoard } from '../components/approvals'
import { Page, Btn, SearchBox, DataTable, Badge, Person, rowsOf, actionsCol } from '../components/table'
import { ReportsHub } from './timetracker/Attendance'
import { employees, emp } from '../data/people'
import { inr } from '../components/ui'

const card = (i, n, lines) => { const e = emp(i); return { id: n + 1, e, lines: [[IdCard, null, e.code], ...lines] } }

export const LoanApprovals = () => <ApprovalBoard title="Loan Approvals" historyStatus={['Approved', 'Rejected', 'Cancelled', 'Closed']} items={[
  card(4, 0, [[Banknote, 'Amount:', inr(50000)], [CalendarDays, 'Tenure:', '10 months'], [FileText, 'Applied on:', 'Oct 18, 2026 11:02 AM'], [FileText, 'Purpose:', 'Medical expenses']]),
  card(13, 1, [[Banknote, 'Amount:', inr(25000)], [CalendarDays, 'Tenure:', '5 months'], [FileText, 'Applied on:', 'Oct 21, 2026 04:15 PM'], [FileText, 'Purpose:', 'House rent advance']]),
]} />

export const TdsApprovals = () => <ApprovalBoard title="TDS Approvals" items={[
  card(2, 0, [[CalendarDays, 'FY:', '2026-27'], [Banknote, 'Declared:', inr(150000)], [FileText, 'Section:', '80C - PPF, ELSS'], [Paperclip, null, <u key="p">proof.pdf</u>]]),
  card(8, 1, [[CalendarDays, 'FY:', '2026-27'], [Banknote, 'Declared:', inr(25000)], [FileText, 'Section:', '80D - Health insurance'], [Paperclip, null, <u key="p">policy.pdf</u>]]),
]} />

export const TaxRegimeApprovals = () => <ApprovalBoard title="Tax Regime Approvals" items={[
  card(5, 0, [[CalendarDays, 'FY:', '2026-27'], [FileText, 'Current:', 'Old Regime'], [FileText, 'Requested:', 'New Regime'], [FileText, 'Applied on:', 'Oct 10, 2026 09:40 AM']]),
]} />

export const EncashmentApprovals = () => <ApprovalBoard title="Encashment Approvals" items={[
  card(7, 0, [[FileText, 'Leave Type:', 'Annual Leave'], [CalendarDays, 'Days:', '5'], [Banknote, 'Amount:', inr(9500)], [FileText, 'Applied on:', 'Oct 12, 2026 02:30 PM']]),
  card(16, 1, [[FileText, 'Leave Type:', 'Annual Leave'], [CalendarDays, 'Days:', '3'], [Banknote, 'Amount:', inr(6100)], [FileText, 'Applied on:', 'Oct 19, 2026 10:05 AM']]),
]} />

export const ExpenseRequests = () => <ApprovalBoard title="Expense Requests" items={[
  card(0, 0, [[CalendarDays, null, '15 Oct 26'], [Banknote, null, '2500.00'], [Paperclip, null, <u key="d">document</u>], [FileText, 'Applied on:', 'Oct 15, 2026 05:29 PM'], [FileText, 'Purpose:', 'Client travel']]),
  card(10, 1, [[CalendarDays, null, '20 Oct 26'], [Banknote, null, '840.00'], [Paperclip, null, <u key="d">document</u>], [FileText, 'Applied on:', 'Oct 20, 2026 06:10 PM'], [FileText, 'Purpose:', 'Team lunch']]),
]} />

export function Payrolls() {
  const list = [['ST', 'Standard', 'Default', 46], ['MA', 'Management', null, 3]]
  return (
    <Page title="Payrolls" actions={<Btn primary icon={Plus}>Add Payroll</Btn>}>
      <div className="grid gap-3 md:grid-cols-2">
        {list.map(([ab, name, tag, count]) => (
          <div key={name} className="rounded-lg bg-base-100 p-4 shadow-sm">
            <div className="flex items-center gap-3 border-b border-base-300 pb-3">
              <span className="grid size-10 place-items-center rounded-md bg-primary/10 font-bold text-primary">{ab}</span>
              <div className="flex-1"><div className="font-bold">{name} {tag && <span className="ml-1 rounded bg-base-200 px-1.5 text-[10px] font-normal">{tag}</span>}</div><div className="text-[11px] text-base-content/60">Regular</div></div>
              <span className="flex gap-3"><Eye size={15} /><Pencil size={15} /></span>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
              <div><div className="text-[10px] uppercase text-base-content/50">Frequency</div>For Month (Run Date: 01)</div>
              <div><div className="text-[10px] uppercase text-base-content/50">Assigned Employees</div>{count} Employees</div>
            </div>
            <div className="mt-3 flex gap-2"><Badge>Idle</Badge><Badge>Active</Badge></div>
          </div>
        ))}
      </div>
    </Page>
  )
}

export function LoanTypes() {
  return (
    <Page title="Loan Types" actions={<Btn primary>Add Loan Type</Btn>}>
      <DataTable selectable={false} rows={rowsOf(['name', 'max', 'tenure', 'interest', 'status'], [['Salary Advance', inr(50000), '6 months', '0%', 'Active'], ['Personal Loan', inr(200000), '24 months', '4%', 'Active'], ['Emergency Loan', inr(25000), '3 months', '0%', 'Active']])} columns={[
        { key: 'name', label: 'Loan Type' }, { key: 'max', label: 'Max Amount' }, { key: 'tenure', label: 'Max Tenure' }, { key: 'interest', label: 'Interest' },
        { key: 'status', label: 'Status', render: (r) => <Badge>{r.status}</Badge> }, actionsCol({ view: false }),
      ]} />
    </Page>
  )
}

const salaryRows = employees.slice(0, 20).map((e, i) => {
  const basic = 18000 + (i % 9) * 3500
  return { ...e, days: 31 - (i % 3), basic, allow: Math.round(basic * 0.4), ded: Math.round(basic * 0.12), net: Math.round(basic * 1.28) }
})
const money = (k) => ({ key: k, render: (r) => inr(r[k]) })

export function SalaryGeneration() {
  const [shown, setShown] = useState(false)
  return (
    <Page title="Salary Generation">
      <div className="mb-3 flex flex-wrap items-end gap-2 rounded-lg bg-base-100 p-3 shadow-sm">
        <label className="text-[11px] font-semibold">Payrolls<select className="select mt-1 block w-48"><option>Select ...</option><option>Standard</option><option>Management</option></select></label>
        <label className="text-[11px] font-semibold">Month<input type="month" defaultValue="2026-10" className="input mt-1 block w-44" /></label>
        <label className="flex-1 text-[11px] font-semibold">Employee<select className="select mt-1 block w-full"><option>Search ...</option></select></label>
        <Btn primary onClick={() => setShown(true)}>Preview</Btn>
      </div>
      {shown ? (
        <>
          <div className="mb-3 grid gap-3 md:grid-cols-4">
            {[['Period', '01 Oct - 31 Oct 2026'], ['Employees', salaryRows.length], ['Gross', inr(salaryRows.reduce((a, r) => a + r.basic + r.allow, 0))], ['Net Pay', inr(salaryRows.reduce((a, r) => a + r.net, 0))]].map(([k, v]) => (
              <div key={k} className="rounded-lg bg-base-100 p-3 shadow-sm"><div className="text-[11px] text-base-content/60">{k}</div><div className="font-bold">{v}</div></div>
            ))}
          </div>
          <DataTable rows={salaryRows} columns={[
            { key: 'name', label: 'Employee', render: (e) => <Person e={e} badges={<span className="text-[11px] text-base-content/60">{e.code}</span>} /> },
            { key: 'days', label: 'Paid Days' }, { ...money('basic'), label: 'Basic' }, { ...money('allow'), label: 'Allowances' }, { ...money('ded'), label: 'Deductions' }, { ...money('net'), label: 'Net Pay' },
          ]} />
          <div className="mt-3 flex justify-end"><Btn primary>Generate Salary</Btn></div>
        </>
      ) : <div className="rounded-lg bg-base-100 py-16 text-center text-[13px] text-base-content/50 shadow-sm">Select payroll and month to view period details</div>}
    </Page>
  )
}

const multi = ['Department', 'Designations', 'Categories', 'Locations', 'Vendor']
export function Payslip() {
  const [q, setQ] = useState('')
  return (
    <Page title="Payslip">
      <div className="mb-3 rounded-lg bg-base-100 p-3 shadow-sm">
        <div className="mb-2 text-xs font-bold">Filters</div>
        <div className="grid gap-2 md:grid-cols-4">
          <label className="text-[11px] font-semibold">Month<input type="month" defaultValue="2026-09" className="input mt-1 block w-full" /></label>
          <label className="text-[11px] font-semibold">Payroll<select className="select mt-1 block w-full"><option>Standard</option><option>Management</option></select></label>
          {multi.map((m) => <label key={m} className="text-[11px] font-semibold">{m}<select className="select mt-1 block w-full"><option>0 selected</option></select></label>)}
        </div>
        <div className="mt-3 flex gap-2"><SearchBox value={q} onChange={setQ} placeholder="Search" className="flex-1" /><Btn primary icon={Filter}>Filter</Btn><Btn icon={Download}>Download</Btn></div>
      </div>
      <DataTable rows={salaryRows} query={q} searchKeys={['name', 'code']} columns={[
        { key: 'name', label: 'Employee', render: (e) => <Person e={e} badges={<span className="text-[11px] text-base-content/60">{e.code}</span>} /> },
        { key: 'department', label: 'Department' }, { ...money('net'), label: 'Net Pay' },
        { key: 'a', label: 'Payslip', render: () => <span className="flex gap-3"><Eye size={15} /><Download size={15} /></span> },
      ]} />
    </Page>
  )
}

const eosTabs = ['EOS Policy Master', 'EOS Slab Master', 'Salary Mapping', 'Accrual & Provisioning', 'Formula Configuration']
const eosTables = {
  'EOS Policy Master': [['Policy Name', 'Nationalities', 'From', 'Upto', 'Min Service', 'Basic', 'Allowances', 'Contract', 'Status'],
    [['Expatriate Worker Gratuity Old', 'Indian, Kenyan, Egyptian', '01 Jan 1998', '31 Jul 2023', '1 Days', 'Yes', 'No', 'Permanent', 'Active'],
      ['Expatriate Worker Gratuity New', 'Indian, Kenyan, Egyptian', '31 Aug 2023', '12 Mar 2043', '1 Days', 'Yes', 'No', 'Permanent', 'Active']]],
  'EOS Slab Master': [['Policy', 'From Years', 'To Years', 'Days per Year'], [['Gratuity New', '0', '3', '15'], ['Gratuity New', '3', '5', '21'], ['Gratuity New', '5', '99', '30']]],
  'Salary Mapping': [['Salary Component', 'Include in EOS', 'Percentage Contribution'], [['Basic', 'Yes', '100%'], ['Housing Allowance', 'No', '0%'], ['Transport Allowance', 'No', '0%']]],
  'Accrual & Provisioning': [['Month', 'Employees', 'Provision Amount', 'Status'], [['Sep 2026', '46', inr(412000), 'Posted'], ['Oct 2026', '46', inr(418500), 'Draft']]],
  'Formula Configuration': [['Policy Name', 'Formula Name', 'Expression', 'Status'], [['Gratuity New', 'Standard', '(basic / 30) * days_per_year * years', 'Active']]],
}

export function EosSetup() {
  const [tab, setTab] = useState(eosTabs[0])
  const [cols, data] = eosTables[tab]
  return (
    <Page title="Gratuity (EOS) Setup">
      <div className="mb-3 flex flex-wrap gap-1 border-b border-base-300 text-[13px]">
        {eosTabs.map((t) => <button key={t} onClick={() => setTab(t)} className={`-mb-px border-b-2 px-3 py-2 ${tab === t ? 'border-primary font-semibold text-primary' : 'border-transparent text-base-content/60'}`}>{t}</button>)}
      </div>
      <div className="mb-3 flex items-center justify-between">
        <div><h2 className="font-semibold">{tab}</h2><p className="text-[11px] text-base-content/60">Configure country-specific gratuity policies.</p></div>
        <Btn primary icon={Plus}>Add New</Btn>
      </div>
      <DataTable selectable={false} rows={data.map((r, i) => ({ id: i + 1, ...Object.fromEntries(cols.map((c, j) => [c, r[j]])) }))}
        columns={[...cols.map((c) => ({ key: c, label: c, render: c === 'Status' ? (r) => <Badge>{r[c] === 'Posted' ? 'Approved' : r[c]}</Badge> : undefined })), actionsCol({ view: false })]} />
    </Page>
  )
}

export function EosSettlement() {
  const [q, setQ] = useState('')
  const [pick, setPick] = useState(null)
  const found = q.length >= 2 ? employees.filter((e) => e.name.toLowerCase().includes(q.toLowerCase())).slice(0, 6) : []
  return (
    <Page title="EOS Settlement">
      <div className="grid gap-3 md:grid-cols-[1fr_2fr]">
        <div className="rounded-lg bg-base-100 p-3 shadow-sm">
          <div className="mb-2 text-xs font-bold">Employee Search</div>
          <SearchBox value={q} onChange={setQ} placeholder="Enter at least 2 characters" />
          <ul className="mt-2 space-y-1">{found.map((e) => <li key={e.id}><button onClick={() => setPick(e)} className="w-full rounded-md p-1.5 text-left hover:bg-base-200"><Person e={e} badges={<span className="text-[11px] text-base-content/60">{e.code}</span>} /></button></li>)}</ul>
        </div>
        <div className="rounded-lg bg-base-100 p-6 shadow-sm">
          {pick ? (
            <div className="space-y-3 text-[13px]">
              <Person e={pick} badges={<span className="text-[11px] text-base-content/60">{pick.designation}</span>} />
              <div className="grid grid-cols-2 gap-3">
                {[['Date of Joining', pick.joined], ['Last Working Date', '31-10-2026'], ['Service', '4 years 2 months'], ['Basic Salary', inr(32000)], ['Gratuity Days', '84'], ['Payable Amount', inr(89600)]].map(([k, v]) => (
                  <div key={k} className="rounded-md bg-base-200/60 p-3"><div className="text-[11px] text-base-content/60">{k}</div><div className="font-semibold">{v}</div></div>
                ))}
              </div>
              <div className="flex justify-end"><Btn primary>Process Settlement</Btn></div>
            </div>
          ) : (
            <div className="grid h-full place-items-center py-12 text-center"><div><UserSearch className="mx-auto mb-2 text-base-content/40" /><div className="font-semibold">Select an Employee</div><p className="text-xs text-base-content/60">To start the EOS calculation, search and select a departing staff member from the left panel.</p></div></div>
          )}
        </div>
      </div>
    </Page>
  )
}

function MonthToolbar({ q, setQ, payroll, children }) {
  return (
    <div className="mb-2 flex flex-wrap items-end gap-2">
      <label className="text-[11px] font-semibold">Month<input type="month" defaultValue="2026-10" className="input mt-1 block w-44" /></label>
      {payroll ? <label className="text-[11px] font-semibold">Payrolls<select className="select mt-1 block w-44"><option>Select ...</option><option>Standard</option></select></label> : null}
      <label className="flex-1 text-[11px] font-semibold">{payroll ? 'Search' : 'Employee'}<SearchBox value={q} onChange={setQ} placeholder="Search by Name, Code" className="mt-1" /></label>
      {children}
    </div>
  )
}

export function GratuityLiability() {
  const [q, setQ] = useState('')
  const rows = employees.slice(0, 12).map((e, i) => ({ ...e, years: (1 + (i % 6)).toFixed(1), basic: 18000 + (i % 9) * 3500 })).map((r) => ({ ...r, liability: Math.round((r.basic / 30) * 21 * r.years) }))
  return (
    <Page title="Gratuity Liability Report">
      <MonthToolbar q={q} setQ={setQ}><Btn primary icon={Filter}>Filter</Btn><Btn icon={Download}>Download</Btn><Btn icon={SlidersHorizontal}>More Filters</Btn></MonthToolbar>
      <DataTable rows={rows} query={q} searchKeys={['name', 'code']} selectable={false} columns={[
        { key: 'name', label: 'Employee', render: (e) => <Person e={e} badges={<span className="text-[11px] text-base-content/60">{e.code}</span>} /> },
        { key: 'joined', label: 'Date of Joining' }, { key: 'years', label: 'Service (Years)' }, { ...money('basic'), label: 'Basic' }, { ...money('liability'), label: 'Liability' },
      ]} />
    </Page>
  )
}

export function EosStatement() {
  const [q, setQ] = useState('')
  const rows = [3, 6, 15].map((i, n) => ({ ...emp(i), id: n + 1, lwd: ['17-08-2026', '10-09-2026', '31-07-2026'][n], days: [1420, 980, 2210][n], amount: [64000, 41500, 112300][n] }))
  return (
    <Page title="EOS Gratuity Statement">
      <MonthToolbar q={q} setQ={setQ}><Btn primary>Preview</Btn><Btn icon={Search}>Search</Btn><Btn icon={Download}>Download</Btn></MonthToolbar>
      <DataTable rows={rows} query={q} searchKeys={['name', 'code']} selectable={false} columns={[
        { key: 'name', label: 'Employee', render: (e) => <Person e={e} badges={<span className="text-[11px] text-base-content/60">{e.code}</span>} /> },
        { key: 'lwd', label: 'Last Working Date' }, { key: 'days', label: 'Service Days' }, { ...money('amount'), label: 'Payable Amount' },
      ]} />
    </Page>
  )
}

export function MonthlyVariables() {
  const [q, setQ] = useState('')
  const rows = employees.slice(0, 14).map((e, i) => ({ ...e, incentive: (i % 4) * 1500, ot: (i % 3) * 800, bonus: i % 5 === 0 ? 5000 : 0, ded: (i % 2) * 300 }))
  return (
    <Page title="Employee Variable Pay">
      <MonthToolbar q={q} setQ={setQ} payroll><Btn primary icon={Filter}>Filter</Btn><Btn icon={Upload}>Import</Btn><Btn icon={Download}>Download</Btn><Btn icon={Trash2}>Delete</Btn></MonthToolbar>
      <DataTable rows={rows} query={q} searchKeys={['name', 'code']} columns={[
        { key: 'name', label: 'Employee', render: (e) => <Person e={e} badges={<span className="text-[11px] text-base-content/60">{e.code}</span>} /> },
        { ...money('incentive'), label: 'Incentive' }, { ...money('ot'), label: 'OT Amount' }, { ...money('bonus'), label: 'Bonus' }, { ...money('ded'), label: 'Other Deduction' },
      ]} />
    </Page>
  )
}

export const PayrollReports = () => <ReportsHub title="Payroll Reports" groups={[
  ['Payroll', ['Salary Sheet', 'Non-Payroll Report', 'Comparison Report', 'Loan Deduction Report', 'Loan Statement Report', 'Abstract Report', 'Statement Report', 'Expense Report']],
  ['Compliance', ['EPF ECR Report', 'ESIC Report']],
]} />

export function FnfSettlement() {
  const [tab, setTab] = useState('pending')
  const rows = [[3, '17-Aug-2026', 'Offboarded', '24 Days', 'Process'], [9, '10-Sep-2026', 'Offboarded', '18.5 Days', 'In Progress'], [15, '31-Jul-2026', 'Offboarded', '30 Days', 'Process'], [21, '05-Oct-2026', 'Resigned', '12 Days', 'Process']]
    .map(([i, lwd, reason, bal, act], n) => ({ ...emp(i), id: n + 1, lwd, reason, bal, act }))
  const done = rows.slice(0, 1).map((r) => ({ ...r, id: 99, act: 'Settled' }))
  return (
    <Page title="Full & Final Settlement">
      <div className="mb-3 flex gap-1 border-b border-base-300 text-[13px]">
        {[['pending', 'Pending Settlements'], ['done', 'Settled / Processed']].map(([k, l]) => <button key={k} onClick={() => setTab(k)} className={`-mb-px border-b-2 px-3 py-2 ${tab === k ? 'border-primary font-semibold text-primary' : 'border-transparent text-base-content/60'}`}>{l}</button>)}
      </div>
      <DataTable rows={tab === 'pending' ? rows : done} selectable={false} columns={[
        { key: 'name', label: 'Employee', render: (e) => <Person e={e} badges={<span className="text-[11px] text-base-content/60">{e.code}</span>} /> },
        { key: 'department', label: 'Department / Designation', render: (r) => <div>{r.department}<div className="text-[11px] text-base-content/60">{r.designation}</div></div> },
        { key: 'location', label: 'Location / Category', render: (r) => <div>{r.location}<div className="text-[11px] text-base-content/60">{r.category}</div></div> },
        { key: 'lwd', label: 'Last Working Date', render: (r) => <div>{r.lwd}<div className="text-[11px] text-base-content/60">Notice: N/A</div></div> },
        { key: 'reason', label: 'Exit Reason', render: (r) => <Badge>{r.reason === 'Offboarded' ? 'Offboard' : r.reason}</Badge> }, { key: 'bal', label: 'Leave Bal.' },
        { key: 'act', label: 'Action', render: (r) => r.act === 'Settled' ? <Badge>Completed</Badge> : r.act === 'In Progress' ? <span className="flex items-center gap-2"><Badge>In Progress</Badge><button className="btn btn-xs btn-primary">Continue</button></span> : <button className="btn btn-xs btn-primary">Process</button> },
      ]} />
    </Page>
  )
}

