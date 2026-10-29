import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Download, Upload, ChevronDown, Pencil, Trash2, ArrowLeft } from 'lucide-react'
import { Page, Btn, ListScreen, SearchBox, DataTable, rowsOf, statusCol, actionsCol } from '../components/table'
import { AddModal, FormGrid, useOpen, nameOnly, MapBox } from '../components/forms'
import { departments, designations, locations } from '../data/people'

const masterTools = <><Btn icon={Download}>Download</Btn><Btn icon={Download}>Import</Btn></>
const editDel = actionsCol({ view: false })

// "# | Name | edit/delete" master screens.
function NameMaster({ title, add, form, names }) {
  const [open, show, hide] = useOpen()
  const rows = names.map((name, i) => ({ id: i + 1, n: ((i * 7) % names.length) + 1, name }))
  return (
    <>
      <ListScreen title={title} actions={<Btn primary onClick={show}>{add}</Btn>} tools={masterTools}
        columns={[{ key: 'n', label: '#', sortable: true }, { key: 'name', label: 'Name', sortable: true }, editDel]} rows={rows} />
      <AddModal open={open} onClose={hide} title={form} fields={nameOnly} />
    </>
  )
}

export const Departments = () => <NameMaster title="Departments" add="Add Department" form="Add Department" names={[...departments, 'Finance & Accounts', 'Operations & Logistics', 'Quality & Compliance', 'Sales & Marketing']} />
export const Designations = () => <NameMaster title="Designations" add="Add Designation" form="Create Designation" names={[...designations, 'Accountant Manager', 'Chief Executive Officer', 'Chief Technology Officer', 'Customer Support Lead', 'Facility Coordinator', 'Finance Manager', 'Security Warden', 'Receptionist', 'Driver', 'Office Assistant']} />
export const Categories = () => <NameMaster title="Categories" add="Add Category" form="Add Category" names={['Contract Staff', 'Corporate Staff', 'Employee', 'Management', 'Operations Field', 'Technical & Engineering']} />
export const Vendors = () => <NameMaster title="Vendors" add="Add Vendor" form="Create Vendor" names={['Apex Technical Staffing', 'Direct Payroll Services', 'Global Workforce Solutions', 'Prime Facility Services']} />
export const EmploymentTypes = () => <NameMaster title="Employment Types" add="Add Employment Type" form="Create Employment Type" names={['Contractor', 'Full Time', 'Internship', 'Part Time', 'Permanent', 'Probationary', 'Temporary']} />
export const Ministry = () => <NameMaster title="Ministry" add="Add Ministry" form="Create Ministry" names={['Ministry of Commerce & Industry', 'Ministry of Human Resources', 'Ministry of Labour', 'MOL']} />
export const Nationalities = () => <NameMaster title="Nationalities" add="Add Nationality" form="Create Nationality" names={['American', 'Australian', 'British', 'Canadian', 'Egyptian', 'Emirati', 'Indian', 'Jordanian', 'Kenyan', 'Omani', 'Filipino', 'Sri Lankan']} />

export function Locations() {
  const [open, show, hide] = useOpen()
  return (
    <>
    <AddModal open={open} onClose={hide} title="Create Location" fields={[
      { label: 'Name' }, { label: 'Address', type: 'textarea', placeholder: 'Enter your address' },
      { label: 'Timezone', type: 'select', placeholder: 'Select your timezone', options: ['Asia/Kolkata', 'Asia/Muscat', 'Asia/Dubai'], hint: 'Select your timezone' },
      { label: 'Week Off', type: 'multi', placeholder: 'Select your Week Off', options: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], hint: 'Select your Week Off' },
    ]} />
    <ListScreen title="Locations" actions={<Btn primary onClick={show}>Add Location</Btn>} tools={masterTools}
      columns={[{ key: 'n', label: '#', sortable: true }, { key: 'name', label: 'Name', sortable: true }, { key: 'tz', label: 'Timezone', sortable: true },
        { key: 'address', label: 'Address' }, { key: 'weekoff', label: 'Week Off' }, editDel]}
      rows={rowsOf(['n', 'name', 'tz', 'address', 'weekoff'], [
        [2, 'Corporate Headquarters', 'Asia/Kolkata', 'Tower A, Financial District, Tech City', 'Sunday'],
        [3, 'Development Center', 'Asia/Kolkata', 'Block 4, Cyber Gateway, Innovation Hub', 'Saturday, Sunday'],
        [4, 'Regional Office', 'Asia/Kolkata', 'Plot 12, Business Bay, Metro City', '-'],
        [1, 'Head Office', 'Asia/Kolkata', '22, Park Town Main Road', 'Friday'],
      ])} />
    </>
  )
}

