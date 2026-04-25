import path from 'path'
import { buildConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Media } from '@/payload/collections/Media'
import { Categories } from '@/payload/collections/Categories'
import { Products } from '@/payload/collections/Products'

import { SiteSettings } from '@/payload/globals/SiteSettings'
import { HomePageGlobal } from '@/payload/globals/HomePage'
import { AboutPageGlobal } from '@/payload/globals/AboutPage'
import { CooperationPageGlobal } from '@/payload/globals/CooperationPage'
import { DeliveryPageGlobal } from '@/payload/globals/DeliveryPage'
import { ContactsPageGlobal } from '@/payload/globals/ContactsPage'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  editor: lexicalEditor(),
  collections: [Media, Categories, Products],
  globals: [
    SiteSettings,
    HomePageGlobal,
    AboutPageGlobal,
    CooperationPageGlobal,
    DeliveryPageGlobal,
    ContactsPageGlobal,
  ],
  secret: process.env.PAYLOAD_SECRET || 'dev-secret-change-in-production',
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URL || `file:${path.resolve(dirname, 'database.db')}`,
    },
  }),
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})
