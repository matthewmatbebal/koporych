'use client'

import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay } from 'swiper/modules'
import 'swiper/swiper.css'
import styles from './ImageSlider.module.sass'

interface ImageSliderProps {
  images: string[]
  alt?: string
}

export function ImageSlider({ images, alt = '' }: ImageSliderProps) {
  return (
    <div className={styles.slider}>
      <div className={styles.swiperWrap}>
      <Swiper
        modules={[Navigation, Autoplay]}
        navigation={{
          prevEl: `.${styles.navPrev}`,
          nextEl: `.${styles.navNext}`,
        }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={images.length > 1}
        className={styles.swiper}
      >
        {images.map((src, i) => (
          <SwiperSlide key={src}>
            <div className={styles.slide}>
              <Image src={src} alt={i === 0 ? alt : ''} fill style={{ objectFit: 'cover' }} />
            </div>
          </SwiperSlide>
        ))}
        {images.length > 1 && (
          <>
            <button className={styles.navPrev} aria-label="Предыдущее фото">‹</button>
            <button className={styles.navNext} aria-label="Следующее фото">›</button>
          </>
        )}
      </Swiper>
      </div>
    </div>
  )
}
