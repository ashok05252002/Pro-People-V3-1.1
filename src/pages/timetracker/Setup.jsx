// Devices, Leave, Holidays and Shift master screens.
import { useState } from 'react'
import { Download, Upload, Filter, Plus, FileText, SlidersHorizontal, CircleArrowRight, ScanLine, Pencil, Trash2, CalendarDays, Tag, ChevronLeft, ChevronRight } from 'lucide-react'
import { Page, Btn, SearchBox, DataTable, Badge, Person, rowsOf, statusCol, actionsCol } from '../../components/table'
import { emp } from '../../data/people'

const editDel = actionsCol({ view: false })

function SearchRow({ placeholder, hint, children, narrow }) {
  const [q, setQ] = useState('')
  return { q, bar: (
    <div className="mb-2">
      <div className="flex flex-wrap gap-2">
        <SearchBox value={q} onChange={setQ} placeholder={placeholder} className={narrow ? 'w-80' : 'flex-1'} />
        {narrow && <div className="flex-1" />}
        {children}
      </div>
      {hint && <div className="mt-1 text-[10px] text-base-content/60">{hint}</div>}
    </div>
  ) }
}

const devices = rowsOf(['n', 'name', 'serial', 'punch', 'brand', 'zone', 'group', 'status'], [
  [1, 'Basement', 'DEMO520496016', 'COMBINED', 'ZKTECO', '—', 'Head Office', 'Online'],
  [2, 'Main Gate', 'DEMO520496017', 'IN', 'ZKTECO', 'Reception', 'Head Office', 'Online'],
  [3, 'Block B Exit', 'DEMO520496018', 'OUT', 'ESSL', 'Warehouse', 'Regional', 'Offline'],
  [4, 'Server Room', 'DEMO520496019', 'COMBINED', 'HIKVISION', 'Server Room', 'Head Office', 'Online'],
])

export function ProsyncDevices() {
  const { q, bar } = SearchRow({ placeholder: 'Search by Device Name', hint: 'Search by Device Name or Device Code or Brand Name',
    children: <select className="select h-10 w-44 text-xs font-semibold"><option>All Device Groups</option><option>Head Office</option><option>Regional</option></select> })
  return (
    <Page title="Devices (ProSync)" actions={<><Btn icon={Download} className="border-base-content">Export</Btn><Btn primary>Add Device</Btn></>}>
      {bar}
      <DataTable rows={devices} query={q} searchKeys={['name', 'serial', 'brand']} selectable={false} columns={[
        { key: 'name', label: 'Device Name' }, { key: 'serial', label: 'Device Code' }, { key: 'brand', label: 'Brand' }, { key: 'group', label: 'Device Group' },
        { key: 'status', label: 'Status', render: (r) => <Badge>{r.status}</Badge> }, editDel,
      ]} />
    </Page>
  )
}

export function BiometricDevices() {
  const { q, bar } = SearchRow({ placeholder: 'Search by Device Name', hint: 'Search by Device Name or Device Code or Brand Name', children: <><Btn primary icon={Filter}>Filter</Btn><Btn icon={Download}>Download</Btn></> })
  return (
    <Page title="Biometric Devices" actions={<Btn primary>Add Device</Btn>}>
      {bar}
      <DataTable rows={devices} query={q} searchKeys={['name', 'serial', 'brand']} selectable={false} columns={[
        { key: 'n', label: 'ID' }, { key: 'name', label: 'Name' }, { key: 'serial', label: 'Serial No' }, { key: 'punch', label: 'Punch Type' },
        { key: 'brand', label: 'Brand Name' }, { key: 'zone', label: 'Mapped Zone' }, editDel,
      ]} />
    </Page>
  )
}

export function DeviceGroups() {
  return (
    <Page title="Device Group (ProSync)" actions={<Btn primary>Add Device Group</Btn>}>
      <DataTable selectable={false} rows={rowsOf(['name', 'devices', 'employees', 'status'], [['Head Office', 3, 34, 'Active'], ['Regional', 1, 15, 'Active']])} columns={[
        { key: 'name', label: 'Group Name' }, { key: 'devices', label: 'Devices' }, { key: 'employees', label: 'Employees' }, statusCol, editDel,
      ]} />
    </Page>
  )
}

