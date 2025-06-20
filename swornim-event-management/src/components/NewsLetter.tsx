"use client"

import type React from "react"
import { useState } from "react"
import "./Newsletter.css"

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      // Handle newsletter subscription
      setIsSubscribed(true)
      setEmail("")
      setTimeout(() => setIsSubscribed(false), 3000)
    }
  }

  const benefits = [
    "🎉 Exclusive event planning tips and trends",
    "💰 Special discounts and early bird offers",
    "📅 Priority booking for popular vendors",
    "🎁 Free event planning resources and guides",
  ]

  return (
    <section className="newsletter">
      <div className="container">
        <div className="newsletter-content">
          <div className="newsletter-text">
            <h2>Stay Updated with Swornim</h2>
            <p>Join 10,000+ event planners who get exclusive tips, offers, and inspiration delivered to their inbox.</p>

            <div className="benefits-list">
              {benefits.map((benefit, index) => (
                <div key={index} className="benefit-item">
                  {benefit}
                </div>
              ))}
            </div>

            <div className="social-proof">
              <div className="subscriber-count">
                <strong>10,000+</strong> subscribers already joined
              </div>
              <div className="rating">
                <div className="stars">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="star filled" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <span>Rated 4.9/5 by subscribers</span>
              </div>
            </div>
          </div>

          <div className="newsletter-form-container">
            <form onSubmit={handleSubmit} className="newsletter-form">
              <h3>Get Started Today</h3>
              <div className="form-group">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="email-input"
                  required
                />
                <button type="submit" className="subscribe-btn" disabled={isSubscribed}>
                  {isSubscribed ? "Subscribed! ✓" : "Subscribe Free"}
                </button>
              </div>
              <p className="form-note">
                No spam, unsubscribe anytime. Read our{" "}
                <a href="/privacy" target="_blank" rel="noreferrer">
                  Privacy Policy
                </a>
              </p>
            </form>

            <div className="trust-indicators">
              <div className="trust-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 12l2 2 4-4"></path>
                  <circle cx="12" cy="12" r="10"></circle>
                </svg>
                <span>100% Free</span>
              </div>
              <div className="trust-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
                <span>Secure & Private</span>
              </div>
              <div className="trust-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                </svg>
                <span>Instant Access</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Newsletter
