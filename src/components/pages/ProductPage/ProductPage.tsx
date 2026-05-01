import cn from 'classnames'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ContactForm } from '@/components/ui/ContactForm/ContactForm'
import { ProductCard } from '@/components/ui/ProductCard/ProductCard'
import { ProductGallery } from '@/components/ui/ProductGallery/ProductGallery'
import { QuantityCounter } from '@/components/ui/QuantityCounter/QuantityCounter'
import { getProductBySlug, PRODUCTS } from '@/lib/products'
import styles from './ProductPage.module.sass'

export function ProductPage({ slug }: { slug: string }) {
  const product = getProductBySlug(slug)

  if (!product) notFound()

  const related = PRODUCTS.filter(p => p.slug !== slug).slice(0, 3)

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
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <p className={styles.weight}>Вес: {product.weight}</p>
          <p className={styles.price}>{product.price}</p>
          <div className={styles.addToCart}>
            <QuantityCounter value={1} />
            <button className={cn('btn', 'btn-outline', styles.addBtn)}>Добавить в корзину</button>
          </div>
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

      <ContactForm title="Не нашли что искали?" subtitle="Ответим на любые вопросы и поможем подобрать чай" />

    </div>
  )
}
