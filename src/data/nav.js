// Sidebar menu, captured from the staging app on 2026-10-23.
// Settings sub-items all live on /systemsetting in staging (tabs); here each gets its own route.
import {
  Rocket, Contact, BriefcaseBusiness, Building2, Clock, Luggage, Banknote, File,
  Trophy, Megaphone, Settings, FileSearch, SquareTerminal, BookOpen,
} from 'lucide-react'

const settingsTabs = [
  'Company', 'Employee', 'Overtime', 'Comp Off Policies', 'Office Document', 'Punch Requests',
  'Attendance', 'Optional Holidays', 'Currency', 'Payroll', 'Letter Manager', 'TDS', 'Encashments',
  'Loans', 'Performance', 'Expenses', 'SimplePermission', 'Pro Sync', 'System Setting', 'SSO',
]
const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-')

export const nav = [
  { label: 'Dashboard', icon: Rocket, path: '/dashboard' },
  {
    label: 'Employee', icon: Contact, children: [
      { label: 'Employee List', path: '/employee/employee' },
      { label: 'Bulk Upload', path: '/employee/bulk_upload' },
      { label: 'BluePrint', path: '/employee/blue_print' },
      { label: 'Customize Inputs', path: '/employee/customize_inputs' },
      { label: 'Employee Groups', path: '/employee/group' },
      { label: 'Profile Request', path: '/employee/new-profile-request-approval' },
      { label: 'Attendance Policy', path: '/employee/attendance_policy' },
      { label: 'Master Report', path: '/employee/report/employee_master' },
      { label: 'Reporting', path: '/reporting_manager' },
      {
        label: 'Documents', children: [
          { label: 'Document Setup', path: '/document/setup/categories' },
          { label: 'Bulk Import', path: '/document/import' },
        ],
      },
      {
        label: 'Letters', children: [
          { label: 'Templates', path: '/lettermanager/templates' },
          { label: 'Letters', path: '/lettermanager/letterTable' },
        ],
      },
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
  {
    label: 'Visitor Management', icon: Luggage, children: [
      { label: 'Dashboard', path: '/visitor-management/dashboard' },
      { label: 'Pre Entry', path: '/visitor-management/pre-entry' },
      { label: 'Walk-In Entry', path: '/visitor-management/walk-in' },
      {
        label: 'Settings', children: [
          { label: 'Approval Settings', path: '/visitor-management/approval-settings' },
          { label: 'Configuration', path: '/visitor-management/config' },
          { label: 'Pass Number Settings', path: '/visitor-management/pass-settings' },
          { label: 'Policy', path: '/visitor-management/policy' },
        ],
      },
      { label: 'Companies', path: '/visitor-management/companies' },
      { label: 'Reports', path: '/visitor-management/reports' },
    ],
  },
  {
    label: 'Payroll', icon: Banknote, children: [
      {
        label: 'Approvals', children: [
          { label: 'Loan', path: '/loan/loan_approvals' },
          { label: 'TDS', path: '/tds_approval' },
          { label: 'Tax Regime', path: '/tax_regime_approval' },
          { label: 'Encashment', path: '/timetracker/encashment_approval' },
          { label: 'Expense Requests', path: '/expence/expense_approval' },
        ],
      },
      {
        label: 'Payroll Setup', children: [
          { label: 'Payroll', path: '/dynamicpayroll/payrolls' },
          { label: 'Loan Types', path: '/loan/masters' },
        ],
      },
      { label: 'Salary Generation', path: '/dynamicpayroll/salary_generation' },
      { label: 'Payslip', path: '/dynamicpayroll/payslip' },
      {
        label: 'Gratuity', children: [
          { label: 'EOS Setup', path: '/gratuity/setup' },
          { label: 'EOS Settlement', path: '/gratuity/settlement' },
          { label: 'Gratuity Liability', path: '/gratuity/reports/liability' },
          { label: 'EOS Statement', path: '/gratuity/statement' },
        ],
      },
      { label: 'Monthly Variables', path: '/employee_variable_pay' },
      { label: 'Reports', path: '/dynamicpayroll/reports' },
      { label: 'FnF Settlement', path: '/fnf' },
    ],
  },
  { label: 'OfficeDoc', icon: File, path: '/officedocument' },
  {
    label: 'Performance', icon: Trophy, children: [
      {
        label: 'Setup', children: [
          { label: 'KRA/KPI Masters', path: '/performance/kra_kpi' },
          { label: 'Appraisal Periods', path: '/performance/appraisal_periods' },
          { label: 'Scoring Models', path: '/performance/scoring_models' },
          { label: 'Increment Rules', path: '/performance/increment_rules' },
        ],
      },
      { label: 'Appraisal Cycle', path: '/performance/appraisal-cycle' },
      { label: 'Self Assessment', path: '/performance/self-assessment' },
      { label: 'Manager Review', path: '/performance/manager-review' },
      { label: 'HR Finalization', path: '/performance/hr-finalization' },
      { label: 'Appraisal History', path: '/performance/appraisal-history' },
      { label: 'Appraisal Template', path: '/performance/appraisal-templates' },
      { label: 'Salary Revisions', path: '/performance/salary_revisions' },
      { label: 'Increment Letters', path: '/performance/increment-letters' },
      {
        label: 'Reports', children: [
          { label: 'KRA/KPI Distribution', path: '/performance/reports/kra-kpi-distribution' },
          { label: 'Appraisal Tracker', path: '/performance/reports/appraisal-tracker' },
          { label: 'Performance Summary', path: '/performance/reports/performance-summary' },
        ],
      },
    ],
  },
  { label: 'Notice', icon: Megaphone, path: '/notice/notice' },
  {
    label: 'Settings', icon: Settings, children: [
      ...settingsTabs.map((t) => ({ label: t, path: `/systemsetting/${slug(t)}` })),
      { label: 'Users', path: '/settings/users' },
    ],
  },
  { label: 'Audit', icon: FileSearch, path: '/audit_logs' },
  {
    label: 'Dev Tools', icon: SquareTerminal, children: [
      { label: 'Artisan Runner', path: '/devtools/artisan' },
      { label: 'ProSync Webhook Logs', path: '/devtools/prosync-logs' },
      { label: 'Laravel Log', path: '/devtools/laravel-log' },
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
