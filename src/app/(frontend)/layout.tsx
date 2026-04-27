import React from 'react'
import './styles.css'

import type { Metadata } from 'next'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CTA from '@/components/CTA'

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'YipTsz Blessive Brush',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/images/logo.svg"></link>
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
