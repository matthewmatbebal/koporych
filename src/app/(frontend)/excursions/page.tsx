import { notFound } from 'next/navigation'
import { ExcursionsPage } from '@/components/pages/ExcursionsPage/ExcursionsPage'
import { getExcursionsPage } from '@/lib/payload/globals'

export default async function Page() {
  const data = await getExcursionsPage()
  if (!data.enabled) notFound()
  return <ExcursionsPage data={data} />
}
