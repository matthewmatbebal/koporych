import type { GlobalConfig } from 'payload'

export const CooperationPageGlobal: GlobalConfig = {
  slug: 'cooperation-page',
  label: 'Страница «Сотрудничество»',
  fields: [
    { name: 'photo', type: 'upload', relationTo: 'media', label: 'Фото' },
    { name: 'title', type: 'text', label: 'Заголовок' },
    { name: 'intro', type: 'textarea', label: 'Вводный текст' },
    {
      name: 'items',
      type: 'array',
      label: 'Варианты сотрудничества',
      fields: [
        { name: 'label', type: 'text', label: 'Название', required: true },
        { name: 'description', type: 'text', label: 'Описание', required: true },
      ],
    },
    { name: 'outro', type: 'textarea', label: 'Завершающий текст' },
  ],
}
