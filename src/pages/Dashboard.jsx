import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  MapPin, Sun, Users, UserMinus, CircleCheck, Clock, CircleX, CalendarDays, CalendarRange, Sparkles,
  BriefcaseBusiness, House, Tablet, RefreshCw, Wifi, WifiOff, Calendar, ChevronLeft, ChevronRight,
  Fingerprint, ShieldCheck, Bell, FileText, Cake, Megaphone, Mail, Search, X, ArrowLeftRight,
  UsersRound, TrendingUp, MapPinned, ChartColumn, Send, Receipt, CreditCard, Layers, Presentation,
  ChevronDown, Frown,
} from 'lucide-react'
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell,
  BarChart, Bar, Legend,
} from 'recharts'
import { Card, Empty, Avatar, inr } from '../components/ui'
import d from '../data/dashboard.json'

const statStyle = {
  active: { icon: Users, tint: 'bg-blue-50 text-blue-500', bar: 'bg-blue-500' },
  inactive: { icon: UserMinus, tint: 'bg-gray-100 text-gray-500', bar: 'bg-gray-500' },
  present: { icon: CircleCheck, tint: 'bg-emerald-50 text-emerald-500', bar: 'bg-emerald-500' },
  late: { icon: Clock, tint: 'bg-orange-50 text-orange-500', bar: 'bg-orange-500' },
  absent: { icon: CircleX, tint: 'bg-rose-50 text-rose-500', bar: 'bg-rose-500' },
  leave: { icon: CalendarDays, tint: 'bg-amber-50 text-amber-500', bar: 'bg-amber-500' },
  weekoff: { icon: CalendarRange, tint: 'bg-indigo-50 text-indigo-500', bar: 'bg-indigo-500' },
  holiday: { icon: Sparkles, tint: 'bg-fuchsia-50 text-fuchsia-500', bar: 'bg-fuchsia-500' },
  onduty: { icon: BriefcaseBusiness, tint: 'bg-cyan-50 text-cyan-500', bar: 'bg-cyan-500' },
  wfh: { icon: House, tint: 'bg-teal-50 text-teal-500', bar: 'bg-teal-500' },
}

const axis = { fontSize: 10, fill: '#6b7280' }

function Clock24() {
  const [now, setNow] = useState(new Date())
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(t)
  }, [])
  const h = now.getHours()
  const greet = h < 12 ? 'Good Morning' : h < 17 ? 'Good Afternoon' : 'Good Evening'
  return (
    <div className="flex flex-col rounded-lg bg-gradient-to-br from-indigo-800 to-blue-500 p-4 text-white shadow-sm">
      <div className="flex justify-between text-xs font-semibold">
        <span>{now.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</span>
        <span className="flex items-center gap-1"><MapPin size={13} />{d.location}</span>
      </div>
      <div className="mt-auto flex items-center justify-between pt-8">
        <div>
          <div className="text-3xl font-bold">{now.toLocaleTimeString('en-US')}</div>
          <div className="text-base font-semibold opacity-90">{greet}</div>
        </div>
        <div className="flex items-center gap-2 text-right">
          <Sun size={30} className="text-yellow-300" />
          <div>
            <div className="text-3xl font-bold">{d.weather.temp}°</div>
            <div className="text-xs">{d.weather.label}</div>
          </div>
        </div>
      </div>
      <div className="mt-8 grid grid-cols-3 border-t border-white/20 pt-4 text-[10px] font-semibold uppercase opacity-90">
        <div>High / Low<div className="text-sm normal-case">{d.weather.high}° / {d.weather.low}°</div></div>
        <div className="border-x border-white/20 text-center">Humidity<div className="text-sm">{d.weather.humidity}%</div></div>
        <div className="text-right">Wind<div className="text-sm normal-case">{d.weather.wind} km/h</div></div>
      </div>
    </div>
  )
}

