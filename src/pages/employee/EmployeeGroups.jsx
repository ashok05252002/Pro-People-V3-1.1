import { UserPlus, Eye, Pencil, Trash2 } from 'lucide-react'
import { Page, Btn } from '../../components/table'

const groups = [
  { name: 'Head Office Staff', prefix: 'HOS', employees: 34 },
  { name: 'Branch Team', prefix: 'BRT', employees: 15 },
]

export default function EmployeeGroups() {
  return (
    <Page title="Employee Groups" actions={<Btn primary icon={UserPlus}>Add New</Btn>}>
      <div className="grid gap-3 rounded-lg bg-base-100 p-3 shadow-sm md:grid-cols-2">
        {groups.map((g) => (
          <div key={g.name} className="rounded-lg border border-base-300 bg-base-100 p-4 shadow-sm">
            <div className="flex items-start justify-between border-b border-base-300 pb-3">
              <div>
                <h3 className="text-base font-bold">{g.name}</h3>
                <span className="mt-1 inline-block rounded bg-emerald-500 px-2 py-0.5 text-[10px] text-white">Active</span>
              </div>
              <span className="flex gap-3"><Eye size={16} /><Pencil size={16} /><Trash2 size={16} /></span>
            </div>
            <div className="mt-3 space-y-2 text-xs">
              <div className="flex justify-between"><span>Prefix:</span><code className="rounded bg-base-200 px-1.5">{g.prefix}</code></div>
              <div className="flex justify-between"><span>Employees:</span><span>{g.employees}</span></div>
            </div>
          </div>
        ))}
      </div>
    </Page>
  )
}
