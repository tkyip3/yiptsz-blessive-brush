'use client'

import React, { useRef, useEffect, ReactNode } from 'react'
import VanillaTilt from 'vanilla-tilt'

const Tilt = ({
  children,
  options = {},
  className,
}: {
  children?: ReactNode
  options?: Record<string, unknown>
  className?: string
}) => {
  const tiltRef = useRef(null)

  useEffect(() => {
    const { current: tiltNode } = tiltRef
    if (tiltNode) {
      VanillaTilt.init(tiltNode, options)
    }
  }, [options])

  return (
    <div className={className} ref={tiltRef}>
      {children}
    </div>
  )
}

export default Tilt
