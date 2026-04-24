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
          </div>
        </Link>
        <Link href="/events/332a2631-c809-41ae-8e59-7ae5f33f511b" className="CTA-item">
          <div className="item-bg"></div>
          <div className="item-main">
            <div className="main-icon">👩‍🏫</div>
            <div className="main-title">初級導師課程</div>
          </div>
        </Link>
      </div>
    </div>
  )
}
