// src/components/ProductItem.tsx
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { Event } from '@/payload-types'

import { Icon } from '@iconify/react'

import { Badge } from '@/components/ui/badge'

export default function EventItem({ event }: { event: Event }) {
  const e = event

  return (
    <Link href={`/events/${e.slug}`} key={e.id} className="events-item">
      <div className="item-img">
        {e.images &&
          (e.images.length > 0 ? (
            <figure className="img-wrapper">
              {typeof e.images[0].image === 'object' && e.images[0].image?.url && (
                <Image
                  src={e.images[0].image.url}
                  alt={e.name}
                  fill
                  className="object-cover"
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
      <div className="item-title">{e.name}</div>
    </Link>
  )
}
