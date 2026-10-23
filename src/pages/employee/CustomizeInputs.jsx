import { useState } from 'react'
import { Eye, Check, X, Pencil, Trash2 } from 'lucide-react'
import { Page, Btn, SearchBox, DataTable } from '../../components/table'

const rows = [
  ['Inactive From Date', 'inactive_from_date', 'date', true, 7],
  ['Non-Conviction Certificate', 'non_conviction_cert', 'json_group', false, 152],
  ['Nationality Certificate', 'nationality_cert', 'json_group', false, 151],
  ['Tax / Zakat Registration', 'tax_registration', 'json_group', false, 150],
  ['Social Insurance Registration', 'social_insurance', 'json_group', false, 149],
  ['Family Book / Family Card', 'family_book', 'json_group', false, 148],
  ['Certifications (H2S, Courses, etc)', 'certifications', 'json_group', false, 147],
  ['License Card', 'license_card', 'json_group', false, 146],
  ['No Objection Certificate (NOC)', 'noc', 'json_group', false, 145],
  ['Children Birth Certificate', 'birth_certificate', 'json_group', false, 144],
  ['Blood Group', 'blood_group', 'select', false, 40],
  ['Religion', 'religion', 'select', true, 39],
  ['Emergency Contact', 'emergency_contact', 'text', false, 38],
  ['Passport Number', 'passport_number', 'text', false, 37],
].map(([label, name, type, excel, sort], i) => ({ id: i + 1, label, name, type, excel, sort, required: '—', status: 'Active' }))

const columns = [
  { key: 'label', label: 'Label', sortable: true },
  { key: 'name', label: 'Name', sortable: true, render: (r) => <code className="rounded bg-indigo-50 px-1.5 py-0.5 text-[11px] text-indigo-600">{r.name}</code> },
  { key: 'type', label: 'Type', sortable: true },
  { key: 'required', label: 'Required', sortable: true, render: () => <span className="text-base-content/40">—</span> },
  { key: 'form', label: 'Form Visible', render: () => <Eye size={15} className="text-sky-500" /> },
  { key: 'excel', label: 'Excel Visible', render: (r) => r.excel
    ? <span className="grid h-5 w-7 place-items-center rounded border border-emerald-400 bg-emerald-50 text-emerald-600"><Check size={12} /></span>
    : <span className="grid h-5 w-7 place-items-center rounded bg-base-300 text-base-content/40"><X size={12} /></span> },
  { key: 'status', label: 'Status', render: (r) => <span className="rounded border border-emerald-400 px-1.5 text-[10px] text-emerald-600">{r.status}</span> },
  { key: 'sort', label: 'Sort By', sortable: true },
  { key: 'actions', label: 'Actions', render: () => <span className="flex gap-3"><Pencil size={15} /><Trash2 size={15} /></span> },
]

export default function CustomizeInputs() {
  const [q, setQ] = useState('')
  return (
    <Page title="Employee Customization Inputs" actions={<Btn primary>Add New</Btn>}>
      <SearchBox value={q} onChange={setQ} placeholder="Search inputs..." className="mb-5" />
      <DataTable columns={columns} rows={rows} query={q} searchKeys={['label', 'name']} />
    </Page>
  )
}
