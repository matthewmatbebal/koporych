import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`media\` (
    \`id\` integer PRIMARY KEY NOT NULL,
    \`alt\` text,
    \`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
    \`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
    \`url\` text,
    \`thumbnail_u_r_l\` text,
    \`filename\` text,
    \`mime_type\` text,
    \`filesize\` numeric,
    \`width\` numeric,
    \`height\` numeric,
    \`focal_x\` numeric,
    \`focal_y\` numeric
  )`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`media_updated_at_idx\` ON \`media\` (\`updated_at\`)`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`media_created_at_idx\` ON \`media\` (\`created_at\`)`)
  await db.run(sql`CREATE UNIQUE INDEX IF NOT EXISTS \`media_filename_idx\` ON \`media\` (\`filename\`)`)

  await db.run(sql`CREATE TABLE IF NOT EXISTS \`users\` (
    \`id\` integer PRIMARY KEY NOT NULL,
    \`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
    \`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
    \`email\` text NOT NULL,
    \`reset_password_token\` text,
    \`reset_password_expiration\` text,
    \`salt\` text,
    \`hash\` text,
    \`login_attempts\` numeric DEFAULT 0,
    \`lock_until\` text
  )`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`users_updated_at_idx\` ON \`users\` (\`updated_at\`)`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`users_created_at_idx\` ON \`users\` (\`created_at\`)`)
  await db.run(sql`CREATE UNIQUE INDEX IF NOT EXISTS \`users_email_idx\` ON \`users\` (\`email\`)`)

  await db.run(sql`CREATE TABLE IF NOT EXISTS \`users_sessions\` (
    \`_order\` integer NOT NULL,
    \`_parent_id\` integer NOT NULL,
    \`id\` text PRIMARY KEY NOT NULL,
    \`created_at\` text,
    \`expires_at\` text NOT NULL,
    FOREIGN KEY (\`_parent_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  )`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`users_sessions_order_idx\` ON \`users_sessions\` (\`_order\`)`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`users_sessions_parent_id_idx\` ON \`users_sessions\` (\`_parent_id\`)`)

  await db.run(sql`CREATE TABLE IF NOT EXISTS \`payload_kv\` (
    \`id\` integer PRIMARY KEY NOT NULL,
    \`key\` text NOT NULL,
    \`data\` text NOT NULL
  )`)
  await db.run(sql`CREATE UNIQUE INDEX IF NOT EXISTS \`payload_kv_key_idx\` ON \`payload_kv\` (\`key\`)`)

  await db.run(sql`CREATE TABLE IF NOT EXISTS \`payload_migrations\` (
    \`id\` integer PRIMARY KEY NOT NULL,
    \`name\` text,
    \`batch\` numeric,
    \`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
    \`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  )`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`payload_migrations_updated_at_idx\` ON \`payload_migrations\` (\`updated_at\`)`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`payload_migrations_created_at_idx\` ON \`payload_migrations\` (\`created_at\`)`)

  await db.run(sql`CREATE TABLE IF NOT EXISTS \`payload_locked_documents\` (
    \`id\` integer PRIMARY KEY NOT NULL,
    \`global_slug\` text,
    \`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
    \`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  )`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`payload_locked_documents_global_slug_idx\` ON \`payload_locked_documents\` (\`global_slug\`)`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`payload_locked_documents_updated_at_idx\` ON \`payload_locked_documents\` (\`updated_at\`)`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`payload_locked_documents_created_at_idx\` ON \`payload_locked_documents\` (\`created_at\`)`)

  await db.run(sql`CREATE TABLE IF NOT EXISTS \`payload_preferences\` (
    \`id\` integer PRIMARY KEY NOT NULL,
    \`key\` text,
    \`value\` text,
    \`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
    \`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  )`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`payload_preferences_key_idx\` ON \`payload_preferences\` (\`key\`)`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`payload_preferences_updated_at_idx\` ON \`payload_preferences\` (\`updated_at\`)`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`payload_preferences_created_at_idx\` ON \`payload_preferences\` (\`created_at\`)`)

  await db.run(sql`CREATE TABLE IF NOT EXISTS \`site_settings\` (
    \`id\` integer PRIMARY KEY NOT NULL,
    \`site_name\` text,
    \`logo_id\` integer,
    \`contacts_phone\` text NOT NULL,
    \`contacts_email\` text,
    \`contacts_address\` text,
    \`socials_vk\` text,
    \`socials_telegram\` text,
    \`socials_whatsapp\` text,
    \`footer_tagline\` text,
    \`footer_copyright\` text,
    \`updated_at\` text,
    \`created_at\` text,
    FOREIGN KEY (\`logo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  )`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`site_settings_logo_idx\` ON \`site_settings\` (\`logo_id\`)`)

  await db.run(sql`CREATE TABLE IF NOT EXISTS \`home_page\` (
    \`id\` integer PRIMARY KEY NOT NULL,
    \`hero_image_id\` integer,
    \`hero_title\` text NOT NULL,
    \`hero_button_text\` text,
    \`hero_button_href\` text,
    \`about_preview_image_id\` integer,
    \`about_preview_eyebrow\` text,
    \`about_preview_title\` text,
    \`about_preview_text\` text,
    \`about_preview_button_text\` text,
    \`about_preview_button_href\` text,
    \`partners_enabled\` integer DEFAULT false,
    \`updated_at\` text,
    \`created_at\` text,
    FOREIGN KEY (\`hero_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
    FOREIGN KEY (\`about_preview_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  )`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`home_page_hero_hero_image_idx\` ON \`home_page\` (\`hero_image_id\`)`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`home_page_about_preview_about_preview_image_idx\` ON \`home_page\` (\`about_preview_image_id\`)`)

  await db.run(sql`CREATE TABLE IF NOT EXISTS \`home_page_partners_items\` (
    \`_order\` integer NOT NULL,
    \`_parent_id\` integer NOT NULL,
    \`id\` text PRIMARY KEY NOT NULL,
    \`name\` text NOT NULL,
    \`logo_id\` integer,
    \`url\` text,
    FOREIGN KEY (\`logo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
    FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  )`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`home_page_partners_items_order_idx\` ON \`home_page_partners_items\` (\`_order\`)`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`home_page_partners_items_parent_id_idx\` ON \`home_page_partners_items\` (\`_parent_id\`)`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`home_page_partners_items_logo_idx\` ON \`home_page_partners_items\` (\`logo_id\`)`)

  await db.run(sql`CREATE TABLE IF NOT EXISTS \`about_page\` (
    \`id\` integer PRIMARY KEY NOT NULL,
    \`company_photo_id\` integer,
    \`company_title\` text NOT NULL,
    \`company_intro\` text,
    \`mission_quote\` text,
    \`mission_source\` text,
    \`video_src\` text,
    \`video_title\` text,
    \`video_text\` text,
    \`updated_at\` text,
    \`created_at\` text,
    FOREIGN KEY (\`company_photo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  )`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`about_page_company_company_photo_idx\` ON \`about_page\` (\`company_photo_id\`)`)

  await db.run(sql`CREATE TABLE IF NOT EXISTS \`about_page_company_stages\` (
    \`_order\` integer NOT NULL,
    \`_parent_id\` integer NOT NULL,
    \`id\` text PRIMARY KEY NOT NULL,
    \`photo_id\` integer NOT NULL,
    \`text\` text NOT NULL,
    FOREIGN KEY (\`photo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
    FOREIGN KEY (\`_parent_id\`) REFERENCES \`about_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  )`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`about_page_company_stages_order_idx\` ON \`about_page_company_stages\` (\`_order\`)`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`about_page_company_stages_parent_id_idx\` ON \`about_page_company_stages\` (\`_parent_id\`)`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`about_page_company_stages_photo_idx\` ON \`about_page_company_stages\` (\`photo_id\`)`)

  await db.run(sql`CREATE TABLE IF NOT EXISTS \`cooperation_page\` (
    \`id\` integer PRIMARY KEY NOT NULL,
    \`photo_id\` integer,
    \`title\` text NOT NULL,
    \`intro\` text,
    \`outro\` text,
    \`updated_at\` text,
    \`created_at\` text,
    FOREIGN KEY (\`photo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  )`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`cooperation_page_photo_idx\` ON \`cooperation_page\` (\`photo_id\`)`)

  await db.run(sql`CREATE TABLE IF NOT EXISTS \`cooperation_page_items\` (
    \`_order\` integer NOT NULL,
    \`_parent_id\` integer NOT NULL,
    \`id\` text PRIMARY KEY NOT NULL,
    \`label\` text NOT NULL,
    \`description\` text NOT NULL,
    FOREIGN KEY (\`_parent_id\`) REFERENCES \`cooperation_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  )`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`cooperation_page_items_order_idx\` ON \`cooperation_page_items\` (\`_order\`)`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`cooperation_page_items_parent_id_idx\` ON \`cooperation_page_items\` (\`_parent_id\`)`)

  await db.run(sql`CREATE TABLE IF NOT EXISTS \`delivery_page\` (
    \`id\` integer PRIMARY KEY NOT NULL,
    \`hero_image_id\` integer,
    \`hero_title\` text,
    \`hero_subtitle\` text,
    \`requisites_company_name\` text,
    \`requisites_inn\` text,
    \`requisites_ogrnip\` text,
    \`requisites_bank_account\` text,
    \`requisites_bank\` text,
    \`updated_at\` text,
    \`created_at\` text,
    FOREIGN KEY (\`hero_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  )`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`delivery_page_hero_hero_image_idx\` ON \`delivery_page\` (\`hero_image_id\`)`)

  await db.run(sql`CREATE TABLE IF NOT EXISTS \`delivery_page_delivery_methods\` (
    \`_order\` integer NOT NULL,
    \`_parent_id\` integer NOT NULL,
    \`id\` text PRIMARY KEY NOT NULL,
    \`name\` text NOT NULL,
    \`meta\` text,
    FOREIGN KEY (\`_parent_id\`) REFERENCES \`delivery_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  )`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`delivery_page_delivery_methods_order_idx\` ON \`delivery_page_delivery_methods\` (\`_order\`)`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`delivery_page_delivery_methods_parent_id_idx\` ON \`delivery_page_delivery_methods\` (\`_parent_id\`)`)

  await db.run(sql`CREATE TABLE IF NOT EXISTS \`delivery_page_payment_methods\` (
    \`_order\` integer NOT NULL,
    \`_parent_id\` integer NOT NULL,
    \`id\` text PRIMARY KEY NOT NULL,
    \`name\` text NOT NULL,
    \`meta\` text,
    FOREIGN KEY (\`_parent_id\`) REFERENCES \`delivery_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  )`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`delivery_page_payment_methods_order_idx\` ON \`delivery_page_payment_methods\` (\`_order\`)`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`delivery_page_payment_methods_parent_id_idx\` ON \`delivery_page_payment_methods\` (\`_parent_id\`)`)

  await db.run(sql`CREATE TABLE IF NOT EXISTS \`contacts_page\` (
    \`id\` integer PRIMARY KEY NOT NULL,
    \`title\` text,
    \`updated_at\` text,
    \`created_at\` text
  )`)

  await db.run(sql`CREATE TABLE IF NOT EXISTS \`excursions_page\` (
    \`id\` integer PRIMARY KEY NOT NULL,
    \`enabled\` integer DEFAULT false,
    \`hero_image_id\` integer,
    \`hero_title\` text,
    \`hero_subtitle\` text,
    \`updated_at\` text,
    \`created_at\` text,
    FOREIGN KEY (\`hero_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  )`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`excursions_page_hero_hero_image_idx\` ON \`excursions_page\` (\`hero_image_id\`)`)

  await db.run(sql`CREATE TABLE IF NOT EXISTS \`excursions_page_events\` (
    \`_order\` integer NOT NULL,
    \`_parent_id\` integer NOT NULL,
    \`id\` text PRIMARY KEY NOT NULL,
    \`photo_id\` integer NOT NULL,
    \`caption\` text,
    \`description\` text,
    FOREIGN KEY (\`photo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
    FOREIGN KEY (\`_parent_id\`) REFERENCES \`excursions_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  )`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`excursions_page_events_order_idx\` ON \`excursions_page_events\` (\`_order\`)`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`excursions_page_events_parent_id_idx\` ON \`excursions_page_events\` (\`_parent_id\`)`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`excursions_page_events_photo_idx\` ON \`excursions_page_events\` (\`photo_id\`)`)

  await db.run(sql`CREATE TABLE IF NOT EXISTS \`categories\` (
    \`id\` integer PRIMARY KEY NOT NULL,
    \`name\` text NOT NULL,
    \`image_id\` integer NOT NULL,
    \`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
    \`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
    FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  )`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`categories_image_idx\` ON \`categories\` (\`image_id\`)`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`categories_updated_at_idx\` ON \`categories\` (\`updated_at\`)`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`categories_created_at_idx\` ON \`categories\` (\`created_at\`)`)

  await db.run(sql`CREATE TABLE IF NOT EXISTS \`products\` (
    \`id\` integer PRIMARY KEY NOT NULL,
    \`name\` text NOT NULL,
    \`slug\` text NOT NULL,
    \`sub\` text,
    \`description\` text,
    \`price\` numeric NOT NULL,
    \`weight\` text,
    \`category_id\` integer NOT NULL,
    \`featured\` integer DEFAULT false,
    \`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
    \`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
    FOREIGN KEY (\`category_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE set null
  )`)
  await db.run(sql`CREATE UNIQUE INDEX IF NOT EXISTS \`products_slug_idx\` ON \`products\` (\`slug\`)`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`products_category_idx\` ON \`products\` (\`category_id\`)`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`products_updated_at_idx\` ON \`products\` (\`updated_at\`)`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`products_created_at_idx\` ON \`products\` (\`created_at\`)`)

  await db.run(sql`CREATE TABLE IF NOT EXISTS \`products_images\` (
    \`_order\` integer NOT NULL,
    \`_parent_id\` integer NOT NULL,
    \`id\` text PRIMARY KEY NOT NULL,
    \`image_id\` integer NOT NULL,
    FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
    FOREIGN KEY (\`_parent_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade
  )`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`products_images_order_idx\` ON \`products_images\` (\`_order\`)`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`products_images_parent_id_idx\` ON \`products_images\` (\`_parent_id\`)`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`products_images_image_idx\` ON \`products_images\` (\`image_id\`)`)

  await db.run(sql`CREATE TABLE IF NOT EXISTS \`payload_locked_documents_rels\` (
    \`id\` integer PRIMARY KEY NOT NULL,
    \`order\` integer,
    \`parent_id\` integer NOT NULL,
    \`path\` text NOT NULL,
    \`media_id\` integer,
    \`categories_id\` integer,
    \`products_id\` integer,
    \`users_id\` integer,
    FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
    FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
    FOREIGN KEY (\`categories_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade,
    FOREIGN KEY (\`products_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade,
    FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  )`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`)`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`)`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`)`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`payload_locked_documents_rels_media_id_idx\` ON \`payload_locked_documents_rels\` (\`media_id\`)`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`payload_locked_documents_rels_categories_id_idx\` ON \`payload_locked_documents_rels\` (\`categories_id\`)`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`payload_locked_documents_rels_products_id_idx\` ON \`payload_locked_documents_rels\` (\`products_id\`)`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`)`)

  await db.run(sql`CREATE TABLE IF NOT EXISTS \`payload_preferences_rels\` (
    \`id\` integer PRIMARY KEY NOT NULL,
    \`order\` integer,
    \`parent_id\` integer NOT NULL,
    \`path\` text NOT NULL,
    \`users_id\` integer,
    FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_preferences\`(\`id\`) ON UPDATE no action ON DELETE cascade,
    FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  )`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`payload_preferences_rels_order_idx\` ON \`payload_preferences_rels\` (\`order\`)`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`payload_preferences_rels_parent_idx\` ON \`payload_preferences_rels\` (\`parent_id\`)`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`payload_preferences_rels_path_idx\` ON \`payload_preferences_rels\` (\`path\`)`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`payload_preferences_rels_users_id_idx\` ON \`payload_preferences_rels\` (\`users_id\`)`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE IF EXISTS \`payload_preferences_rels\``)
  await db.run(sql`DROP TABLE IF EXISTS \`payload_preferences\``)
  await db.run(sql`DROP TABLE IF EXISTS \`payload_locked_documents_rels\``)
  await db.run(sql`DROP TABLE IF EXISTS \`payload_locked_documents\``)
  await db.run(sql`DROP TABLE IF EXISTS \`products_images\``)
  await db.run(sql`DROP TABLE IF EXISTS \`products\``)
  await db.run(sql`DROP TABLE IF EXISTS \`categories\``)
  await db.run(sql`DROP TABLE IF EXISTS \`excursions_page_events\``)
  await db.run(sql`DROP TABLE IF EXISTS \`excursions_page\``)
  await db.run(sql`DROP TABLE IF EXISTS \`contacts_page\``)
  await db.run(sql`DROP TABLE IF EXISTS \`delivery_page_payment_methods\``)
  await db.run(sql`DROP TABLE IF EXISTS \`delivery_page_delivery_methods\``)
  await db.run(sql`DROP TABLE IF EXISTS \`delivery_page\``)
  await db.run(sql`DROP TABLE IF EXISTS \`cooperation_page_items\``)
  await db.run(sql`DROP TABLE IF EXISTS \`cooperation_page\``)
  await db.run(sql`DROP TABLE IF EXISTS \`about_page_company_stages\``)
  await db.run(sql`DROP TABLE IF EXISTS \`about_page\``)
  await db.run(sql`DROP TABLE IF EXISTS \`home_page_partners_items\``)
  await db.run(sql`DROP TABLE IF EXISTS \`home_page\``)
  await db.run(sql`DROP TABLE IF EXISTS \`site_settings\``)
  await db.run(sql`DROP TABLE IF EXISTS \`users_sessions\``)
  await db.run(sql`DROP TABLE IF EXISTS \`users\``)
  await db.run(sql`DROP TABLE IF EXISTS \`payload_migrations\``)
  await db.run(sql`DROP TABLE IF EXISTS \`payload_kv\``)
  await db.run(sql`DROP TABLE IF EXISTS \`media\``)
}