export function Cameras() {
  const { q, bar } = SearchRow({ placeholder: 'Search name or code...', narrow: true })
  return (
    <Page title="Cameras" actions={<Btn primary>Add Camera</Btn>}>
      {bar}
      <DataTable rows={rowsOf(['name', 'code', 'ip', 'zone', 'status'], [['Lobby Cam', 'CAM-01', '192.168.1.21', 'Reception', 'Online'], ['Dock Cam', 'CAM-02', '192.168.1.22', 'Warehouse', 'Offline']])}
        query={q} searchKeys={['name', 'code']} selectable={false} columns={[
          { key: 'name', label: 'Camera Name' }, { key: 'code', label: 'Code' }, { key: 'ip', label: 'IP Address' }, { key: 'zone', label: 'Zone' },
          { key: 'status', label: 'Status', render: (r) => <Badge>{r.status}</Badge> }, editDel,
        ]} />
    </Page>
  )
}

export function ZoneMapping() {
  const { q, bar } = SearchRow({ placeholder: 'Search Zone name, code, or location...', narrow: true, children: <Btn primary icon={Plus}>Add Mapping</Btn> })
  return (
    <Page title="Zone Hardware Mapping">
      {bar}
      <DataTable rows={rowsOf(['zone', 'code', 'location', 'in', 'out'], [['Reception', 'Z-REC', 'Head Office', 'Main Gate', 'Main Gate'], ['Server Room', 'Z-SRV', 'Head Office', 'Server Room', 'Server Room'], ['Warehouse', 'Z-WH', 'Regional Office', 'Basement', 'Block B Exit']])}
        query={q} searchKeys={['zone', 'code', 'location']} selectable={false} columns={[
          { key: 'zone', label: 'Zone' }, { key: 'code', label: 'Code' }, { key: 'location', label: 'Location' }, { key: 'in', label: 'Entry Device' }, { key: 'out', label: 'Exit Device' }, editDel,
        ]} />
    </Page>
  )
}

