// Company masters: departments, designations, categories, locations.
import { Download } from 'lucide-react'
import { Btn, ListScreen, rowsOf, actionsCol } from '../components/table'
import { AddModal, useOpen, nameOnly } from '../components/forms'
import { useRows, val } from '../data/store'
import { departments, designations } from '../data/people'

const masterTools = <><Btn icon={Download}>Download</Btn><Btn icon={Download}>Import</Btn></>
const editDel = (remove) => actionsCol({ view: false, onDelete: (r) => remove(r.id) })

// "# | Name | edit/delete" master screens.
function NameMaster({ title, add, form, names }) {
  const [open, show, hide] = useOpen()
  const [rows, addRow, , remove] = useRows(title, () => names.map((name, i) => ({ id: i + 1, n: ((i * 7) % names.length) + 1, name })))
  return (
    <>
      <ListScreen title={title} actions={<Btn primary onClick={show}>{add}</Btn>} tools={masterTools}
        columns={[{ key: 'n', label: '#', sortable: true }, { key: 'name', label: 'Name', sortable: true }, editDel(remove)]} rows={rows} />
      <AddModal open={open} onClose={hide} title={form} fields={nameOnly}
        onSave={(v) => addRow({ n: Math.max(0, ...rows.map((r) => r.n)) + 1, name: val(v.Name) })} />
    </>
  )
}

export const Departments = () => <NameMaster title="Departments" add="Add Department" form="Add Department" names={[...departments, 'Finance & Accounts', 'Operations & Logistics', 'Quality & Compliance', 'Sales & Marketing']} />
export const Designations = () => <NameMaster title="Designations" add="Add Designation" form="Create Designation" names={[...designations, 'Accountant Manager', 'Chief Executive Officer', 'Chief Technology Officer', 'Customer Support Lead', 'Facility Coordinator', 'Finance Manager', 'Security Warden', 'Receptionist', 'Driver', 'Office Assistant']} />
export const Categories = () => <NameMaster title="Categories" add="Add Category" form="Add Category" names={['Contract Staff', 'Corporate Staff', 'Employee', 'Management', 'Operations Field', 'Technical & Engineering']} />

export function Locations() {
  const [open, show, hide] = useOpen()
  const [rows, addRow, , remove] = useRows('Locations', () => rowsOf(['n', 'name', 'tz', 'address', 'weekoff'], [
    [2, 'Corporate Headquarters', 'Asia/Kolkata', 'Tower A, Financial District, Tech City', 'Sunday'],
    [3, 'Development Center', 'Asia/Kolkata', 'Block 4, Cyber Gateway, Innovation Hub', 'Saturday, Sunday'],
    [4, 'Regional Office', 'Asia/Kolkata', 'Plot 12, Business Bay, Metro City', '-'],
    [1, 'Head Office', 'Asia/Kolkata', '22, Park Town Main Road', 'Friday'],
  ]))
  return (
    <>
    <AddModal open={open} onClose={hide} title="Create Location" fields={[
      { label: 'Name' }, { label: 'Address', type: 'textarea', placeholder: 'Enter your address' },
      { label: 'Timezone', type: 'select', placeholder: 'Select your timezone', options: ['Asia/Kolkata', 'Asia/Muscat', 'Asia/Dubai'], hint: 'Select your timezone' },
      { label: 'Week Off', type: 'multi', placeholder: 'Select your Week Off', options: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], hint: 'Select your Week Off' },
    ]} onSave={(v) => addRow({ n: rows.length + 1, name: val(v.Name), tz: val(v.Timezone), address: val(v.Address), weekoff: val(v['Week Off']) })} />
    <ListScreen title="Locations" actions={<Btn primary onClick={show}>Add Location</Btn>} tools={masterTools}
      columns={[{ key: 'n', label: '#', sortable: true }, { key: 'name', label: 'Name', sortable: true }, { key: 'tz', label: 'Timezone', sortable: true },
        { key: 'address', label: 'Address' }, { key: 'weekoff', label: 'Week Off' }, editDel(remove)]}
      rows={rows} />
    </>
  )
}
