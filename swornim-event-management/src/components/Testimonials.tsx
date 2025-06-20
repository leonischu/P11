"use client"

import type React from "react"
import { useState, useEffect } from "react"
import "./Testimonials.css"

const Testimonials: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const testimonials = [
    {
      id: 1,
      name: "Priya Sharma",
      role: "Bride",
      event: "Wedding",
      image: "../../public/images/tpriya.jpg",
      rating: 5,
      text: "Swornim made our wedding absolutely perfect! From finding the best photographer to coordinating with decorators, everything was seamless. The team understood our vision and brought it to life beautifully.",
      location: "Kathmandu",
    },
    {
      id: 2,
      name: "Rajesh Thapa",
      role: "Event Organizer",
      event: "Corporate Event",
      image: "../../public/images/trajesh.jpg",
      rating: 5,
      text: "We organized our company annual event through Swornim and it was outstanding. The platform made it easy to find reliable vendors and the booking process was smooth. Highly recommended!",
      location: "Pokhara",
    },
    {
      id: 3,
      name: "Sunita Rai",
      role: "Mother",
      event: "Birthday Party",
      image: "../../public/images/tsunita.jpg",
      rating: 5,
      text: "My daughter's 16th birthday party was magical thanks to Swornim. The decorators and caterers they connected us with were professional and creative. Everything was within our budget too!",
      location: "Lalitpur",
    },
    {
      id: 4,
      name: "Amit Gurung",
      role: "Groom",
      event: "Wedding",
      image: "../../public/images/tamit.jpg",
      rating: 5,
      text: "Planning our wedding was stress-free with Swornim. The variety of vendors available and the easy comparison feature helped us make the right choices. Our special day was everything we dreamed of.",
      location: "Chitwan",
    },
    {
      id: 5,
      name: "Maya Shrestha",
      role: "Event Planner",
      event: "Multiple Events",
      image: "../../public/images/tmaya.jpg",
      rating: 5,
      text: "As a professional event planner, I use Swornim regularly to find quality vendors. The platform saves me time and my clients love the variety of options available. It's become an essential tool for my business.",
      location: "Bhaktapur",
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [testimonials.length])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="testimonials">
      <div className="container">
        <div className="section-header">
          <h2>What Our Clients Say</h2>
          <p>Real stories from real customers who made their events unforgettable with Swornim</p>
        </div>

        <div className="testimonials-slider">
          <div className="testimonials-container">
            {testimonials.map((testimonial, index) => (
              <div key={testimonial.id} className={`testimonial-slide ${index === currentSlide ? "active" : ""}`}>
                <div className="testimonial-content">
                  <div className="testimonial-text">
                    <div className="quote-icon">
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-10zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
                      </svg>
                    </div>
                    <p>"{testimonial.text}"</p>
                  </div>

                  <div className="testimonial-author">
                    <div className="author-image">
                      <img src={testimonial.image || "/placeholder.svg"} alt={testimonial.name} />
                    </div>
                    <div className="author-info">
                      <h4>{testimonial.name}</h4>
                      <p>
                        {testimonial.role} • {testimonial.event}
                      </p>
                      <div className="author-location">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                          <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                        {testimonial.location}
                      </div>
                    </div>
                    <div className="testimonial-rating">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <svg
                          key={i}
                          className="star filled"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="slider-controls">
            <button className="slider-btn prev" onClick={prevSlide} aria-label="Previous testimonial">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15,18 9,12 15,6"></polyline>
              </svg>
            </button>
            <button className="slider-btn next" onClick={nextSlide} aria-label="Next testimonial">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9,18 15,12 9,6"></polyline>
              </svg>
            </button>
          </div>

          <div className="slider-dots">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === currentSlide ? "active" : ""}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
