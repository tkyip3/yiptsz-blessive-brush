import React from 'react'
import Tilt from '@/components/Tilt'
import './styles.css'

import SimpleParallax from 'simple-parallax-js'
import Image from 'next/image'

import { getPayload } from 'payload'
import config from '@payload-config'
import Link from 'next/link'

import HomeEventSwiper from '@/components/HomeEventSwiper'

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
      <section className="home-section">
        <div className="home-product">
          <div className="home-product-container">
            <div className="home-product-title">精選作品</div>
            {products.docs.length > 0 ? (
              <div className="home-product-list">
                {products.docs.map((product) => (
                  <Link
                    key={product.id}
                    href={`/products/${product.slug}`}
                    className="product-item"
                  >
                    <div className="item-cover">
                      <Image
                        key={product.id}
                        src={product.images[0].url}
                        alt={product.name}
                        width={300}
                        height={300}
                      />
                    </div>
                    <div className="item-main">
                      <div className="item-name">{product.name}</div>
                      <div className="item-price">{product.price}</div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div>未有作品可顯示</div>
            )}
          </div>
        </div>
        <div className="home-event">
          <div className="home-event-container">
            <div className="home-event-title">最新活動</div>
            {products.docs.length > 0 ? (
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
