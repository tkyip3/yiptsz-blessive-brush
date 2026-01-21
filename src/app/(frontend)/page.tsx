import React from 'react'
import './styles.css'
export default async function HomePage() {
  return (
    <>
      <div className="home-banner">
        <div className="container mx-auto">
          <div className="flex">
            <div className="w-1/2">1</div>
            <div className="w-1/2">
              <div className="banner-title bg-red-500">祝福手繪</div>
              <div className="banner-subtitle">手繪</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
