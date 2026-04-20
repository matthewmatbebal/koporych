import cn from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import { ContactForm } from '@/components/ui/ContactForm/ContactForm'
import { GALLERY_IMAGES } from '@/lib/products'
import styles from './page.module.sass'

interface ProductPageProps {
  params: Promise<{ slug: string }>
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug: _slug } = await params
  const [main, ...thumbs] = GALLERY_IMAGES
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
        <div className={styles.gallery}>
          <div className={styles.mainPhoto}>
            <Image src={main!} alt="Иван-чай классический" fill style={{ objectFit: 'cover' }} />
          </div>
          <div className={styles.thumbs}>
            {thumbs.map(src => (
              <div key={src} className={styles.thumb}>
                <Image src={src} alt="" fill style={{ objectFit: 'cover' }} />
              </div>
            ))}
          </div>
        </div>
        <div className={styles.info}>
          <h1>Иван-чай классический</h1>
          <p>Рассыпной иван-чай ручного сбора из Ленинградской области. Ферментирован по традиционному рецепту. Насыщенный вкус с цветочными нотками, бодрящий аромат. Без кофеина, богат витаминами C и B.</p>
          <p className={styles.weight}>Вес: 100 г</p>
          <p className={styles.price}>450 ₽</p>
          <div className={styles.addToCart}>
            <div className={styles.counter}>
              <button className={styles.counterBtn}>−</button>
              <span className={styles.counterVal}>1</span>
              <button className={styles.counterBtn}>+</button>
            </div>
            <button className={cn('btn', styles.addBtn)}>Добавить в корзину</button>
          </div>
        </div>
      </div>

      <div className={styles.divider} />

      <div className={styles.formTitle}>
        <h2>Не нашли что искали?</h2>
        <p>Ответим на любые вопросы и поможем подобрать чай</p>
      </div>
      <ContactForm showTitle={false} />

    </div>
  )
}
