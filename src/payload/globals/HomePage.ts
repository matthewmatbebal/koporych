import type { GlobalConfig } from 'payload'

export const HomePageGlobal: GlobalConfig = {
  slug: 'home-page',
  label: 'Главная страница',
  fields: [
    {
      name: 'hero',
      type: 'group',
      label: 'Баннер (Hero)',
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media', label: 'Изображение' },
        { name: 'title', type: 'textarea', label: 'Заголовок', required: true },
        { name: 'titleMobile', type: 'textarea', label: 'Заголовок (мобильный)' },
        { name: 'buttonText', type: 'text', label: 'Текст кнопки' },
        { name: 'buttonTextMobile', type: 'text', label: 'Текст кнопки (мобильный)' },
      ],
    },
    {
      name: 'aboutPreview',
      type: 'group',
      label: 'Блок «О нас»',
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media', label: 'Фото' },
        { name: 'eyebrow', type: 'text', label: 'Надпись над заголовком' },
        { name: 'eyebrowMobile', type: 'text', label: 'Надпись над заголовком (мобильная)' },
        { name: 'title', type: 'text', label: 'Заголовок' },
        { name: 'titleMobile', type: 'text', label: 'Заголовок (мобильный)' },
        { name: 'text', type: 'textarea', label: 'Текст' },
        { name: 'textMobile', type: 'textarea', label: 'Текст (мобильный)' },
        { name: 'buttonText', type: 'text', label: 'Текст кнопки' },
        { name: 'buttonTextMobile', type: 'text', label: 'Текст кнопки (мобильный)' },
      ],
    },
    {
      name: 'partners',
      type: 'group',
      label: 'Партнёры',
      fields: [
        { name: 'enabled', type: 'checkbox', label: 'Показывать блок', defaultValue: false },
        {
          name: 'items',
          type: 'array',
          label: 'Список партнёров',
          fields: [
            { name: 'name', type: 'text', label: 'Название', required: true },
            { name: 'logo', type: 'upload', relationTo: 'media', label: 'Логотип' },
            { name: 'url', type: 'text', label: 'Ссылка (необязательно)' },
          ],
        },
      ],
    },
  ],
}
