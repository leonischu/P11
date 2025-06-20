"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import SearchBar from "./SearchBar"
import "./Hero.css"

const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      id: 1,
      image: "../../public/images/wedding.jpg",
      title: "Perfect Wedding Celebrations",
      subtitle: "Create magical moments with our expert wedding planners and vendors",
      cta: "Plan Your Wedding",
      link: "/services?category=wedding",
    },
    {
      id: 2,
      image: "../../public/images/birthday.jpg",
      title: "Unforgettable Birthday Parties",
      subtitle: "Make every birthday special with creative themes and professional services",
      cta: "Plan Birthday Party",
      link: "/services?category=birthday",
    },
    {
      id: 3,
      image: "../../public/images/corporate.jpg",
      title: "Professional Corporate Events",
      subtitle: "Elevate your business events with our comprehensive corporate solutions",
      cta: "Plan Corporate Event",
      link: "/services?category=corporate",
    },
    {
      id: 4,
      image: "../../public/images/liveevent.jpg",
      title: "Amazing Live Events",
      subtitle: "Book tickets for concerts, shows and live performances across Nepal",
      cta: "Browse Live Events",
      link: "/events",
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [slides.length])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <section className="hero">
      <div className="hero-slider">
        {slides.map((slide, index) => (
          <div key={slide.id} className={`hero-slide ${index === currentSlide ? "active" : ""}`}>
            <div className="hero-background">
              <img src={slide.image || "/placeholder.svg"} alt={slide.title} className="hero-bg-image" />
              <div className="hero-overlay"></div>
            </div>

            <div className="hero-content">
              <div className="container">
                <div className="hero-text fade-in">
                  <h1 className="hero-title">{slide.title}</h1>
                  <p className="hero-subtitle">{slide.subtitle}</p>
                  <div className="hero-actions">
                    <Link to={slide.link} className="btn btn-primary btn-lg">
                      {slide.cta}
                    </Link>
                    <Link to="/vendor-registration" className="btn btn-primary btn-lg">
                      Become a Vendor
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Slider Controls */}
        <div className="slider-controls">
          <button className="slider-btn prev" onClick={prevSlide} aria-label="Previous slide">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15,18 9,12 15,6"></polyline>
            </svg>
          </button>
          <button className="slider-btn next" onClick={nextSlide} aria-label="Next slide">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9,18 15,12 9,6"></polyline>
            </svg>
          </button>
        </div>

        {/* Slider Dots */}
        <div className="slider-dots">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentSlide ? "active" : ""}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Search Section */}
      <div className="hero-search-section">
        <div className="container">
          <div className="search-wrapper">
            <h3>Find Your Perfect Event Service</h3>
            <SearchBar />
          </div>
        </div>
      </div>

      {/* Quick Categories */}
      <div className="hero-categories">
        <div className="container">
          <div className="categories-grid">
            <Link to="/services?category=wedding" className="category-card">
              <div className="category-icon">
                <img src="../../public/images/iweddings.png" alt="Wedding" />
              </div>
              <h4>Weddings</h4>
              <p>Complete wedding solutions</p>
            </Link>
            <Link to="/services?category=birthday" className="category-card">
              <div className="category-icon">
                <img src="../../public/images/ibirthdays.png" alt="Birthday" />
              </div>
              <h4>Birthdays</h4>
              <p>Memorable celebrations</p>
            </Link>
            <Link to="/services?category=corporate" className="category-card">
              <div className="category-icon">
                <img src="../../public/images/icorporate.png" alt="Corporate" />
              </div>
              <h4>Corporate</h4>
              <p>Professional events</p>
            </Link>
            <Link to="/events" className="category-card">
              <div className="category-icon">
                <img src="../../public/images/ilive.png" alt="Live Events" />
              </div>
              <h4>Live Events</h4>
              <p>Concerts & shows</p>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
