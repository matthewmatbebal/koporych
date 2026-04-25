import cn from 'classnames'
import Link from 'next/link'
import { ContactForm } from '@/components/ui/ContactForm/ContactForm'
import { ProductGallery } from '@/components/ui/ProductGallery/ProductGallery'
import { QuantityCounter } from '@/components/ui/QuantityCounter/QuantityCounter'
import { GALLERY_IMAGES } from '@/lib/products'
import styles from './page.module.sass'

interface ProductPageProps {
  params: Promise<{ slug: string }>
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug: _slug } = await params
  return (
    <div className={styles.page}>

      <nav className={styles.breadcrumbs}>
        <Link href="/">Главная</Link>
        <span className={styles.breadcrumbSep}>/</span>
        <Link href="/catalog">Каталог</Link>
        <span className={styles.breadcrumbSep}>/</span>
        <span>Иван-чай классический</span>
      </nav>

      <div className={styles.product}>
        <ProductGallery images={GALLERY_IMAGES} alt="Иван-чай классический" />
        <div className={styles.info}>
          <h1>Иван-чай классический</h1>
          <p>Рассыпной иван-чай ручного сбора из Ленинградской области. Ферментирован по традиционному рецепту. Насыщенный вкус с цветочными нотками, бодрящий аромат. Без кофеина, богат витаминами C и B.</p>
          <p className={styles.weight}>Вес: 100 г</p>
          <p className={styles.price}>450 ₽</p>
          <div className={styles.addToCart}>
            <QuantityCounter value={1} />
            <button className={cn('btn', 'btn-outline', styles.addBtn)}>Добавить в корзину</button>
          </div>
        </div>
      </div>

      <div className={styles.divider} />

      <div className={styles.formTitle}>
        <h2>Не нашли что искали?</h2>
        <p>Ответим на любые вопросы и поможем подобрать чай</p>
      </div>
      <ContactForm />

    </div>
  )
}
