'use client'

import GlassFilter from '@/components/GlassFilter'
import { useState } from 'react'

import { Icon } from '@iconify/react'
import { Button } from '@/components/ui/button'

export default function Header() {
  const [menuActive, setMenuActive] = useState(false)

  const menuToggle = () => {
    setMenuActive(!menuActive)
  }

  return (
    <>
      <header className={`header-main ${menuActive ? 'active' : ''}`}>
        <GlassFilter>
          <div className="container mx-auto">
            <div className="header-menu">
              <a href="/" className="menu-item">
                首頁
              </a>
              <a href="/products" className="menu-item">
                所有貨品
              </a>
              <a href="/cart" className="menu-item">
                購物車
              </a>
              <a href="/admin" className="menu-item" target="_blank">
                管理員登入
              </a>
              <Button onClick={() => setMenuActive(false)} className="header-close">
                <Icon className="item-icon" icon="line-md:close" width="1.6em" height="1.6em" />
              </Button>
            </div>
          </div>
        </GlassFilter>
      </header>
      <Button onClick={() => setMenuActive(true)} className="header-btn">
        <Icon icon="line-md:close-to-menu-transition" width="1.6em" height="1.6em" />
      </Button>
    </>
  )
}
