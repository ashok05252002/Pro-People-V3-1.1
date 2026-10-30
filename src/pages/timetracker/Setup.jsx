// Devices, Leave, Holidays and Shift master screens.
import { useState } from 'react'
import { Download, Upload, Filter, FileText, SlidersHorizontal, CircleArrowRight, ScanLine, Pencil, Trash2, Check } from 'lucide-react'
import { Page, Btn, SearchBox, DataTable, Person, rowsOf, actionsCol } from '../../components/table'
import { AddModal, useOpen, FormGrid, toast } from '../../components/forms'
import { useRows, val } from '../../data/store'
import { emp, designations, departments, categories, locations } from '../../data/people'

const brands = ['ZKTECO', 'ESSL', 'HIKVISION', 'SUPREMA']
const punchType = { label: 'Punch Type', type: 'radio', options: ['COMBINED', 'IN', 'OUT'] }
// "All X" multi-selects shared by leave groups, holidays and shift groups.
export const applicable = [
  { label: 'Designation', type: 'multi', placeholder: 'All Designations', options: designations },
  { label: 'Department', type: 'multi', placeholder: 'All Departments', options: departments },
  { label: 'Category', type: 'multi', placeholder: 'All Categories', options: categories },
  { label: 'Location', type: 'multi', placeholder: 'All Locations', options: locations },
]
// Applicable values from a submitted form, as shown on the group cards.
export const applicableOf = (v) => ['Department', 'Designation', 'Category', 'Location'].map((k) => (v[k] ? v[k] + '.' : `All ${k}.`))

const editDel = (remove) => actionsCol({ view: false, onDelete: (r) => remove(r.id) })

function SearchRow({ placeholder, hint, children }) {
  const [q, setQ] = useState('')
  return { q, bar: (
    <div className="mb-2">
      <div className="flex flex-wrap gap-2">
        <SearchBox value={q} onChange={setQ} placeholder={placeholder} className="flex-1" />
        {children}
      </div>
      {hint && <div className="mt-1 text-[10px] text-base-content/60">{hint}</div>}
    </div>
  ) }
}

export function BiometricDevices() {
  const [open, show, hide] = useOpen()
  const [rows, addRow, , remove] = useRows('devices', () => rowsOf(['n', 'name', 'serial', 'punch', 'brand', 'zone'], [
    [1, 'Basement', 'DEMO520496016', 'COMBINED', 'ZKTECO', '—'],
    [2, 'Main Gate', 'DEMO520496017', 'IN', 'ZKTECO', 'Reception'],
    [3, 'Block B Exit', 'DEMO520496018', 'OUT', 'ESSL', 'Warehouse'],
    [4, 'Server Room', 'DEMO520496019', 'COMBINED', 'HIKVISION', 'Server Room'],
  ]))
  const { q, bar } = SearchRow({ placeholder: 'Search by Device Name', hint: 'Search by Device Name or Device Code or Brand Name', children: <><Btn primary icon={Filter}>Filter</Btn><Btn icon={Download}>Download</Btn></> })
  return (
    <Page title="Biometric Devices" actions={<Btn primary onClick={show}>Add Device</Btn>}>
      <AddModal open={open} onClose={hide} title="Add Device" fields={[
        { label: 'Name' }, { label: 'Device Code' }, { label: 'Brand Name', type: 'select', placeholder: 'Select Brand Name', options: brands }, punchType,
      ]} onSave={(v) => addRow({ n: Math.max(0, ...rows.map((r) => r.n)) + 1, name: val(v.Name), serial: val(v['Device Code']), punch: val(v['Punch Type']), brand: val(v['Brand Name']), zone: '—' })} />
      {bar}
      <DataTable rows={rows} query={q} searchKeys={['name', 'serial', 'brand']} selectable={false} columns={[
        { key: 'n', label: 'ID' }, { key: 'name', label: 'Name' }, { key: 'serial', label: 'Serial No' }, { key: 'punch', label: 'Punch Type' },
        { key: 'brand', label: 'Brand Name' }, { key: 'zone', label: 'Mapped Zone' }, editDel(remove),
      ]} />
    </Page>
  )
}

