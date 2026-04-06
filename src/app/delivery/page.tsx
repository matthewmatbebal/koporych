import { WireBlock } from '@/components/ui/WireBlock/WireBlock'
import styles from './page.module.sass'

export default function DeliveryPage() {
  return (
    <div className={styles.page}>
      <WireBlock label="Заголовок: Доставка и оплата" height={64} />
      <WireBlock label="Фото" height={280} />
      <WireBlock label="Способы доставки — условия и сроки" height={200} />
      <WireBlock label="Способы оплаты" height={160} />
      <WireBlock label="Реквизиты компании" height={120} />
    </div>
  )
}
