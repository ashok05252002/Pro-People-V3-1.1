// Upgrade page for a locked (premium) module or for the advanced features of an included module.
import { useParams, Navigate } from 'react-router-dom'
import { Crown, Star, Lock, CircleCheck, Send, UserCog } from 'lucide-react'
import { Page } from '../components/table'
import { toast } from '../components/forms'
import { premiumOf } from '../data/premium'

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
      </div>
    </Page>
  )
}
