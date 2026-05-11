import type { GlobalConfig } from 'payload'

export const ExcursionsPageGlobal: GlobalConfig = {
  slug: 'excursions-page',
  label: 'Страница «Экскурсии»',
  fields: [
    {
      name: 'enabled',
      type: 'checkbox',
      label: 'Показывать страницу в меню',
      defaultValue: false,
    },
    {
      name: 'hero',
      type: 'group',
      label: 'Заглавный блок',
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media', label: 'Фото' },
        { name: 'title', type: 'text', label: 'Заголовок' },
        { name: 'titleMobile', type: 'text', label: 'Заголовок (мобильный)' },
        { name: 'subtitle', type: 'text', label: 'Подзаголовок' },
        { name: 'subtitleMobile', type: 'text', label: 'Подзаголовок (мобильный)' },
      ],
    },
    {
      name: 'events',
      type: 'array',
      label: 'Прошедшие события',
      fields: [
        { name: 'photo', type: 'upload', relationTo: 'media', required: true, label: 'Фото' },
        { name: 'caption', type: 'text', label: 'Подпись к фото' },
        { name: 'captionMobile', type: 'text', label: 'Подпись к фото (мобильная)' },
        { name: 'description', type: 'textarea', label: 'Описание события' },
        { name: 'descriptionMobile', type: 'textarea', label: 'Описание события (мобильное)' },
      ],
    },
  ],
}
