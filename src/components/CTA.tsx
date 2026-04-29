import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
export default function CTA() {
  return (
    <div className="CTA">
      <div className="CTA-title">對「祝福手繪」有興趣？歡迎了解更多！</div>
      <div className="CTA-list">
        <Link href="/events/332a2631-c809-41ae-8e59-7ae5f33f511b" className="CTA-item">
          <div className="item-bg"></div>
          <div className="item-main">
            <div className="main-icon">
              <Image src={'/images/CTA/icon1.png'} alt="icon1" width="80" height="80" />
            </div>
            <div className="main-title">體驗班</div>
            <div className="main-detail">
              ✏️ 無需畫畫經驗，輕鬆體驗手繪字的樂趣
              <br />
              ⏰ 單堂 2 小時｜實體／線上可選
              <br />
              💰 $400/人｜多人同行享優惠
            </div>
            <div className="main-action">
              <Button size="lg">立即報名體驗班</Button>
            </div>
          </div>
        </Link>
        <Link href="/events/1f0c09f8-f909-43f8-970d-754bce1570ad" className="CTA-item">
          <div className="item-bg"></div>
          <div className="item-main">
            <div className="main-icon">
              <Image src={'/images/CTA/icon2.png'} alt="icon2" width="80" height="80" />
            </div>
            <div className="main-title">初級導師課程</div>
            <div className="main-detail">
              進深教學，掌握更多手繪字的技巧與引導心法 <br />
              ⏰ 10-12 小時（4堂×3小時）｜認證後可獨立開班 <br />
              💰 $2,400/人｜2 人同行享優惠
            </div>
            <div className="main-action">
              <Button size="lg">立即報名導師課程</Button>
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}
