export const HOME_PAGE = {
  hero: {
    image: '/images/banner.jpg',
    subtitle: 'Традиционный русский чай\nиз экологически чистых мест',
    buttonText: 'Каталог',
    buttonHref: '/catalog',
  },

  aboutPreview: {
    image: '/images/about-main.png',
    eyebrow: 'О нас',
    title: 'Мы делаем чай\nс душой',
    text: 'Собираем иван-чай вручную в экологически чистых местах Ленинградской и Вологодской областей. Традиционная ферментация — насыщенный вкус и аромат, без кофеина.',
    buttonText: 'Узнать больше',
    buttonHref: '/about',
  },

  featured: {
    title: 'Избранные товары',
    catalogLink: '/catalog',
    categoryImages: {
      'Рассыпной': '/images/grass.jpg',
      'Пирамидки': '/images/pyramids.jpg',
      'Развес': '/images/classic.jpg',
    } as Record<string, string>,
  },
}
