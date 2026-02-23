// src/components/BuyButtons.tsx
'use client'

import { useState } from 'react'

import { Button } from '@/components/ui/button'

// ===== LocalStorage 操作工具函數 =====
const CART_KEY = 'cart'

const getCartFromStorage = (): any[] => {
  try {
    if (typeof window === 'undefined') return []
    const data = localStorage.getItem(CART_KEY)
    return data ? JSON.parse(data) : []
  } catch (err) {
    console.error('讀取購物車失敗:', err)
    return []
  }
}

const setCartToStorage = (cartItems: any[]) => {
  try {
    if (typeof window === 'undefined') return
    localStorage.setItem(CART_KEY, JSON.stringify(cartItems))
  } catch (err) {
    console.error('儲存購物車失敗:', err)
    // LocalStorage 可能已滿或被禁用
    alert('加入購物車失敗，請檢查瀏覽器設定或清理儲存空間')
  }
}

// ===== 主組件 =====

interface Subitem {
  id: string
  name: string
}
export default function BuyButtons({
  productName,
  productId,
  productSubItems,
  slug,
  stock,
  price,
  images,
}: {
  productName: string
  productId: string
  productSubItems?: Subitem[]
  slug: string
  stock: number
  price: number
  images: string[]
}) {
  const [loading, setLoading] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [description, setDescription] = useState('')

  const [selectedId, setSelectedId] = useState<string | null>(productSubItems?.[0]?.id || null)

  // ===== 購物車數量統計（用於成功提示）=====
  const getCartItemQuantity = (id: string): number => {
    const cart = getCartFromStorage()
    const item = cart.find((item: any) => item.productId === id)
    return item ? item.quantity : 0
  }

  // ===== 清理過期或無效的購物車項目 =====
  const cleanupCart = () => {
    const cart = getCartFromStorage()
    const cleaned = cart.filter((item: any) => item.productId && item.price >= 0)
    if (cleaned.length !== cart.length) {
      setCartToStorage(cleaned)
    }
    return cleaned
  }

  // ===== 加入購物車邏輯 =====
  const handleAddToCart = () => {
    if (stock <= 0) return

    // 清理並取得當前購物車
    const currentCart = cleanupCart()

    // 檢查是否已存在此商品
    const existingIndex = currentCart.findIndex((item: any) => item.productId === productId)
    const pName = `${productName} ${productSubItems.find((item) => item.id === selectedId)?.name ? ` - ${productSubItems.find((item) => item.id === selectedId)?.name}` : ''}`
    const cartItem = {
      productId,
      productName: pName,
      slug,
      quantity: Math.min(quantity, stock),
      stock,
      price,
      image: images[0] || '',
      addedAt: Date.now(),
      description,
    }

    let newCart: any[]
    if (existingIndex !== -1) {
      // 累加數量（仍受庫存限制）
      const existingQty = currentCart[existingIndex].quantity
      const newQty = Math.min(existingQty + quantity, stock)

      if (newQty === existingQty) {
        alert(`🛒 購物車中已有 ${existingQty} 件「${productName}」，已達庫存上限！`)
        return
      }

      newCart = [...currentCart]
      newCart[existingIndex] = { ...newCart[existingIndex], quantity: newQty, stock: stock }

      // 累加成功提示
      alert(`✅「${pName}」數量已更新為 ${newQty} 件！`)
    } else {
      newCart = [...currentCart, cartItem]

      // 首次加入提示
      alert(`✅「${pName}」x${quantity} 已加入購物車！`)
    }

    // 儲存並重置數量
    setCartToStorage(newCart)
    setQuantity(1)
  }

  return (
    <div className="mt-6 flex flex-col gap-3">
      {/* ===== 馬上購買表單 ===== */}
      <form action="/apis/checkout" method="post">
        <input type="hidden" name="productName" value={productName} />
        <input type="hidden" name="productId" value={productId} />
        <input type="hidden" name="slug" value={slug} />
        <input type="hidden" name="quantity" value={quantity} />
        <input type="hidden" name="price" value={price} />
        <input type="hidden" name="images" value={JSON.stringify(images)} />

        {stock > 1 && (
          <label className="form-control w-full">
            <div className="label mb-2">
              <span className="label-text font-medium">購買數量</span>
            </div>
            <input
              type="number"
              min="1"
              max={stock}
              value={quantity}
              onChange={(e) => {
                const val = parseInt(e.target.value, 10)
                setQuantity(isNaN(val) ? 1 : Math.min(stock, Math.max(1, val)))
              }}
              className="input input-bordered w-full mb-4"
              aria-label="商品數量"
            />
          </label>
        )}

        {/* <label className="form-control w-full">
          <div className="label mb-2">
            <span className="label-text font-medium">
              備註 <small>(選填)</small>
            </span>
          </div>
          <textarea
            className="textarea w-full resize-none mb-4"
            name="description"
            id="description"
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </label> */}

        <Button
          className="bg-green-500 hover:bg-green-400 w-full"
          disabled={stock === 0 || loading}
          // onClick={handleBuyNow}
        >
          {loading ? '處理中...' : stock === 0 ? '已售罄' : '馬上購買'}
        </Button>
      </form>

      {/* ===== 恢復並優化的加入購物車按鈕 ===== */}
      <Button
        className="w-full"
        disabled={stock === 0}
        onClick={handleAddToCart}
        aria-label={`加入購物車：${productName}`}
      >
        {stock === 0 ? '已售罄' : '加入購物車'}
      </Button>
    </div>
  )
}
