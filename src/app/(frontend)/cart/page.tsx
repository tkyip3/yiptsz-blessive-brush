// src/app/(frontend)/cart/page.tsx
import CartPageClient from '@/components/cart/CartPageClient'

export default function CartPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">購物車</h1>
      <CartPageClient />
    </div>
  )
}
