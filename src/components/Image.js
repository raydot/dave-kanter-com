import React from 'react'

const CustomImage = ({ fileName, alt, width = 800, height = 600, className, style }) => {
  // Handle null/empty filenames
  if (!fileName || fileName === "null") {
    return (
      <div 
        style={{ 
          ...style, 
          backgroundColor: '#f0f0f0', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          minHeight: '200px',
          color: '#666'
        }}
        className={className}
      >
        No image available
      </div>
    )
  }

  // Check if WebP version exists, fallback to original
  const webpSrc = `/images/${fileName.replace(/\.(png|jpg|jpeg)$/i, '.webp')}`
  const originalSrc = `/images/${fileName}`

  return (
    <figure className={className} style={style}>
      <picture>
        <source srcSet={webpSrc} type="image/webp" />
        <img 
          src={originalSrc}
          alt={alt || ''} 
          width={width}
          height={height}
          loading="lazy"
          style={{ maxWidth: '100%', height: 'auto' }}
        />
      </picture>
    </figure>
  )
}

export default CustomImage