export function LeaveGroups() {
  const groups = [['Default', 'All Department.', 'All Designation.', 'All Category.', 'All Location.', true], ['Security Staff', 'Male Security, Female Security.', 'Security Officer.', 'Employee.', 'All Location.', false]]
  return (
    <Page title="Leave Groups" actions={<Btn primary>Add New</Btn>}>
      <div className="grid gap-3 md:grid-cols-2">
        {groups.map(([name, d, des, c, l, on]) => (
          <div key={name} className="rounded-lg bg-base-100 p-4 shadow-sm">
            <div className="flex items-center justify-between border-b border-base-300 pb-3">
              <h3 className="text-base font-bold">{name}</h3>
              <span className="flex items-center gap-3"><input type="checkbox" className="toggle toggle-sm" defaultChecked={on} /><CircleArrowRight size={16} /></span>
            </div>
            <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-1 gap-y-1 text-xs">
              {[['Department', d], ['Designation', des], ['Category', c], ['Location', l]].map(([k, v]) => <><dt key={k} className="text-right font-medium">{k}:</dt><dd key={k + 'v'}>{v}</dd></>)}
            </dl>
          </div>
        ))}
      </div>
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

// Leave calendar: October 2026 month grid with leave bars + side list.
const bars = { 0: ['g', 'g', 'g', 'g', 'g'], 6: ['g'], 7: [], 12: ['g'], 26: ['g', 'b'], 27: ['b'], 33: ['g'], 34: ['b'] }
export function LeaveCalendar() {
  const cells = Array.from({ length: 42 }, (_, i) => { const d = i - 3; return d < 1 ? 27 + i : d > 31 ? d - 31 : d })
  const list = [[2, 'Lieu Day', '27 Sep 26 to 01 Oct 26', '5 days'], [5, 'Annual Leave', '11 Oct 26', '1 day'], [5, 'Lieu Day', '11 Oct 26', '1 day'], [9, 'Annual Leave', '07 Oct 26', '1 day'], [9, 'Annual Leave', '23 Oct 26', '1 day']]
  return (
    <Page title="Leave Calendar">
      <div className="grid gap-3 rounded-lg bg-base-100 p-3 shadow-sm lg:grid-cols-[1.4fr_1fr]">
        <div>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-xl">October 2026</h2>
            <div className="flex gap-1"><button className="btn btn-sm bg-slate-500 text-white">today</button>
              <div className="join"><button className="btn join-item btn-sm bg-slate-700 text-white"><ChevronLeft size={14} /></button><button className="btn join-item btn-sm bg-slate-700 text-white"><ChevronRight size={14} /></button></div></div>
          </div>
          <div className="grid grid-cols-7 border-l border-t border-base-300 text-xs">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => <div key={d} className="border-b border-r border-base-300 py-1 text-center font-semibold">{d}</div>)}
            {cells.map((d, i) => (
              <div key={i} className={`min-h-16 border-b border-r border-base-300 p-1 ${i === 25 ? 'bg-amber-50' : ''}`}>
                <div className={`text-right ${i < 3 || i > 33 ? 'text-base-content/30' : ''}`}>{d}</div>
                {(bars[i] || []).map((c, n) => <div key={n} className={`mt-0.5 rounded-sm px-1 text-[9px] text-white ${c === 'g' ? 'bg-green-800' : 'bg-blue-800'}`}>1</div>)}
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="mb-3 flex gap-2">
            <select className="select select-sm h-9 flex-1 text-xs"><option>Select Employee</option></select>
            <Btn icon={SlidersHorizontal} className="h-9">Filter</Btn>
          </div>
          <table className="table table-sm text-xs">
            <thead><tr className="bg-base-200"><th>Name</th><th>Details</th><th>Status</th></tr></thead>
            <tbody>{list.map(([i, type, dates, days], n) => { const e = emp(i); return (
              <tr key={n}><td>{e.name}<div className="text-base-content/60">{e.code}</div></td>
                <td><b>{type}</b><div className="flex items-center gap-1"><CalendarDays size={11} />{dates}</div><div className="flex items-center gap-1"><Tag size={11} />{days}</div></td>
                <td><span className="rounded bg-emerald-500 px-2 py-0.5 text-[10px] text-white">Approved</span></td></tr>) })}</tbody>
          </table>
          <div className="mt-3 flex items-center justify-between text-xs"><span>Showing 1 to 5 of 7 results</span>
            <div className="join"><button className="btn join-item btn-xs">‹</button><button className="btn join-item btn-xs">1</button><button className="btn join-item btn-xs">2</button><button className="btn join-item btn-xs">›</button></div></div>
        </div>
      </div>
    </Page>
  )
}

export function PublicHolidays() {
  const { q, bar } = SearchRow({ placeholder: 'Search by Name, Short Name', children: <Btn primary icon={Filter}>Filter</Btn> })
  const rows = rowsOf(['name', 'short', 'date', 'recurs', 'locations', 'categories'], [
    ['Pongal', 'PGL', '2026-01-14 - 2026-01-15', '-', 'All', '-'], ['Republic Day', 'RD', '2026-01-26', 'Yearly', 'All', '-'],
    ['Tamil New Year', 'TNY', '2026-04-14', 'Yearly', 'Head Office, Regional Office', '-'], ['Independence Day', 'ID', '2026-08-15', 'Yearly', 'All', '-'],
    ['Ayudha Pooja', 'AP', '2026-10-19', '-', 'Head Office', '-'], ['Deepavali', 'DPV', '2026-11-08', '-', 'All', 'Employee'],
    ['Christmas', 'XMAS', '2026-12-25', 'Yearly', 'All', '-'],
  ])
  return (
    <Page title="Public Holidays" actions={<Btn primary>Add Public Holiday</Btn>}>
      <div className="mb-1 text-[11px] font-semibold">Search</div>{bar}
      <DataTable rows={rows} query={q} searchKeys={['name', 'short']} selectable={false} columns={[
        { key: 'name', label: 'Name', sortable: true }, { key: 'short', label: 'Short Name', sortable: true }, { key: 'date', label: 'Date', sortable: true },
        { key: 'recurs', label: 'Recurs' }, { key: 'locations', label: 'Locations' }, { key: 'categories', label: 'Categories' }, editDel,
      ]} />
    </Page>
  )
}

export function OptionalHolidays() {
  return (
    <Page title="Optional Holidays" actions={<Btn primary>Add Optional Holiday</Btn>}>
      <DataTable selectable={false} rows={rowsOf(['name', 'date', 'limit', 'availed'], [['Raksha Bandhan', '2026-08-28', 1, 6], ['Good Friday', '2026-04-03', 1, 9], ['Bakrid', '2026-05-27', 1, 11]])} columns={[
        { key: 'name', label: 'Name' }, { key: 'date', label: 'Date' }, { key: 'limit', label: 'Max per Employee' }, { key: 'availed', label: 'Availed By' }, editDel,
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

export function Shifts() {
  return (
    <Page title="Shift" actions={<Btn primary>Add Shift</Btn>}>
      <DataTable rows={shiftRows} selectable={false} columns={[
        { key: 'n', label: '#' }, { key: 'color', label: 'Color', render: (r) => <span className="block size-4 rounded-full" style={{ background: r.color }} /> },
        { key: 'name', label: 'Name', sortable: true }, { key: 'code', label: 'Shift Code', sortable: true }, { key: 'start', label: 'Start Time', sortable: true },
        { key: 'end', label: 'End Time' }, { key: 'dur', label: 'Duration' }, { key: 'grace', label: 'Grace Period' },
        { key: '_a', label: '', render: () => <span className="flex justify-end gap-3"><ScanLine size={15} /><Pencil size={15} /><Trash2 size={15} /></span> },
      ]} />
    </Page>
  )
}

