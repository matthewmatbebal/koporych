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
        { name: 'title', type: 'text', label: 'Заголовок' },
        {
          name: 'paragraphs',
          type: 'array',
          label: 'Абзацы текста',
          fields: [
            { name: 'text', type: 'textarea', label: 'Текст', required: true },
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
  ],
}
