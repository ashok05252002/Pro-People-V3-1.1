// Performance module. Manager Review, HR Finalization, Salary Revisions and Increment Letters returned
// server errors on staging (2026-10-23) and Self Assessment needs an employee login, so those five are designed here.
import { useState } from 'react'
import { Filter, Plus, Check, Star, Download, Eye, Send } from 'lucide-react'
import { Page, Btn, DataTable, Badge, Person, rowsOf, actionsCol } from '../components/table'
import { employees, emp, departments } from '../data/people'
import { inr } from '../components/ui'

const kras = [
  ['Punctuality', 'Reports to duty within 5 minutes of scheduled working hours. Maintains consistent attendance.'],
  ['Patrol & Surveillance', 'Completes assigned patrol rounds and reports observations on time.'],
  ['Access Control & Incident Handling', 'Follows access procedures and handles incidents as per SOP.'],
  ['Reporting & Documentation', 'Keeps logs, registers and incident reports complete and accurate.'],
  ['Professional Conduct & Compliance', 'Follows company policies, dress code and code of conduct.'],
]

const editDel = actionsCol({ view: false })
const head = (title, add) => ({ title, actions: <><Btn icon={Filter}>Filter</Btn>{add && <Btn primary icon={Plus}>{add}</Btn>}</> })

export function KraKpi() {
  const combos = rowsOf(['dept', 'desig', 'emps', 'total'], [['Female Security', 'Security Warden', 'All', '100%'], ['Male Security', 'Security Officer', 'All', '100%'], ['All', 'Marketing Executive', 'All', '100%'], ['Front Office', 'Front Office Officer', 'All', '100%']])
  const rows = kras.map(([title, desc], i) => ({ id: i + 1, n: i + 1, title, desc, weight: '20%', dept: 'Male Security', desig: 'Security Officer', emps: 'All' }))
  return (
    <Page {...head('KRA KPIs', 'Add KRA KPI')}>
      <div className="mb-4 rounded-lg bg-base-100 p-3 shadow-sm">
        <div className="mb-2 text-[11px] font-bold uppercase text-base-content/60">Weightage by Combination</div>
        <table className="table table-sm text-xs"><thead><tr><th>Departments</th><th>Designations</th><th>Employees</th><th>Total Weight</th></tr></thead>
          <tbody>{combos.map((c) => <tr key={c.id}><td>{c.dept}</td><td>{c.desig}</td><td>{c.emps}</td><td><span className="rounded bg-emerald-50 px-2 py-0.5 font-semibold text-emerald-600">{c.total}</span></td></tr>)}</tbody></table>
      </div>
      <DataTable rows={rows} selectable={false} columns={[
        { key: 'n', label: '#', sortable: true }, { key: 'title', label: 'Title', sortable: true }, { key: 'desc', label: 'Description', render: (r) => <div className="max-w-80 text-xs">{r.desc}</div> },
        { key: 'weight', label: 'Weightage (%)' }, { key: 'dept', label: 'Departments' }, { key: 'desig', label: 'Designations' }, { key: 'emps', label: 'Employees' }, editDel,
      ]} />
    </Page>
  )
}

export function AppraisalPeriods() {
  return (
    <Page {...head('Appraisal Periods Set Up', 'Add Appraisal Periods')}>
      <DataTable selectable={false} rows={rowsOf(['n', 'name', 'start', 'end', 'self', 'mgr', 'hr', 'status'], [[2, 'Half Year 2026-27', '01-10-2026', '31-03-2027', '15-03-2027', '25-03-2027', '31-03-2027', 'Draft'], [1, 'Financial Year 2026', '01-06-2026', '30-06-2026', '01-06-2026', '30-06-2026', '30-06-2026', 'Active']])} columns={[
        { key: 'n', label: '#', sortable: true }, { key: 'name', label: 'Name', sortable: true }, { key: 'start', label: 'Start Date' }, { key: 'end', label: 'End Date' },
        { key: 'self', label: 'Self Review Deadline' }, { key: 'mgr', label: 'Manager Review Deadline' }, { key: 'hr', label: 'HR Review Deadline' },
        { key: 'status', label: 'Status', render: (r) => <Badge>{r.status}</Badge> }, editDel,
      ]} />
    </Page>
  )
}

