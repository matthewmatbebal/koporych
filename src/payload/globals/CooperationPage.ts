import type { GlobalConfig } from 'payload'

export const CooperationPageGlobal: GlobalConfig = {
  slug: 'cooperation-page',
  label: 'Страница «Сотрудничество»',
  fields: [
    { name: 'photo', type: 'upload', relationTo: 'media', label: 'Фото' },
    { name: 'title', type: 'text', label: 'Заголовок', required: true },
    { name: 'titleMobile', type: 'text', label: 'Заголовок (мобильный)' },
    { name: 'intro', type: 'textarea', label: 'Вводный текст' },
    { name: 'introMobile', type: 'textarea', label: 'Вводный текст (мобильный)' },
    {
      name: 'items',
      type: 'array',
      label: 'Варианты сотрудничества',
      fields: [
        { name: 'label', type: 'text', label: 'Название', required: true },
        { name: 'labelMobile', type: 'text', label: 'Название (мобильное)' },
        { name: 'description', type: 'text', label: 'Описание', required: true },
        { name: 'descriptionMobile', type: 'text', label: 'Описание (мобильное)' },
      ],
    },
    { name: 'outro', type: 'textarea', label: 'Завершающий текст' },
    { name: 'outroMobile', type: 'textarea', label: 'Завершающий текст (мобильный)' },
  ],
}
