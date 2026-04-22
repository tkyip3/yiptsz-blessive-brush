import { Icon } from '@iconify/react'
import Link from 'next/link'
export default function Footer() {
  return (
    <footer>
      <div className="container mx-auto text-center p-4">
        <div className="footer-top">
          <div className="footer-menu">
            <Link
              href={'https://www.instagram.com/yiptsz.blessive.brush/'}
              target="_blank"
              className="menu-item"
            >
              <Icon className="" icon="arcticons:instagram" width="2em" height="2em" />
            </Link>
            <Link href={'https://wa.me/85295895746?text='} target="_blank" className="menu-item">
              <Icon className="" icon="arcticons:whatsapp" width="2em" height="2em" />
            </Link>
          </div>
        </div>
        <div className="footer-bottom">
          © {new Date().getFullYear()} YipTsz Blessive Brush All rights reserved
        </div>
      </div>
    </footer>
  )
}
