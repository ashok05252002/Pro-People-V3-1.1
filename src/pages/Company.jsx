import { useState } from 'react'
import { Download, Upload, ChevronDown, Pencil, Trash2 } from 'lucide-react'
import { Page, Btn, ListScreen, SearchBox, DataTable, rowsOf, statusCol, actionsCol } from '../components/table'
import { departments, designations } from '../data/people'

const masterTools = <><Btn icon={Download}>Download</Btn><Btn icon={Download}>Import</Btn></>
const editDel = actionsCol({ view: false })

// "# | Name | edit/delete" master screens.
function NameMaster({ title, add, names }) {
  const rows = names.map((name, i) => ({ id: i + 1, n: ((i * 7) % names.length) + 1, name }))
  return (
    <ListScreen title={title} actions={<Btn primary>{add}</Btn>} tools={masterTools}
      columns={[{ key: 'n', label: '#', sortable: true }, { key: 'name', label: 'Name', sortable: true }, editDel]} rows={rows} />
  )
}

export const Departments = () => <NameMaster title="Departments" add="Add Department" names={[...departments, 'Finance & Accounts', 'Operations & Logistics', 'Quality & Compliance', 'Sales & Marketing']} />
export const Designations = () => <NameMaster title="Designations" add="Add Designation" names={[...designations, 'Accountant Manager', 'Chief Executive Officer', 'Chief Technology Officer', 'Customer Support Lead', 'Facility Coordinator', 'Finance Manager', 'Security Warden', 'Receptionist', 'Driver', 'Office Assistant']} />
export const Categories = () => <NameMaster title="Categories" add="Add Category" names={['Contract Staff', 'Corporate Staff', 'Employee', 'Management', 'Operations Field', 'Technical & Engineering']} />
export const Vendors = () => <NameMaster title="Vendors" add="Add Vendor" names={['Apex Technical Staffing', 'Direct Payroll Services', 'Global Workforce Solutions', 'Prime Facility Services']} />
export const EmploymentTypes = () => <NameMaster title="Employment Types" add="Add Employment Type" names={['Contractor', 'Full Time', 'Internship', 'Part Time', 'Permanent', 'Probationary', 'Temporary']} />
export const Ministry = () => <NameMaster title="Ministry" add="Add Ministry" names={['Ministry of Commerce & Industry', 'Ministry of Human Resources', 'Ministry of Labour', 'MOL']} />
export const Nationalities = () => <NameMaster title="Nationalities" add="Add Nationality" names={['American', 'Australian', 'British', 'Canadian', 'Egyptian', 'Emirati', 'Indian', 'Jordanian', 'Kenyan', 'Omani', 'Filipino', 'Sri Lankan']} />

export function Locations() {
  return (
    <ListScreen title="Locations" actions={<Btn primary>Add Location</Btn>} tools={masterTools}
      columns={[{ key: 'n', label: '#', sortable: true }, { key: 'name', label: 'Name', sortable: true }, { key: 'tz', label: 'Timezone', sortable: true },
        { key: 'address', label: 'Address' }, { key: 'weekoff', label: 'Week Off' }, editDel]}
      rows={rowsOf(['n', 'name', 'tz', 'address', 'weekoff'], [
        [2, 'Corporate Headquarters', 'Asia/Kolkata', 'Tower A, Financial District, Tech City', 'Sunday'],
        [3, 'Development Center', 'Asia/Kolkata', 'Block 4, Cyber Gateway, Innovation Hub', 'Saturday, Sunday'],
        [4, 'Regional Office', 'Asia/Kolkata', 'Plot 12, Business Bay, Metro City', '-'],
        [1, 'Head Office', 'Asia/Kolkata', '22, Park Town Main Road', 'Friday'],
      ])} />
  )
}

export function CompanyDocuments() {
  const [q, setQ] = useState('')
  const rows = rowsOf(['name', 'code', 'category', 'expiry', 'uploaded'], [
    ['Trade License', 'DOC-001', 'Company', '31-03-2027', '02-04-2026'],
    ['Fire Safety Certificate', 'DOC-002', 'Compliance', '15-01-2027', '16-01-2026'],
    ['Lease Agreement - Head Office', 'DOC-003', 'Legal', '30-06-2028', '01-07-2025'],
    ['Employee Handbook 2026', 'DOC-004', 'HR', '-', '02-10-2026'],
  ])
  return (
    <Page title="Document" actions={<Btn primary>Add Document</Btn>}>
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
  return (
    <Page title="Contract Types" actions={<Btn primary>Add Contract Type</Btn>}>
      <DataTable selectable={false} rows={rowsOf(['n', 'code', 'name'], [[1, 'P', 'Permanent'], [2, 'L', 'Limited'], [3, 'U', 'Unlimited']])}
        columns={[{ key: 'n', label: '#', sortable: true }, { key: 'code', label: 'Code', sortable: true }, { key: 'name', label: 'Name', sortable: true }, editDel]} />
    </Page>
  )
}

export function Zones() {
  const [q, setQ] = useState('')
  const rows = rowsOf(['name', 'code', 'location', 'capacity', 'devices', 'status'], [
    ['Reception', 'Z-REC', 'Head Office', 10, 2, 'Active'], ['Server Room', 'Z-SRV', 'Head Office', 3, 1, 'Active'],
    ['Warehouse', 'Z-WH', 'Regional Office', 20, 2, 'Active'], ['Cafeteria', 'Z-CAF', 'Development Center', 40, 1, 'Inactive'],
  ])
  return (
    <Page title="Zone Master" actions={<Btn primary>Add Zone</Btn>}>
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
  const rows = rowsOf(['name', 'lat', 'lng', 'range', 'status'], [
    ['Head Office', '13.0827', '80.2707', 450, 'Active'], ['Development Center', '12.9716', '77.5946', 300, 'Active'],
    ['Regional Office', '11.0168', '76.9558', 200, 'Inactive'],
  ])
  return (
    <Page title="Geolocation" actions={<Btn primary>Add Geolocation</Btn>}>
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
    <Page title="Access Levels" actions={<Btn primary>Add New</Btn>}>
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
