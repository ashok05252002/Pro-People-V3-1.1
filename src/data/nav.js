// Sidebar menu, captured from the test staging app on 2026-10-29.
import {
  Rocket, Contact, Building2, Clock,
} from 'lucide-react'

export const nav = [
  { label: 'Dashboard', icon: Rocket, path: '/dashboard' },
  {
    label: 'Employee', icon: Contact, children: [
      { label: 'Employee List', path: '/employee/employee' },
    ],
  },
  {
    label: 'Company', icon: Building2, children: [
      { label: 'Departments', path: '/organization/department' },
      { label: 'Designations', path: '/organization/designation' },
      { label: 'Locations', path: '/organization/location' },
      { label: 'Categories', path: '/organization/categories' },
    ],
  },
  {
    label: 'Time Tracker', icon: Clock, children: [
      {
        label: 'Approvals', children: [
          { label: 'Leaves Requests', path: '/timetracker/approval' },
        ],
      },
      {
        label: 'Devices', children: [
          { label: 'Biometric Devices', path: '/timetracker/devices' },
        ],
      },
      {
        label: 'Leave', children: [
          { label: 'Apply Leave', path: '/leave/apply' },
          { label: 'Bulk Leave Apply', path: '/leave/bulk' },
          { label: 'Leave Types', path: '/timetracker/leave_groups' },
          { label: 'Leave Credits', path: '/timetracker/leave_credits' },
          { label: 'Permission Settings', path: '/timetracker/permission_settings' },
        ],
      },
      {
        label: 'Holidays', children: [
          { label: 'Public Holidays', path: '/timetracker/public_holidays' },
        ],
      },
      {
        label: 'Shifts', children: [
          { label: 'Shifts', path: '/timetracker/master_shift' },
          { label: 'Shift Groups', path: '/timetracker/shift_group' },
          { label: 'Shift Roster', path: '/timetracker/roster' },
        ],
      },
      { label: 'Reports', path: '/timetracker/reports' },
      { label: 'Time Adjustment', path: '/timetracker/manual_time_adjustment' },
    ],
  },
]

// Flat list of every leaf route with its breadcrumb trail.
export function flatRoutes(items = nav, trail = []) {
  return items.flatMap((item) =>
    item.children
      ? flatRoutes(item.children, [...trail, item.label])
      : [{ path: item.path, label: item.label, trail: [...trail, item.label] }],
  )
}
