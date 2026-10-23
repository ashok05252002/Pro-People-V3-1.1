// System settings: staging shows these as tabs of /systemsetting; here each tab has its own route.
// Field lists captured from staging on 2026-10-23. Secrets (mail password, API keys) are blank placeholders.
import { useLocation } from 'react-router-dom'
import { Save, Plus, ShieldCheck, Download, Trash2 } from 'lucide-react'
import { Page, Btn } from '../components/table'

const LEVELS = ['Single Approval', 'Double Approval', 'Triple Approval', 'Quadruple Approval', 'Quintuple Approval']
const YN = ['Yes', 'No']
const approval = (title, global) => [title, [
  ['Approval Structure', ['Parallel Approval', 'Hierarchy Approval', ...(global ? ['Global Approval'] : [])]],
  ['Number of Approval Levels', LEVELS],
]]

// Each tab: [[sectionTitle, [[label, optionsArray | 'text' | 'number' | 'file' | 'textarea' | 'password', help?, value?]]]]
const tabs = {
  company: [
    ['Branding', [['Application Name', 'text', 'The name used in emails, notifications and browser tabs.', 'IndiGo'], ['Theme', ['Light', 'Dark']],
      ['Dashboard Theme', ['Modern UI', 'Standard UI', 'Material UI']], ['Logo', 'file'], ['Loader Logo', 'file'], ['Favicon', 'file']]],
    ['Company Details', [['Company Name', 'text', null, 'IndiGo Demo Pvt Ltd'], ['Address Line 1', 'text', null, '22, Park Town Main Road'], ['Address Line 2', 'text'], ['Address Line 3', 'text'], ['Address Line 4', 'text']]],
  ],
  employee: [['Employee Config', [['Employee Code Format', 'text', null, 'EMP###'], ['User Limit', 'number', null, '50'], ['Import Limit Per Sheet', 'number', null, '500'],
    ['Super Admin(s)', ['admin (Superadmin)']], ['Device Restriction', YN], ['Fetch Logs on Enrollment', ['Enabled', 'Disabled']], ['Employee Geofence Type', YN], ['Face Recognition', YN]]]],
  overtime: [approval('Approval Workflow')],
  'comp-off-policies': [['Comp Off Types', [['Applicable Types', ['Weekoff Comp Off', 'Holiday Comp Off']]]], approval('Approval Workflow')],
  'office-document': [['Office Document Settings', [['Reminder Email', 'text', 'Enter comma-separated emails to receive document expiry reminders.', 'hr@example.com']]]],
  'punch-requests': [approval('Punch Request Approvals')],
  attendance: [
    approval('Leave Requests'),
    ['Shift', [['Allow Shift Slabs', YN], ['Max Early In (in minutes)', 'number', null, '120'], ['Max Late Out (in minutes)', 'number', null, '240'], ['Min Off Hours', 'number', null, '8'],
      ['Max Work Hours', 'number', null, '16'], ['Enable Shift Reminders', ['Enabled', 'Disabled'], 'Enable automatic notifications before a shift starts.'],
      ['Shift Reminder Lead Time (minutes)', 'number', "Set the reminder time before the employee's shift starts.", '15'],
      ['Shift Reminder Channels', ['Both (Push + Web)', 'Push Notification (FCM)', 'Web Portal (Database)'], 'Channels to use for the reminder notification.']]],
    ['Compensatory Off', [['Comp Off Apply Before (days)', 'number', 'Number of days before which comp off can be applied.', '30'],
      ['Comp Off Elapse After (days)', 'number', 'Comp-off credits expire after this many days from the date earned.', '60'], ['Comp Off Applicable', YN],
      ['Comp Off Types', ['Weekoff Comp Off', 'Holiday Comp Off']], ['Rest Day Full Credit Hours', 'number', null, '8'], ['Rest Day Half Credit Hours', 'number', null, '4'],
      ['Weekday Full Credit Hours', 'number', null, '8'], ['Weekday Half Credit Hours', 'number', null, '4'], ['Queue Background Processing', YN]]],
  ],
  'optional-holidays': [['Policy', [['Optional Holidays Limit', 'number', null, '2']]]],
  currency: [['Currency Settings', [['Country', ['India', 'Oman', 'United Arab Emirates', 'United States']], ['Decimal Places', 'number', 'Number of decimal places used for currency formatting', '2'],
    ['Symbol', 'text', 'Currency symbol (Example: ₹, $, €, ﷼)', '₹'], ['Currency Code', 'text', 'Currency code based on ISO standard (Example: INR, USD, EUR, OMR)', 'INR'],
    ['Language', 'text', null, 'en'], ['Locale', 'text', 'Default language and locale configuration (Example: en_IN)', 'en_IN'], ['Currency Name', 'text', null, 'Rupee'], ['Subunit Name', 'text', 'Currency name and subunit name (Example: Rupee / Paise)', 'Paise']]]],
  payroll: [
    ['Payroll Configuration', [['Enable Employees', 'text', 'Only listed employees will be included in payroll processing'], ['Business Name', 'text', 'Business identifier used for payroll grouping', 'IndiGo'],
      ['Status String', 'text', 'Status label displayed on payslips (e.g. Processed, Final)', 'Processed'], ['Year Type', ['Annual', 'Financial', 'Calendar'], 'Fiscal year type used for payroll calculations'],
      ['Payslip Template', ['Template 1', 'Template 2', 'Template 3', 'Template 4'], 'Template used to generate employee payslips'],
      ['Payroll Unlock Limit (days)', 'number', 'Maximum past days allowed to unlock a locked payroll', '5'], ['Payslip Orientation', ['Portrait', 'Landscape']]]],
    ['Working Days', [['Working Days Type', ['Calendar Days', 'Fixed Days (30)', 'Variable Days'], 'Select the type of working days used for salary calculation']]],
  ],
  'letter-manager': [['Letter Management Settings', [['Select Onboarding Steps', ['Offer Letter', 'Appointment Letter', 'Joining Letter'], 'Onboarding Steps Selection'], ['Email Send Option', YN]]]],
  tds: [approval('Tds Declarations', true), approval('Tax Regims', true)],
  encashments: [approval('Leave Encashments')],
  loans: [
    ['Loan Mode', [['Loan Processing Mode', ['Employee Driven', 'System Upload']]]],
    ['Request Policy', [...approval('', true)[1], ['Maximum Loan Amount', 'number', null, '200000'], ['Maximum EMI Tenure (Months)', 'number', null, '24']]],
    ['Interest Rates', [['Annual Interest Rate (%)', 'number', null, '4']]],
    ['Loan Calculation Config', [['Calculate From', ['Monthly Fixed Gross', 'Basic']], ['Variable Percentage (%)', 'number', null, '50'], ['Fixed Component', YN]]],
  ],
  performance: [approval('Approvals')],
  expenses: [approval('Employee Expenses', true)],
  simplepermission: [
    ['Permission Rules', [['Permission Count', 'number', 'Maximum number of permissions allowed per period.', '2'], ['Minimum Duration (minutes)', 'number', 'Minimum duration in minutes for a permission request. Optional.', '30'],
      ['Maximum Duration (minutes)', 'number', 'Maximum duration in minutes allowed per permission request. Optional.', '120'], ['Total Minutes Per Period', 'number', 'Total permission minutes allowed in a single period. Optional.', '240'],
      ['Apply Before (days)', 'number', 'Minimum days in advance a permission request must be submitted.', '1'], ['Frequency', ['Daily', 'Weekly', 'Monthly', 'Yearly'], 'How often the permission count resets (daily / weekly / monthly). Optional.']]],
    approval('Permissions Policy'),
  ],
  'pro-sync': [['Credentials', [['ProSync Protocol', ['HTTP', 'HTTPS']], ['ProSync Host', 'text', null, 'prosync.example.com'], ['ProSync Port', 'number', null, '8080'], ['ProSync API Key', 'password']]]],
  'system-setting': [
    ['General', [['App Timezone', 'text', 'Timezone is managed centrally. Please update it from the central domain.', 'Asia/Kolkata'], ['Enable Email Verification', YN], ['Google Maps API Key', 'password'],
      ['Role Card Design', ['Grid View', 'Table View', 'Modern Cards']], ['Support Emails', 'text', 'Comma separated emails', 'support@example.com']]],
    ['Mail Settings', [['Mail Mailer', ['SMTP', 'SES', 'Log (Dev)']], ['MAIL FROM NAME', 'text', null, 'IndiGo HR'], ['MAIL FROM ADDRESS', 'text', null, 'no-reply@example.com'], ['Forward All Mails To', 'text']]],
    ['SMTP', [['MAIL HOST', 'text', null, 'smtp.example.com'], ['MAIL PORT', 'number', null, '587'], ['MAIL USERNAME', 'text'], ['MAIL PASSWORD', 'password'], ['MAIL ENCRYPTION', ['tls', 'ssl', 'none']]]],
    ['Background Jobs', [['Send Job Fail Notification', YN], ['Job Fail Notification Emails', 'text', 'Comma separated emails', 'it@example.com']]],
    ['Firebase Config', [['Project ID', 'text', null, 'indigo-demo'], ['Service Credentials (JSON)', 'firebase']]],
  ],
}

