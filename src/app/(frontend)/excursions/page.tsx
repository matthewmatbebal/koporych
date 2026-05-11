import { notFound } from 'next/navigation'
import { ExcursionsPage } from '@/components/pages/ExcursionsPage/ExcursionsPage'
import { getExcursionsPage } from '@/lib/payload/globals'
import { isMobileRequest } from '@/lib/device'

export default async function Page() {
  const isMobile = await isMobileRequest()
  const data = await getExcursionsPage(isMobile)
  if (!data.enabled) notFound()
  return <ExcursionsPage data={data} />
}
