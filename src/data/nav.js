// Sidebar menu, captured from the staging app on 2026-10-23.
import {
  Rocket, Contact, BriefcaseBusiness, Building2, Clock, BookOpen,
} from 'lucide-react'

export const nav = [
  { label: 'Dashboard', icon: Rocket, path: '/dashboard' },
  {
    label: 'Employee', icon: Contact, children: [
      { label: 'Employee List', path: '/employee/employee' },
    ],
  },
  {
    label: 'Recruitment', icon: BriefcaseBusiness, children: [
      { label: 'Interviews', path: '/recruitment/interview' },
      { label: 'Onboarding', path: '/recruitment/onboard' },
      { label: 'LOI History', path: '/recruitment/letter-of-intent-history' },
      { label: 'Candidates', path: '/recruitment/candidates' },
    ],
  },
  {
    label: 'Company', icon: Building2, children: [
      { label: 'Departments', path: '/organization/department' },
      { label: 'Designations', path: '/organization/designation' },
      { label: 'Locations', path: '/organization/location' },
      { label: 'Categories', path: '/organization/categories' },
      { label: 'Documents', path: '/settings/documents' },
      { label: 'Vendors', path: '/organization/vendor' },
      { label: 'Employment Types', path: '/organization/employment_types' },
      { label: 'Ministry', path: '/organization/ministry' },
      { label: 'Nationalities', path: '/organization/nationalities' },
      { label: 'Contract Types', path: '/gratuity/contract-types' },
      { label: 'Zone', path: '/zone' },
      { label: 'Geolocations', path: '/geotracking/geolocation' },
      { label: 'Access Levels', path: '/roles' },
    ],
  },
  {
    label: 'Time Tracker', icon: Clock, children: [
      {
        label: 'Approvals', children: [
          { label: 'Leaves Requests', path: '/timetracker/approval' },
          { label: 'OT Approvals', path: '/timetracker/ot_approval' },
          { label: 'Comp Off Requests', path: '/timetracker/compoff_approval' },
          { label: 'Overtime Requests', path: '/overtime_application_approval' },
          { label: 'Punch Request', path: '/punchrequest/approval_punchrequest' },
          { label: 'Permission Requests', path: '/timetracker/permission_approval' },
        ],
      },
      {
        label: 'Devices', children: [
          { label: 'ProSync Devices', path: '/prosync/devices' },
          { label: 'Biometric Devices', path: '/timetracker/devices' },
          { label: 'Device Groups', path: '/prosync/device-groups' },
          { label: 'Camera', path: '/camera' },
          { label: 'Zone Mapping', path: '/zone/mapping' },
        ],
      },
      {
        label: 'Leave', children: [
          { label: 'Leave Types', path: '/timetracker/leave_groups' },
          { label: 'Leave Credits', path: '/timetracker/leave_credits' },
          { label: 'Leave Calendar', path: '/timetracker/calendar' },
        ],
      },
      {
        label: 'Holidays', children: [
          { label: 'Public Holidays', path: '/timetracker/public_holidays' },
          { label: 'Optional Holidays', path: '/optionalholiday' },
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
      { label: 'Exclude Late', path: '/timetracker/exclude_late_deduction' },
      { label: 'Lock Attendance', path: '/timetracker/lock_attendance' },
      { label: 'Time Adjustment', path: '/timetracker/manual_time_adjustment' },
      { label: 'Attendance Uploads', path: '/attendance_adjustment' },
      {
        label: 'Late Policy', children: [
          { label: 'Setup', path: '/index' },
          { label: 'Process Leave Credits', path: '/late-policy/leave-credits' },
        ],
      },
      { label: 'Zone Reports', path: '/zone/reports' },
    ],
  },
  { label: 'UserGuide', icon: BookOpen, path: '/user-guide' },
]

// Flat list of every leaf route with its breadcrumb trail.
export function flatRoutes(items = nav, trail = []) {
  return items.flatMap((item) =>
    item.children
      ? flatRoutes(item.children, [...trail, item.label])
      : [{ path: item.path, label: item.label, trail: [...trail, item.label] }],
  )
}
