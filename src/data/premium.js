// Premium (locked) modules: on staging but not in the customer's plan. The sidebar shows them with a gold
// star and each opens the upgrade page (/premium/:key). Feature lists come from the 2026-10-30 gap list.
import { LayoutDashboard, Briefcase, DoorOpen, Wallet, Trophy, FolderOpen, Megaphone, ScrollText } from 'lucide-react'

// Locked modules listed under the "Premium" heading in the sidebar.
export const premiumModules = [
  {
    key: 'dashboard', label: 'Full Dashboard', icon: LayoutDashboard,
    desc: 'The complete live dashboard: devices, leave calendar, web check-in and every attendance tile on one screen.',
    features: ['Devices status: online / offline biometric devices', 'Team leave calendar', 'Check In / Out with web swipe',
      'On-Duty and Work From Home tiles', 'Notifications feed', 'Extra widget slots you can arrange'],
  },
  {
    key: 'recruitment', label: 'Recruitment', icon: Briefcase,
    desc: 'Hire faster: track candidates from interview to onboarding, with letters of intent on record.',
    features: ['Candidate database', 'Interview scheduling and feedback', 'Onboarding checklist', 'Letter of Intent (LOI) history'],
  },
  {
    key: 'payroll', label: 'Payroll', icon: Wallet,
    desc: 'Run salaries straight from attendance, with loans, tax, gratuity and final settlement built in.',
    features: ['Payroll setup and salary generation', 'Payslips', 'Monthly variable pay', 'Loan, TDS, tax regime, encashment and expense approvals',
      'Gratuity: EOS setup, settlement, liability and statement', 'Full and final (FnF) settlement', 'Payroll reports'],
  },
  {
    key: 'performance', label: 'Performance', icon: Trophy,
    desc: 'Set goals, run appraisal cycles and turn ratings into increments.',
    features: ['KRA / KPI masters', 'Appraisal periods, templates and cycles', 'Scoring models and increment rules', 'Self assessment and manager review',
      'HR finalization and appraisal history', 'Salary revisions and increment letters', 'KRA/KPI distribution, appraisal tracker and summary reports'],
  },
  {
    key: 'visitor', label: 'Visitor Management', icon: DoorOpen,
    desc: 'Register, approve and track every visitor at the gate.',
    features: ['Visitor dashboard', 'Pre-entry and walk-in registration', 'Approval workflow and visitor passes', 'Visitor policy and companies', 'Visitor reports'],
  },
  {
    key: 'documents', label: 'Documents & Letters', icon: FolderOpen,
    desc: 'Keep employee documents in one place and generate letters from templates.',
    features: ['Document categories and bulk import', 'Office documents', 'Letter templates', 'Generated letters register'],
  },
  {
    key: 'notice', label: 'Notice Board', icon: Megaphone,
    desc: 'Publish announcements to all employees or selected teams.',
    features: ['Company-wide notices', 'Targeted notices by department or location', 'Notice history'],
  },
  {
    key: 'audit', label: 'Audit Logs', icon: ScrollText,
    desc: 'See who changed what, and when, across the system.',
    features: ['Full change history', 'Filter by user, module and date', 'Export logs'],
  },
]

// Extra features of modules the customer already has, shown as a starred "More Features" item in each.
export const premiumExtras = {
  employee: {
    label: 'Employee: Advanced', desc: 'More tools for managing employee records at scale.',
    features: ['Employee bulk upload', 'Employee blueprint and custom input fields', 'Employee groups', 'Profile change requests',
      'Attendance policy', 'Employee master report', 'Reporting managers'],
  },
  company: {
    label: 'Company: Advanced', desc: 'More company masters for larger and multi-site organisations.',
    features: ['Vendors and employment types', 'Ministry and nationalities', 'Contract types', 'Company documents',
      'Zones and geolocations', 'Access levels (roles and permissions)'],
  },
  timetracker: {
    label: 'Time Tracker: Advanced', desc: 'Advanced attendance, overtime and device control.',
    features: ['Overtime, comp off and punch request approvals', 'Permission request approvals', 'ProSync devices, device groups, cameras and zone mapping',
      'Leave calendar and optional holidays', 'Late policy, exclude late and late leave credits', 'Lock attendance and attendance uploads', 'Zone reports'],
  },
}

export const premiumOf = (key) => premiumModules.find((m) => m.key === key) || (premiumExtras[key] && { key, ...premiumExtras[key] })
