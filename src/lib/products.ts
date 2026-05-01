export interface Product {
  slug: string
  name: string
  sub: string
  price: string
  category: string
  featured?: boolean
  image: string
}

const IMAGES = [
  '/images/classic.jpg',
  '/images/grass.jpg',
  '/images/pyramids.jpg',
  '/images/sagan-dali.jpg',
]

export const PRODUCTS: Product[] = [
  { slug: 'ivan-chai-classic', name: 'Иван-чай классический', sub: 'Рассыпной · ручной сбор · 100 г', price: '450 ₽', category: 'Рассыпной', featured: true, image: IMAGES[0] },
  { slug: 'ivan-chai-thyme', name: 'Иван-чай с чабрецом', sub: 'С добавлением чабреца · 80 г', price: '380 ₽', category: 'Рассыпной', featured: true, image: IMAGES[1] },
  { slug: 'ivan-chai-pyramids', name: 'Иван-чай в пирамидках', sub: 'Удобно заваривать · 20 пирамидок', price: '420 ₽', category: 'Пирамидки', featured: true, image: IMAGES[2] },
  { slug: 'ivan-chai-mint', name: 'Иван-чай с мятой', sub: 'С добавлением мяты · 80 г', price: '360 ₽', category: 'Рассыпной', featured: true, image: IMAGES[3] },
  { slug: 'ivan-chai-raspberry', name: 'Иван-чай с малиной', sub: 'С добавлением малины · 80 г', price: '390 ₽', category: 'Рассыпной', featured: true, image: IMAGES[0] },
  { slug: 'ivan-chai-lemon', name: 'Иван-чай с лимоном', sub: 'С добавлением лимона · 80 г', price: '370 ₽', category: 'Рассыпной', image: IMAGES[1] },
  { slug: 'ivan-chai-bulk-200', name: 'Иван-чай рассыпной', sub: 'Развесной · 200 г', price: '790 ₽', category: 'Развес', featured: true, image: IMAGES[2] },
  { slug: 'ivan-chai-bulk-500', name: 'Иван-чай рассыпной', sub: 'Развесной · 500 г', price: '1 800 ₽', category: 'Развес', image: IMAGES[3] },
  { slug: 'ivan-chai-pyramids-thyme', name: 'Иван-чай с чабрецом', sub: 'Пирамидки · 20 шт', price: '460 ₽', category: 'Пирамидки', image: IMAGES[1] },
]

export const GALLERY_IMAGES = IMAGES
