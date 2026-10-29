import { useState } from 'react'
import { Sparkles, Archive, Calendar, Users, Download, FileText, Plus, Trash2, MapPin, Clock } from 'lucide-react'
import { Page, Btn, SearchBox, DataTable, Badge, Person, rowsOf, actionsCol } from '../components/table'
import { Avatar } from '../components/ui'
import { AddModal, useOpen } from '../components/forms'
import { departments, locations } from '../data/people'

const candidates = rowsOf(['name', 'code', 'email', 'phone', 'source', 'color'], [
  ['Aravind Krishnan', 'CAN-001', 'aravind.k@mail.com', '+91 9840010001', 'LinkedIn', '#2563eb'],
  ['Bhavana Rao', 'CAN-002', 'bhavana.r@mail.com', '+91 9840010002', 'Referral', '#db2777'],
  ['Chandru Mohan', 'CAN-003', 'chandru.m@mail.com', '+91 9840010003', 'Job Portal', '#16a34a'],
  ['Dhanya Varma', 'CAN-004', 'dhanya.v@mail.com', '+91 9840010004', 'Walk-in', '#9333ea'],
  ['Elango Selvam', 'CAN-005', 'elango.s@mail.com', '+91 9840010005', 'LinkedIn', '#ea580c'],
  ['Farhana Begum', 'CAN-006', 'farhana.b@mail.com', '+91 9840010006', 'Campus', '#0d9488'],
])

const interviews = [
  { title: 'Senior Software Engineer', dept: 'Engineering & Technology', date: '27 Oct 2026', time: '10:30 AM', place: 'Head Office', panel: 3, cands: [0, 1, 2], status: 'Scheduled' },
  { title: 'HR Executive', dept: 'Human Resources', date: '29 Oct 2026', time: '02:00 PM', place: 'Online', panel: 2, cands: [3, 5], status: 'Scheduled' },
  { title: 'Security Officer', dept: 'Male Security', date: '02 Nov 2026', time: '11:00 AM', place: 'Branch 1', panel: 2, cands: [4], status: 'In Progress' },
]
const closed = [
  { title: 'Accountant', dept: 'Finance', date: '10 Oct 2026', time: '10:00 AM', place: 'Head Office', panel: 2, cands: [2, 4], status: 'Closed' },
]

export function Interviews() {
  const [tab, setTab] = useState('open')
  const [order, setOrder] = useState('Newest')
  const [open, show, hide] = useOpen()
  const list = tab === 'open' ? interviews : closed
  return (
    <Page title="Interviews" actions={<Btn primary onClick={show}>Add New</Btn>}>
      <AddModal open={open} onClose={hide} title="Create Interview" cols={2} size="max-w-2xl" fields={[
        { label: 'Recruiter' }, { label: 'Title', placeholder: 'Select a Title' },
        { label: 'Stages', hint: 'Can be edited before the interview start date.' }, { label: 'Starting Date', type: 'date' },
        { label: 'Closing Date', type: 'date' }, { label: 'Hiring', type: 'select', placeholder: 'Select a Hiring', options: departments },
        { label: 'Location', type: 'select', placeholder: 'Select a Location', options: locations }, { label: 'Languages' },
      ]} />
      <div className="mb-3 flex gap-1 border-b border-base-300 text-xs">
        {[['open', 'Interviews', Sparkles], ['closed', 'Closed Interviews', Archive]].map(([k, l, I]) => (
          <button key={k} onClick={() => setTab(k)} className={`-mb-px flex items-center gap-2 border-b-2 px-3 py-2 ${tab === k ? 'border-base-content font-semibold' : 'border-transparent text-base-content/60'}`}><I size={14} />{l}</button>
        ))}
      </div>
      <div className="join mb-4">
        {['Oldest', 'Newest'].map((o) => <button key={o} onClick={() => setOrder(o)} className={`btn join-item btn-sm text-xs font-normal ${order === o ? 'bg-base-300' : 'bg-base-100'}`}>{o}</button>)}
      </div>
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {(order === 'Newest' ? list : [...list].reverse()).map((iv) => (
          <div key={iv.title} className="rounded-lg border border-base-300 bg-base-100 p-4 shadow-sm">
            <div className="flex items-start justify-between">
              <div><h3 className="font-semibold">{iv.title}</h3><div className="text-[11px] text-base-content/60">{iv.dept}</div></div>
              <Badge>{iv.status}</Badge>
            </div>
            <div className="mt-4 space-y-1.5 text-xs text-base-content/70">
              <div className="flex items-center gap-2"><Calendar size={13} />{iv.date}</div>
              <div className="flex items-center gap-2"><Clock size={13} />{iv.time}</div>
              <div className="flex items-center gap-2"><MapPin size={13} />{iv.place}</div>
              <div className="flex items-center gap-2"><Users size={13} />{iv.panel} panel members</div>
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-base-300 pt-3">
              <div className="flex -space-x-2">{iv.cands.map((c) => <span key={c} className="rounded-full ring-2 ring-base-100"><Avatar name={candidates[c].name} color={candidates[c].color} size="size-7" /></span>)}</div>
              <span className="text-[11px] text-base-content/60">{iv.cands.length} candidates</span>
            </div>
          </div>
        ))}
      </div>
    </Page>
  )
}