export function CompanyDocuments() {
  const [q, setQ] = useState('')
  const [open, show, hide] = useOpen()
  const rows = rowsOf(['name', 'code', 'category', 'expiry', 'uploaded'], [
    ['Trade License', 'DOC-001', 'Company', '31-03-2027', '02-04-2026'],
    ['Fire Safety Certificate', 'DOC-002', 'Compliance', '15-01-2027', '16-01-2026'],
    ['Lease Agreement - Head Office', 'DOC-003', 'Legal', '30-06-2028', '01-07-2025'],
    ['Employee Handbook 2026', 'DOC-004', 'HR', '-', '02-10-2026'],
  ])
  return (
    <Page title="Document" actions={<Btn primary onClick={show}>Add Document</Btn>}>
      <AddModal open={open} onClose={hide} title="Add Document" fields={[
        { label: 'Name' }, { label: 'Employee Groups', type: 'multi', placeholder: 'All Employee Groups', options: ['Head Office Staff', 'Security Team', 'Management'] },
        { label: 'File Path', type: 'file', hint: 'Only PDF' }, { label: 'Status', type: 'radio', options: ['published', 'unpublished'] },
        { label: 'Publish At', type: 'date' },
      ]} />
      <div className="mb-2 flex gap-2">
        <SearchBox value={q} onChange={setQ} placeholder="Search by Name, Code" className="flex-1" />
        <Btn icon={Download}>Download</Btn><Btn icon={Upload}>Import</Btn>
      </div>
      <DataTable rows={rows} query={q} searchKeys={['name', 'code']} selectable={false} columns={[
        { key: 'name', label: 'Name', sortable: true }, { key: 'code', label: 'Code' }, { key: 'category', label: 'Category' },
        { key: 'expiry', label: 'Expiry Date' }, { key: 'uploaded', label: 'Uploaded On' }, actionsCol(),
      ]} />
    </Page>
  )
}

export function ContractTypes() {
  const [open, show, hide] = useOpen()
  return (
    <Page title="Contract Types" actions={<Btn primary onClick={show}>Add Contract Type</Btn>}>
      <AddModal open={open} onClose={hide} title="Create Contract Type" fields={[{ label: 'Contract Type Code', req: true }, { label: 'Contract Type Name', req: true }]} />
      <DataTable selectable={false} rows={rowsOf(['n', 'code', 'name'], [[1, 'P', 'Permanent'], [2, 'L', 'Limited'], [3, 'U', 'Unlimited']])}
        columns={[{ key: 'n', label: '#', sortable: true }, { key: 'code', label: 'Code', sortable: true }, { key: 'name', label: 'Name', sortable: true }, editDel]} />
    </Page>
  )
}

export function Zones() {
  const [q, setQ] = useState('')
  const [open, show, hide] = useOpen()
  const rows = rowsOf(['name', 'code', 'location', 'capacity', 'devices', 'status'], [
    ['Reception', 'Z-REC', 'Head Office', 10, 2, 'Active'], ['Server Room', 'Z-SRV', 'Head Office', 3, 1, 'Active'],
    ['Warehouse', 'Z-WH', 'Regional Office', 20, 2, 'Active'], ['Cafeteria', 'Z-CAF', 'Development Center', 40, 1, 'Inactive'],
  ])
  return (
    <Page title="Zone Master" actions={<Btn primary onClick={show}>Add Zone</Btn>}>
      <AddModal open={open} onClose={hide} title="Add Zone" cols={2} size="max-w-xl" fields={[
        { label: 'Zone Name', req: true }, { label: 'Zone Code', req: true },
        { label: 'Location', req: true, type: 'select', placeholder: 'Select Location', options: locations, span: true },
        { label: 'Is Active', type: 'toggle', value: true, span: true },
      ]} />
      <div className="mb-2 flex justify-between gap-2">
        <SearchBox value={q} onChange={setQ} placeholder="Search name, code, or location..." className="w-80" />
        <Btn icon={Download}>Export Excel</Btn>
      </div>
      <DataTable rows={rows} query={q} searchKeys={['name', 'code', 'location']} selectable={false} columns={[
        { key: 'name', label: 'Zone Name' }, { key: 'code', label: 'Code' }, { key: 'location', label: 'Location' },
        { key: 'capacity', label: 'Capacity' }, { key: 'devices', label: 'Devices' }, statusCol, editDel,
      ]} />
    </Page>
  )
}

