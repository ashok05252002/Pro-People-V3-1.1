// Profile Request, Attendance Policy, Master Report and Reporting Manager screens.
import { useState } from 'react'
import { Filter, SlidersHorizontal, Download, Pencil, Check, X, UserPlus } from 'lucide-react'
import { Page, Btn, SearchBox, DataTable, Badge, Person, FilterDrawer } from '../../components/table'
import { Avatar } from '../../components/ui'
import { employees, emp } from '../../data/people'

const filterFields = [
  ['Department', 'All Departments', 'Select the departments'], ['Designations', 'All Designations', 'Select the designations'],
  ['Categories', 'All Categories', 'Select the categories'], ['Locations', 'All Locations', 'Select the locations'],
]

function Toolbar({ q, setQ, children, onMore }) {
  return (
    <>
      <div className="mb-1 text-[11px] font-semibold">Search</div>
      <div className="mb-2 flex flex-wrap gap-2">
        <SearchBox value={q} onChange={setQ} placeholder="Search by Name, Code" className="min-w-72 flex-1" />
        <Btn primary icon={Filter}>Filter</Btn>
        {children}
        <Btn icon={SlidersHorizontal} onClick={onMore}>More Filter</Btn>
      </div>
    </>
  )
}

const requests = [0, 4, 9, 15].map((i, n) => ({
  id: n + 1, ...emp(i), field: ['Contact Number', 'Current Address', 'Bank Account Number', 'Marital Status'][n],
  old: ['+91 9840011122', '12, Lake View Rd', 'XXXX4471', 'Single'][n], new: ['+91 9840099988', '7, Park Street', 'XXXX9032', 'Married'][n],
  requested: ['21-10-2026', '20-10-2026', '18-10-2026', '15-10-2026'][n], status: 'Pending',
}))

export function ProfileRequest() {
  const [q, setQ] = useState('')
  return (
    <Page title="Approvals">
      <SearchBox value={q} onChange={setQ} placeholder="Search by Name, Code" className="mb-3" />
      <DataTable rows={requests} query={q} searchKeys={['name', 'code']} columns={[
        { key: 'name', label: 'Employee', render: (e) => <Person e={e} badges={<span className="text-[11px] text-base-content/60">{e.code}</span>} /> },
        { key: 'field', label: 'Field' }, { key: 'old', label: 'Current Value' }, { key: 'new', label: 'Requested Value' },
        { key: 'requested', label: 'Requested On' }, { key: 'status', label: 'Status', render: (r) => <Badge>{r.status}</Badge> },
        { key: 'a', label: 'Actions', render: () => <span className="flex gap-2"><button className="btn btn-xs btn-success btn-outline"><Check size={12} /></button><button className="btn btn-xs btn-error btn-outline"><X size={12} /></button></span> },
      ]} />
    </Page>
  )
}

const policyRows = employees.map((e, i) => ({
  ...e, punch: i % 4 === 0 ? 'Biometric' : '-', ot: 'Yes', otTypes: 'Normal Ot, Weekoff Ot, Holiday Ot', late: 'Yes', span: '-', auto: '-',
  compoff: 'Yes', compTypes: 'Weekoff Comp Off, Holiday Comp Off',
}))

export function AttendancePolicy() {
  const [q, setQ] = useState('')
  const [more, setMore] = useState(false)
  return (
    <Page title="Attendance Policy" actions={<Btn primary>Edit Attendance Policy</Btn>}>
      <Toolbar q={q} setQ={setQ} onMore={() => setMore(true)} />
      <DataTable rows={policyRows} query={q} searchKeys={['name', 'code']} selectable={false} columns={[
        { key: 'name', label: 'Employee Name', sortable: true, render: (e) => <div className="flex items-center gap-3"><Avatar name={e.name} color={e.color} /><div className="max-w-28 text-xs">{e.name}<div className="text-base-content/60">{e.code}</div></div></div> },
        { key: 'punch', label: 'Punch Type' }, { key: 'ot', label: 'OT Applicable' },
        { key: 'otTypes', label: 'OT Types', render: (r) => <div className="max-w-24 text-xs">{r.otTypes}</div> },
        { key: 'late', label: 'Late Applicable' }, { key: 'span', label: 'Work Span' }, { key: 'auto', label: 'Auto Shift' },
        { key: 'compoff', label: 'Comp Off Applicable' },
        { key: 'compTypes', label: 'Comp Off Types', render: (r) => <div className="max-w-32 text-xs">{r.compTypes}</div> },
        { key: 'a', label: 'Actions', render: () => <Pencil size={15} /> },
      ]} />
      <FilterDrawer open={more} onClose={() => setMore(false)} fields={filterFields} />
    </Page>
  )
}

