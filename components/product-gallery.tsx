"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import type { Product } from "@/lib/types"

interface ProductGalleryProps {
  product: Product
}

export function ProductGallery({ product }: ProductGalleryProps) {
  const images = [product.image_url, ...(product.gallery_images || [])].filter(Boolean)

  const [currentImage, setCurrentImage] = useState(0)
  const [direction, setDirection] = useState(0)
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set())

  const nextImage = () => {
    setDirection(1)
    setCurrentImage((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setDirection(-1)
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length)
  }

  const handleImageError = (index: number) => {
    setImageErrors((prev) => new Set([...prev, index]))
  }

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  }

  return (
    <div className="space-y-6">
      {/* Main Image */}
      <div className="relative aspect-square overflow-hidden group border border-gray-100">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentImage}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="absolute inset-0"
          >
            <Image
              src={images[currentImage] || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover"
              priority
              onError={() => handleImageError(currentImage)}
            />
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              className="absolute left-4 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity w-10 h-10 bg-white/90 hover:bg-white flex items-center justify-center text-black text-lg font-light border border-gray-200 z-10"
              onClick={prevImage}
            >
              ←
            </button>
            <button
              className="absolute right-4 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity w-10 h-10 bg-white/90 hover:bg-white flex items-center justify-center text-black text-lg font-light border border-gray-200 z-10"
              onClick={nextImage}
            >
              →
            </button>
          </>
        )}

        {/* Image Counter */}
        {images.length > 1 && (
          <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 text-xs font-light text-black z-10">
            {currentImage + 1} / {images.length}
          </div>
        )}

        {/* Image Indicator Dots */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
            {images.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentImage ? "bg-black" : "bg-white/60 hover:bg-white/80"
                }`}
                onClick={() => {
                  setDirection(index > currentImage ? 1 : -1)
                  setCurrentImage(index)
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Thumbnail Grid */}
      {images.length > 1 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {images.map((image, index) => (
            <div
              key={index}
              className={`relative aspect-square overflow-hidden cursor-pointer border transition-all duration-200 ${
                index === currentImage
                  ? "border-black shadow-sm"
                  : "border-gray-200 hover:border-gray-400 hover:shadow-sm"
              }`}
              onClick={() => {
                setDirection(index > currentImage ? 1 : -1)
                setCurrentImage(index)
              }}
            >
              <Image
                src={image || "/placeholder.svg"}
                alt={`${product.name} view ${index + 1}`}
                fill
                className="object-cover"
                onError={() => handleImageError(index)}
              />
              <div
                className={`absolute inset-0 transition-opacity ${
                  index === currentImage ? "bg-black/0" : "hover:bg-black/5"
                }`}
              />
              {imageErrors.has(index) && (
                <div className="absolute inset-0 bg-red-100 flex items-center justify-center text-xs text-red-600">
                  Failed
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