// Card grid for leave groups and shift groups.
export function GroupCards({ groups, action }) {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {groups.map((g) => (
        <div key={g.id} className="rounded-lg bg-base-100 p-4 shadow-sm">
          <div className="flex items-center justify-between border-b border-base-300 pb-3">
            <h3 className="text-base font-bold">{g.name}</h3>
            <span className="flex items-center gap-3"><input type="checkbox" className="toggle toggle-sm" defaultChecked={g.on} />{action}</span>
          </div>
          <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-1 gap-y-1 text-xs">
            {[['Department', g.d], ['Designation', g.des], ['Category', g.c], ['Location', g.l], ...(g.extra || [])].flatMap(([k, v]) => [<dt key={k} className="text-right font-medium">{k}:</dt>, <dd key={k + 'v'}>{v}</dd>])}
          </dl>
        </div>
      ))}
    </div>
  )
}
export const groupOf = (name, [d, des, c, l], on = true, extra) => ({ name, d, des, c, l, on, extra })

export function LeaveGroups() {
  const [open, show, hide] = useOpen()
  const [groups, addGroup] = useRows('leaveGroups', () => [
    groupOf('Default', ['All Department.', 'All Designation.', 'All Category.', 'All Location.']),
    groupOf('Security Staff', ['Male Security, Female Security.', 'Security Officer.', 'Employee.', 'All Location.'], false),
  ].map((g, i) => ({ id: i + 1, ...g })))
  return (
    <Page title="Leave Groups" actions={<Btn primary onClick={show}>Add New</Btn>}>
      <AddModal open={open} onClose={hide} title="Add Leave Group" size="max-w-xl" fields={[
        { label: 'Name', hint: 'to customize the leave group, apply the filters.' }, ...applicable,
      ]} onSave={(v) => addGroup(groupOf(val(v.Name), applicableOf(v)))} />
      <GroupCards groups={groups} action={<CircleArrowRight size={16} />} />
    </Page>
  )
}

const policies = ['Annual Leave', 'Sick Leave', 'Special Leave - Accompany Patient', 'Bereavement Leave (wife or child)', 'Bereavement Leave (parent, siblings)', 'Casual Leave']

export function LeaveCredits() {
  const rows = Array.from({ length: 18 }, (_, i) => ({ ...emp(Math.floor(i / 3)), id: i + 1, group: 'Default', policy: policies[i % policies.length], credits: [12.5, 12, 10, 6.5, 2, 1.5][i % 6], type: 'accrued', added: '2026-10-12', expire: '' }))
  return (
    <Page title="Leave Credits">
      <div className="mb-2 flex flex-wrap items-end gap-2">
        <label className="text-[11px] font-semibold">From<input type="date" defaultValue="2026-10-01" className="input mt-1 block w-44" /></label>
        <label className="text-[11px] font-semibold">To<input type="date" defaultValue="2026-10-31" className="input mt-1 block w-44" /></label>
        <div className="flex-1" />
        <Btn icon={Upload}>Import</Btn><Btn icon={Download}>Download</Btn><Btn icon={FileText}>Template</Btn><Btn icon={SlidersHorizontal}>Filter</Btn>
      </div>
      <DataTable rows={rows} selectable={false} columns={[
        { key: 'name', label: 'Name of the Employee', render: (e) => <Person e={e} badges={<span className="text-[11px] text-base-content/60">{e.code}</span>} /> },
        { key: 'group', label: 'Leave Group' }, { key: 'policy', label: 'Leave Policy', render: (r) => <div className="max-w-40 text-center">{r.policy}</div> },
        { key: 'credits', label: 'Credits' }, { key: 'type', label: 'Type' }, { key: 'added', label: 'Added On' }, { key: 'expire', label: 'Expire On' },
      ]} />
    </Page>
  )
}

