# Content Schema — Копорыч

Интерфейсы контента для построения бэкенда в Payload CMS.
Разделено на **Collections** (множество записей) и **Globals** (одиночные настройки).

---

## Collections

### Category
Категория товара с изображением-превью (используется в фильтре каталога).

```ts
interface Category {
  name: string   // "Рассыпной", "Пирамидки", "Развес", "Набор"
  image: Media   // картинка кнопки фильтра в каталоге
}
```

---

### Media
Системная коллекция для всех загружаемых файлов.

```ts
interface Media {
  url: string
  alt: string
}
```

---

### Product
Одна запись = один товар в каталоге.

```ts
interface Product {
  slug: string           // URL-идентификатор, напр. "ivan-chai-classic"
  name: string           // "Иван-чай классический"
  sub: string            // короткое описание под названием: "Рассыпной · ручной сбор · 100 г"
  description: string    // длинное описание (richtext), показывается на странице товара
  price: number          // 450 — цена в рублях числом
  weight: string         // "100 г" — отдельно от sub, выводится отдельным элементом
  category: Category     // relationship → коллекция Categories
  featured: boolean      // показывать в блоке «Избранные» на главной
  images: { image: Media }[]  // массив, первое — главное; остальные — галерея на странице товара
}
```

> На странице товара также есть блок «Не нашли что искали?» — это статика формы,
> к конкретному товару не привязана.

---

### Order (будущее)
Для хранения заказов из корзины. Сейчас корзина — хардкод, но структура видна из формы.

```ts
interface Order {
  email: string
  name: string           // ФИО или название компании
  phone: string
  deliveryMethod: 'Почта России' | 'СДЭК' | 'Яндекс.Доставка' | 'Самовывоз'
  deliveryAddress: string
  paymentMethod: 'Банковская карта' | 'Перевод на счёт' | 'Наличные при самовывозе'
  comment?: string
  items: OrderItem[]
}

interface OrderItem {
  product: Product       // relation
  qty: number
  price: string          // фиксируем цену на момент заказа
}
```

---

### ContactSubmission (будущее)
Отправки формы обратной связи.

```ts
interface ContactSubmission {
  email: string
  name: string
  phone: string
  message: string
  createdAt: Date
}
```

---

## Globals

### SiteSettings
Данные, которые используются во всём сайте — шапка, подвал, контакты.

```ts
interface SiteSettings {
  siteName: string       // "КОПОРЫЧ"
  logo: Image

  contacts: {
    phone: string        // "+7 (900) 123-45-67"
    email: string        // "hello@koporych.ru"
    address: string      // "Санкт-Петербург, ул. Примерная, 1"
  }

  socials: {
    vk?: string          // полный URL
    telegram?: string
    whatsapp?: string    // номер или ссылка wa.me/...
  }

  footer: {
    tagline: string      // "Иван-чай ручной сборки из экологически чистых мест России"
    copyright: string    // "© 2024 Копорыч. Все права защищены."
  }
}
```

---

### HomePage
Global для главной страницы.

```ts
interface HomePage {
  hero: {
    image: Image
    title: string        // "Копорыч"
    subtitle: string     // "Традиционный русский чай из экологически чистых мест"
    buttonText: string   // "Смотреть каталог"
    buttonHref: string   // "/catalog"
  }

  aboutPreview: {
    image: Image
    eyebrow: string      // "О нас"
    title: string        // "Мы делаем чай с душой"
    text: string         // абзац текста
    buttonText: string   // "Узнать больше"
    buttonHref: string   // "/about"
  }

  partners: {
    enabled: boolean     // блок сейчас скрыт/заглушка
    items: {
      name: string
      logo: Image
      url?: string
    }[]
  }
}
```

---

### AboutPage
Global для страницы «О нас».

```ts
interface AboutPage {
  company: {
    photo: Image
    title: string        // "О компании"
    paragraphs: string[] // массив абзацев (или richtext)
  }

  mission: {
    quote: string        // текст цитаты
    source: string       // "— Копорыч"
  }

  contactsSection: {
    title: string        // "Мы всегда на связи"
    // ContactInfo берёт данные из SiteSettings.contacts и SiteSettings.socials
  }
}
```

---

### CooperationPage
Global для страницы «Сотрудничество».

```ts
interface CooperationPage {
  photo: Image

  title: string          // "Варианты сотрудничества"
  intro: string          // вводный абзац

  items: {
    label: string        // "Оптовые поставки"
    description: string  // "регулярные заказы от 10 кг со скидкой до 30%"
  }[]

  outro: string          // "Напишите нам — обсудим условия индивидуально."
}
```

---

### DeliveryPage
Global для страницы «Доставка и оплата».

```ts
interface DeliveryPage {
  hero: {
    image: Image
    title: string        // "Доставка и оплата"
    subtitle: string     // "Доставляем по всей России — быстро, бережно и надёжно"
  }

  deliveryMethods: DeliveryRow[]
  // "Почта России", "СДЭК", "Яндекс.Доставка", "Самовывоз"

  paymentMethods: DeliveryRow[]
  // "Банковская карта", "Перевод на счёт", "Наличные"

  requisites: {
    companyName: string  // "ИП Иванов Иван Иванович"
    inn: string
    ogrnip: string
    bankAccount: string
    bank: string
  }
}

interface DeliveryRow {
  name: string           // "СДЭК"
  meta?: string          // "2–7 рабочих дней · от 250 ₽"
}
```

---

### ContactsPage
Global для страницы «Контакты».

```ts
interface ContactsPage {
  title: string          // "Мы всегда на связи"
  // остальные данные (телефон, email, соцсети) из SiteSettings
}
```

---

## Примечания по структуре Payload

| Сущность | Тип в Payload | Комментарий |
|---|---|---|
| Media | Collection | системная, все загружаемые файлы |
| Category | Collection | категории с изображениями для фильтра |
| Product | Collection | основная коллекция товаров |
| Order | Collection | заказы (когда будет корзина) |
| ContactSubmission | Collection | лиды из формы |
| SiteSettings | Global | шапка, подвал, контакты — одно место |
| HomePage | Global | контент главной |
| AboutPage | Global | контент «О нас» |
| CooperationPage | Global | контент «Сотрудничество» |
| DeliveryPage | Global | контент «Доставка и оплата» |
| ContactsPage | Global | контент «Контакты» (минимально) |
| CatalogPage | — | нет своего контента, только список товаров |
| ProductPage | — | контент берётся из Product |
| CartPage | — | клиентский, не требует CMS |