function StatCard({ s }) {
  const st = statStyle[s.key]
  const Icon = st.icon
  return (
    <div className="rounded-lg border border-base-300 bg-base-100 p-2.5 shadow-sm">
      <div className="flex items-start justify-between">
        <span className="text-xs font-semibold">{s.label}</span>
        <span className={`grid size-6 place-items-center rounded-md ${st.tint}`}><Icon size={13} /></span>
      </div>
      <div className="mt-4 text-lg font-bold">{s.value}</div>
      <div className="mt-2 flex items-center gap-2">
        <div className="h-1 flex-1 rounded-full bg-base-200">
          <div className={`h-1 rounded-full ${st.bar}`} style={{ width: `${s.pct}%` }} />
        </div>
        <span className="text-[9px] text-base-content/50">{s.pct}%</span>
      </div>
      <div className="mt-3 text-[9px] text-base-content/60">{s.sub}</div>
    </div>
  )
}

function LeaveCalendar() {
  const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
  const cells = [27, 28, 29, 30, ...Array.from({ length: 31 }, (_, i) => i + 1)]
  const leave = { 9: 'bg-emerald-500', 14: 'bg-amber-500', 28: 'bg-emerald-500' }
  return (
    <Card icon={Calendar} title="Leave Calendar" subtitle="Holidays, week-offs & leave"
      action={<Link to="/timetracker/calendar" className="text-xs font-semibold text-blue-600">View All</Link>}>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-[13px] font-semibold">October 2026</span>
        <span className="flex gap-1">
          <button className="btn btn-xs btn-square btn-ghost bg-base-200"><ChevronLeft size={12} /></button>
          <button className="btn btn-xs btn-square btn-ghost bg-base-200"><ChevronRight size={12} /></button>
        </span>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-[11px]">
        {days.map((x) => <div key={x} className="py-1 text-[10px] text-base-content/50">{x}</div>)}
        {cells.map((n, i) => {
          const muted = i < 4
          const weekend = i % 7 >= 5
          const today = !muted && n === 23
          return (
            <div key={i} className={`relative rounded-md py-1 ${muted ? 'text-base-content/20' : ''} ${weekend && !muted ? 'bg-base-300/70' : ''} ${today ? 'border border-purple-300 bg-purple-50 text-purple-600' : ''}`}>
              {n}
              {!muted && leave[n] && <span className={`absolute bottom-0.5 left-1/2 size-1 -translate-x-1/2 rounded-full ${leave[n]}`} />}
            </div>
          )
        })}
      </div>
      <div className="mt-3 flex justify-center gap-3 border-t border-base-300 pt-2 text-[9px] text-base-content/60">
        {[['bg-purple-100 border border-purple-300', 'Today'], ['bg-rose-500', 'Holiday'], ['bg-blue-500', 'Week-off'], ['bg-emerald-500', 'Approved leave'], ['bg-amber-500', 'Pending leave']].map(([c, l]) => (
          <span key={l} className="flex items-center gap-1"><span className={`size-1.5 rounded-full ${c}`} />{l}</span>
        ))}
      </div>
    </Card>
  )
}

function Tile({ value, label, tint }) {
  return (
    <div className={`rounded-lg py-3 text-center ${tint}`}>
      <div className="text-lg font-bold">{value}</div>
      <div className="text-[11px] text-base-content/70">{label}</div>
    </div>
  )
}

function Donut({ data, total, label }) {
  return (
    <div className="relative mx-auto size-32">
      <ResponsiveContainer>
        <PieChart>
          <Pie data={data} dataKey="v" innerRadius={44} outerRadius={60} startAngle={90} endAngle={-270} stroke="none">
            {data.map((x) => <Cell key={x.name} fill={x.color} />)}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 grid place-items-center text-center">
        <div><div className="text-lg font-bold leading-none">{total}</div><div className="text-[10px] text-base-content/60">{label}</div></div>
      </div>
    </div>
  )
}

