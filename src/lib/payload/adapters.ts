import type { Product } from '@/lib/products'

export function adaptProduct(doc: any): Product {
  return {
    slug: doc.slug ?? '',
    name: doc.name ?? '',
    sub: doc.sub ?? '',
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
    description: doc.description ?? '',
  }
}
