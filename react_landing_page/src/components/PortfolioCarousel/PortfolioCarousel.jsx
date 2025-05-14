import { useState, useEffect } from 'react'
import './PortfolioCarousel.css'

// Dynamically import images from assets folder
const importImages = import.meta.glob('/src/assets/PortfolioCarouselSources/*.{jpeg,png}', { eager: true })

// Get image paths and links (assuming filenames are the link in this example)
const images = Object.keys(importImages).map((path) => ({
  src: importImages[path].default,
  link: `https://example.com/${path.split('/').pop()?.split('.')[0]}`
}))

function PortfolioCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
      }, 3000)
      return () => clearInterval(interval)
    }
  }, [isHovered])

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  return (
    <div
      className="portfolio-carousel"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {images.length > 0 && (
  <div className="carousel-wrapper">
    <a href={images[currentIndex].link} target="_blank" rel="noopener noreferrer">
      <img
        src={images[currentIndex].src}
        alt={`Portfolio item ${currentIndex + 1}`}
        className="carousel-image"
      />
    </a>
  </div>
  )}

      <div className="arrows">
        <button className="arrow left" onClick={handlePrev}>←</button>
        <button className="arrow right" onClick={handleNext}>→</button>
      </div>
    </div>
  )
}

export default PortfolioCarousel
