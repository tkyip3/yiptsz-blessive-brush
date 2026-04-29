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
import { Icon } from '@iconify/react'

import { Button } from '@/components/ui/button'
import { ButtonGroup } from '@/components/ui/button-group'

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
          <div className="home-about-title section-title">關於 Blessive Brush</div>
          <div className="home-about-content">
            <div className="content-list">
              <div className="content-list-item">
                <div className="item-icon">
                  <Image
                    src={'/images/home/about_icon1.png'}
                    alt="icon1"
                    width="160"
                    height="160"
                  />
                  {/* <Icon icon="line-md:account" width="24" height="24" /> */}
                </div>
                <div className="item-title">2023年由 Apple 創辦</div>
                <div className="item-detail">把文字結合藝術，讓祝福變得具體可見。</div>
              </div>
              <div className="content-list-item">
                <div className="item-icon">
                  <Image
                    src={'/images/home/about_icon2.png'}
                    alt="icon1"
                    width="160"
                    height="160"
                  />
                  {/* <Icon icon="line-md:heart" width="24" height="24" /> */}
                </div>
                <div className="item-title">實踐「分享越多·祝福越多」</div>
                <div className="item-detail">以文字傳遞感受，鼓勵人們認識自己、認識創造主。</div>
              </div>
              <div className="content-list-item">
                <div className="item-icon">
                  <Image
                    src={'/images/home/about_icon3.png'}
                    alt="icon1"
                    width="160"
                    height="160"
                  />
                  {/* <Icon icon="line-md:pencil" width="24" height="24" /> */}
                </div>
                <div className="item-title">邀請你，一起出發</div>
                <div className="item-detail">無需要畫畫天份，馬上體驗手繪畫字的樂趣。</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="home-about-me">
        <div className="home-about-me-container">
          <div className="home-about-me-wrapper">
            <div className="about-main">
              <div className="about-title section-title">關於我</div>
              <div className="about-description">
                <p>
                  我是葉子 Felix Yip，2024 年成為 Blessive Brush
                  祝福手繪的初級導師。最初因好奇走進體驗班，發現文字可用繪畫的形式去表達和送贈，為了進深，而決定報讀導師課程。在我的課堂裡，願為你得享心靈的休息，同時分享畫字的樂趣。
                </p>
                <p className="mt-3 font-semibold">歡迎參與相關過程：</p>
                <ButtonGroup className="mt-2">
                  <Button size="lg">
                    <Link href="/events/332a2631-c809-41ae-8e59-7ae5f33f511b">體驗班</Link>
                  </Button>
                  <Button size="lg">
                    <Link href="/events/1f0c09f8-f909-43f8-970d-754bce1570ad">導師課程</Link>
                  </Button>
                </ButtonGroup>
              </div>
            </div>
            <div className="about-card">
              <Tilt
                className="about-card-main"
                options={{ max: 25, speed: 1000, glare: true, 'max-glare': 0.5, scale: 1.05 }}
              />
            </div>
          </div>
        </div>
      </section>
      <section className="home-share">
        <div className="home-share-container">
          <div className="home-about-title section-title">參加者課堂後分享</div>
          <div className="share-list">
            <div className="share-item">
              <div className="item-img">
                <Image src={'/images/home/share_img1.png'} alt="share1" width="180" height="180" />
              </div>
              <div className="item-detail">
                參加祝福手繪時，因為專注繪畫，令內心很平靜。 而寫祝福字詞時，自己也有被祝福的感覺。
                是個好的體驗，謝謝導師的細心教導。
              </div>
              <div className="item-title">體驗班學員</div>
            </div>
            <div className="share-item">
              <div className="item-img">
                <Image src={'/images/home/share_img2.png'} alt="share1" width="180" height="180" />
              </div>
              <div className="item-detail">
                這次參與讓我感到非常愉快。活動不僅可以放鬆身心，
                還能把祝福、心意帶給親友。這樣非常有意義， 期待下次能再次有更進深的學習。
              </div>
              <div className="item-title">體驗班學員</div>
            </div>
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
