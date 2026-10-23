import { Construction } from 'lucide-react'
import { PageHeader, Card, Empty } from '../components/ui'

// Shown for routes whose screen has not been rebuilt yet.
export default function Placeholder({ route }) {
  return (
    <>
      <PageHeader title={route.label} subtitle={route.trail.join(' / ')} />
      <Card><Empty icon={Construction} text="Screen not rebuilt yet." /></Card>
    </>
  )
}