const masterCols = ['Department', 'Designation', 'Category', 'Location', 'Vendor', 'Reporting Manager', 'Date of Joining', 'End of Probation',
  'Gender', 'Marital Status', 'Mobile', 'Official Email', 'Personal Email', 'Alternate Contact', 'Date of Birth', 'Blood Group', 'Religion',
  'City of Residence', 'Permanent Address', 'Current Address', 'Aadhar Number', 'Emergency Contact', 'Bank Name', 'Account Number', 'Branch',
  'IFSC', 'UAN', 'PF Number', 'ESIC', 'Status', 'Role', 'Portal Access', 'Default Weekoff', 'Late Applicable', 'OT Applicable', 'OT Types',
  'Basic Salary', 'Other Allowance', 'Gross']

const masterRows = employees.map((e, i) => {
  const basic = 18000 + (i % 9) * 3500
  return {
    ...e, 'Department': e.department, 'Designation': e.designation, 'Category': e.category, 'Location': e.location,
    'Vendor': e.vendor === 'Direct' ? '-' : e.vendor, 'Reporting Manager': emp(i + 5).name, 'Date of Joining': e.joined,
    'End of Probation': e.joined.replace(/\d{4}$/, (y) => +y + 1), 'Gender': e.gender, 'Marital Status': i % 2 ? 'Married' : 'Single',
    'Mobile': e.phone, 'Official Email': e.email, 'Personal Email': e.email.replace('example.com', 'mail.com'), 'Alternate Contact': '-',
    'Date of Birth': `${String((i % 28) + 1).padStart(2, '0')}-0${(i % 9) + 1}-199${i % 10}`, 'Blood Group': ['O+', 'A+', 'B+', 'AB+'][i % 4],
    'Religion': ['Hindu', 'Muslim', 'Christian'][i % 3], 'City of Residence': ['Chennai', 'Coimbatore', 'Madurai'][i % 3],
    'Permanent Address': `${i + 3}, Main Road`, 'Current Address': `${i + 3}, Main Road`, 'Aadhar Number': `XXXX XXXX ${String(1000 + i * 37).slice(-4)}`,
    'Emergency Contact': '+91 9000000000', 'Bank Name': ['State Bank', 'City Bank', 'Union Bank'][i % 3], 'Account Number': `XXXXXX${4000 + i}`,
    'Branch': 'Main Branch', 'IFSC': `DEMO000${100 + i}`, 'UAN': `1000${200000 + i}`, 'PF Number': `PF/DEMO/${300 + i}`, 'ESIC': `ES${500 + i}`,
    'Status': e.status, 'Role': i % 9 === 1 ? 'Manager' : 'Employee', 'Portal Access': 'Yes', 'Default Weekoff': 'Friday',
    'Late Applicable': 'Yes', 'OT Applicable': 'Yes', 'OT Types': 'Normal Ot', 'Basic Salary': basic.toLocaleString('en-IN'),
    'Other Allowance': (basic * 0.4).toLocaleString('en-IN'), 'Gross': (basic * 1.4).toLocaleString('en-IN'),
  }
})

export function MasterReport() {
  const [q, setQ] = useState('')
  const [more, setMore] = useState(false)
  return (
    <Page title="Employee Master Report">
      <div className="mb-1 text-[11px] font-semibold">Search</div>
      <div className="mb-2 flex flex-wrap gap-2">
        <SearchBox value={q} onChange={setQ} placeholder="Search by Name, Code..." className="min-w-72 flex-1" />
        <Btn primary icon={Filter}>Filter</Btn><Btn icon={Download}>Download</Btn>
        <Btn icon={SlidersHorizontal} onClick={() => setMore(true)}>More Filters</Btn>
      </div>
      <DataTable rows={masterRows} query={q} searchKeys={['name', 'code']} selectable={false} columns={[
        { key: 'name', label: 'Name', sortable: true, render: (e) => <div className="min-w-48"><Person e={e} badges={<Badge>{e.status}</Badge>} /></div> },
        { key: 'code', label: 'Employee ID', sortable: true },
        ...masterCols.map((c) => ({ key: c, label: <span className="whitespace-nowrap">{c}</span>, render: (r) => <span className="whitespace-nowrap">{r[c]}</span> })),
      ]} />
      <FilterDrawer open={more} onClose={() => setMore(false)} fields={filterFields} />
    </Page>
  )
}

const managers = [5, 12, 20, 33].map((i, n) => ({ id: n + 1, ...emp(i), reports: [1, 2, 3].map((k) => emp(i + k * 4)) }))

export function ReportingManager() {
  return (
    <Page title="Reporting Manager" actions={<Btn primary icon={UserPlus}>Add Reporting To</Btn>}>
      <DataTable rows={managers} selectable={false} columns={[
        { key: 'name', label: 'Reporting Manager', render: (e) => <Person e={e} badges={<span className="text-[11px] text-base-content/60">{e.designation}</span>} /> },
        { key: 'department', label: 'Department' },
        { key: 'reports', label: 'Reporting Employees', render: (r) => <div className="flex -space-x-2">{r.reports.map((x) => <span key={x.id} title={x.name} className="rounded-full ring-2 ring-base-100"><Avatar name={x.name} color={x.color} size="size-8" /></span>)}</div> },
        { key: 'count', label: 'Count', render: (r) => r.reports.length },
        { key: 'a', label: 'Actions', render: () => <Pencil size={15} /> },
      ]} />
    </Page>
  )
}
