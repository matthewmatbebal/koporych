import type { GlobalConfig } from 'payload'

export const AboutPageGlobal: GlobalConfig = {
  slug: 'about-page',
  label: 'Страница «О нас»',
  fields: [
    {
      name: 'company',
      type: 'group',
      label: 'Блок о компании',
      fields: [
        { name: 'photo', type: 'upload', relationTo: 'media', label: 'Фото' },
        { name: 'title', type: 'text', label: 'Заголовок', required: true },
        { name: 'intro', type: 'textarea', label: 'Вводный текст' },
        {
          name: 'stages',
          type: 'array',
          label: 'Этапы производства',
          fields: [
            { name: 'photo', type: 'upload', relationTo: 'media', required: true, label: 'Фото этапа' },
            { name: 'text', type: 'textarea', required: true, label: 'Описание этапа' },
          ],
        },
      ],
    },
    {
      name: 'mission',
      type: 'group',
      label: 'Цитата / Миссия',
      fields: [
        { name: 'quote', type: 'textarea', label: 'Текст цитаты' },
        { name: 'source', type: 'text', label: 'Источник (подпись)' },
      ],
    },
    {
      name: 'video',
      type: 'group',
      label: 'Блок с видео',
      fields: [
        { name: 'src', type: 'text', label: 'Путь к видео (URL или /video/...)' },
        { name: 'title', type: 'text', label: 'Заголовок' },
        { name: 'text', type: 'textarea', label: 'Текст' },
      ],
    },
  ],
}
