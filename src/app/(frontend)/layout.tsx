import React from 'react'
import './styles.css'

import type { Metadata } from 'next'

import Footer from '@/components/Footer'

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
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
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