export function ScoringModels() {
  const yes = <span className="rounded bg-emerald-50 px-2 py-0.5 text-xs text-emerald-600">Yes</span>
  return (
    <Page {...head('Scoring Models', 'Add Scoring Model')}>
      <DataTable selectable={false} rows={rowsOf(['n', 'name', 'type', 'rating', 'weight', 'def'], [[1, 'Rating', 'numeric', '📊 Numeric (%)', true, true], [2, 'Five Star', 'scale', '⭐ Star (1-5)', true, false]])} columns={[
        { key: 'n', label: '#' }, { key: 'name', label: 'Model Name', sortable: true }, { key: 'type', label: 'Scoring Type' }, { key: 'rating', label: 'Rating Type' },
        { key: 'weight', label: 'Allow Weight Config', render: (r) => (r.weight ? yes : 'No') }, { key: 'def', label: 'Set As Default', render: (r) => (r.def ? yes : 'No') }, editDel,
      ]} />
    </Page>
  )
}

export function IncrementRules() {
  const tick = <Check size={15} className="text-emerald-600" />
  return (
    <Page {...head('Increment Rules', 'Add Increment Rule')}>
      <DataTable selectable={false} rows={rowsOf(['n', 'name', 'range', 'date', 'hike', 'cap'], [[1, 'Increment', '20 - 40', '2026-06-01', 5, 'No Budget Gap'], [2, 'Increment2', '41 - 80', '2026-06-01', 10, 'No Budget Gap'], [3, 'Increment3', '81 - 100', '2026-06-01', 15, 'No Budget Gap']])} columns={[
        { key: 'n', label: '#' }, { key: 'name', label: 'Rule Name', sortable: true }, { key: 'range', label: 'Score Range', render: (r) => <span className="rounded bg-indigo-50 px-2 py-0.5 text-xs text-indigo-600">{r.range}</span> },
        { key: 'date', label: 'Effective Date' }, { key: 'hike', label: 'Hike %' }, { key: 'cap', label: 'Budget Cap' },
        { key: 'p', label: 'Promotion', render: () => tick }, { key: 'a', label: 'Approval', render: () => tick }, editDel,
      ]} />
    </Page>
  )
}

const Progress = ({ v }) => <div className="flex items-center gap-2"><progress className="progress progress-primary h-1.5 w-24" value={v} max={100} /><span className="text-xs">{v}%</span></div>

export function AppraisalCycles() {
  return (
    <Page {...head('Appraisal Cycles', 'Add Appraisal Cycle')}>
      <DataTable selectable={false} rows={rowsOf(['name', 'dur', 'status', 'done'], [['Half Year 2026-27', '01 Oct 2026 - 31 Mar 2027', 'In Progress', 15], ['Financial Year 2026', '01 Jun 2026 - 30 Jun 2026', 'Completed', 60]])} columns={[
        { key: 'name', label: 'Name' }, { key: 'dur', label: 'Duration' }, { key: 'status', label: 'Status', render: (r) => <Badge>{r.status}</Badge> },
        { key: 'done', label: 'Completion', render: (r) => <Progress v={r.done} /> }, { key: 'a', label: 'Actions', render: () => <span className="flex gap-3"><Eye size={15} /></span> },
      ]} />
    </Page>
  )
}

