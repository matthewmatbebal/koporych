'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import type { Swiper as SwiperClass } from 'swiper/types'
import 'swiper/swiper.css'
import styles from './ProductGallery.module.sass'

interface ProductGalleryProps {
    images: string[]
    alt: string
}

export function ProductGallery({ images, alt }: ProductGalleryProps) {
    const [activeIndex, setActiveIndex] = useState(0)
    const [lightbox, setLightbox] = useState<number | null>(null)
    const swiperRef = useRef<SwiperClass | null>(null)

    return (
        <div className={styles.gallery}>
            {/* THUMBS (LEFT) */}
            <div className={styles.thumbsList}>
                {images.map((src, i) => (
                    <div
                        key={src}
                        className={`${styles.thumb} ${i === activeIndex ? styles.thumbActive : ''}`}
                        onClick={() => swiperRef.current?.slideTo(i)}
                    >
                        <Image src={src} alt="" fill style={{ objectFit: 'cover' }} />
                    </div>
                ))}
            </div>

            {/* MAIN (RIGHT) */}
            <Swiper
                modules={[Navigation]}
                navigation={{
                    prevEl: `.${styles.navPrev}`,
                    nextEl: `.${styles.navNext}`,
                }}
                className={styles.mainSwiper}
                onSwiper={(swiper) => { swiperRef.current = swiper }}
                onSlideChange={(swiper) => {
                    setActiveIndex(swiper.activeIndex)
                    setLightbox(null)
                }}
            >
                {images.map((src, i) => (
                    <SwiperSlide key={src}>
                        <div className={styles.mainSlide} onClick={() => setLightbox(i)}>
                            <Image
                                src={src}
                                alt={i === 0 ? alt : ''}
                                fill
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                    </SwiperSlide>
                ))}

                <button className={styles.navPrev}>‹</button>
                <button className={styles.navNext}>›</button>
            </Swiper>

            {/* LIGHTBOX */}
            {lightbox !== null && (
                <div className={styles.lightbox} onClick={() => setLightbox(null)}>
                    <div className={styles.lightboxInner} onClick={(e) => e.stopPropagation()}>
                        <Image
                            src={images[lightbox]!}
                            alt={alt}
                            fill
                            style={{ objectFit: 'contain' }}
                        />
                    </div>
                    <button className={styles.lightboxClose} onClick={() => setLightbox(null)}>
                        ✕
                    </button>
                </div>
            )}
        </div>
    )
}
