// Upgrade page for a locked (premium) module or for the advanced features of an included module.
import { useParams, Navigate } from 'react-router-dom'
import { Crown, Star, Lock, CircleCheck, Send, UserCog, Eye, Wifi, WifiOff, Fingerprint, Bell, Briefcase, House } from 'lucide-react'
import { Page } from '../components/table'
import { toast } from '../components/forms'
import { premiumOf } from '../data/premium'
import { premiumSamples } from '../data/premiumSamples'
import { Avatar } from '../components/ui'
import { emp } from '../data/people'

const good = /^(Paid|Approved|Finalized|Joined|Published|Checked In|Valid|Active|Issued|Online)$/
const wait = /^(Pending|Processing|Scheduled|Expected|Manager Review|HR Review|Self Assessment|Offer Sent|New)$/
const bad = /^(Rejected|On Hold|Expiring|Inactive|Deleted|Offline)$/
const Status = ({ s }) => (
  <span className={`rounded px-2 py-0.5 text-[11px] font-medium ${good.test(s) ? 'bg-emerald-100 text-emerald-700' : wait.test(s) ? 'bg-amber-100 text-amber-800' : bad.test(s) ? 'bg-rose-100 text-rose-700' : 'bg-base-200'}`}>{s}</span>
)
const Tile = ({ label, value }) => (
  <div className="rounded-lg border border-base-300 bg-base-100 px-4 py-3">
    <p className="text-[11px] text-base-content/60">{label}</p>
    <p className="mt-0.5 text-lg font-bold">{value}</p>
  </div>
)

