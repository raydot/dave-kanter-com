import React from 'react'
import Image from 'next/image'

const OptimizedImage = ({
  src,
  alt = '',
  width,
  height,
  priority = false,
  loading = 'lazy',
  className = '',
  style = {},
}) => {
  // Next.js Image component automatically handles:
  // - WebP/AVIF format conversion
  // - Responsive sizing
  // - Lazy loading
  // - CDN optimization via Netlify

  const imageProps = {
    src,
    width,
    height,
    priority,
    className,
    style: { maxWidth: '100%', height: 'auto', ...style },
    sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  }

  // Only add loading prop when priority is false
  if (!priority) {
    imageProps.loading = loading
  }

  return <Image {...imageProps} alt={alt || ''} />
}

export default OptimizedImage