export function Onboard() {
  const rows = rowsOf(['name', 'code', 'interview', 'date', 'hiring', 'at', 'color'], [
    ['Farhana Begum', 'CAN-006', 'HR Executive', '12-10-2026', 'Human Resources', '20-10-2026', '#0d9488'],
    ['Chandru Mohan', 'CAN-003', 'Accountant', '10-10-2026', 'Finance', '18-10-2026', '#16a34a'],
  ])
  return (
    <Page title="Onboard">
      <DataTable rows={rows} selectable={false} columns={[
        { key: 'name', label: 'Name', sortable: true, render: (r) => <Person e={r} /> }, { key: 'code', label: 'Candidate Code', sortable: true },
        { key: 'interview', label: 'Interview Title' }, { key: 'date', label: 'Scheduled Date' },
        { key: 'hiring', label: 'Hiring For', sortable: true }, { key: 'at', label: 'Onboarded At' },
      ]} />
    </Page>
  )
}

export function LoiHistory() {
  const rows = rowsOf(['name', 'code', 'position', 'sent', 'status', 'color'], [
    ['Farhana Begum', 'CAN-006', 'HR Executive', '14-10-2026', 'Approved', '#0d9488'],
    ['Chandru Mohan', 'CAN-003', 'Accountant', '12-10-2026', 'Approved', '#16a34a'],
    ['Elango Selvam', 'CAN-005', 'Security Officer', '21-10-2026', 'Pending', '#ea580c'],
  ])
  return (
    <Page title="Letter Of Intent History">
      <DataTable rows={rows} selectable={false} columns={[
        { key: 'name', label: 'Candidate', render: (r) => <Person e={r} badges={<span className="text-[11px] text-base-content/60">{r.code}</span>} /> },
        { key: 'position', label: 'Position' }, { key: 'sent', label: 'Sent On' },
        { key: 'status', label: 'Status', render: (r) => <Badge>{r.status}</Badge> }, actionsCol({ edit: false, del: false }),
      ]} />
    </Page>
  )
}

export function Candidates() {
  const [q, setQ] = useState('')
  const [open, show, hide] = useOpen()
  return (
    <Page title="Candidates">
      <AddModal open={open} onClose={hide} title="Add Candidate" cols={2} size="max-w-2xl" fields={[
        { label: 'Name' }, { label: 'Candidate Code' }, { label: 'Email', type: 'email' }, { label: 'Contact Number', type: 'tel' }, { label: 'Source' },
      ]} />
      <div className="mb-2 flex flex-wrap gap-2">
        <SearchBox value={q} onChange={setQ} placeholder="Search by Name, Code" className="min-w-72 flex-1" />
        <Btn icon={Download}>Import</Btn><Btn icon={Download}>Export</Btn><Btn icon={FileText}>Template</Btn>
        <Btn primary className="px-3" onClick={show}><Plus size={16} /></Btn>
        <Btn className="px-3 opacity-50"><Trash2 size={16} /></Btn>
      </div>
      <DataTable rows={candidates} query={q} searchKeys={['name', 'code']} selectable={false} columns={[
        { key: 'name', label: 'Name', sortable: true, render: (r) => <Person e={r} /> }, { key: 'code', label: 'Candidate Code', sortable: true },
        { key: 'email', label: 'Email', sortable: true }, { key: 'phone', label: 'Contact Number', sortable: true }, { key: 'source', label: 'Source', sortable: true },
      ]} />
    </Page>
  )
}
