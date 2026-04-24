import React from 'react'
import Tilt from '@/components/Tilt'
import './styles.css'

import SimpleParallax from 'simple-parallax-js'
import Image from 'next/image'

import { getPayload } from 'payload'
import config from '@payload-config'
import Link from 'next/link'

import HomeEventSwiper from '@/components/HomeEventSwiper'
import type { Product } from '@/payload-types'

import { Button } from '@/components/ui/button'

export default async function HomePage() {
  const payload = await getPayload({ config })

  const products = await payload.find({
    collection: 'products',
    where: {
      homepageIndex: {
        greater_than: 0,
      },
      published: {
        equals: true,
      },
    },
    sort: 'homepageIndex',
    limit: 3,
    depth: 2, // 獲取關聯資料（圖片、分類等）
  })

  const events = await payload.find({
    collection: 'event',
    where: {
      homepageIndex: {
        greater_than: 0,
      },
      published: {
        equals: true,
      },
    },
    sort: 'homepageIndex',
    limit: 10,
    depth: 2, // 獲取關聯資料（圖片、分類等）
  })

  const eventImages = events.docs.map((event) => {
    const image = event.images[0].image
    const imageUrl = typeof image === 'object' ? image.url : ''
    return {
      name: event.name,
      slug: event.slug,
      image: {
        url: imageUrl,
        alt: event.name,
      },
    }
  })

  return (
    <>
      {/* <SimpleParallax>
        <Image src="/images/common/bg.jpg" alt="image" />
      </SimpleParallax> */}
      <div className="home-banner">
        <div className="banner-wrapper">
          <div className="w-1/2">
            <div className="banner-card-wrapper">
              <Tilt
                className="banner-card"
                options={{ max: 25, speed: 1000, glare: true, 'max-glare': 0.5, scale: 1.05 }}
              />
            </div>
          </div>
          <div className="w-1/2">
            <div className="banner-title-wrapper">
              <div className="banner-title">祝福手繪</div>
              <div className="banner-subtitle">
                <p>祝福自己 祝福他人</p>
                <p>分享越多 祝福越多</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="home-about">
        <div className="about-bg">
          <video playsInline autoPlay muted loop poster="polina.jpg" id="bgvid">
            {/* <source src="polina.webm" type="video/webm" /> */}
            <source src="/video/home/about_bg.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="home-about-container">
          <div className="home-about-title section-title">關於我們</div>
          <div className="home-about-content">
            2023年由 Apple 創辦 Blessive Brush 祝福手繪，把文字結合藝術的表達方式，
            透過手繪文字創作，將轉化為具體可見的手繪作品，幫助人們祝福自己也將祝福帶給他人。這個畫文字的藝術為強調以文字傳遞感受，鼓勵人們認識自己、認識創造主，
            信仰生活化地實踐「分享越多·祝福越多」的信念。
          </div>
        </div>
      </section>
      <section className="home-section">
        <div className="home-product">
          <div className="home-product-container">
            <div className="home-product-title section-title">精選作品</div>
            {products.docs.length > 0 ? (
              <div className="home-product-list">
                {products.docs.map((product: Product) => {
                  return (
                    <div key={product.id} className="product-item">
                      <div className="item-cover">
                        <Image
                          key={product.id}
                          src={
                            typeof product.images[0].image === 'object'
                              ? product.images[0].image.url
                              : ''
                          }
                          alt={product.name}
                          width={300}
                          height={300}
                          unoptimized
                        />
                      </div>
                      <div className="item-main">
                        <div className="item-name">{product.name}</div>
                        <div className="item-price">HKD {product.price}</div>
                        <div className="item-btn">
                          <Button>
                            <Link href={`/products/${product.slug}`}>查看詳細</Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div>未有作品可顯示</div>
            )}
          </div>
        </div>
        <div className="home-event">
          <div className="home-event-container">
            <div className="home-event-title section-title">最新活動</div>
            {events.docs.length > 0 ? (
              <div className="home-event-swiper">
                <HomeEventSwiper images={eventImages} />
              </div>
            ) : (
              <div>未有活動可顯示</div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
