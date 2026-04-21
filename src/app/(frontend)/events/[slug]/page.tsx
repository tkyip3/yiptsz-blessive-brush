// src\app\(frontend)\products\[slug]\page.tsx
import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/ui/button'

import ProductGallery from '@/components/product/ProductGallery'

import type { Metadata } from 'next'
import type { Event } from '@/payload-types'
import { Icon } from '@iconify/react'

import { Badge } from '@/components/ui/badge'

interface Subitem {
  id: string
  name: string
}
async function getEventBySlug(slug: string): Promise<Event | null> {
  const url = `${process.env.NEXT_PUBLIC_PAYLOAD_API}/api/event?where[slug][equals]=${encodeURIComponent(slug)}&locale=zh-TW`
  const res = await fetch(url, { next: { revalidate: 60 } })
  if (!res.ok) return null
  /* @ts-ignore */
  const { docs } = await res.json()
  return docs[0] || null
}

// ✅ 修正 1：generateMetadata 的 params 也要 await + 類型修正
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const product = await getEventBySlug(slug)

  const baseUrl = process.env.NEXT_PUBLIC_PAYLOAD_API
  const firstImageUrl =
    product?.images?.[0]?.image &&
    typeof product.images[0].image === 'object' &&
    'url' in product.images[0].image
      ? `${baseUrl}${(product.images[0].image as { url: string }).url}`
      : undefined

  const title = product ? `${product.name} | YipTsz Blessive Brush` : '活動未找到'
  const description = product?.description || '活動詳情'

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: firstImageUrl ? [firstImageUrl] : [],
    },
    twitter: {
      title,
      description,
      images: firstImageUrl ? [firstImageUrl] : [],
    },
  }
}

// ✅ 修正 2：主組件 params 類型修正（邏輯你已對，只差類型）
export default async function ProductDetail({
  params,
}: {
  params: Promise<{ slug: string }> // ✅ 補全類型
}) {
  const { slug } = await params // ✅ 正確解包
  const event = await getEventBySlug(slug)

  if (!event) {
    return (
      <div className="container mx-auto px-4 h-full">
        <div className="flex flex-col justify-center text-center gap-4">
          <div className="flex gap-2 justify-center">
            <Icon icon="line-md:line-md:alert-loop" width="4em" height="4em" />
          </div>
          <h1 className="text-xl font-bold ">未找到相關活動</h1>
          <p className="">你所找的活動不存在或已經下架，歡迎遊覽其他活動。</p>
          <p className="flex gap-2 justify-center">
            <Link className="btn btn-primary" href={'/prouducts'}>
              返回活動頁面
            </Link>
            <Link className="btn btn-primary" href={'/'}>
              返回主頁
            </Link>
          </p>
        </div>
      </div>
    )
  }

  const galleryImages = (event.images ?? [])
    .filter((img) => {
      const image = img.image
      return image && typeof image !== 'number' && typeof image === 'object' && image.url
    })
    .map((img) => ({
      ...img,
      image: {
        url: (img.image as { url: string }).url ?? '',
        alt: (img.image as { url: string; alt?: string }).alt ?? '',
      },
    }))

  const buyImages =
    galleryImages.length > 0
      ? [process.env.NEXT_PUBLIC_PAYLOAD_API + galleryImages[0].image.url]
      : []

  return (
    <div className="event-bg">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            {event.images && event.images.length > 0 ? (
              <div className="event-gallery">
                <ProductGallery images={galleryImages} />
              </div>
            ) : (
              <div className="event-gallery gallery-icon">
                <Icon icon="line-md:image-twotone" width="6em" height="6em" />
              </div>
            )}
          </div>

          <div>
            <h1 className="event-title">{event.name}</h1>

            {event.description && (
              <div className="event-description">
                <div className="description-title">活動描述</div>
                <pre>{event.description}</pre>
              </div>
            )}

            <Button className="event-btn">
              <Link
                href={`https://wa.me/85295895746?text=你好，我想查詢預約有關「${event.name}」的課程。`}
              >
                <Icon icon="mdi:whatsapp" width="6em" height="6em" />
                WhatsApp 查詢預約
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
