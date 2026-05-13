import type { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
  slug: 'products',
  labels: { singular: 'Товар', plural: 'Товары' },
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
      name: 'nameMobile',
      type: 'text',
      label: 'Название (мобильное)',
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
      name: 'subMobile',
      type: 'text',
      label: 'Короткое описание (мобильное)',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Описание',
    },
    {
      name: 'descriptionMobile',
      type: 'textarea',
      label: 'Описание (мобильное)',
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