const names = { 'comp-off-policies': 'Comp Off Policies', 'office-document': 'Office Document', 'punch-requests': 'Punch Requests', 'optional-holidays': 'Optional Holidays',
  'letter-manager': 'Letter Manager', tds: 'TDS', simplepermission: 'SimplePermission', 'pro-sync': 'Pro Sync', 'system-setting': 'System Setting', sso: 'SSO' }
const title = (slug) => names[slug] || slug.charAt(0).toUpperCase() + slug.slice(1)

function Input({ type, value }) {
  if (Array.isArray(type)) return <select className="select w-full" defaultValue={type[0]}><option disabled>Select</option>{type.map((o) => <option key={o}>{o}</option>)}</select>
  if (type === 'file') return <input type="file" className="file-input w-full" />
  if (type === 'firebase') return <div className="flex items-center gap-2"><span className="rounded bg-emerald-50 px-2 py-1 text-xs text-emerald-600">Uploaded</span><Btn icon={Download} className="h-8">Download</Btn><Btn icon={Trash2} className="h-8">Delete</Btn></div>
  return <input type={type === 'password' ? 'password' : type} defaultValue={value} className="input w-full" placeholder={type === 'password' ? '••••••••' : ''} />
}

function SsoSettings() {
  return (
    <Page title="SSO Settings" actions={<Btn primary icon={Plus}>Add Provider</Btn>}>
      <div className="rounded-lg bg-base-100 p-4 shadow-sm">
        <div className="mb-4 text-[11px] font-bold uppercase text-base-content/60">Configured Providers</div>
        <div className="grid place-items-center gap-2 py-12 text-center text-[13px] text-base-content/60">
          <ShieldCheck size={28} className="text-base-content/30" />No SSO providers enabled<Btn primary icon={Plus}>Add your first provider</Btn>
        </div>
      </div>
    </Page>
  )
}

export default function Settings() {
  const slug = useLocation().pathname.split('/').pop()
  if (slug === 'sso') return <SsoSettings />
  const sections = tabs[slug] || []
  return (
    <Page title={`${title(slug)} Settings`} actions={<Btn primary icon={Save}>Save Settings</Btn>}>
      <div className="space-y-4">
        {sections.map(([section, fields], i) => (
          <section key={section + i} className="rounded-lg bg-base-100 p-5 shadow-sm">
            {section && <h2 className="mb-4 border-b border-base-300 pb-3 text-[15px] font-semibold">{section}</h2>}
            <div className="grid gap-x-5 gap-y-4 md:grid-cols-2">
              {fields.map(([label, type, help, value]) => (
                <label key={label} className="flex flex-col gap-1.5 text-[13px]">
                  <span className="font-medium">{label}</span>
                  <Input type={type} value={value} />
                  {help && <span className="text-[11px] text-base-content/60">{help}</span>}
                </label>
              ))}
            </div>
          </section>
        ))}
      </div>
    </Page>
  )
}
