import type { GlobalConfig } from 'payload'

export const ContactsPageGlobal: GlobalConfig = {
  slug: 'contacts-page',
  label: 'Страница «Контакты»',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Заголовок',
    },
  ],
}
