import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ContactForm } from '@/components/ui/ContactForm/ContactForm'
import { ProductCard } from '@/components/ui/ProductCard/ProductCard'
import { ProductGallery } from '@/components/ui/ProductGallery/ProductGallery'
import { AddToCartButton } from '@/components/ui/AddToCartButton/AddToCartButton'
import { getProductBySlug, getAllProducts } from '@/lib/payload/products'
import { getSiteData } from '@/lib/payload/globals'
import { isMobileRequest } from '@/lib/device'
import styles from './ProductPage.module.sass'

export async function ProductPage({ slug }: { slug: string }) {
  const isMobile = await isMobileRequest()
  const [product, allProducts, siteData] = await Promise.all([
    getProductBySlug(slug, isMobile),
    getAllProducts(isMobile),
    getSiteData(),
  ])

  if (!product) notFound()

  const related = allProducts
    .filter(p => p.slug !== slug)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3)

  return (
    <div className={styles.page}>

      <nav className={styles.breadcrumbs}>
        <Link href="/">Главная</Link>
        <span className={styles.breadcrumbSep}>/</span>
        <Link href="/catalog">Каталог</Link>
        <span className={styles.breadcrumbSep}>/</span>
        <span>{product.name}</span>
      </nav>

      <div className={styles.product}>
        <ProductGallery images={product.images} alt={product.name} />
        <div className={styles.info}>
          <div  className={styles.title}>{product.name}</div>
          <div className={styles.description}>{product.description}</div>
          <p className={styles.weight}>Вес: {product.weight}</p>
          <p className={styles.price}>{product.price}</p>
          <AddToCartButton product={product} />
        </div>
      </div>

      <div className={styles.divider} />

      <section className={styles.related}>
        <h2>Смотрите также</h2>
        <div className={styles.relatedGrid}>
          {related.map(p => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>

      <div className={styles.divider} />

      <ContactForm title="Не нашли что искали?" subtitle="Ответим на любые вопросы и поможем подобрать чай" contacts={"full"} contactData={siteData}/>

    </div>
  )
}
