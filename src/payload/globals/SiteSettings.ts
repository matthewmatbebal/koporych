import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Настройки сайта',
  fields: [
    {
      name: 'siteName',
      type: 'text',
      label: 'Название сайта',
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      label: 'Логотип',
    },
    {
      name: 'contacts',
      type: 'group',
      label: 'Контакты',
      fields: [
        { name: 'phone', type: 'text', label: 'Телефон' },
        { name: 'email', type: 'email', label: 'Email' },
        { name: 'address', type: 'text', label: 'Адрес' },
      ],
    },
    {
      name: 'socials',
      type: 'group',
      label: 'Социальные сети',
      fields: [
        { name: 'vk', type: 'text', label: 'ВКонтакте (URL)' },
        { name: 'telegram', type: 'text', label: 'Telegram (URL)' },
        { name: 'whatsapp', type: 'text', label: 'WhatsApp (URL или номер)' },
      ],
    },
    {
      name: 'footer',
      type: 'group',
      label: 'Подвал',
      fields: [
        { name: 'tagline', type: 'text', label: 'Слоган' },
        { name: 'copyright', type: 'text', label: 'Copyright' },
      ],
    },
  ],
}
