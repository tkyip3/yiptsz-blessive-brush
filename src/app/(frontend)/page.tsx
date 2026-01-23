import React from 'react'
import Tilt from '@/components/Tilt'
import './styles.css'
export default async function HomePage() {
  return (
    <>
      <div className="home-banner">
        <div className="banner-wrapper">
          <div className="w-1/2">
            <div className="banner-card-wrapper">
              <Tilt
                className="banner-card"
                options={{ max: 25, speed: 1000, glare: true, 'max-glare': 0.5, scale: 1.05 }}
              >
                <div className="card-title">demo</div>
              </Tilt>
            </div>
          </div>
          <div className="w-1/2">
            <div className="banner-title">祝福手繪</div>
            <div className="banner-subtitle">手繪</div>
          </div>
        </div>
      </div>
    </>
  )
}
