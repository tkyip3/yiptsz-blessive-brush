// src/components/CartPageClient.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

import { Icon } from '@iconify/react'

import Image from 'next/image'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableFooter,
  TableRow,
} from '@/components/ui/table'

import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from '@/components/ui/item'

import { Input } from '@/components/ui/input'

import { Button } from '@/components/ui/button'
import { ButtonGroup } from '@/components/ui/button-group'

interface CartItem {
  productId: string
  productName: string
  slug: string
  stock: number
  quantity: number
  price: number
  image: string
  addedAt: number
  description?: string
}

const CART_KEY = 'cart'

// ===== LocalStorage 工具函數 =====
const getCartFromStorage = (): CartItem[] => {
  try {
    if (typeof window === 'undefined') return []
    const data = localStorage.getItem(CART_KEY)
    return data ? JSON.parse(data) : []
  } catch (err) {
    console.error('讀取購物車失敗:', err)
    return []
  }
}

const setCartToStorage = (cartItems: CartItem[]) => {
  try {
    if (typeof window === 'undefined') return
    localStorage.setItem(CART_KEY, JSON.stringify(cartItems))
  } catch (err) {
    console.error('儲存購物車失敗:', err)
  }
}

function CartItemRow({
  item,
  onUpdate,
  onDelete,
}: {
  item: CartItem
  onUpdate: (productId: string, quantity: number) => void
  onDelete: (productId: string) => void
}) {
  const [quantity, setQuantity] = useState(item.quantity)
  const [isUpdating, setIsUpdating] = useState(false)

  useEffect(() => {
    setQuantity(item.quantity)
  }, [item.quantity])

  const handleQuantityChange = (newQty: number) => {
    if (newQty < 1) return
    setQuantity(newQty)
    setIsUpdating(true)
    onUpdate(item.productId, newQty)
    setIsUpdating(false)
  }

  const subtotal = item.price * item.quantity

  return (
    <TableRow>
      <TableCell>
        <Item key={item.productId} asChild role="listitem" className="p-1 hover:bg-violet-100!">
          <Link href={`/products/${item.slug}`}>
            <ItemMedia variant="image">
              {item.image != '' ? (
                <img
                  src={item.image}
                  alt={item.productName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <Icon icon="line-md:image-twotone" width="3em" height="3em" />
              )}
            </ItemMedia>
            <ItemContent>
              <ItemTitle className="line-clamp-1">{item.productName}</ItemTitle>
              <ItemDescription>
                <small>HKD</small> {item.price.toLocaleString()}
              </ItemDescription>
            </ItemContent>
          </Link>
        </Item>
      </TableCell>
      <TableCell>
        <Input
          type="number"
          min="1"
          max={item.stock}
          value={quantity}
          id={`quantity-${item.productId}`}
          name={`quantity-${item.productId}`}
          onChange={(e) => {
            const val = parseInt(e.target.value, 10)
            if (!isNaN(val) && val >= 1) {
              handleQuantityChange(val)
            }
          }}
          className="input line-height w-16 text-center"
        />
      </TableCell>
      <TableCell className="text-center">
        <Button
          variant="destructive"
          size="icon-xs"
          onClick={() => onDelete(item.productId)}
          title="移除商品"
        >
          <Icon icon="line-md:close" width="24" height="24" />
        </Button>
      </TableCell>
      <TableCell className="text-end">
        <small>HKD</small> {subtotal.toLocaleString()}
      </TableCell>
    </TableRow>
  )
}

// ===== 結帳按鈕組件（改用 form submit）=====
function CheckoutForm({
  total,
  itemCount,
  disabled,
  cartItems,
}: {
  total: number
  itemCount: number
  disabled: boolean
  cartItems: CartItem[]
}) {
  // ===== 驗證圖片 URL =====
  const isValidImageUrl = (url: string): boolean => {
    if (!url || typeof url !== 'string') return false
    if (url.trim() === '') return false
    if (url === '/placeholder.jpg') return false
    if (url.startsWith('data:')) return false
    return true
  }

  // 將購物車資料轉成 JSON（在 render 時生成）
  const cartJson = JSON.stringify(
    cartItems.map((item) => {
      const images = isValidImageUrl(item.image) ? [item.image] : []
      return {
        productId: item.productId,
        productName: item.productName,
        description: item.description || undefined,
        quantity: item.quantity,
        price: item.price,
        images: images,
      }
    }),
  )

  return (
    <form action="/apis/checkout" method="post" className="w-full">
      <input type="hidden" name="items" value={cartJson} />

      <Button
        type="submit"
        className="bg-green-500 hover:bg-green-400 w-full "
        size="lg"
        disabled={disabled}
      >
        💳 立即結帳 (${total.toLocaleString()})
      </Button>
    </form>
  )
}

// ===== 空購物車組件 =====
function EmptyCart() {
  return (
    <div className="text-center py-16 bg-base-200 rounded-2xl">
      <div className="text-6xl mb-4">🛒</div>
      <h2 className="text-2xl font-bold mb-2">購物車是空的</h2>
      <p className="text-base-content/70 mb-6">快去挑選喜歡的商品吧！</p>
      <Link href="/" className="btn btn-primary">
        前往商品列表
      </Link>
    </div>
  )
}

// ===== 主組件 =====
export default function CartPageClient() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(true)

  // 初次載入和監聽 localStorage 變化
  useEffect(() => {
    const loadCart = () => {
      const items = getCartFromStorage()
      setCartItems(items)
      setLoading(false)
    }

    loadCart()

    // 監聽其他頁籤的 localStorage 變化
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === CART_KEY) {
        loadCart()
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  // 更新數量
  const updateQuantity = (productId: string, quantity: number) => {
    setCartItems((prev) => {
      const updated = prev.map((item) =>
        item.productId === productId ? { ...item, quantity } : item,
      )
      setCartToStorage(updated)
      return updated
    })
  }

  // 刪除商品
  const deleteItem = (productId: string) => {
    setCartItems((prev) => {
      const updated = prev.filter((item) => item.productId !== productId)
      setCartToStorage(updated)
      return updated
    })
  }

  // 清空購物車
  const clearCart = () => {
    if (confirm('確定要清空購物車嗎？')) {
      setCartItems([])
      localStorage.removeItem(CART_KEY)
    }
  }

  // 計算總價
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    )
  }

  if (cartItems.length === 0) {
    return <EmptyCart />
  }

  return (
    <div>
      {/* 購物車表格 */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>商品</TableHead>
            <TableHead className="w-16 text-center">數量</TableHead>
            <TableHead className="w-10 text-center">操作</TableHead>
            <TableHead className="w-24 text-end">小計</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cartItems.map((item) => (
            <CartItemRow
              key={item.productId}
              item={item}
              onUpdate={updateQuantity}
              onDelete={deleteItem}
            />
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>合計</TableCell>
            <TableCell className="text-right">
              <small>HKD</small> {total.toLocaleString()}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>

      <div className="flex flex-col sm:flex-row gap-2 w-full">
        <div className="flex-1">
          <CheckoutForm
            total={total}
            itemCount={itemCount}
            disabled={itemCount === 0}
            cartItems={cartItems}
          />
        </div>
        <div className="flex-1">
          <Button className="bg-red-500 hover:bg-red-400 w-full" size="lg" onClick={clearCart}>
            清空購物車
          </Button>
        </div>
        <div className="flex-1">
          <Button className="w-full" size="lg">
            <Link href="/products">繼續購物</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
