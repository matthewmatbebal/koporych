import type { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Название',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'Slug (URL)',
      admin: {
        description: 'Используется в URL: /catalog/[slug]',
      },
    },
    {
      name: 'sub',
      type: 'text',
      label: 'Короткое описание',
      admin: {
        description: 'Например: «Рассыпной · ручной сбор · 100 г»',
      },
    },
    {
      name: 'description',
      type: 'richText',
      label: 'Описание',
    },
    {
      name: 'price',
      type: 'number',
      required: true,
      label: 'Цена (₽)',
    },
    {
      name: 'weight',
      type: 'text',
      label: 'Вес',
      admin: {
        description: 'Например: «100 г»',
      },
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      required: true,
      label: 'Категория',
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'Показывать на главной',
      defaultValue: false,
    },
    {
      name: 'images',
      type: 'array',
      label: 'Изображения',
      minRows: 1,
      admin: {
        description: 'Первое изображение — главное',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Изображение',
        },
      ],
    },
  ],
}