function ScoreForm({ who, role }) {
  const [scores, setScores] = useState(kras.map(() => 3))
  const total = Math.round((scores.reduce((a, s) => a + s, 0) / (kras.length * 5)) * 100)
  return (
    <div className="rounded-lg bg-base-100 shadow-sm">
      <div className="flex items-center justify-between border-b border-base-300 p-4">
        <Person e={who} badges={<span className="text-[11px] text-base-content/60">{who.designation} · Half Year 2026-27</span>} />
        <div className="text-right"><div className="text-[11px] text-base-content/60">{role} score</div><div className="text-2xl font-bold text-primary">{total}%</div></div>
      </div>
      <div className="divide-y divide-base-300">
        {kras.map(([t, d], i) => (
          <div key={t} className="grid gap-3 p-4 md:grid-cols-[2fr_1fr_2fr]">
            <div><div className="font-semibold">{t} <span className="text-[11px] font-normal text-base-content/50">(20%)</span></div><div className="text-[11px] text-base-content/60">{d}</div></div>
            <div className="flex items-center gap-1">{[1, 2, 3, 4, 5].map((n) => <Star key={n} size={18} onClick={() => setScores((s) => s.map((x, j) => (j === i ? n : x)))} className={`cursor-pointer ${n <= scores[i] ? 'fill-amber-400 text-amber-400' : 'text-base-300'}`} />)}</div>
            <textarea className="textarea textarea-sm h-14 w-full" placeholder={`${role} comments`} />
          </div>
        ))}
      </div>
      <div className="flex justify-end gap-2 border-t border-base-300 p-4"><Btn>Save Draft</Btn><Btn primary icon={Send}>Submit</Btn></div>
    </div>
  )
}

export const SelfAssessment = () => <Page title="Self Assessment"><ScoreForm who={emp(0)} role="Self" /></Page>

const reviewRows = employees.slice(0, 10).map((e, i) => ({ ...e, self: i % 4 ? 'Completed' : 'Pending', mgr: i % 3 ? 'Pending' : 'Completed', hr: i % 5 === 0 ? 'Completed' : 'Pending', score: i % 3 ? null : 60 + i * 3 }))

export function ManagerReview() {
  const [pick, setPick] = useState(null)
  return (
    <Page title="Manager Review" subtitle="Review the KRA/KPI scores of your reporting employees">
      {pick ? <><button className="btn btn-ghost btn-sm mb-2" onClick={() => setPick(null)}>← Back to list</button><ScoreForm who={pick} role="Manager" /></> : (
        <DataTable rows={reviewRows} selectable={false} columns={[
          { key: 'name', label: 'Employee', render: (e) => <Person e={e} badges={<span className="text-[11px] text-base-content/60">{e.code}</span>} /> },
          { key: 'department', label: 'Department' }, { key: 'self', label: 'Self Review', render: (r) => <Badge>{r.self}</Badge> },
          { key: 'mgr', label: 'Manager Review', render: (r) => <Badge>{r.mgr}</Badge> },
          { key: 'a', label: 'Action', render: (r) => <button className="btn btn-xs btn-primary" onClick={() => setPick(r)}>{r.mgr === 'Completed' ? 'View' : 'Review'}</button> },
        ]} />
      )}
    </Page>
  )
}

export function HrFinalization() {
  return (
    <Page title="HR Finalization" subtitle="Finalize scores and apply increment rules" actions={<Btn primary>Finalize Selected</Btn>}>
      <DataTable rows={reviewRows} columns={[
        { key: 'name', label: 'Employee', render: (e) => <Person e={e} badges={<span className="text-[11px] text-base-content/60">{e.code}</span>} /> },
        { key: 'department', label: 'Department' }, { key: 'mgr', label: 'Manager Review', render: (r) => <Badge>{r.mgr}</Badge> },
        { key: 'score', label: 'Final Score', render: (r) => (r.score ? `${r.score}%` : '-') },
        { key: 'rule', label: 'Increment Rule', render: (r) => (r.score ? (r.score > 80 ? 'Increment3' : 'Increment2') : '-') },
        { key: 'hr', label: 'HR Status', render: (r) => <Badge>{r.hr}</Badge> },
      ]} />
    </Page>
  )
}

