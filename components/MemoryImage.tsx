import Image from 'next/image'
import { useState, useEffect } from 'react'

interface MemoryImageProps {
  image: File | string
  alt: string
}

export default function MemoryImage({ image, alt }: MemoryImageProps) {
  const [imageSrc, setImageSrc] = useState<string>('')

  useEffect(() => {
    if (image instanceof File) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setImageSrc(e.target?.result as string)
      }
      reader.readAsDataURL(image)
    } else {
      setImageSrc(image)
    }
  }, [image])

  if (!imageSrc) {
    return null
  }

  return (
    <Image
      src={imageSrc}
      alt={alt}
      layout="fill"
      objectFit="cover"
      className="transition-transform duration-300 group-hover:scale-110"
    />
  )
}

