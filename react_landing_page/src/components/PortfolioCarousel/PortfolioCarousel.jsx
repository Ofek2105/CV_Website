import { useState, useEffect } from 'react'
import './PortfolioCarousel.css'

const importImages = import.meta.glob('/src/assets/PortfolioCarouselSources/*.{jpeg,png}', { eager: true })

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
        <div className="carousel-track-wrapper">
          <div
            className="carousel-track"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
              transition: 'transform 0.6s ease'
            }}
          >
            {images.map((img, idx) => (
              <div key={idx} className="carousel-slide">
                <a href={img.link} target="_blank" rel="noopener noreferrer">
                  <img src={img.src} alt={`Portfolio ${idx + 1}`} />
                </a>
              </div>
            ))}
          </div>
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
