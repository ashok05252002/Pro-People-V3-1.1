// Dashboard, laid out as on the test staging app: clock + weather card, 10 stat tiles,
// reserved slots around Notifications, and the Time Log Report.
import { useEffect, useState } from 'react'
import {
  MapPin, Sun, Users, UserMinus, CircleCheck, Clock, CircleX, CalendarDays, CalendarRange, Sparkles,
  BriefcaseBusiness, House, Bell, BellOff, Lock, Plus, CalendarClock,
} from 'lucide-react'
import { Card, Avatar } from '../components/ui'
import { useRows } from '../data/store'
import { employees as seed } from '../data/people'
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

function ClockCard() {
  const [now, setNow] = useState(new Date())
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(t)
  }, [])
  const h = now.getHours()
  const greet = h < 12 ? 'Good Morning' : h < 17 ? 'Good Afternoon' : 'Good Evening'
  const [time, ap] = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }).split(' ')
  return (
    <div className="flex flex-col justify-between rounded-lg border border-base-300 bg-base-100 p-4 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-[10px] font-bold tracking-widest text-indigo-600 uppercase"><span className="size-1.5 rounded-full bg-indigo-600" />{greet}</div>
          <div className="mt-1 text-3xl font-bold">{time} <span className="text-sm font-semibold text-base-content/60">{ap}</span></div>
          <div className="text-[10px] tracking-widest text-base-content/50 uppercase">{now.toLocaleDateString('en-GB', { weekday: 'long', day: '2-digit', month: 'long' })}</div>
        </div>
        <span className="grid size-10 place-items-center rounded-lg bg-base-200"><Sun size={20} className="text-indigo-600" /></span>
      </div>
      <div className="mt-6 flex items-end justify-between">
        <div className="flex items-end gap-3">
          <div className="text-4xl font-bold">{d.weather.temp}<sup className="text-base">°</sup><div className="text-[9px] font-bold tracking-widest text-base-content/60">CELSIUS</div></div>
          <div className="pb-4 text-xs"><div className="font-semibold">{d.weather.label}</div><div className="text-[10px] text-base-content/50">scattered clouds</div></div>
        </div>
        <span className="flex items-center gap-1 rounded-full border border-base-300 px-2.5 py-1 text-[9px] font-bold uppercase"><MapPin size={11} />{d.location}</span>
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
        <span className={`grid size-6 place-items-center rounded-md ${st.tint}`}><Icon size={13} /></span>
        <span className="text-lg font-bold">{s.value}</span>
      </div>
      <div className="mt-1 text-xs font-semibold">{s.label}</div>
      <div className="text-[9px] text-base-content/60">{s.sub}</div>
      <div className="mt-2 flex items-center gap-2">
        <div className="h-1 flex-1 rounded-full bg-base-200"><div className={`h-1 rounded-full ${st.bar}`} style={{ width: `${s.pct}%` }} /></div>
        <span className="text-[9px] text-base-content/50">{s.pct}%</span>
      </div>
    </div>
  )
}

function Slot({ empty }) {
  return (
    <div className={`grid min-h-64 place-items-center rounded-lg border border-base-300 ${empty ? 'border-dashed bg-base-100/60' : 'bg-base-100'} shadow-sm`}>
      <div className="flex flex-col items-center gap-2 text-[9px] font-semibold tracking-widest text-base-content/40 uppercase">
        <span className="grid size-12 place-items-center rounded-lg border border-base-300 bg-base-200/60">{empty ? <Plus size={18} /> : <Lock size={18} />}</span>
        {empty ? 'Empty Slot' : 'Reserved Slot'}
      </div>
    </div>
  )
}

export default function Dashboard() {
  const [employees] = useRows('employees', seed)
  const active = employees.filter((e) => e.status === 'Active').length
  const pct = (n) => Math.round((n / employees.length) * 100)
  const stats = d.stats.map((s) => (s.key === 'active' ? { ...s, value: active, pct: pct(active) }
    : s.key === 'inactive' ? { ...s, value: employees.length - active, pct: pct(employees.length - active) } : s))
  const today = new Date().toLocaleDateString('en-GB', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' })

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-[13px] text-base-content/60">Welcome back, <span className="font-semibold text-indigo-700">{d.user}</span> . Here's what's happening today.</p>
        </div>
        <span className="flex items-center gap-2 rounded-lg border border-base-300 bg-base-100 px-3 py-1.5 text-xs font-semibold shadow-sm">
          <span className="size-1.5 rounded-full bg-emerald-500" />{today}
        </span>
      </div>

      <div className="grid gap-3.5 lg:grid-cols-[1fr_2.05fr]">
        <ClockCard />
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-5">{stats.map((s) => <StatCard key={s.key} s={s} />)}</div>
      </div>

      <div className="grid gap-3.5 lg:grid-cols-3">
        <Slot />
        <Card icon={Bell} title="Notifications" bodyClass="p-0">
          {d.notifications.length ? (
            <ul className="divide-y divide-base-300">
              {d.notifications.map((n) => <li key={n.title} className="px-4 py-3"><div className="text-[13px]">{n.title}</div><div className="text-[11px] text-base-content/50">{n.time}</div></li>)}
            </ul>
          ) : <div className="flex flex-col items-center gap-2 py-12 text-xs text-base-content/50"><BellOff size={22} />All caught up!</div>}
        </Card>
        <Slot />
      </div>

      <div className="grid gap-3.5 lg:grid-cols-3">
        <Card icon={CalendarClock} title="Time Log Report" subtitle="Recent attendance activity" className="lg:col-span-2" bodyClass="p-0"
          action={<span className="rounded-md border border-base-300 px-2 py-1 text-[10px] font-bold">LATEST</span>}>
          <table className="table table-sm text-xs">
            <thead><tr className="text-[10px] tracking-wide uppercase"><th>Name of the Employee</th><th>Employee Code</th><th>Swipe In</th><th>Swipe Out</th></tr></thead>
            <tbody>
              {d.timeLogs.map((l) => (
                <tr key={l.code} className="border-base-300">
                  <td><div className="flex items-center gap-2"><Avatar name={l.name} size="size-7" />{l.name}</div></td>
                  <td>{l.code}</td><td>{l.in}</td><td>{l.out}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {!d.timeLogs.length && <div className="py-10 text-center text-xs text-base-content/50">No time logs found yet.</div>}
        </Card>
        <Slot empty />
      </div>
    </div>
  )
}
