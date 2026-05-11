import { CartPage } from '@/components/pages/CartPage/CartPage'
import { getSiteData } from '@/lib/payload/globals'

export default async function Page() {
  const siteData = await getSiteData()
  return <CartPage contactData={siteData} />
}
