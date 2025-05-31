"use client"

import { useState } from "react"
import Image from "next/image"
import { ImageOff } from "lucide-react"

interface ImageWithFallbackProps {
  src: string
  alt: string
  fill?: boolean
  width?: number
  height?: number
  className?: string
  sizes?: string
  loading?: "lazy" | "eager"
  priority?: boolean
}

const DEFAULT_PRODUCT_IMAGE =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMDAgMTUwQzE4Ni4xOSAxNTAgMTc1IDE2MS4xOSAxNzUgMTc1QzE3NSAxODguODEgMTg2LjE5IDIwMCAyMDAgMjAwQzIxMy44MSAyMDAgMjI1IDE4OC44MSAyMjUgMTc1QzIyNSAxNjEuMTkgMjEzLjgxIDE1MCAyMDAgMTUwWiIgZmlsbD0iIzlDQTNBRiIvPgo8cGF0aCBkPSJNMTI1IDI1MEgzMDBMMjc1IDIwMEwyMjUgMjI1TDE3NSAyMDBMMTI1IDI1MFoiIGZpbGw9IiM5Q0EzQUYiLz4KPC9zdmc+"

export default function ImageWithFallback({
  src,
  alt,
  fill,
  width,
  height,
  className = "",
  sizes,
  loading = "lazy",
  priority = false,
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src)
  const [hasError, setHasError] = useState(false)

  const handleError = () => {
    if (!hasError) {
      setHasError(true)
      setImgSrc(DEFAULT_PRODUCT_IMAGE)
    }
  }

  const handleLoad = () => {
    setHasError(false)
  }

  // If the image has errored and we're using the fallback, show a custom placeholder
  if (hasError && imgSrc === DEFAULT_PRODUCT_IMAGE) {
    return (
      <div
        className={`bg-gray-100 flex items-center justify-center ${className}`}
        style={{ width: width, height: height }}
      >
        <div className="text-center text-gray-400 p-4">
          <ImageOff className="w-12 h-12 mx-auto mb-2" />
          <p className="text-sm font-medium">Image not available</p>
        </div>
      </div>
    )
  }

  const imageProps = {
    src: imgSrc,
    alt,
    className,
    onError: handleError,
    onLoad: handleLoad,
    loading,
    priority,
    sizes,
  }

  if (fill) {
    return <Image {...imageProps} fill />
  }

  return <Image {...imageProps} width={width} height={height} />
}
