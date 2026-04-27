import Link from 'next/link'
export default function CTA() {
  return (
    <div className="CTA">
      <div className="CTA-title">對「祝福手繪」有興趣？歡迎了解更多！</div>
      <div className="CTA-list">
        <Link href="/events/332a2631-c809-41ae-8e59-7ae5f33f511b" className="CTA-item">
          <div className="item-bg"></div>
          <div className="item-main">
            <div className="main-icon">🎨</div>
            <div className="main-title">體驗班</div>
            <div className="main-detail">無需畫畫經驗，輕鬆體驗手繪字的樂趣。</div>
          </div>
        </Link>
        <Link href="/events/1f0c09f8-f909-43f8-970d-754bce1570ad" className="CTA-item">
          <div className="item-bg"></div>
          <div className="item-main">
            <div className="main-icon">👩‍🏫</div>
            <div className="main-title">初級導師課程</div>
            <div className="main-detail">進深教學，掌握更多手繪字的技巧。</div>
          </div>
        </Link>
      </div>
    </div>
  )
}
