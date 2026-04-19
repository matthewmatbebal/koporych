import Link from 'next/link'
import { WireBlock } from '@/components/ui/WireBlock/WireBlock'
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
        <div className={styles.gallery}>
          <WireBlock label="Фото" height={400} />
          <div className={styles.thumbs}>
            <WireBlock label="Фото" height={72} />
            <WireBlock label="Фото" height={72} />
            <WireBlock label="Фото" height={72} />
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
            <button className={`btn ${styles.addBtn}`}>Добавить в корзину</button>
          </div>
        </div>
      </div>

      <div className={styles.divider} />

      <div className={styles.formTitle}>
        <h2>Не нашли что искали?</h2>
        <p>Ответим на любые вопросы и поможем подобрать чай</p>
      </div>
      <form className={styles.form}>
        <input type="email" placeholder="E-mail" />
        <input type="text" placeholder="Имя" />
        <input type="tel" placeholder="Ваш телефон" />
        <textarea placeholder="Ваш вопрос" rows={4} />
        <button type="submit" className="btn">Отправить</button>
      </form>

    </div>
  )
}
