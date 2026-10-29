import { User, IdCard, CalendarDays, Tag, FileText, Paperclip } from 'lucide-react'
import { ApprovalBoard } from '../../components/approvals'
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
