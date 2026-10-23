// Documents (setup, bulk import) and Letters (templates, issued letters).
import { useState } from 'react'
import { FileText, Plus, Lightbulb, Sheet, Archive, CloudUpload, User, Search, Eye, Download } from 'lucide-react'
import { Page, Btn, ListScreen, SearchBox, DataTable, Badge, Person, rowsOf, statusCol, actionsCol } from '../../components/table'
import { emp, employees } from '../../data/people'

export function DocumentSetup() {
  return (
    <ListScreen title="Document Categories"
      actions={<><Btn icon={FileText} className="border-base-content">Document Types</Btn><Btn primary icon={Plus}>Add Category</Btn></>}
      columns={[
        { key: 'name', label: 'Name', sortable: true }, { key: 'code', label: 'Code', sortable: true },
        { key: 'order', label: 'Order', sortable: true }, statusCol, { key: 'description', label: 'Description', sortable: true }, actionsCol(),
      ]}
      rows={rowsOf(['name', 'code', 'order', 'status', 'description'], [
        ['Medical Documents', 'medical-documents', 1, 'Active', 'Medical certificates and fitness reports'],
        ['Identity Documents', 'identity-documents', 2, 'Active', 'ID cards, passport, visa'],
        ['Education', 'education', 3, 'Active', 'Degree and course certificates'],
        ['Employment', 'employment', 4, 'Active', 'Offer letters, contracts, relieving letters'],
        ['Financial', 'financial', 5, 'Inactive', 'Bank and tax documents'],
      ])} />
  )
}

export function DocumentImport() {
  const [mode, setMode] = useState('Excel')
  const steps = [
    ['1', 'Excel + ZIP', 'Upload an Excel file with metadata and a ZIP containing named document files.', 'bg-indigo-50 text-indigo-600'],
    ['2', 'ZIP Only', 'Upload a ZIP archive with files named by Employee Code (e.g. EMP-001.pdf).', 'bg-pink-50 text-pink-600'],
    ['✓', 'Auto-Mapped', 'The system validates, extracts Employee Codes and maps documents automatically.', 'bg-emerald-50 text-emerald-600'],
  ]
  return (
    <Page title="Bulk Upload Documents">
      <div className="space-y-3 rounded-lg bg-base-100 p-3 shadow-sm">
        <div className="rounded-lg border border-base-300 p-4">
          <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase"><Lightbulb size={14} />How it works</div>
          <div className="grid gap-3 md:grid-cols-3">
            {steps.map(([n, t, d, c]) => (
              <div key={t} className="flex gap-3 rounded-lg bg-base-200/60 p-3">
                <span className={`grid size-7 shrink-0 place-items-center rounded-md text-xs font-bold ${c}`}>{n}</span>
                <div><div className="text-[13px] font-semibold">{t}</div><div className="text-[11px] text-base-content/60">{d}</div></div>
              </div>
            ))}
          </div>
        </div>
        <div className="grid gap-3 md:grid-cols-[1fr_1.6fr]">
          <div className="space-y-4 rounded-lg border border-base-300 p-4">
            <div className="text-[10px] font-semibold uppercase text-base-content/60">Import Mode</div>
            <div className="grid grid-cols-2 gap-3">
              {[['Excel', 'Metadata + Files', Sheet], ['ZIP', 'Files Only', Archive]].map(([m, s, I]) => (
                <button key={m} onClick={() => setMode(m)} className={`flex flex-col items-center gap-1 rounded-lg border py-5 text-xs ${mode === m ? 'border-base-content/40 bg-base-200 shadow' : 'border-base-300 bg-base-200/40'}`}>
                  <I size={16} /><b>{m}</b><span className="text-[10px] text-base-content/50">{s}</span>
                </button>
              ))}
            </div>
            <label className="block text-xs font-semibold">Document Type
              <select className="select select-sm mt-1.5 w-full font-normal"><option>Select Document Type</option><option>Medical Documents</option><option>Identity Documents</option></select>
            </label>
            {mode === 'Excel' && (
              <div className="rounded-lg border border-dashed border-base-300 p-4 text-xs">
                <div className="mb-2 font-semibold">Excel Metadata File</div>
                <input type="file" className="file-input file-input-sm w-full" />
                <div className="mt-2 text-[10px] text-base-content/60">Column 1: Employee Code, then dynamic fields + expiry</div>
              </div>
            )}
            <div className="rounded-lg border border-dashed border-base-300 p-4 text-xs">
              <div className="mb-2 font-semibold">ZIP Archive</div>
              <input type="file" className="file-input file-input-sm w-full" />
            </div>
            <Btn primary className="w-full">Run Importer</Btn>
          </div>
          <div className="grid place-items-center rounded-lg border border-base-300 p-10 text-center">
            <div>
              <span className="mx-auto grid size-14 place-items-center rounded-full bg-base-200"><CloudUpload className="text-base-content/40" /></span>
              <div className="mt-3 text-[13px] font-semibold text-base-content/60">No import running</div>
              <p className="mt-1 max-w-60 text-[11px] text-base-content/50">Configure the settings on the left and click "Run Importer" to begin.</p>
            </div>
          </div>
        </div>
      </div>
    </Page>
  )
}

