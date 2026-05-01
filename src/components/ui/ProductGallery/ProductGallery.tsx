'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Thumbs, Navigation } from 'swiper/modules'
import type { Swiper as SwiperClass } from 'swiper/types'
import 'swiper/swiper.css'
import styles from './ProductGallery.module.sass'

interface ProductGalleryProps {
    images: string[]
    alt: string
}

export function ProductGallery({ images, alt }: ProductGalleryProps) {
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null)
    const [lightbox, setLightbox] = useState<number | null>(null)

    useEffect(() => {
        if (lightbox === null) return

        function onKey(e: KeyboardEvent) {
            if (e.key === 'Escape') setLightbox(null)
        }

        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [lightbox])

    return (
        <div className={styles.gallery}>
            {/* THUMBS (LEFT) */}
            <Swiper
                direction="vertical"
                modules={[Thumbs]}
                onSwiper={setThumbsSwiper}
                watchSlidesProgress
                slidesPerView={images.length}
                className={styles.thumbsSwiper}
                // spaceBetween={8}
            >
                {images.map((src) => (
                    <SwiperSlide key={src} className={styles.thumbSlide}>
                        <div className={styles.thumb}>
                            <Image src={src} alt="" fill style={{ objectFit: 'cover' }} />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* MAIN (RIGHT) */}
            <Swiper
                modules={[Thumbs, Navigation]}
                thumbs={{ swiper: thumbsSwiper }}
                navigation={{
                    prevEl: `.${styles.navPrev}`,
                    nextEl: `.${styles.navNext}`,
                }}
                className={styles.mainSwiper}
                onSlideChange={() => setLightbox(null)}
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