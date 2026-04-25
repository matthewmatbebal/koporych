import type { GlobalConfig } from 'payload'

export const DeliveryPageGlobal: GlobalConfig = {
  slug: 'delivery-page',
  label: 'Страница «Доставка и оплата»',
  fields: [
    {
      name: 'hero',
      type: 'group',
      label: 'Баннер',
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media', label: 'Изображение' },
        { name: 'title', type: 'text', label: 'Заголовок' },
        { name: 'subtitle', type: 'text', label: 'Подзаголовок' },
      ],
    },
    {
      name: 'deliveryMethods',
      type: 'array',
      label: 'Способы доставки',
      fields: [
        { name: 'name', type: 'text', label: 'Название', required: true },
        { name: 'meta', type: 'text', label: 'Детали (сроки, цена)' },
      ],
    },
    {
      name: 'paymentMethods',
      type: 'array',
      label: 'Способы оплаты',
      fields: [
        { name: 'name', type: 'text', label: 'Название', required: true },
        { name: 'meta', type: 'text', label: 'Детали' },
      ],
    },
    {
      name: 'requisites',
      type: 'group',
      label: 'Реквизиты',
      fields: [
        { name: 'companyName', type: 'text', label: 'Название компании / ИП' },
        { name: 'inn', type: 'text', label: 'ИНН' },
        { name: 'ogrnip', type: 'text', label: 'ОГРНИП' },
        { name: 'bankAccount', type: 'text', label: 'Расчётный счёт' },
        { name: 'bank', type: 'text', label: 'Банк' },
      ],
    },
  ],
}
