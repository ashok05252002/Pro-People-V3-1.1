import { useState } from 'react'
import { CircleCheck, Download, Upload } from 'lucide-react'
import { Page, Btn } from '../../components/table'

const groups = {
  Work: ['Employee Group', 'Employee Code *', 'Department *', 'Designation *', 'Category *', 'Vendor', 'Role', 'Employment Type',
    'Nationality *', 'Ministry', 'Official Email', 'Date of Joining *', 'End of Probation *', 'Wages', 'Location *', 'Grade',
    'Device Group *', 'ESIC Number', 'PF Number', 'UAN Number'],
  Status: ['Inactive From Date'],
  Organization: ['Contract Type'],
  Team: ['Reporting Manager *'],
  Personal: ['First Name *', 'Last Name', 'Father Name', 'Gender *', 'Date of Birth', 'Blood Group', 'Religion *', 'Personal Email',
    'Contact Number', 'Alternate Contact Number', 'Emergency Contact Number', 'Emergency Contact Relation', 'Permanent Address',
    'Current Address', 'City of Residence', 'Aadhar Number', 'Marital Status *', 'Number of Children', 'Family Members'],
  Bank: ['Bank Name', 'Bank Account Number', 'Branch', 'IFSC Code'],
  Attendance: ['Punch Type', 'Default Shift *', 'Default Week Off', 'Late Applicable', 'Auto Shift', 'Overtime Applicable',
    'Overtime Types', 'Comp Off Applicable', 'Comp Off Types', 'Work Span'],
}
const all = Object.values(groups).flat()

export default function BluePrint() {
  const [sel, setSel] = useState(new Set(['Employee Code *']))
  const toggle = (f) => f !== 'Employee Code *' && setSel((s) => { const n = new Set(s); n.has(f) ? n.delete(f) : n.add(f); return n })
  const setMany = (fields, on) => setSel((s) => { const n = new Set(s); fields.forEach((f) => (on ? n.add(f) : f !== 'Employee Code *' && n.delete(f))); return n })

  return (
    <Page title="Employee Blue Print">
      <div className="rounded-lg bg-base-100 p-3 shadow-sm">
        <div className="mb-3 flex items-center justify-between">
          <Btn icon={CircleCheck} onClick={() => setMany(all, sel.size < all.length)}>Select All</Btn>
          <div className="flex gap-2"><Btn icon={Download}>Download</Btn><Btn icon={Download}>Template</Btn><Btn icon={Upload}>Import</Btn></div>
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          {Object.entries(groups).map(([g, fields]) => {
            const allOn = fields.every((f) => sel.has(f))
            return (
              <div key={g} className="rounded-lg border border-base-300">
                <div className="flex items-center justify-between border-b border-base-300 px-3 py-3 text-xs font-semibold">
                  {g}
                  <label className="flex items-center gap-2">Select All<input type="checkbox" className="checkbox checkbox-sm" checked={allOn} onChange={() => setMany(fields, !allOn)} /></label>
                </div>
                <ul className="space-y-2.5 p-3 text-xs">
                  {fields.map((f) => (
                    <li key={f}>
                      <label className="flex cursor-pointer items-center gap-2.5">
                        <input type="checkbox" className="checkbox checkbox-sm checkbox-primary" checked={sel.has(f)} disabled={f === 'Employee Code *'} onChange={() => toggle(f)} />{f}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </div>
    </Page>
  )
}
