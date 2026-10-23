import { useState } from 'react'
import { User, IdCard, CalendarDays, Tag, FileText, Paperclip, Box, Clock, Calendar, SlidersHorizontal } from 'lucide-react'
import { ApprovalBoard } from '../../components/approvals'
import { Page, Btn, SearchBox, DataTable, Person } from '../../components/table'
import { emp } from '../../data/people'

const leaveColors = { 'Annual Leave': '#ea580c', 'Sick Leave': '#9333ea', 'Casual Leave': '#0d9488' }

export function LeaveRequests() {
  const items = [
    [0, 'Annual Leave', '31 Oct 26', '1 day', 'Oct 23, 2026 01:27 PM'], [3, 'Annual Leave', '24 Oct 26', '1 day', 'Oct 23, 2026 01:25 PM'],
    [5, 'Sick Leave', '23 Oct 26', '1 day', 'Oct 23, 2026 01:18 PM', true], [9, 'Casual Leave', '03 Nov 26 - 04 Nov 26', '2 days', 'Oct 22, 2026 10:02 AM'],
  ].map(([i, type, date, days, applied, doc], n) => {
    const e = emp(i)
    return {
      id: n + 1, e, title: type, color: leaveColors[type],
      lines: [[User, null, e.name], [IdCard, null, e.code], [CalendarDays, null, date], [Tag, null, days], [FileText, 'Applied on:', applied],
        ...(doc ? [[Paperclip, null, <u key="d">document</u>]] : [])],
    }
  })
  return <ApprovalBoard title="Approvals" items={items} locations />
}

export function CompOffRequests() {
  const items = [[0, '17 Oct 26', 'Comp off', 'Worked on weekly off', 'Oct 15, 2026 10:54 AM'], [7, '19 Oct 26', 'Comp off', 'Stock audit support', 'Oct 20, 2026 09:12 AM']]
    .map(([i, date, kind, purpose, applied], n) => {
      const e = emp(i)
      return { id: n + 1, e, lines: [[User, null, e.name], [IdCard, null, e.code], [Calendar, 'Date:', date], [Box, 'For:', kind], [FileText, 'Purpose:', purpose], [FileText, 'Applied on:', applied]] }
    })
  return <ApprovalBoard title="Comp Off Requests" items={items} />
}

export function OvertimeRequests() {
  const items = [[1, '02 Oct 2026', 'Oct 14, 2026 05:42 PM', '08:00'], [12, '18 Oct 2026', 'Oct 19, 2026 09:30 AM', '02:30']].map(([i, date, applied, ot], n) => {
    const e = emp(i)
    return {
      id: n + 1, e, lines: [[IdCard, null, e.code], [Calendar, null, <b key="d">{date}</b>], [FileText, 'Applied On:', applied]],
      box: [['Shift', '06:00 - 14:00 Morning (06:00 AM - 02:00 PM)'], ['First Punch', '06:10 AM | Last Punch: 04:10 PM'], ['Worked Hours', '10:00 | Calculated OT: 02:00'], ['Requested OT', ot]],
    }
  })
  return <ApprovalBoard title="Overtime Requests" items={items} />
}

export function PunchRequests() {
  const items = [[0, '23 Oct 26', 'In', 'Oct 23, 2026 01:10 PM', 'Forgot to punch'], [0, '15 Oct 26', 'In', 'Oct 15, 2026 05:28 PM', 'Device offline'], [14, '20 Oct 26', 'Out', 'Oct 21, 2026 09:00 AM', 'Client visit']]
    .map(([i, date, type, applied, purpose], n) => {
      const e = emp(i)
      return { id: n + 1, e, lines: [[IdCard, null, e.code], [CalendarDays, null, date], [Clock, null, type], [FileText, 'Applied On:', applied], [FileText, 'Purpose:', purpose]] }
    })
  return <ApprovalBoard title="Punch Request Approvals" items={items} locations />
}

export function PermissionRequests() {
  const items = [[0, '01 October 2026', '09:00 to 10:00', '01:00', 'Oct 15, 2026 05:27 PM', 'Bank work'], [8, '24 October 2026', '16:00 to 18:00', '02:00', 'Oct 22, 2026 11:40 AM', 'Hospital visit']]
    .map(([i, date, range, dur, applied, purpose], n) => {
      const e = emp(i)
      return { id: n + 1, e, lines: [[IdCard, null, e.code], [CalendarDays, null, date], [Clock, null, range], [Clock, null, `${dur} duration(s)`], [FileText, 'Applied on:', applied], [FileText, 'Purpose:', purpose]] }
    })
  return <ApprovalBoard title="Permission Requests" items={items} />
}

export function OtApprovals() {
  const [q, setQ] = useState('')
  const rows = [2, 6, 11, 17].map((i, n) => ({ ...emp(i), id: n + 1, date: `${String(n * 4 + 3).padStart(2, '0')}-10-2026`, shift: 'General', worked: '10:15', ot: ['01:15', '02:00', '00:45', '03:10'][n] }))
  return (
    <Page title="OT Without Application">
      <div className="mb-2 flex flex-wrap items-end gap-2">
        <label className="text-[11px] font-semibold">From<input type="date" defaultValue="2026-10-01" className="input mt-1 block w-44" /></label>
        <label className="text-[11px] font-semibold">To<input type="date" defaultValue="2026-10-31" className="input mt-1 block w-44" /></label>
        <SearchBox value={q} onChange={setQ} placeholder="Search by Name, Code" className="flex-1" />
        <Btn icon={SlidersHorizontal}>Filter</Btn>
      </div>
      <DataTable rows={rows} query={q} searchKeys={['name', 'code']} columns={[
        { key: 'name', label: 'Employee', render: (e) => <Person e={e} badges={<span className="text-[11px] text-base-content/60">{e.code}</span>} /> },
        { key: 'date', label: 'Date' }, { key: 'shift', label: 'Shift' }, { key: 'worked', label: 'Worked Hours' }, { key: 'ot', label: 'OT Hours' },
        { key: 'a', label: 'Actions', render: () => <span className="flex gap-2"><button className="btn btn-xs border-emerald-500 bg-base-100 text-emerald-600">Approve</button><button className="btn btn-xs border-rose-400 bg-base-100 text-rose-500">Reject</button></span> },
      ]} />
    </Page>
  )
}
