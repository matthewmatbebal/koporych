import { HOME_PAGE } from '@/lib/mock/home'
import { getPayloadClient } from './client'

export async function getCategoryImages(): Promise<Record<string, string>> {
  try {
    const payload = await getPayloadClient()
    const result = await payload.find({ collection: 'categories', limit: 50, depth: 1 })
    if (result.docs.length === 0) return HOME_PAGE.featured.categoryImages
    return Object.fromEntries(
      result.docs.map((cat: any) => {
        const img = cat.image
        const url = typeof img === 'object' && img ? (img.url ?? '') : ''
        return [cat.name, url]
      })
    )
  } catch {
    return HOME_PAGE.featured.categoryImages
  }
}
