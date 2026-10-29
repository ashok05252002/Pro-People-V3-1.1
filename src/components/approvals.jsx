// Approval board: "New Application's / History" tabs, filter row, and a grid of request cards with Accept / Reject.
import { useState } from 'react'
import { Sparkles, Layers, Search, X, Calendar, ScanLine, CircleCheck, CircleX } from 'lucide-react'
import { Page, Badge } from './table'
import { Avatar } from './ui'
import { toast } from './forms'

/**
 * items: [{ id, e (employee), title?, lines: [[Icon, label?, value]], box?: [[label, value]] }]
 */
export function ApprovalBoard({ title, items, locations = false, historyStatus = ['Approved', 'Rejected'] }) {
  const [tab, setTab] = useState('new')
  const [q, setQ] = useState('')
  const [order, setOrder] = useState('Newest')
  const [decided, setDecided] = useState({})
  const decide = (it, status) => { setDecided((d) => ({ ...d, [it.id]: status })); toast(`${it.title || 'Request'} for ${it.e.name} ${status.toLowerCase()}`) }
  const pending = items.filter((i) => !decided[i.id])
  const history = [
    ...items.filter((i) => decided[i.id]).map((i) => ({ ...i, status: decided[i.id] })),
    ...items.slice(0, 2).map((i, n) => ({ ...i, id: `h${i.id}`, status: historyStatus[n % historyStatus.length] })),
  ]
  let list = (tab === 'new' ? pending : history).filter((i) => (i.e.name + i.e.code).toLowerCase().includes(q.toLowerCase()))
  if (order === 'Oldest') list = [...list].reverse()

  return (
    <Page title={title}>
      <div className="rounded-lg bg-base-100 p-3 shadow-sm">
        <div className="mb-3 flex gap-1 border-b border-base-300 text-xs">
          {[['new', "New Application's", Sparkles], ['history', 'History', Layers]].map(([k, l, I]) => (
            <button key={k} onClick={() => setTab(k)} className={`-mb-px flex items-center gap-2 border-b-2 px-3 py-2 ${tab === k ? 'border-base-content font-semibold' : 'border-transparent text-base-content/60'}`}><I size={14} />{l}</button>
          ))}
        </div>
        <div className="mb-3 flex flex-wrap gap-2">
          <label className="flex h-9 min-w-60 flex-1 items-center gap-2 rounded-md border border-base-300 px-3 text-xs">
            <Search size={13} className="opacity-50" /><input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by Name, Code" className="flex-1 outline-none" />
            {q && <X size={13} className="cursor-pointer opacity-50" onClick={() => setQ('')} />}
          </label>
          <label className="flex h-9 w-44 items-center gap-2 rounded-md border border-base-300 px-3 text-xs text-base-content/50"><Calendar size={13} /><input type="text" placeholder="From Date" onFocus={(e) => (e.target.type = 'date')} className="flex-1 outline-none" /></label>
          <label className="flex h-9 w-44 items-center gap-2 rounded-md border border-base-300 px-3 text-xs text-base-content/50"><Calendar size={13} /><input type="text" placeholder="To Date" onFocus={(e) => (e.target.type = 'date')} className="flex-1 outline-none" /></label>
          {locations && <select className="select select-sm h-9 w-36 text-xs"><option>All Locations</option><option>Head Office</option><option>Branch 1</option></select>}
          <div className="join">
            {['Oldest', 'Newest'].map((o) => <button key={o} onClick={() => setOrder(o)} className={`btn join-item btn-sm h-9 text-xs font-normal ${order === o ? 'bg-base-300' : 'bg-base-100'}`}>{o}</button>)}
          </div>
        </div>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {list.map((it) => (
            <div key={it.id} className="flex flex-col rounded-lg border border-base-300 p-3 shadow-sm">
              <div className="flex items-center gap-3 border-b border-base-300 pb-3">
                <Avatar name={it.title || it.e.name} color={it.color || it.e.color} />
                <span className="flex-1 text-base font-bold">{it.title || it.e.name}</span>
                <ScanLine size={16} className="opacity-70" />
              </div>
              <ul className="flex-1 space-y-1.5 py-3 text-xs">
                {it.lines.map(([I, label, value], n) => (
                  <li key={n} className="flex items-center gap-2"><I size={13} className="shrink-0" />{label && <b>{label}</b>}<span>{value}</span></li>
                ))}
              </ul>
              {it.box && (
                <div className="mb-3 space-y-0.5 rounded-md bg-base-200 p-3 text-[11px]">
                  {it.box.map(([l, v]) => <div key={l}><b>{l}:</b> {v}</div>)}
                </div>
              )}
              <div className="flex gap-2 border-t border-base-300 pt-3">
                {tab === 'new' ? (
                  <>
                    <button onClick={() => decide(it, 'Approved')} className="btn btn-xs h-7 gap-1 border-emerald-500 bg-base-100 font-normal text-emerald-600"><CircleCheck size={13} />Accept</button>
                    <button onClick={() => decide(it, 'Rejected')} className="btn btn-xs h-7 gap-1 border-rose-400 bg-base-100 font-normal text-rose-500"><CircleX size={13} />Reject</button>
                  </>
                ) : <Badge>{it.status}</Badge>}
              </div>
            </div>
          ))}
        </div>
        {!list.length && <div className="py-16 text-center text-[13px] text-base-content/50">No records found</div>}
      </div>
    </Page>
  )
}
