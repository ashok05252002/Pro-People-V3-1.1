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
