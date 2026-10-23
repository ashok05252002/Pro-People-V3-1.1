import { Upload, Download, FileText, Archive } from 'lucide-react'
import { Page } from '../../components/table'

const sections = [
  ['Employee', ['Employment Details', 'Team Details', 'Personal Details', 'Portal Access Details', 'KYC Details', 'Offboard Details']],
  ['Attendance', ['Attendance Policy', 'Weekoff Details', 'Shift Details', 'Geolocations Details']],
  ['Dynamic Payroll', [['Loan Details', false]]],
  ['Payroll', ['Bank Details', 'Identity Statutory Details', 'Payroll Components', 'Monthly Approved Overtime', 'Payroll Details']],
]

const SmallBtn = ({ icon: Icon, children }) => (
  <button className="btn btn-sm h-8 gap-1.5 border-base-300 bg-base-100 px-3 text-xs font-normal shadow-sm"><Icon size={14} />{children}</button>
)

export default function BulkUpload() {
  return (
    <Page title="Bulk Upload">
      <div className="flex flex-col gap-5">
        {sections.map(([title, items]) => (
          <section key={title} className="rounded-lg bg-base-100 p-4 shadow-sm">
            <h2 className="mb-4 text-base font-semibold">{title}</h2>
            <div className="grid gap-3 md:grid-cols-2">
              {items.map((it) => {
                const [name, template] = Array.isArray(it) ? it : [it, true]
                return (
                  <div key={name} className="rounded-lg border border-base-300 p-4">
                    <h3 className="border-b border-base-300 pb-3 text-[15px] font-semibold">{name}</h3>
                    <div className="mt-3 flex gap-2">
                      <SmallBtn icon={Upload}>Import</SmallBtn>
                      <SmallBtn icon={Download}>Download</SmallBtn>
                      {template && <SmallBtn icon={FileText}>Template</SmallBtn>}
                    </div>
                  </div>
                )
              })}
              {title === 'Employee' && (
                <div className="rounded-lg border border-base-300 p-4">
                  <h3 className="border-b border-base-300 pb-3 text-[15px] font-semibold">KYC Bulk Documents</h3>
                  <div className="mt-3 flex justify-center"><SmallBtn icon={Archive}>Bulk ZIP Upload</SmallBtn></div>
                </div>
              )}
            </div>
          </section>
        ))}
      </div>
    </Page>
  )
}
