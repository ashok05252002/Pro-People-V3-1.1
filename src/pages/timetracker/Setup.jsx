// Biometric devices screen.
import { useState } from 'react'
import { Download, Filter } from 'lucide-react'
import { Page, Btn, SearchBox, DataTable, rowsOf, actionsCol } from '../../components/table'
import { AddModal, useOpen } from '../../components/forms'
import { useRows, val } from '../../data/store'

const brands = ['ZKTECO', 'ESSL', 'HIKVISION', 'SUPREMA']
const punchType = { label: 'Punch Type', type: 'radio', options: ['COMBINED', 'IN', 'OUT'] }

const editDel = (remove) => actionsCol({ view: false, onDelete: (r) => remove(r.id) })

function SearchRow({ placeholder, hint, children }) {
  const [q, setQ] = useState('')
  return { q, bar: (
    <div className="mb-2">
      <div className="flex flex-wrap gap-2">
        <SearchBox value={q} onChange={setQ} placeholder={placeholder} className="flex-1" />
        {children}
      </div>
      {hint && <div className="mt-1 text-[10px] text-base-content/60">{hint}</div>}
    </div>
  ) }
}

export function BiometricDevices() {
  const [open, show, hide] = useOpen()
  const [rows, addRow, , remove] = useRows('devices', () => rowsOf(['n', 'name', 'serial', 'punch', 'brand', 'zone'], [
    [1, 'Basement', 'DEMO520496016', 'COMBINED', 'ZKTECO', '—'],
    [2, 'Main Gate', 'DEMO520496017', 'IN', 'ZKTECO', 'Reception'],
    [3, 'Block B Exit', 'DEMO520496018', 'OUT', 'ESSL', 'Warehouse'],
    [4, 'Server Room', 'DEMO520496019', 'COMBINED', 'HIKVISION', 'Server Room'],
  ]))
  const { q, bar } = SearchRow({ placeholder: 'Search by Device Name', hint: 'Search by Device Name or Device Code or Brand Name', children: <><Btn primary icon={Filter}>Filter</Btn><Btn icon={Download}>Download</Btn></> })
  return (
    <Page title="Biometric Devices" actions={<Btn primary onClick={show}>Add Device</Btn>}>
      <AddModal open={open} onClose={hide} title="Add Device" fields={[
        { label: 'Name' }, { label: 'Device Code' }, { label: 'Brand Name', type: 'select', placeholder: 'Select Brand Name', options: brands }, punchType,
      ]} onSave={(v) => addRow({ n: Math.max(0, ...rows.map((r) => r.n)) + 1, name: val(v.Name), serial: val(v['Device Code']), punch: val(v['Punch Type']), brand: val(v['Brand Name']), zone: '—' })} />
      {bar}
      <DataTable rows={rows} query={q} searchKeys={['name', 'serial', 'brand']} selectable={false} columns={[
        { key: 'n', label: 'ID' }, { key: 'name', label: 'Name' }, { key: 'serial', label: 'Serial No' }, { key: 'punch', label: 'Punch Type' },
        { key: 'brand', label: 'Brand Name' }, { key: 'zone', label: 'Mapped Zone' }, editDel(remove),
      ]} />
    </Page>
  )
}
