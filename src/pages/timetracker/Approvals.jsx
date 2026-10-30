import { User, IdCard, CalendarDays, Tag, FileText, Paperclip } from 'lucide-react'
import { ApprovalBoard } from '../../components/approvals'
import { emp } from '../../data/people'
import { useApplications } from '../leave/LeaveApplication'

const leaveColors = { 'Annual Leave': '#ea580c', 'Sick Leave': '#9333ea', 'Casual Leave': '#0d9488', 'Special Leave - Accompany Patient': '#2563eb', 'Bereavement Leave': '#6b7280' }

export function LeaveRequests() {
  // Applications from the Leave Application module come first.
  const [applications] = useApplications()
  const applied = applications.map((a) => ({
    id: `a${a.id}`, e: a.e, title: a.type, color: leaveColors[a.type],
    lines: [[User, null, a.e.name], [IdCard, null, a.e.code], [CalendarDays, null, a.dates], [Tag, null, `${a.days} ${a.days === 1 ? 'day' : 'days'}`], [FileText, 'Applied on:', a.applied]],
  }))
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
  return <ApprovalBoard title="Approvals" items={[...applied, ...items]} locations />
}