export function AppraisalHistory() {
  const rows = kras.slice(0, 4).flatMap(([t], k) => [0, 7].map((i) => ({ ...emp(i), id: `${k}-${i}`, title: t, cycle: 'Financial Year 2026', score: 30 + ((k * 17 + i) % 60), done: '03 Jun, 2026' })))
  return (
    <Page {...head('Appraisal History')}>
      <DataTable rows={rows} selectable={false} columns={[
        { key: 'name', label: 'Employee', render: (e) => <Person e={e} badges={<span className="text-[11px] text-base-content/60">{e.code}</span>} /> },
        { key: 'title', label: 'Title', render: (r) => <div>{r.title}<div className="text-[10px] font-semibold text-indigo-600">20% WEIGHT</div></div> },
        { key: 'cycle', label: 'Appraisal Cycle', render: (r) => <div>{r.cycle}<div className="text-[11px] text-base-content/60">Jun 2026 - Jun 2026</div></div> },
        { key: 'score', label: 'Final Score' }, { key: 'done', label: 'Completion Date' },
      ]} />
    </Page>
  )
}

export function AppraisalTemplates() {
  return (
    <Page {...head('Appraisal Templates', 'Add Appraisal Template')}>
      <DataTable selectable={false} rows={[{ id: 1, name: 'Appraisal Template 2026', comments: 'Yes' }, { id: 2, name: 'Office Staff Template', comments: 'No' }]} columns={[
        { key: 'name', label: 'Name' },
        { key: 'k', label: 'KRA/KPIs', render: () => <div className="flex max-w-xl flex-wrap gap-1">{kras.map(([t]) => <span key={t} className="rounded bg-base-200 px-2 py-0.5 text-[11px]">{t} <b>(20%)</b></span>)}</div> },
        { key: 'comments', label: 'Comments' }, editDel,
      ]} />
    </Page>
  )
}

const revisions = employees.slice(0, 8).map((e, i) => { const old = 20000 + (i % 6) * 4000; const hike = [5, 10, 15][i % 3]; return { ...e, old, hike, revised: Math.round(old * (1 + hike / 100)), eff: '01-07-2026', status: i % 4 ? 'Approved' : 'Pending' } })

export function SalaryRevisions() {
  return (
    <Page title="Salary Revisions" actions={<><Btn icon={Filter}>Filter</Btn><Btn icon={Download}>Download</Btn></>}>
      <DataTable rows={revisions} columns={[
        { key: 'name', label: 'Employee', render: (e) => <Person e={e} badges={<span className="text-[11px] text-base-content/60">{e.code}</span>} /> },
        { key: 'old', label: 'Current Salary', render: (r) => inr(r.old) }, { key: 'hike', label: 'Hike %' }, { key: 'revised', label: 'Revised Salary', render: (r) => inr(r.revised) },
        { key: 'eff', label: 'Effective Date' }, { key: 'status', label: 'Status', render: (r) => <Badge>{r.status}</Badge> },
      ]} />
    </Page>
  )
}

export function IncrementLetters() {
  return (
    <Page title="Increment Letters" actions={<Btn primary icon={Send}>Generate Selected</Btn>}>
      <DataTable rows={revisions.filter((r) => r.status === 'Approved')} columns={[
        { key: 'name', label: 'Employee', render: (e) => <Person e={e} badges={<span className="text-[11px] text-base-content/60">{e.code}</span>} /> },
        { key: 'hike', label: 'Hike %' }, { key: 'revised', label: 'Revised Salary', render: (r) => inr(r.revised) }, { key: 'eff', label: 'Effective Date' },
        { key: 'l', label: 'Letter', render: (r) => (r.id % 2 ? <Badge>Published</Badge> : <Badge>Draft</Badge>) }, actionsCol({ edit: false, del: false }),
      ]} />
    </Page>
  )
}

