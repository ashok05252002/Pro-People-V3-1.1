import { useState } from 'react'
import { Plus, Filter, Download, Upload, SlidersHorizontal } from 'lucide-react'
import { Page, Btn, SearchBox, DataTable, Badge, Person, FilterDrawer } from '../../components/table'
import { employees } from '../../data/people'

const columns = [
  { key: 'name', label: 'Name', sortable: true, render: (e) => <Person e={e} badges={[e.status, ...e.tags].map((b) => <Badge key={b}>{b}</Badge>)} /> },
  { key: 'code', label: 'Employee Code', sortable: true },
  { key: 'department', label: 'Department' },
  { key: 'designation', label: 'Designation' },
  { key: 'category', label: 'Category' },
]

export default function EmployeeList() {
  const [q, setQ] = useState('')
  const [filters, setFilters] = useState(false)
  return (
    <Page title="Employees" actions={<>
      <span className="rounded-md bg-base-100 px-4 py-3 text-[11px] shadow-sm">User Limit: {employees.length} / 50</span>
      <Btn primary icon={Plus}>Add New</Btn>
    </>}>
      <div className="mb-1 text-[11px] font-semibold">Search</div>
      <div className="mb-2 flex flex-wrap gap-2">
        <SearchBox value={q} onChange={setQ} placeholder="Search by Name, Code" className="min-w-72 flex-1" />
        <Btn primary icon={Filter} className="mr-2">Filter</Btn>
        <Btn icon={Download}>Template</Btn>
        <Btn icon={Download}>Download</Btn>
        <Btn icon={Upload}>Import</Btn>
        <Btn icon={SlidersHorizontal} onClick={() => setFilters(true)}>More Filter</Btn>
      </div>
      <DataTable columns={columns} rows={employees} query={q} searchKeys={['name', 'code']} />
      <FilterDrawer open={filters} onClose={() => setFilters(false)} fields={[
        ['Department', 'All Departments', 'Select the departments'], ['Designations', 'All Designations', 'Select the designations'],
        ['Categories', 'All Categories', 'Select the categories'], ['Locations', 'All Locations', 'Select the locations'],
        ['Vendor', 'All Vendor', 'Select the vendor'], ['Status', 'All Statuses', 'Select the status'],
      ]} />
    </Page>
  )
}