export function Geolocations() {
  const [open, show, hide] = useOpen()
  const rows = rowsOf(['name', 'lat', 'lng', 'range', 'status'], [
    ['Head Office', '13.0827', '80.2707', 450, 'Active'], ['Development Center', '12.9716', '77.5946', 300, 'Active'],
    ['Regional Office', '11.0168', '76.9558', 200, 'Inactive'],
  ])
  return (
    <Page title="Geolocation" actions={<Btn primary onClick={show}>Add Geolocation</Btn>}>
      <AddModal open={open} onClose={hide} title="Add Geolocation" size="max-w-3xl">
        <div className="grid gap-5 sm:grid-cols-2">
          <FormGrid fields={[
            { label: 'Name' }, { label: 'Latitude', value: '13.0827' }, { label: 'Longitude', value: '80.2707' },
            { label: 'Geofence Range (Meters)', type: 'number', value: 100 }, { label: 'Status', type: 'radio', options: ['Active', 'Inactive'], value: 'Active' },
          ]} />
          <div className="flex flex-col gap-1.5 text-[13px]">
            <span className="font-medium">Search Location</span>
            <input placeholder="Search by address or pincode" className="input w-full" />
            <MapBox />
          </div>
        </div>
      </AddModal>
      <div className="mb-2 flex justify-end gap-2"><Btn>Download <ChevronDown size={14} /></Btn><Btn icon={Download}>Import</Btn></div>
      <DataTable rows={rows} selectable={false} columns={[
        { key: 'name', label: 'Name' }, { key: 'lat', label: 'Latitude' }, { key: 'lng', label: 'Longitude' },
        { key: 'range', label: 'Geofence Range' }, statusCol, editDel,
      ]} />
    </Page>
  )
}

export function AccessLevels() {
  const roles = ['Super Admin', 'Employee', 'Manager', 'Employee in house', 'General Manager', 'Organization', 'Team', 'Self']
  return (
    <Page title="Access Levels" actions={<Link to="/roles/create"><Btn primary>Add New</Btn></Link>}>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {roles.map((r) => (
          <div key={r} className="flex items-center justify-between rounded-lg bg-base-100 px-4 py-5 shadow-sm">
            <span className="text-[15px]">{r}</span>
            <span className="flex gap-3"><Pencil size={15} /><Trash2 size={15} /></span>
          </div>
        ))}
      </div>
    </Page>
  )
}

// Create Access Level: name + permission tree (group > module > section > permissions), per scope tab.
const permissionTree = [
  ['Company', [
    ['Organization', [['Documents', ['View Document List', 'Add Document', 'Edit Document', 'Delete Document']],
      ['Department', ['View Department List', 'Add New Department', 'Edit Department', 'Delete Department', 'Import Department', 'Export Department']],
      ['Designation', ['View Designation List', 'Add New Designation', 'Edit Designation', 'Delete Designation', 'Import Designation', 'Export Designation']],
      ['Location', ['View Location List', 'Add New Location', 'Edit Location', 'Delete Location', 'Import Location', 'Export Location']]]],
    ['Geotracking', [['Geolocation', ['View Geolocation List', 'Add New Geolocation', 'Edit Geolocation Details', 'Delete Geolocation']]]],
    ['Roles', [['Access Levels', ['View Roles', 'Add Role', 'Edit Role', 'Delete Role']]]],
  ]],
  ['Dashboard', [
    ['Dashboard', [['Widgets', ['View Upcoming Birthday Widget', 'View Work Anniversary Widget', 'View Headcount Trend Widget', 'View Gender Diversity Widget', 'View New Joiners Widget', 'Attendance Summary Widget', 'Leave Summary Widget']]]],
  ]],
  ['Employee', [
    ['Employee', [['Employee', ['View Employee Listing', 'Create New Employee', 'Edit Employee Information', 'Remove Employee Record']],
      ['Portal Access', ['Grant Portal Access', 'Revoke Portal Access']],
      ['Qualification', ['Add Employee Qualifications', 'Edit Employee Qualifications', 'Delete Employee Qualifications']],
      ['KYC', ['Add KYC Documents', 'Edit KYC Documents', 'Delete KYC Documents']]]],
  ]],
  ['Time Tracker', [
    ['Timetracker', [['Leave Group', ['View Leave Groups', 'Create Leave Groups', 'Edit Leave Groups', 'Delete Leave Groups']],
      ['Public Holiday', ['View Public Holidays', 'Create Public Holidays', 'Edit Public Holidays', 'Delete Public Holidays']],
      ['Shift', ['View Shifts', 'Create Shifts', 'Edit Shifts', 'Delete Shifts']],
      ['Shift Group', ['View Shift Groups', 'Create Shift Groups', 'Edit Shift Groups']],
      ['Device', ['Device Controls', 'View Devices', 'Create Devices', 'Edit Devices', 'Delete Devices']]]],
    ['Zone', [['Zone', ['View Zone List', 'Add New Zone', 'Edit Zone', 'Delete Zone', 'Manage Zone Mappings']]]],
  ]],
]
const permCount = permissionTree.flatMap(([, m]) => m.flatMap(([, s]) => s.flatMap(([, p]) => p))).length

