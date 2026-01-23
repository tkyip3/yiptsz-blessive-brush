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
    </>
  )
}
