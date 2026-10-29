// Employee profile (also "My Profile" under My Space): header card + tabs, as on the test staging app.
// Section pencils open an edit form that saves back to the employee record.
import { useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { ArrowLeft, Building2, IdCard, KeyRound, Pencil, Plus, Settings, ImageIcon } from 'lucide-react'
import { Btn, DataTable } from '../../components/table'
import { AddModal, useOpen } from '../../components/forms'
import { Avatar } from '../../components/ui'
import { useRows, val } from '../../data/store'
import { employees as seed } from '../../data/people'
import { workFields, personalFields, policyFields } from './AddEmployee'

const tabs = ['Work', 'Policies', 'Personal', 'Qualification', 'Experience', 'KYC', 'Assets', 'Holiday', 'Shift', 'Attendance', 'Leaves']
const isoOf = (dmy) => (dmy ? dmy.split('-').reverse().join('-') : '')

// Everything the profile shows, keyed by the wizard's field labels.
function infoOf(e) {
  const [first, ...rest] = e.name.split(' ')
  return {
    'Employee Code': e.code, 'Employee Device Code': e.code.replace(/\D/g, ''), 'Date of Joining': isoOf(e.joined), 'End of Probation': '',
    Department: e.department, Designation: e.designation, Category: e.category, Nationality: 'Indian', Location: e.location,
    Role: 'Organization', Username: e.code, 'First Name': first, 'Last Name': rest.join(' '), Gender: e.gender, 'Personal Email': e.email, 'Contact Number': e.phone,
    'Marital Status': 'Single',
    ...e.details,
  }
}

const pick = (fields, labels) => fields.filter((f) => f.type !== 'section' && labels.includes(f.label))
const work = workFields('')
const sections = {
  'Employment Details': pick(work, ['Employee Code', 'Employee Device Code', 'Date of Joining', 'End of Probation']),
  Organization: pick(work, ['Department', 'Designation', 'Category', 'Nationality', 'Location']),
  'Roles and Permissions': [{ label: 'Role', type: 'select', options: ['Organization', 'Self', 'Team'] }],
  Basic: pick(personalFields, ['First Name', 'Last Name', 'Gender', 'Date of Birth', 'Blood Group', 'Religion']),
  Contact: pick(personalFields, ['Personal Email', 'Contact Number', 'Alternate Contact Number', 'Emergency Contact Number', 'Emergency Contact Relation', 'Permanent Address', 'Current Address']),
  Family: pick(personalFields, ['Marital Status']),
  Overtime: pick(policyFields, ['Overtime Applicable']), Late: pick(policyFields, ['Late Applicable']),
  'Auto Shift': pick(policyFields, ['Auto Shift']), 'Device Group': pick(policyFields, ['Device Group']),
}
// Extra read-only lines shown in a section besides its editable fields.
const extraLines = { Basic: ['Nationality'] }

function Section({ title, info, onEdit, lines }) {
  const labels = lines || [...(sections[title] || []).map((f) => f.label), ...(extraLines[title] || [])]
  return (
    <div className="rounded-lg border border-base-300 p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-[11px] font-bold tracking-wide text-base-content/60 uppercase">{title}</h3>
        {onEdit && <button onClick={() => onEdit(title)} className="opacity-70 hover:opacity-100"><Pencil size={14} /></button>}
      </div>
      <dl className="grid grid-cols-[1fr_1.2fr] gap-x-3 gap-y-1.5 text-xs">
        {labels.flatMap((l) => [<dt key={l} className="text-right text-base-content/70">{l}:</dt>, <dd key={l + 'v'}>{info[l] || 'Not defined'}</dd>])}
      </dl>
    </div>
  )
}

const Empty = ({ title }) => (
  <div className="rounded-lg border border-base-300 p-4">
    {title && <h3 className="mb-3 text-[11px] font-bold tracking-wide text-base-content/60 uppercase">{title}</h3>}
    <div className="py-8 text-center text-[13px] text-base-content/50">No records found</div>
  </div>
)

const hm = (t) => { const m = /^(\d{1,2}):(\d{2})/.exec(t || ''); return m ? +m[1] * 60 + +m[2] : null }
const dur = (a, b) => { const x = hm(a), y = hm(b); if (x === null || y === null) return '-'; const d = (y - x + 1440) % 1440; return `${String(Math.floor(d / 60)).padStart(2, '0')}:${String(d % 60).padStart(2, '0')}` }

function AttendanceTab({ e }) {
  const [open, show, hide] = useOpen()
  const [rows, add, , remove] = useRows(`attendance-${e.id}`, () => Array.from({ length: 29 }, (_, i) => ({
    id: i + 1, date: `${String(i + 1).padStart(2, '0')}/10/2026`, shift: '-', punch: '-', hours: '-', breaks: '-', ot: '-', late: '-', status: 'AA',
  })))
  const save = (v) => {
    const date = v.Date ? v.Date.split('-').reverse().join('/') : '-'
    rows.filter((r) => r.date === date).forEach((r) => remove(r.id))
    add({ date, shift: val(v.Shift), punch: `${val(v['Punch In'])} - ${val(v['Punch Out'])}`, hours: dur(v['Punch In'], v['Punch Out']), breaks: '-', ot: '-', late: '-', status: 'P' })
  }
  const sorted = [...rows].sort((a, b) => a.date.split('/').reverse().join().localeCompare(b.date.split('/').reverse().join()))
  return (
    <div className="rounded-lg border border-base-300 p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-[11px] font-bold tracking-wide text-base-content/60 uppercase">Attendance History</h3>
        <Btn primary icon={Plus} onClick={show} className="h-8">Add</Btn>
      </div>
      <AddModal open={open} onClose={hide} title="Add Attendance" cols={2} onSave={save} fields={[
        { label: 'Date', type: 'date', span: true, req: true }, { label: 'Shift', type: 'select', placeholder: 'Select Shift', options: ['MAD1', 'MAD2', 'MS', 'AS', 'NS'], span: true },
        { label: 'Punch In', type: 'time' }, { label: 'Punch Out', type: 'time' },
      ]} />
      <DataTable rows={sorted} selectable={false} columns={[
        { key: 'date', label: 'Date' }, { key: 'shift', label: 'Shift' }, { key: 'punch', label: 'Punch Time' }, { key: 'hours', label: 'Working Hour' },
        { key: 'breaks', label: 'Breaks' }, { key: 'ot', label: 'Over Time' }, { key: 'late', label: 'Late' },
        { key: 'status', label: 'Status', render: (r) => <span className={`rounded px-2 py-0.5 text-[11px] font-semibold ${r.status === 'P' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-500'}`}>{r.status}</span> },
      ]} />
    </div>
  )
}

function ShiftTab() {
  const cells = Array.from({ length: 35 }, (_, i) => i - 3)
  return (
    <div className="space-y-3">
      <div className="rounded-lg border border-base-300 p-4">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-[11px] font-bold tracking-wide text-base-content/60 uppercase">Shift Calendar <span className="ml-2 normal-case">Oct, 2026</span></h3>
          <div className="flex gap-2 text-[10px] font-bold">
            <span className="rounded bg-blue-900 px-1.5 py-0.5 text-white">WO</span><span className="rounded bg-green-700 px-1.5 py-0.5 text-white">WFH</span><span className="rounded bg-base-200 px-1.5 py-0.5">None</span>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center text-xs">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => <div key={d} className="font-semibold">{d}</div>)}
          {cells.map((d) => (d < 1 || d > 31 ? <div key={d} /> : <div key={d} className="h-12 rounded border border-base-300 p-1 text-left text-[10px] text-base-content/60">{d}</div>))}
        </div>
      </div>
      <div className="grid gap-3 md:grid-cols-3"><Empty title="Default Shift" /><Empty title="Default Weekoff" /><Empty title="Shift Group Details" /></div>
    </div>
  )
}

export default function Profile() {
  const { id } = useParams()
  const [rows, , update] = useRows('employees', seed)
  const [params, setParams] = useSearchParams()
  const [editing, setEditing] = useState(null)
  const e = id ? rows.find((r) => String(r.id) === id) : rows.find((r) => r.id === 1)
  if (!e) return <div className="py-20 text-center text-base-content/60">Employee not found. <Link to="/employee/employee" className="text-primary">Back to list</Link></div>
  const info = infoOf(e)
  const tab = tabs.find((t) => t.toLowerCase() === params.get('tab')) || 'Work'
  const save = (v) => {
    const details = { ...info, ...v }
    const name = [details['First Name'], details['Last Name']].filter(Boolean).join(' ') || e.name
    update(e.id, { details, name, code: details['Employee Code'], department: details.Department, designation: details.Designation, category: details.Category, location: details.Location, gender: details.Gender })
  }
  const S = (title, lines) => <Section key={title} title={title} info={info} onEdit={lines ? null : setEditing} lines={lines} />

  const body = {
    Work: <div className="grid gap-3 md:grid-cols-2">{S('Employment Details')}{S('Organization')}{S('User Account', ['Username'])}{S('Roles and Permissions')}</div>,
    Policies: <div className="grid gap-3 md:grid-cols-2">{S('Overtime')}{S('Late')}{S('Auto Shift')}{S('Device Group')}</div>,
    Personal: <div className="grid gap-3 md:grid-cols-2">{S('Basic')}{S('Contact')}{S('Family')}</div>,
    Experience: <Empty title="Employment Experience and History" />,
    KYC: (
      <div className="rounded-lg border border-base-300 p-4">
        <h3 className="mb-3 text-[11px] font-bold tracking-wide text-base-content/60 uppercase">KYC Documents and Identity</h3>
        <div className="flex items-center gap-4 rounded-md bg-base-200/50 p-4">
          <span className="grid size-14 place-items-center rounded-full bg-base-300"><ImageIcon size={20} className="opacity-50" /></span>
          <div><div className="text-[11px] font-bold uppercase">Profile Picture</div><div className="text-xs text-base-content/60">Default avatar in use</div></div>
        </div>
      </div>
    ),
    Assets: <Empty title="Assets" />,
    Shift: <ShiftTab />,
    Attendance: <AttendanceTab e={e} />,
  }[tab] || <Empty />

  return (
    <div className="mx-auto max-w-6xl">
      {id && <Link to="/employee/employee" className="mb-5 flex items-center gap-2 text-[13px] font-semibold"><ArrowLeft size={16} />Employees List</Link>}
      <div className="rounded-lg bg-base-100 p-5 shadow-sm">
        <div className="flex items-start gap-4">
          <Avatar name={e.name} color={e.color} size="size-16 text-xl" />
          <div className="flex-1">
            <h1 className="text-xl font-bold">{e.name}</h1>
            <div className="mt-1 flex flex-wrap gap-4 text-[11px] text-base-content/60">
              <span className="flex items-center gap-1"><Building2 size={13} />{e.department}</span>
              <span className="flex items-center gap-1"><IdCard size={13} />{e.code}</span>
              <span className="flex items-center gap-1"><KeyRound size={13} />Portal Access : Enabled</span>
            </div>
          </div>
          <Settings size={16} className="opacity-60" />
        </div>
        <div className="mt-4 flex gap-1 overflow-x-auto border-b border-base-300 text-xs">
          {tabs.map((t) => (
            <button key={t} onClick={() => setParams({ tab: t.toLowerCase() })}
              className={`-mb-px border-b-2 px-2.5 py-2 whitespace-nowrap ${t === tab ? 'border-base-content font-semibold' : 'border-transparent text-base-content/60'}`}>{t}</button>
          ))}
        </div>
        <div className="mt-4">{body}</div>
      </div>
      <AddModal key={editing} open={!!editing} onClose={() => setEditing(null)} title={`Edit ${editing}`} cols={2} onSave={save}
        fields={(sections[editing] || []).map((f) => ({ ...f, value: info[f.label] }))} />
    </div>
  )
}
