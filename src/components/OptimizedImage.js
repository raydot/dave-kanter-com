import React from 'react'
import Image from 'next/image'

const OptimizedImage = ({ 
  src, 
  alt, 
  width, 
  height, 
  priority = false, 
  loading = 'lazy',
  className = '',
  style = {}
}) => {
  // Generate WebP path from original src
  const webpSrc = src.replace(/\.(jpg|jpeg|png)$/i, '.webp')
  
  // When priority is true, don't set loading prop (Next.js handles it automatically)
  const imageProps = {
    src,
    alt,
    width,
    height,
    priority,
    className,
    style: { maxWidth: '100%', height: 'auto', ...style },
    sizes: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  }
  
  // Only add loading prop when priority is false
  if (!priority) {
    imageProps.loading = loading
  }
  
  return (
    <picture>
      <source srcSet={webpSrc} type="image/webp" />
      <Image {...imageProps} />
    </picture>
  )
}

export default OptimizedImage
