import React from 'react'
import Image from 'next/image'

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

  return (
    <figure className={className} style={style}>
      <Image 
        src={`/images/${fileName}`} 
        alt={alt || ''} 
        width={width}
        height={height}
      />
    </figure>
  )
}

export default CustomImage
