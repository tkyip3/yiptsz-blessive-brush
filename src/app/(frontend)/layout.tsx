import React from 'react'
import './styles.css'

import type { Metadata } from 'next'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CTA from '@/components/CTA'

export const metadata = {
  description:
    'Blessive Brush 祝福手繪，2023年由Apple創辦。無需繪畫基礎，2小時體驗班放鬆減壓、完成專屬作品；或進修初級導師課程，認證後可獨立教學。',
  title: 'YipTsz Blessive Brush 祝福手繪',

  openGraph: {
    title: 'YipTsz Blessive Brush 祝福手繪',
    description:
      '畫字藝術體驗 進深導師課程｜零基礎友善｜小班教學｜完成專屬療癒作品｜認證後可獨立開班',
    url: `${process.env.NEXT_PUBLIC_PAYLOAD_API}`,
    siteName: 'YipTsz Blessive Brush 祝福手繪',
    images: [
      {
        url: '/og-image.jpg', // 建議尺寸：1200×630px，RGB，<500KB
        width: 1200,
        height: 630,
        alt: 'YipTsz Blessive Brush 祝福手繪',
      },
    ],
    locale: 'zh_HK',
    type: 'website',
  },

  // 🔹 Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: 'Blessive Brush 祝福手繪',
    description: '2小時體驗班｜初級導師課程｜零基礎友善｜小班教學｜實體／線上可選',
    images: ['/twitter-image.jpg'], // 建議尺寸：1200×624px
  },

  // 🔹 其他 SEO 增強
  keywords: [
    '祝福手繪',
    'Blessive Brush',
    '香港繪畫課程',
    '成人畫字',
    '減壓手繪',
    '療癒藝術',
    '導師培訓',
    '畫字藝術',
    '工作坊',
    'Apple Chan',
    '體驗班',
    '認證課程',
  ],
  icons: {
    icon: '/images/logo.svg',
    apple: '/images/logo.svg',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+HK:wght@100..900&family=Potta+One&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <CTA />
        <Footer />
      </body>
    </html>
  )
}