function TablePreview({ d }) {
  return (
    <>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">{d.stats.map(([l, v]) => <Tile key={l} label={l} value={v} />)}</div>
      <div className="mt-4 overflow-x-auto rounded-lg border border-base-300 bg-base-100">
        <p className="border-b border-base-300 px-4 py-2.5 text-[13px] font-semibold">{d.title}</p>
        <table className="table table-sm text-[12px]">
          <thead><tr>{d.cols.map((c) => <th key={c}>{c}</th>)}</tr></thead>
          <tbody>
            {d.rows.map((r, i) => (
              <tr key={i}>
                {r.map((c, j) => {
                  if (j === 0 && d.person) {
                    const e = emp(c)
                    return <td key={j}><span className="flex items-center gap-2 whitespace-nowrap"><Avatar name={e.name} color={e.color} size="size-7" />{e.name}</span></td>
                  }
                  return <td key={j} className="whitespace-nowrap">{j === r.length - 1 ? <Status s={c} /> : c}</td>
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

const devices = [['Main Gate', 'ZKTECO', 'Online'], ['Head Office Lobby', 'ESSL', 'Online'], ['Branch 1 Entry', 'HIKVISION', 'Online'], ['Warehouse', 'SUPREMA', 'Offline']]
const leaveDays = { 3: 2, 4: 2, 9: 1, 10: 1, 11: 1, 14: 3, 16: 1, 20: 2 }
const dashTiles = [[Briefcase, 'On-Duty', '3', 'bg-sky-100 text-sky-600'], [House, 'Work From Home', '5', 'bg-violet-100 text-violet-600'],
  [Wifi, 'Devices Online', '3 / 4', 'bg-emerald-100 text-emerald-600'], [Bell, 'New Notifications', '7', 'bg-amber-100 text-amber-600']]

function DashboardPreview() {
  const me = emp(0)
  return (
    <div className="grid gap-3 lg:grid-cols-3">
      <div className="grid grid-cols-2 gap-3 lg:col-span-3 lg:grid-cols-4">
        {dashTiles.map(([I, l, v, c]) => (
          <div key={l} className="flex items-center gap-3 rounded-lg border border-base-300 bg-base-100 px-4 py-3">
            <span className={`grid size-9 place-items-center rounded-lg ${c}`}><I size={17} /></span>
            <div><p className="text-[11px] text-base-content/60">{l}</p><p className="text-lg font-bold">{v}</p></div>
          </div>
        ))}
      </div>

      <div className="rounded-lg border border-base-300 bg-base-100 p-4">
        <p className="mb-3 text-[13px] font-semibold">Devices Status</p>
        <ul className="space-y-2 text-[12px]">
          {devices.map(([n, b, st]) => (
            <li key={n} className="flex items-center gap-2.5">
              {st === 'Online' ? <Wifi size={14} className="text-emerald-500" /> : <WifiOff size={14} className="text-rose-500" />}
              <span className="flex-1">{n}<span className="block text-[10px] text-base-content/50">{b}</span></span><Status s={st} />
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-lg border border-base-300 bg-base-100 p-4">
        <p className="mb-3 text-[13px] font-semibold">Leave Calendar <span className="font-normal text-base-content/50">November 2026</span></p>
        <div className="grid grid-cols-7 gap-1 text-center text-[10px]">
          {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => <span key={i} className="text-base-content/40">{d}</span>)}
          {Array.from({ length: 6 }, (_, i) => <span key={'b' + i} />)}
          {Array.from({ length: 30 }, (_, i) => i + 1).map((d) => (
            <span key={d} className={`relative rounded py-1 ${leaveDays[d] ? 'bg-primary/10 font-semibold text-primary' : ''}`}>
              {d}{leaveDays[d] && <span className="absolute -top-1 -right-0.5 grid size-3.5 place-items-center rounded-full bg-primary text-[8px] text-white">{leaveDays[d]}</span>}
            </span>
          ))}
        </div>
      </div>

      <div className="rounded-lg border border-base-300 bg-base-100 p-4">
        <p className="mb-3 text-[13px] font-semibold">Check In / Out</p>
        <div className="flex items-center gap-3">
          <Avatar name={me.name} color={me.color} />
          <div className="text-[12px]"><p className="font-semibold">{me.name}</p><p className="text-base-content/50">General (09:00 - 18:00)</p></div>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2 text-center text-[11px]">
          <div className="rounded-md bg-emerald-50 py-2"><p className="text-base-content/50">Swipe In</p><p className="text-sm font-bold text-emerald-700">08:52 AM</p></div>
          <div className="rounded-md bg-base-200 py-2"><p className="text-base-content/50">Worked</p><p className="text-sm font-bold">6h 21m</p></div>
        </div>
        <p className="mt-3 flex items-center justify-center gap-1.5 rounded-md bg-primary py-2 text-[12px] font-semibold text-primary-content"><Fingerprint size={14} />Swipe Out</p>
      </div>
    </div>
  )
}

// Read-only mock of the module with sample data, fading into a lock badge.
function Preview({ k }) {
  const d = premiumSamples[k]
  if (k !== 'dashboard' && !d) return null
  return (
    <div className="border-t border-base-300 px-6 py-5">
      <h3 className="mb-3 flex items-center gap-2 text-[13px] font-bold tracking-wide text-base-content/60 uppercase">
        <Eye size={14} />Preview<span className="rounded bg-amber-100 px-1.5 py-0.5 text-[10px] tracking-wider text-amber-700">SAMPLE DATA</span>
      </h3>
      <div className="relative overflow-hidden rounded-xl bg-base-200 p-4">
        <div className="pointer-events-none select-none" aria-hidden>{k === 'dashboard' ? <DashboardPreview /> : <TablePreview d={d} />}</div>
        <div className="absolute inset-x-0 bottom-0 flex h-28 items-end justify-center bg-gradient-to-t from-base-100 via-base-100/80 to-transparent pb-4">
          <span className="flex items-center gap-1.5 rounded-full bg-amber-500 px-3.5 py-1.5 text-[12px] font-semibold text-white shadow-md shadow-amber-500/30">
            <Lock size={13} />Available on upgrade
          </span>
        </div>
      </div>
    </div>
  )
}

export default function Premium() {
  const m = premiumOf(useParams().key)
  if (!m) return <Navigate to="/dashboard" replace />
  return (
    <Page title={m.label} subtitle="Premium module">
      <div className="overflow-hidden rounded-box bg-base-100 shadow-sm">
        <div className="flex flex-wrap items-center gap-5 bg-gradient-to-r from-amber-50 via-amber-100/70 to-yellow-50 px-6 py-6">
          <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-amber-300 to-amber-500 text-white shadow-md shadow-amber-500/30">
            <Crown size={28} />
          </span>
          <div className="min-w-60 flex-1">
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-500 px-2.5 py-0.5 text-[11px] font-bold tracking-wide text-white">
              <Star size={11} fill="currentColor" />PREMIUM
            </span>
            <h2 className="mt-1.5 text-lg font-bold">{m.label} is not included in your current plan</h2>
            <p className="mt-0.5 text-[13px] text-base-content/70">{m.desc}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button onClick={() => toast('Your administrator has been notified')}
              className="btn h-10 gap-2 rounded-md border-base-300 bg-base-100 px-4 text-[13px] font-semibold shadow-sm">
              <UserCog size={15} />Contact Administrator
            </button>
            <button onClick={() => toast(`Upgrade request for ${m.label} sent to your administrator`)}
              className="btn h-10 gap-2 rounded-md border-amber-500 bg-amber-500 px-4 text-[13px] font-semibold text-white shadow-sm shadow-amber-500/30 hover:border-amber-600 hover:bg-amber-600">
              <Send size={15} />Request Upgrade
            </button>
          </div>
        </div>

        <div className="px-6 py-5">
          <h3 className="mb-3 flex items-center gap-2 text-[13px] font-bold tracking-wide text-base-content/60 uppercase"><Lock size={14} />What you get</h3>
          <ul className="grid gap-2.5 sm:grid-cols-2">
            {m.features.map((f) => (
              <li key={f} className="flex items-start gap-2.5 rounded-lg border border-base-300 px-3 py-2.5 text-[13px]">
                <CircleCheck size={16} className="mt-px shrink-0 text-amber-500" />{f}
              </li>
            ))}
          </ul>
          <p className="mt-5 text-[12px] text-base-content/50">Contact your administrator to enable this module. Your data stays as it is, and the module unlocks in the same login.</p>
        </div>
        <Preview k={m.key} />
      </div>
    </Page>
  )
}
