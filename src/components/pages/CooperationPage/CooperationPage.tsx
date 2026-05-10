import Image from 'next/image'
import { ContactForm } from '@/components/ui/ContactForm/ContactForm'
import { getCooperationPage } from '@/lib/payload/globals'
import styles from './CooperationPage.module.sass'

export async function CooperationPage() {
  const data = await getCooperationPage()

  return (
    <div className={styles.page}>
      <div className={styles.wrapper}>
        <div className={styles.photo}>
          <Image src={data.photo} alt="Сотрудничество" fill style={{ objectFit: 'cover' }} />
        </div>
        <div className={styles.text}>
          <h2>{data.title}</h2>
          <p>{data.intro}</p>
          <ul className={styles.list}>
            {data.items.map((item, i) => (
              <li key={i}><strong>{item.label}</strong> — {item.description}</li>
            ))}
          </ul>
          <p>{data.outro}</p>
        </div>
      </div>
      <ContactForm title="Напишите нам" contacts={"full"}/>
    </div>
  )
}