export function AccessLevelCreate() {
  const [tab, setTab] = useState('Organization')
  const [q, setQ] = useState('')
  const [checked, setChecked] = useState({})
  const match = (p) => p.toLowerCase().includes(q.toLowerCase())
  const toggle = (perms, on) => setChecked((c) => ({ ...c, ...Object.fromEntries(perms.map((p) => [tab + p, on])) }))
  const all = (perms) => perms.every((p) => checked[tab + p])
  const permsOf = (mods) => mods.flatMap(([, s]) => s.flatMap(([, p]) => p))
  return (
    <div className="mx-auto max-w-5xl">
      <div className="flex min-h-20 items-center justify-between">
        <Link to="/roles" className="flex items-center gap-2 text-lg font-semibold"><ArrowLeft size={18} />Create Access Level - New Role</Link>
        <Link to="/roles"><Btn primary>Save</Btn></Link>
      </div>
      <div className="mb-4 grid gap-4 rounded-lg bg-base-100 p-4 shadow-sm sm:grid-cols-2">
        <label className="flex flex-col gap-1.5 text-[13px] font-medium">Name<input placeholder="e.g. Administrator" className="input w-full" /></label>
        <label className="flex flex-col gap-1.5 text-[13px] font-medium">Search<SearchBox value={q} onChange={setQ} placeholder="Filter permissions..." /></label>
      </div>
      <div className="mb-3 flex gap-1 border-b border-base-300 text-[13px]">
        {['Organization', 'Team', 'Self'].map((t) => <button key={t} onClick={() => setTab(t)} className={`-mb-px border-b-2 px-3 py-2 ${tab === t ? 'border-base-content font-semibold' : 'border-transparent text-base-content/60'}`}>{t}</button>)}
      </div>
      <div className="mb-3 flex justify-between text-xs"><span className="text-base-content/60">{permCount} permissions</span>
        <button className="font-semibold text-primary" onClick={() => toggle(permsOf(permissionTree.flatMap(([, m]) => m)), !all(permsOf(permissionTree.flatMap(([, m]) => m))))}>Select All</button></div>
      <div className="space-y-4">
        {permissionTree.map(([group, mods]) => (
          <section key={group} className="rounded-lg bg-base-100 p-4 shadow-sm">
            <div className="mb-3 flex justify-between"><h3 className="text-sm font-bold uppercase">{group}</h3>
              <button className="text-[11px] font-bold text-primary uppercase" onClick={() => toggle(permsOf(mods), !all(permsOf(mods)))}>Select Group</button></div>
            {mods.map(([mod, sections]) => (
              <div key={mod} className="mb-3 rounded-md border border-base-300 p-3">
                <div className="mb-2 flex justify-between border-b border-base-300 pb-2"><span className="text-xs font-bold text-primary uppercase">{mod}</span>
                  <button className="text-[10px] font-bold text-primary uppercase" onClick={() => toggle(permsOf([[mod, sections]]), !all(permsOf([[mod, sections]])))}>Select Module</button></div>
                {sections.map(([sec, perms]) => perms.some(match) && (
                  <div key={sec} className="mb-2">
                    <div className="mb-1 text-[10px] tracking-widest text-base-content/50 uppercase">{sec}</div>
                    <div className="grid gap-1 sm:grid-cols-2 lg:grid-cols-3">
                      {perms.filter(match).map((p) => (
                        <label key={p} className="flex items-center gap-2 py-1 text-xs">
                          <input type="checkbox" className="checkbox checkbox-xs" checked={!!checked[tab + p]} onChange={(e) => toggle([p], e.target.checked)} />{p}
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </section>
        ))}
      </div>
    </div>
  )
}