export function PublicHolidays() {
  const [open, show, hide] = useOpen()
  const { q, bar } = SearchRow({ placeholder: 'Search by Name, Short Name', children: <Btn primary icon={Filter}>Filter</Btn> })
  const [rows, addRow, , remove] = useRows('holidays', () => rowsOf(['name', 'short', 'date', 'recurs', 'locations', 'categories'], [
    ['Pongal', 'PGL', '2026-01-14 - 2026-01-15', '-', 'All', '-'], ['Republic Day', 'RD', '2026-01-26', 'Yearly', 'All', '-'],
    ['Tamil New Year', 'TNY', '2026-04-14', 'Yearly', 'Head Office, Regional Office', '-'], ['Independence Day', 'ID', '2026-08-15', 'Yearly', 'All', '-'],
    ['Ayudha Pooja', 'AP', '2026-10-19', '-', 'Head Office', '-'], ['Deepavali', 'DPV', '2026-11-08', '-', 'All', 'Employee'],
    ['Christmas', 'XMAS', '2026-12-25', 'Yearly', 'All', '-'],
  ]))
  const save = (v) => {
    const from = v['From Date'], to = v['To date']
    addRow({ name: val(v.Name), short: val(v['Short name']), date: val(to && to !== from ? `${from} - ${to}` : from),
      recurs: v['Recurs Yearly'] ? 'Yearly' : '-', locations: v.Location || 'All', categories: val(v.Category) })
  }
  return (
    <Page title="Public Holidays" actions={<Btn primary onClick={show}>Add Public Holiday</Btn>}>
      <AddModal open={open} onClose={hide} title="Add Public Holiday" cols={2} onSave={save} fields={[
        { label: 'Name' }, { label: 'Short name' }, { label: 'From Date', type: 'date', span: true },
        { label: 'To date', type: 'date', span: true }, { ...applicable[2], span: true }, { ...applicable[3], span: true },
        { label: 'Recurs Yearly', type: 'check', span: true },
      ]} />
      <div className="mb-1 text-[11px] font-semibold">Search</div>{bar}
      <DataTable rows={rows} query={q} searchKeys={['name', 'short']} selectable={false} columns={[
        { key: 'name', label: 'Name', sortable: true }, { key: 'short', label: 'Short Name', sortable: true }, { key: 'date', label: 'Date', sortable: true },
        { key: 'recurs', label: 'Recurs' }, { key: 'locations', label: 'Locations' }, { key: 'categories', label: 'Categories' }, editDel(remove),
      ]} />
    </Page>
  )
}

export const shiftRows = rowsOf(['n', 'color', 'name', 'code', 'start', 'end', 'dur', 'grace'], [
  [9, '#4a2511', 'A- 13:00 - 21:00', 'AF13:00', '01:00 PM', '09:00 PM', '08:00', '15 min'], [8, '#7c5cd6', 'Morning Shift', 'M07:00', '07:00 AM', '10:00 PM', '15:00', '-'],
  [7, '#22c55e', '16:00 - 24:00', 'AF16:00', '04:00 PM', '11:59 PM', '07:59', '15 min'], [6, '#84cc16', '12:00 - 20:00 PM', 'AFM', '12:00 PM', '08:00 PM', '08:00', '15 min'],
  [5, '#8b00ff', '22:00 - 06:00 Night', 'NS', '10:00 PM', '06:00 AM', '08:00', '15 min'], [4, '#f59e0b', '14:00 - 22:00 Afternoon', 'AS', '02:00 PM', '10:00 PM', '08:00', '15 min'],
  [3, '#facc15', '06:00 - 14:00 Morning', 'MS', '06:00 AM', '02:00 PM', '08:00', '15 min'], [2, '#3b2ff0', '09:00 - 17:00 M2', 'MAD2', '09:00 AM', '05:00 PM', '08:00', '15 min'],
  [1, '#e11d63', '08:00 - 16:00 M1', 'MAD1', '08:00 AM', '04:00 PM', '08:00', '15 min'],
])

// 'HH:MM' -> minutes, and minutes -> '09:00 AM'.
const mins = (t) => { const m = /^(\d{1,2}):(\d{2})$/.exec(t || ''); return m ? +m[1] * 60 + +m[2] : null }
const ampm = (m) => { m = ((m % 1440) + 1440) % 1440; const h = Math.floor(m / 60); return `${String(h % 12 || 12).padStart(2, '0')}:${String(m % 60).padStart(2, '0')} ${h < 12 ? 'AM' : 'PM'}` }

