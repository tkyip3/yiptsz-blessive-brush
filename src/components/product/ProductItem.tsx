// src/components/ProductItem.tsx
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { Product } from '@/payload-types'

import { Icon } from '@iconify/react'

import { Badge } from '@/components/ui/badge'

export default function ProductItem({ product }: { product: Product }) {
  const p = product

  return (
    <Link href={`/products/${p.slug}`} key={p.id} className="products-item">
      <div className="item-title">{p.name}</div>
      <div className="item-img">
        {p.images &&
          (p.images.length > 0 ? (
            <figure className="img-wrapper">
              {typeof p.images[0].image === 'object' && p.images[0].image?.url && (
                <Image
                  src={p.images[0].image.url}
                  alt={p.name}
                  fill
                  className={`object-cover ${p.stock == 0 && 'grayscale'}`}
                  unoptimized
                />
              )}
            </figure>
          ) : (
            <figure className="img-wrapper wrapper-icon">
              <Icon icon="line-md:image-twotone" width="6em" height="6em" />
            </figure>
          ))}
      </div>

      <div className="item-main">
        <div className="item-price">
          {p.currency.toUpperCase()} {p.price}
        </div>
        {p.stock > 0 ? (
          <Badge className="bg-green-500">有現貨</Badge>
        ) : (
          <Badge className="bg-red-500">售罄</Badge>
        )}
      </div>
    </Link>
  )
}