const tabs = ['Department', 'Designation', 'Category', 'Location', 'Shift']
function TabBar({ value, onChange }) {
  return (
    <div className="flex gap-5 border-b border-base-300 px-4 text-[13px]">
      {tabs.map((t) => (
        <button key={t} onClick={() => onChange(t)}
          className={`-mb-px border-b-2 py-2.5 ${value === t ? 'border-blue-600 font-semibold text-blue-600' : 'border-transparent text-base-content/60'}`}>{t}</button>
      ))}
    </div>
  )
}

const statusBars = [
  ['present', 'Present', '#16a34a'], ['absent', 'Absent', '#dc2626'], ['late', 'Late', '#d97706'],
  ['leave', 'Leave', '#9333ea'], ['weekoff', 'Week Off', '#64748b'], ['holiday', 'Holiday', '#0891b2'],
]

function DeptChart({ data, bars }) {
  return (
    <div className="h-72">
      <ResponsiveContainer>
        <BarChart data={data} margin={{ top: 10, right: 10, bottom: 50, left: -20 }}>
          <CartesianGrid vertical={false} stroke="#f0f0f0" />
          <XAxis dataKey="name" tick={{ ...axis, fontSize: 9 }} angle={-35} textAnchor="end" interval={0} />
          <YAxis tick={axis} allowDecimals={false} />
          <Tooltip />
          <Legend verticalAlign="top" align="right" iconType="square" iconSize={9} wrapperStyle={{ fontSize: 11 }} />
          {bars.map(([k, l, c]) => <Bar key={k} dataKey={k} name={l} stackId="a" fill={c} barSize={16} />)}
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

function Collapse({ title, children }) {
  return (
    <details className="group border-t border-base-300">
      <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-base-content/70">
        {title}<ChevronDown size={15} className="transition-transform group-open:rotate-180" />
      </summary>
      <div className="px-4 pb-4">{children}</div>
    </details>
  )
}

function DeptTable({ rows, cols }) {
  return (
    <table className="table table-sm text-xs">
      <thead><tr><th>Department</th>{cols.map(([k, l]) => <th key={k}>{l}</th>)}</tr></thead>
      <tbody>{rows.map((r) => <tr key={r.name}><td>{r.name}</td>{cols.map(([k]) => <td key={k}>{r[k]}</td>)}</tr>)}</tbody>
    </table>
  )
}

function Select({ label, value }) {
  return (
    <label className="flex flex-col gap-1 text-[10px] font-semibold uppercase text-base-content/60">
      {label}
      <select className="select select-sm w-full text-xs font-normal normal-case"><option>{value}</option></select>
    </label>
  )
}

export default function Dashboard() {
  const [q, setQ] = useState('')
  const [tab1, setTab1] = useState('Department')
  const [tab2, setTab2] = useState('Department')
  const logs = d.timeLogs.filter((l) => (l.name + l.code).toLowerCase().includes(q.toLowerCase()))
  const g = d.gender
  const gTotal = g.female + g.male
  const presence = d.departments.map((x) => ({ name: x.name, inside: x.present, outside: x.late, absent: x.absent + x.weekoff }))
  const ex = d.expenses
  const ln = d.loans
  const at = d.attendanceToday

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-[13px] text-base-content/60">Welcome back, <span className="font-semibold text-indigo-700">{d.user}</span> . Here's what's happening today.</p>
        </div>
        <span className="flex items-center gap-2 rounded-lg border border-base-300 bg-base-100 px-3 py-1.5 text-xs font-semibold shadow-sm">
          <span className="size-1.5 rounded-full bg-emerald-500" />Fri, 23 Oct 2026
        </span>
      </div>

      <div className="grid gap-3.5 lg:grid-cols-[1fr_2.05fr]">
        <Clock24 />
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-5">{d.stats.map((s) => <StatCard key={s.key} s={s} />)}</div>
      </div>

      <div className="grid gap-3.5 lg:grid-cols-3">
        <Card icon={Tablet} title="Devices" subtitle="Online & offline devices" action={<RefreshCw size={13} className="text-base-content/40" />}>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-4 rounded-lg border border-emerald-100 bg-emerald-50/60 p-4">
              <Wifi className="text-emerald-600" /><div><div className="text-[11px] text-base-content/60">Online</div><div className="font-bold">{d.devices.online}</div><div className="text-[11px]">Connected</div></div>
            </div>
            <div className="flex items-center gap-4 rounded-lg border border-rose-100 bg-rose-50/60 p-4">
              <WifiOff className="text-rose-600" /><div><div className="text-[11px] text-base-content/60">Offline</div><div className="font-bold">{d.devices.offline}</div><div className="text-[11px]">Disconnected</div></div>
            </div>
          </div>
          <div className="mt-4 text-center"><button className="text-[11px] text-base-content/60 underline decoration-dotted">Refresh Device List</button></div>
        </Card>
        <LeaveCalendar />
        <Card icon={Fingerprint} title="Check In / Out" subtitle="Friday, 23 Oct 2026">
          <div className="flex h-full flex-col items-center justify-center gap-2 py-8 text-center">
            <span className="grid size-16 place-items-center rounded-full bg-base-200"><ShieldCheck size={30} strokeWidth={1.3} className="text-base-content/50" /></span>
            <div className="font-semibold">Superadmin Account</div>
            <p className="max-w-56 text-xs text-base-content/60">This is an administrative account. No employee profile is linked to record attendance.</p>
          </div>
        </Card>
      </div>

      <div className="grid gap-3.5 lg:grid-cols-3">
        <Card icon={Bell} title="Notifications" bodyClass="p-0">
          <ul className="divide-y divide-base-300">
            {d.notifications.map((n) => <li key={n.title} className="px-4 py-3"><div className="text-[13px]">{n.title}</div><div className="text-[11px] text-base-content/50">{n.time}</div></li>)}
          </ul>
        </Card>
        <Card icon={FileText} title="Documents" subtitle="Company & employee documents" bodyClass="p-0"
          action={<Link to="/settings/documents" className="text-xs font-semibold text-blue-600">View all</Link>}>
          <ul className="divide-y divide-base-300">
            {d.documents.map((x) => (
              <li key={x.name} className="flex items-center gap-3 px-4 py-3">
                <FileText size={16} className="text-base-content/40" />
                <div className="flex-1"><div className="text-[13px]">{x.name}</div><div className="text-[11px] text-base-content/50">{x.type} · {x.date}</div></div>
              </li>
            ))}
          </ul>
        </Card>
        <Card icon={Cake} title="Upcoming Birthdays" subtitle="October 2026" bodyClass="p-0">
          <ul className="max-h-60 divide-y divide-base-300 overflow-y-auto">
            {d.birthdays.map((b) => (
              <li key={b.name} className="flex items-center gap-3 px-3 py-3">
                <Avatar name={b.name} color={b.color} />
                <div className="flex-1"><div className="text-[13px] font-medium">{b.name}</div><div className="text-[11px] text-base-content/50">{b.date}</div></div>
                <span className="rounded-md bg-blue-50 px-2 py-0.5 text-[9px] font-semibold text-blue-600">{b.in}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <div className="grid gap-3.5 lg:grid-cols-3">
        <Card icon={Megaphone} title="Recent Notices" subtitle="October 2026" bodyClass="p-0">
          <ul className="divide-y divide-base-300">{d.notices.map((n) => <li key={n.title} className="px-4 py-3"><div className="text-[13px]">{n.title}</div><div className="text-[11px] text-base-content/50">{n.date}</div></li>)}</ul>
        </Card>
        <Card icon={Sparkles} title="Work Anniversaries" subtitle="October 2026" bodyClass="p-0">
          <ul className="divide-y divide-base-300">
            {d.anniversaries.map((a) => (
              <li key={a.name} className="flex items-center gap-3 px-3 py-3">
                <Avatar name={a.name} color="#0ea5e9" />
                <div className="flex-1"><div className="text-[13px] font-medium">{a.name}</div><div className="text-[11px] text-base-content/50">{a.date}</div></div>
                <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-[9px] font-semibold text-emerald-600">{a.years} yr</span>
              </li>
            ))}
          </ul>
        </Card>
        <Card icon={Mail} title="My Letters" subtitle="Issued letters & certificates" bodyClass="p-0"
          action={<Link to="/lettermanager/letterTable" className="text-xs font-semibold text-blue-600">View all</Link>}>
          <ul className="divide-y divide-base-300">{d.letters.map((l) => <li key={l.name} className="px-4 py-3"><div className="text-[13px]">{l.name}</div><div className="text-[11px] text-base-content/50">{l.date}</div></li>)}</ul>
        </Card>
      </div>

      <div className="grid gap-3.5 lg:grid-cols-[2.05fr_1fr]">
        <Card icon={Clock} title="Time Log Report" subtitle="Today's swipes from biometric devices"
          action={<span className="rounded-md bg-blue-50 px-2 py-0.5 text-[10px] font-semibold text-blue-600">Latest</span>}>
          <label className="mb-3 flex items-center gap-2 rounded-md border border-base-300 px-3 py-1.5 text-xs">
            <Search size={13} className="opacity-50" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by name or employee code..." className="flex-1 outline-none" />
            <X size={13} className="cursor-pointer opacity-50" onClick={() => setQ('')} />
          </label>
          <div className="max-h-56 overflow-y-auto rounded-md border border-base-300">
            <table className="table table-sm text-xs">
              <thead className="sticky top-0 bg-base-100"><tr><th>Name Of The Employee</th><th>Employee Code</th><th>Device</th><th>Swipe In</th><th>Swipe Out</th></tr></thead>
              <tbody>{logs.map((l) => <tr key={l.code}><td>{l.name}</td><td>{l.code}</td><td>{l.device}</td><td>{l.in}</td><td>{l.out}</td></tr>)}</tbody>
            </table>
            {!logs.length && <Empty text="No time logs found yet." />}
          </div>
        </Card>
        <Card icon={ArrowLeftRight} title="Workforce Movement" subtitle="October 2026">
          <div className="grid grid-cols-2 gap-2.5">
            <div className="rounded-lg bg-emerald-50 py-3 text-center"><div className="text-xl font-bold text-emerald-600">{d.workforce.joiners}</div><div className="text-xs">New joiners</div></div>
            <div className="rounded-lg bg-rose-50 py-3 text-center"><div className="text-xl font-bold text-rose-600">{d.workforce.exits}</div><div className="text-xs">Exits</div></div>
          </div>
          <div className="mt-3 rounded-lg border border-base-300 text-[13px]">
            <div className="px-3 py-2 text-[10px] font-semibold uppercase text-base-content/50">Year to date</div>
            <div className="flex justify-between border-t border-base-300 px-3 py-2"><span className="flex items-center gap-2"><span className="size-1.5 rounded-full bg-emerald-500" />Joiners YTD</span><b className="text-emerald-600">{d.workforce.joinersYtd}</b></div>
            <div className="flex justify-between border-t border-base-300 px-3 py-2"><span className="flex items-center gap-2"><span className="size-1.5 rounded-full bg-rose-500" />Exits YTD</span><b className="text-rose-600">{d.workforce.exitsYtd}</b></div>
            <div className="flex justify-between border-t border-base-300 px-3 py-2"><span>Net change</span><b className="text-emerald-600">+{d.workforce.joinersYtd - d.workforce.exitsYtd}</b></div>
            <div className="flex justify-between border-t border-base-300 px-3 py-2"><span>Attrition rate (YTD)</span><b>{d.workforce.attrition}%</b></div>
          </div>
        </Card>
      </div>

      <div className="grid gap-3.5 lg:grid-cols-[1fr_2.05fr]">
        <Card icon={UsersRound} title="Gender Diversity" subtitle={`${gTotal} active employees`}>
          <Donut total={gTotal} label="Employees" data={[{ name: 'Female', v: g.female, color: '#ec4899' }, { name: 'Male', v: g.male, color: '#3b82f6' }]} />
          <div className="mt-6 divide-y divide-base-300 text-[13px]">
            {[['Female', g.female, 'bg-pink-500'], ['Male', g.male, 'bg-blue-500']].map(([l, v, c]) => (
              <div key={l} className="flex items-center gap-2 py-2"><span className={`size-2 rounded-sm ${c}`} /><span className="flex-1">{l}</span><b>{v}</b><span className="w-10 text-right text-[11px] text-base-content/50">{Math.round((v / gTotal) * 100)}%</span></div>
            ))}
          </div>
        </Card>
        <Card icon={TrendingUp} title="Attendance Trends" subtitle="Present employees - last 6 working days">
          <div className="h-56">
            <ResponsiveContainer>
              <AreaChart data={d.attendanceTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="day" tick={axis} />
                <YAxis tick={axis} />
                <Tooltip />
                <Area type="monotone" dataKey="v" name="Present" stroke="#3b82f6" fill="#dbeafe" strokeWidth={2} dot={{ r: 2.5 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <div className="grid gap-3.5 lg:grid-cols-[2.05fr_1fr]">
        <Card icon={MapPinned} title={<span className="flex items-center gap-2">Zone-wise Occupancy (Live)<span className="size-2 rounded-full bg-emerald-500" /></span>}
          subtitle={<>Real-time occupant tracking inside mapped zones · <Link to="/zone" className="text-indigo-700">View All Zones</Link></>}
          action={<div className="flex gap-2"><select className="select select-xs w-28"><option>All Locations</option></select><input className="input input-xs w-36" placeholder="Search Zone..." /></div>}>
          <div className="grid gap-3 sm:grid-cols-3">
            {d.zones.map((z) => (
              <div key={z.name} className="rounded-lg border border-base-300 p-3">
                <div className="text-[13px] font-semibold">{z.name}</div>
                <div className="text-[11px] text-base-content/50">{z.location}</div>
                <div className="mt-3 flex items-end justify-between"><span className="text-xl font-bold">{z.count}</span><span className="text-[11px] text-base-content/50">/ {z.capacity}</span></div>
                <progress className="progress progress-success mt-1 h-1.5" value={z.count} max={z.capacity} />
              </div>
            ))}
          </div>
          {!d.zones.length && <Empty icon={Frown} text="No active zones found matching criteria." />}
        </Card>
        <div className="grid place-items-center rounded-lg border border-dashed border-base-300 text-[10px] uppercase tracking-wide text-base-content/40">Dashboard Space</div>
      </div>

      <Card icon={ArrowLeftRight} title="Movement Insights" action={<span className="rounded border border-base-300 px-2 py-0.5 text-[9px] font-semibold uppercase text-base-content/60">Refreshed Live</span>}>
        <div className="grid gap-4 lg:grid-cols-3 lg:divide-x lg:divide-base-300">
          <div>
            <div className="mb-2 text-[10px] font-semibold uppercase text-base-content/60">Employee Movement History (Timeline)</div>
            <ul className="space-y-2 text-xs">{d.movement.timeline.map((m) => <li key={m.name + m.time}><b>{m.name}</b> {m.from} → {m.to}<div className="text-[10px] text-base-content/50">{m.time}</div></li>)}</ul>
          </div>
          <div className="lg:pl-4">
            <div className="mb-2 text-[10px] font-semibold uppercase text-base-content/60">Zone Transitions (Today)</div>
            <div className="grid h-24 place-items-center text-xs">Total Movements Recorded: <b className="text-indigo-700">{d.movement.transitions}</b></div>
          </div>
          <div className="lg:pl-4">
            <div className="mb-2 text-[10px] font-semibold uppercase text-base-content/60">Hourly Occupancy Trend (Today)</div>
            <div className="h-28"><ResponsiveContainer><BarChart data={d.movement.hourly} margin={{ left: -30, right: 0 }}><XAxis dataKey="h" tick={{ ...axis, fontSize: 8 }} /><YAxis tick={axis} /><Bar dataKey="v" fill="#6366f1" /></BarChart></ResponsiveContainer></div>
          </div>
        </div>
      </Card>

      <div className="grid gap-3.5 lg:grid-cols-[2.05fr_1fr]">
        <Card icon={ChartColumn} title="Attendance Today" subtitle="Friday, 23 Oct 2026">
          <div className="grid grid-cols-4 gap-2.5">
            <Tile value={at.present} label="Present" tint="bg-emerald-50 text-emerald-700" />
            <Tile value={at.onTime} label="On time" tint="bg-indigo-50 text-indigo-700" />
            <Tile value={at.late} label="Late" tint="bg-amber-50 text-amber-700" />
            <Tile value={at.absent} label="Absent" tint="bg-rose-50 text-rose-700" />
          </div>
          <div className="mt-3 h-36"><ResponsiveContainer><BarChart data={at.week} margin={{ left: -25 }}><CartesianGrid vertical={false} stroke="#f0f0f0" /><XAxis dataKey="day" tick={axis} /><YAxis tick={axis} /><Tooltip /><Bar dataKey="v" name="Present" fill="#4f46e5" barSize={12} /></BarChart></ResponsiveContainer></div>
        </Card>
        <Card icon={Send} title="Leave Summary" subtitle="October 2026">
          <div className="grid grid-cols-2 gap-2.5">
            <Tile value={d.leaveSummary.requests} label="Leave requests" tint="bg-blue-50 text-blue-700" />
            <Tile value={d.leaveSummary.onLeaveToday} label="On leave today" tint="bg-purple-50 text-purple-700" />
          </div>
          <div className="mt-4 flex items-center gap-4">
            <Donut total={d.leaveSummary.types.reduce((a, t) => a + t.v, 0)} label="Requests" data={d.leaveSummary.types} />
            <div className="flex-1 space-y-2 text-xs">
              {d.leaveSummary.types.map((t) => <div key={t.name} className="flex items-center gap-2"><span className="size-2 rounded-full" style={{ background: t.color }} /><span className="flex-1">{t.name}</span><b>{t.v}</b></div>)}
            </div>
          </div>
        </Card>
      </div>

      <div className="grid gap-3.5 lg:grid-cols-[2.05fr_1fr]">
        <Card icon={Receipt} title="Expense Claims" subtitle="October 2026">
          <div className="grid grid-cols-3 gap-2.5">
            <Tile value={ex.pending} label="PENDING" tint="bg-amber-50 text-amber-600" />
            <Tile value={ex.approved} label="APPROVED" tint="bg-emerald-50 text-emerald-600" />
            <Tile value={ex.rejected} label="REJECTED" tint="bg-rose-50 text-rose-600" />
          </div>
          <div className="mt-3 flex justify-between rounded-md bg-emerald-50 px-3 py-1.5 text-xs"><span className="text-base-content/70">Approved this month</span><b className="text-emerald-600">{inr(ex.approvedThisMonth)}</b></div>
          <div className="mt-2 h-32"><ResponsiveContainer><AreaChart data={ex.monthly} margin={{ left: -15 }}><CartesianGrid vertical={false} stroke="#f0f0f0" /><XAxis dataKey="m" tick={axis} /><YAxis tick={axis} /><Tooltip /><Area dataKey="v" stroke="#10b981" fill="#d1fae5" /></AreaChart></ResponsiveContainer></div>
        </Card>
        <div className="grid place-items-center rounded-lg border border-dashed border-base-300 text-[10px] uppercase tracking-wide text-base-content/40">Dashboard Space</div>
      </div>

      <Card icon={CreditCard} title="Loan Overview" subtitle="Active employee loans">
        <div className="grid grid-cols-2 gap-2.5">
          <Tile value={ln.active} label="Active loans" tint="bg-cyan-50 text-cyan-600" />
          <Tile value={ln.pending} label="Pending approval" tint="bg-amber-50 text-amber-600" />
        </div>
        <div className="mt-3 space-y-1 rounded-md bg-base-200/60 px-3 py-2 text-xs font-semibold">
          <div className="flex justify-between"><span>Outstanding Balance</span><span className="text-rose-600">{inr(ln.outstanding)}</span></div>
          <div className="flex justify-between"><span>Disbursed This Month</span><span className="text-cyan-600">{inr(ln.disbursed)}</span></div>
        </div>
        <div className="mt-2 h-28"><ResponsiveContainer><BarChart data={ln.monthly} margin={{ left: -25 }}><CartesianGrid vertical={false} stroke="#f0f0f0" /><XAxis dataKey="m" tick={axis} /><YAxis tick={axis} /><Bar dataKey="v" fill="#06b6d4" barSize={14} /></BarChart></ResponsiveContainer></div>
      </Card>

      <Card icon={Layers} title="Department Detailed Analysis" subtitle="Attendance status by department" bodyClass="p-0">
        <div className="grid grid-cols-2 gap-2.5 border-b border-base-300 p-4 md:grid-cols-6">
          <Select label="Department" value="All departments" /><Select label="Designation" value="All designations" />
          <Select label="Category" value="All categories" /><Select label="Location" value="All locations" />
          <Select label="Shift" value="All shifts" />
          <label className="flex flex-col gap-1 text-[10px] font-semibold uppercase text-base-content/60">Date<input type="date" defaultValue="2026-10-23" className="input input-sm text-xs font-normal" /></label>
        </div>
        <div className="p-4"><DeptChart data={d.departments} bars={statusBars} /></div>
        <Collapse title="Detailed Status Breakdown"><DeptTable rows={d.departments} cols={statusBars} /></Collapse>
      </Card>

      <Card icon={ChartColumn} title="Grouped Attendance" bodyClass="p-0">
        <TabBar value={tab1} onChange={setTab1} />
        <div className="p-4"><DeptChart data={d.departments} bars={statusBars} /></div>
        <Collapse title="Detailed Data"><DeptTable rows={d.departments} cols={statusBars} /></Collapse>
      </Card>

      <Card icon={Presentation} title="Punctuality & Presence" subtitle="Who is inside or outside the campus right now" bodyClass="p-0"
        action={<input type="date" defaultValue="2026-10-23" className="input input-sm w-36 text-xs" />}>
        <div className="grid grid-cols-2 gap-2.5 p-4 md:grid-cols-4">
          <Tile value={42} label="Active employees" tint="bg-indigo-50 text-indigo-700" />
          <Tile value={18} label="Inside campus" tint="bg-emerald-50 text-emerald-600" />
          <Tile value={3} label="Outside campus" tint="bg-amber-50 text-amber-600" />
          <Tile value={21} label="Absent" tint="bg-slate-100 text-slate-600" />
        </div>
        <TabBar value={tab2} onChange={setTab2} />
        <div className="p-4"><DeptChart data={presence} bars={[['inside', 'Inside', '#16a34a'], ['outside', 'Outside', '#d97706'], ['absent', 'Absent', '#64748b']]} /></div>
        <Collapse title="Detailed Data"><DeptTable rows={presence} cols={[['inside', 'Inside'], ['outside', 'Outside'], ['absent', 'Absent']]} /></Collapse>
      </Card>
    </div>
  )
}