const templates = ['Offer Letter', 'Experience Certificate', 'Salary Certificate', 'Relieving Letter', 'Warning Letter']

export function LetterTemplates() {
  const [t, setT] = useState(templates[0])
  const [q, setQ] = useState('')
  const [who, setWho] = useState(0)
  const e = employees[who]
  return (
    <Page title="Templates" actions={<Btn primary>Add Template</Btn>}>
      <div className="grid gap-3 md:grid-cols-[1fr_2fr]">
        <div className="rounded-lg bg-base-100 p-4 shadow-sm">
          <div className="mb-4 flex items-center justify-between gap-2">
            <h2 className="text-base font-bold">Templates</h2>
            <SearchBox value={q} onChange={setQ} placeholder="Search templates..." className="h-8 w-44" />
          </div>
          <ul className="space-y-1">
            {templates.filter((x) => x.toLowerCase().includes(q.toLowerCase())).map((x) => (
              <li key={x}><button onClick={() => setT(x)} className={`flex w-full items-center gap-2 rounded-md px-3 py-2.5 text-left text-[13px] ${t === x ? 'bg-primary/10 font-semibold text-primary' : 'hover:bg-base-200'}`}><FileText size={14} />{x}</button></li>
            ))}
          </ul>
        </div>
        <div className="rounded-lg bg-base-100 p-4 shadow-sm">
          <h2 className="mb-4 text-base font-bold">Generation and Preview</h2>
          <label className="text-xs font-semibold">Select Employee</label>
          <label className="mb-3 mt-1.5 flex items-center gap-2 rounded-md border border-base-300 px-3">
            <User size={14} className="opacity-50" />
            <select className="h-10 flex-1 bg-transparent text-[13px] outline-none" value={who} onChange={(ev) => setWho(+ev.target.value)}>
              {employees.slice(0, 15).map((x, i) => <option key={x.id} value={i}>{x.name} ({x.code})</option>)}
            </select>
          </label>
          <div className="min-h-96 rounded-lg border-2 border-dashed border-base-300 bg-base-200/40 p-8 text-[13px] leading-relaxed">
            <div className="mx-auto max-w-xl bg-base-100 p-8 shadow-sm">
              <div className="mb-6 flex justify-between"><b className="text-lg">IndiGo</b><span className="text-xs text-base-content/60">23 Oct 2026</span></div>
              <h3 className="mb-4 text-center font-bold uppercase underline">{t}</h3>
              <p>This is to certify that <b>{e.name}</b> (Employee Code: {e.code}) is employed with IndiGo as <b>{e.designation}</b> in the {e.department} department since {e.joined}.</p>
              <p className="mt-3">This letter is issued on the request of the employee for whatever purpose it may serve.</p>
              <div className="mt-10">For IndiGo,<br /><br /><b>HR Manager</b></div>
            </div>
          </div>
          <div className="mt-3 flex justify-end gap-2"><Btn icon={Eye}>Preview</Btn><Btn primary icon={Download}>Generate</Btn></div>
        </div>
      </div>
    </Page>
  )
}

const letters = [0, 3, 7, 11, 18, 22].map((i, n) => ({
  id: n + 1, ...emp(i), letter: templates[n % templates.length], issued: `${20 - n * 2}-10-2026`,
  status: n === 2 ? 'Draft' : 'Published', content: n % 2 ? 'PDF' : 'Word',
}))

export function Letters() {
  const [q, setQ] = useState('')
  return (
    <Page title="Employee Letters">
      <div className="rounded-lg bg-base-100 shadow-sm">
        <div className="flex gap-2 p-3">
          <SearchBox value={q} onChange={setQ} placeholder="Search by employee name or code..." className="flex-1" />
          <select className="select w-32 text-xs font-semibold"><option>All Status</option><option>Published</option><option>Draft</option></select>
          <select className="select w-32 text-xs font-semibold"><option>All Context</option><option>PDF</option><option>Word</option></select>
        </div>
        <DataTable rows={letters} query={q} searchKeys={['name', 'code']} selectable={false} columns={[
          { key: 'name', label: 'Employee', render: (e) => <Person e={e} badges={<span className="text-[11px] text-base-content/60">{e.code}</span>} /> },
          { key: 'letter', label: 'Letter' }, { key: 'content', label: 'Format' }, { key: 'issued', label: 'Issued On' },
          { key: 'status', label: 'Status', render: (r) => <Badge>{r.status}</Badge> }, actionsCol({ edit: false }),
        ]} />
      </div>
    </Page>
  )
}