const hhmm = (label, value = '00:00') => ({ label, type: 'time', value, hint: 'Format: HH:mm' })
export function Shifts() {
  const [open, show, hide] = useOpen()
  const [rows, addRow, , remove] = useRows('shifts', shiftRows)
  const save = (v) => {
    const s = mins(v['Start Time']), d = mins(v.Duration)
    addRow({ n: Math.max(0, ...rows.map((r) => r.n)) + 1, color: v.Color, name: val(v.Name), code: val(v['Shift Code']),
      start: s === null ? '-' : ampm(s), end: s === null || d === null ? '-' : ampm(s + d), dur: val(v.Duration), grace: +v['Grace Period'] ? `${v['Grace Period']} min` : '-' })
  }
  return (
    <Page title="Shift" actions={<Btn primary onClick={show}>Add Shift</Btn>}>
      <AddModal open={open} onClose={hide} title="Create Shift" cols={3} size="max-w-2xl" onSave={save} fields={[
        { label: 'Name', span: true }, { label: 'Shift Code' }, { label: 'Color', type: 'color' }, { label: '', type: 'custom', render: () => null },
        hhmm('Start Time', ''), hhmm('Duration', ''), { label: 'Grace Period', type: 'number', value: 0, hint: 'In minutes' },
        hhmm('Full Day'), hhmm('Half Day'), hhmm('Breaks'), hhmm('Auto Shift Start'), hhmm('Auto Shift End'), hhmm('Auto Cutoff'),
        { label: 'Calculate overtime based on full-day hours', type: 'check', span: true, hint: 'When enabled, overtime is calculated beyond the total full day hours.' },
      ]} />
      <DataTable rows={rows} selectable={false} columns={[
        { key: 'n', label: '#' }, { key: 'color', label: 'Color', render: (r) => <span className="block size-4 rounded-full" style={{ background: r.color }} /> },
        { key: 'name', label: 'Name', sortable: true }, { key: 'code', label: 'Shift Code', sortable: true }, { key: 'start', label: 'Start Time', sortable: true },
        { key: 'end', label: 'End Time' }, { key: 'dur', label: 'Duration' }, { key: 'grace', label: 'Grace Period' },
        { key: '_a', label: '', render: (r) => <span className="flex justify-end gap-3"><ScanLine size={15} /><Pencil size={15} />
          <Trash2 size={15} className="cursor-pointer hover:text-rose-500" onClick={() => window.confirm('Delete this record?') && remove(r.id)} /></span> },
      ]} />
    </Page>
  )
}

// Simple permission (short leave in minutes) rules, from staging's System Settings tab.
const permissionRules = [
  { label: 'Permission Count', type: 'number', value: 2, hint: 'Maximum number of permissions allowed per period.' },
  { label: 'Minimum Duration (minutes)', type: 'number', value: 60, hint: 'Minimum duration in minutes for a permission request. Optional.' },
  { label: 'Maximum Duration (minutes)', type: 'number', value: 120, hint: 'Maximum duration in minutes allowed per permission request. Optional.' },
  { label: 'Total Minutes Per Period', type: 'number', value: 120, hint: 'Total permission minutes allowed in a single period. Optional.' },
  { label: 'Apply Before (days)', type: 'number', value: 30, hint: 'Minimum days in advance a permission request must be submitted.' },
  { label: 'Frequency', type: 'select', placeholder: 'Select Frequency', options: ['Daily', 'Weekly', 'Monthly', 'Yearly'], value: 'Monthly', hint: 'How often the permission count resets (daily / weekly / monthly). Optional.' },
]
const permissionPolicy = [
  { label: 'Approval Structure', type: 'select', placeholder: 'Select Approval Structure', options: ['Parallel Approval', 'Hierarchy Approval'], value: 'Hierarchy Approval' },
  { label: 'Number of Approval Levels', type: 'select', placeholder: 'Select Number of Approval Levels', options: ['Single Approval', 'Double Approval', 'Triple Approval', 'Quadruple Approval', 'Quintuple Approval'], value: 'Double Approval' },
]

export function PermissionSettings() {
  const save = (e) => { e.preventDefault(); toast('Permission settings saved') }
  return (
    <form onSubmit={save}>
      <Page title="Permission Settings" actions={<Btn primary type="submit" icon={Check}>Save Settings</Btn>}>
        <div className="space-y-4 rounded-box bg-base-100 p-3">
          {[['Permission Rules', permissionRules], ['Permissions Policy', permissionPolicy]].map(([title, fields]) => (
            <section key={title} className="rounded-box bg-base-200/50 p-4">
              <h3 className="mb-4 text-lg font-bold">{title}</h3>
              <FormGrid fields={fields} cols={2} />
            </section>
          ))}
        </div>
      </Page>
    </form>
  )
}