export function KraDistribution() {
  const rows = kras.flatMap(([t], k) => [0, 4].map((i) => ({ ...emp(i), id: `${k}-${i}`, kra: t, weight: '20%', score: `${40 + ((k * 13 + i * 5) % 55)}%`, rating: 'Meets Expectations', reviewer: 'Manager', comments: 'Good progress' })))
  return (
    <Page title="KRA/KPI-wise Performance Distribution" actions={<Btn icon={Filter}>Filter</Btn>}>
      <DataTable rows={rows} selectable={false} columns={[
        { key: 'kra', label: 'KRA/KPI Name' }, { key: 'name', label: 'Employee Name' }, { key: 'department', label: 'Department' }, { key: 'weight', label: 'Assigned Weight %' },
        { key: 'score', label: 'Score Given' }, { key: 'rating', label: 'Rating' }, { key: 'reviewer', label: 'Reviewer' }, { key: 'comments', label: 'Comments' },
      ]} />
    </Page>
  )
}

export function AppraisalTracker() {
  return (
    <Page title="Appraisal Completion Tracker">
      <div className="mb-3 flex flex-wrap gap-2">
        {[['All Cycles', 'Financial Year 2026'], ['All Departments', ...departments], ['All Roles', 'Manager', 'Employee']].map(([first, ...rest]) => (
          <select key={first} className="select select-sm w-48 text-xs"><option>{first}</option>{rest.map((o) => <option key={o}>{o}</option>)}</select>
        ))}
      </div>
      <DataTable rows={reviewRows} selectable={false} columns={[
        { key: 'name', label: 'Employee Name' }, { key: 'code', label: 'Employee ID' }, { key: 'department', label: 'Department' }, { key: 'designation', label: 'Role' },
        { key: 'cycle', label: 'Appraisal Cycle', render: () => 'Financial Year 2026' }, { key: 'self', label: 'Self Review', render: (r) => <Badge>{r.self}</Badge> },
        { key: 'mgr', label: 'Manager Review', render: (r) => <Badge>{r.mgr}</Badge> }, { key: 'hr', label: 'HR Finalization', render: (r) => <Badge>{r.hr}</Badge> },
        { key: 'o', label: 'Overall Status', render: (r) => <Badge>{r.hr === 'Completed' ? 'Completed' : 'In Progress'}</Badge> }, { key: 'd', label: 'Last Action Date', render: () => '03-06-2026' },
      ]} />
    </Page>
  )
}

export function PerformanceSummary() {
  const rows = departments.map((d, i) => ({ id: i + 1, d, n: 2 + (i % 5), avg: (55 + i * 3).toFixed(1), rating: ['Meets', 'Exceeds', 'Meets', 'Outstanding'][i % 4], high: i % 3, low: i % 2, done: 40 + (i * 7) % 60 }))
  return (
    <Page title="Performance Summary by Department" subtitle="Overview of performance metrics across different departments" actions={<Btn icon={Filter}>Filter</Btn>}>
      <DataTable rows={rows} selectable={false} columns={[
        { key: 'd', label: 'Department' }, { key: 'n', label: 'No. of Employees' }, { key: 'avg', label: 'Avg. Final Score' }, { key: 'rating', label: 'Avg. Rating' },
        { key: 'high', label: 'High Performers (90%+)' }, { key: 'low', label: 'Low Performers (<60%)' },
        { key: 'dist', label: 'Score Range Distribution', render: (r) => <div className="flex gap-1 text-[9px]">{[['OUT', r.high * 10], ['EXC', 20], ['MEE', 60 - r.high * 10], ['LOW', r.low * 20]].map(([k, v]) => <span key={k} className="rounded bg-base-200 px-1">{k}: {v}%</span>)}</div> },
        { key: 'done', label: 'Completion Rate (%)', render: (r) => <Progress v={r.done} /> },
      ]} />
    </Page>
  )
}
