import type { Product } from '@/lib/products'
import { mobileField } from '@/lib/mobileField'

export function adaptProduct(doc: any, isMobile = false): Product {
  return {
    slug: doc.slug ?? '',
    name: mobileField(isMobile, doc.nameMobile, doc.name ?? ''),
    sub: mobileField(isMobile, doc.subMobile, doc.sub ?? ''),
    price: `${doc.price ?? 0} ₽`,
    weight: doc.weight ?? '',
    category:
      typeof doc.category === 'object' && doc.category ? (doc.category.name ?? '') : '',
    featured: doc.featured ?? false,
    images: (doc.images ?? [])
      .map((item: any) => {
        const img = item.image
        return typeof img === 'object' && img ? (img.url ?? '') : ''
      })
      .filter(Boolean),
    description: mobileField(isMobile, doc.descriptionMobile, doc.description ?? ''),
  }
}
