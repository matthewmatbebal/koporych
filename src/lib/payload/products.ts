import { PRODUCTS, getProductBySlug as getMockProductBySlug } from '@/lib/products'
import type { Product } from '@/lib/products'
import { getPayloadClient } from './client'
import { adaptProduct } from './adapters'

export async function getAllProducts(isMobile = false): Promise<Product[]> {
  try {
    const payload = await getPayloadClient()
    const result = await payload.find({ collection: 'products', limit: 100, depth: 2 })
    if (result.docs.length === 0) return PRODUCTS
    return result.docs.map(doc => adaptProduct(doc, isMobile))
  } catch {
    return PRODUCTS
  }
}

export async function getFeaturedProducts(isMobile = false): Promise<Product[]> {
  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'products',
      where: { featured: { equals: true } },
      limit: 10,
      depth: 2,
    })
    if (result.docs.length === 0) return PRODUCTS.filter(p => p.featured)
    return result.docs.map(doc => adaptProduct(doc, isMobile))
  } catch {
    return PRODUCTS.filter(p => p.featured)
  }
}

export async function getProductBySlug(slug: string, isMobile = false): Promise<Product | null> {
  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'products',
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 2,
    })
    if (result.docs.length === 0) return getMockProductBySlug(slug) ?? null
    return adaptProduct(result.docs[0], isMobile)
  } catch {
    return getMockProductBySlug(slug) ?? null
  }
}
