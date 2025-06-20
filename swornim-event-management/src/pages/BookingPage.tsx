"use client"

import type React from "react"
import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import "./BookingPage.css"

const BookingPage: React.FC = () => {
  const { serviceId } = useParams()
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(1)
  const [bookingData, setBookingData] = useState({
    date: "",
    time: "",
    duration: "",
    guests: "",
    venue: "",
    specialRequests: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    paymentMethod: "khalti",
  })

  // Mock service data - in real app, fetch based on serviceId
  const service = {
    id: serviceId,
    title: "Professional Wedding Photography",
    vendor: "Pixel Perfect Studios",
    image: "/images/services/wedding-photography.jpg",
    price: 25000,
    rating: 4.9,
    reviews: 156,
    description: "Capture your special moments with experienced wedding photographers",
    features: [
      "Professional photographer and assistant",
      "High-resolution edited photos",
      "Online gallery for sharing",
      "USB drive with all photos",
      "2-3 hours coverage",
    ],
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setBookingData({
      ...bookingData,
      [e.target.name]: e.target.value,
    })
  }

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    // Handle booking submission
    alert("Booking submitted successfully! You will be redirected to payment.")
    navigate("/dashboard")
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="step-content">
            <h3>Event Details</h3>
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Event Date *</label>
                <input
                  type="date"
                  name="date"
                  value={bookingData.date}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Event Time *</label>
                <select name="time" value={bookingData.time} onChange={handleChange} className="form-select" required>
                  <option value="">Select time</option>
                  <option value="morning">Morning (6:00 AM - 12:00 PM)</option>
                  <option value="afternoon">Afternoon (12:00 PM - 6:00 PM)</option>
                  <option value="evening">Evening (6:00 PM - 12:00 AM)</option>
                  <option value="full-day">Full Day (6:00 AM - 12:00 AM)</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Duration *</label>
                <select
                  name="duration"
                  value={bookingData.duration}
                  onChange={handleChange}
                  className="form-select"
                  required
                >
                  <option value="">Select duration</option>
                  <option value="2-3">2-3 hours</option>
                  <option value="4-6">4-6 hours</option>
                  <option value="8">8 hours</option>
                  <option value="full-day">Full day</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Number of Guests</label>
                <input
                  type="number"
                  name="guests"
                  value={bookingData.guests}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Approximate number"
                />
              </div>

              <div className="form-group full-width">
                <label className="form-label">Venue/Location *</label>
                <input
                  type="text"
                  name="venue"
                  value={bookingData.venue}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Enter venue name or address"
                  required
                />
              </div>

              <div className="form-group full-width">
                <label className="form-label">Special Requests</label>
                <textarea
                  name="specialRequests"
                  value={bookingData.specialRequests}
                  onChange={handleChange}
                  className="form-textarea"
                  rows={4}
                  placeholder="Any special requirements or requests..."
                />
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="step-content">
            <h3>Contact Information</h3>
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input
                  type="text"
                  name="contactName"
                  value={bookingData.contactName}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email Address *</label>
                <input
                  type="email"
                  name="contactEmail"
                  value={bookingData.contactEmail}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Phone Number *</label>
                <input
                  type="tel"
                  name="contactPhone"
                  value={bookingData.contactPhone}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="+977-XXXXXXXXXX"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Payment Method *</label>
                <select
                  name="paymentMethod"
                  value={bookingData.paymentMethod}
                  onChange={handleChange}
                  className="form-select"
                  required
                >
                  <option value="khalti">Khalti</option>
                  <option value="esewa">eSewa</option>
                  <option value="bank">Bank Transfer</option>
                  <option value="cash">Cash on Service</option>
                </select>
              </div>
            </div>

            <div className="payment-info">
              <h4>Payment Information</h4>
              <div className="payment-details">
                <div className="payment-item">
                  <span>Service Fee:</span>
                  <span>NPR {service.price.toLocaleString()}</span>
                </div>
                <div className="payment-item">
                  <span>Platform Fee (5%):</span>
                  <span>NPR {Math.round(service.price * 0.05).toLocaleString()}</span>
                </div>
                <div className="payment-item total">
                  <span>Total Amount:</span>
                  <span>NPR {Math.round(service.price * 1.05).toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="step-content">
            <h3>Booking Summary</h3>
            <div className="booking-summary">
              <div className="summary-section">
                <h4>Service Details</h4>
                <div className="summary-item">
                  <span>Service:</span>
                  <span>{service.title}</span>
                </div>
                <div className="summary-item">
                  <span>Vendor:</span>
                  <span>{service.vendor}</span>
                </div>
                <div className="summary-item">
                  <span>Date:</span>
                  <span>{bookingData.date}</span>
                </div>
                <div className="summary-item">
                  <span>Time:</span>
                  <span>{bookingData.time}</span>
                </div>
                <div className="summary-item">
                  <span>Duration:</span>
                  <span>{bookingData.duration} hours</span>
                </div>
                <div className="summary-item">
                  <span>Venue:</span>
                  <span>{bookingData.venue}</span>
                </div>
              </div>

              <div className="summary-section">
                <h4>Contact Information</h4>
                <div className="summary-item">
                  <span>Name:</span>
                  <span>{bookingData.contactName}</span>
                </div>
                <div className="summary-item">
                  <span>Email:</span>
                  <span>{bookingData.contactEmail}</span>
                </div>
                <div className="summary-item">
                  <span>Phone:</span>
                  <span>{bookingData.contactPhone}</span>
                </div>
              </div>

              <div className="summary-section">
                <h4>Payment Summary</h4>
                <div className="summary-item">
                  <span>Payment Method:</span>
                  <span className="capitalize">{bookingData.paymentMethod}</span>
                </div>
                <div className="summary-item total">
                  <span>Total Amount:</span>
                  <span>NPR {Math.round(service.price * 1.05).toLocaleString()}</span>
                </div>
              </div>

              <div className="terms-section">
                <label className="checkbox-label">
                  <input type="checkbox" required />
                  <span>
                    I agree to the{" "}
                    <a href="/terms" target="_blank" rel="noreferrer">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="/cancellation" target="_blank" rel="noreferrer">
                      Cancellation Policy
                    </a>
                  </span>
                </label>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="booking-page">
      <div className="container">
        <div className="booking-layout">
          {/* Service Info Sidebar */}
          <aside className="service-sidebar">
            <div className="service-card">
              <img src={service.image || "/placeholder.svg"} alt={service.title} />
              <div className="service-info">
                <h3>{service.title}</h3>
                <p className="vendor-name">{service.vendor}</p>
                <div className="service-rating">
                  <div className="stars">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`star ${i < Math.floor(service.rating) ? "filled" : ""}`}
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>
                  <span>
                    {service.rating} ({service.reviews} reviews)
                  </span>
                </div>
                <div className="service-price">
                  Starting from <strong>NPR {service.price.toLocaleString()}</strong>
                </div>
              </div>

              <div className="service-features">
                <h4>What's Included:</h4>
                <ul>
                  {service.features.map((feature, index) => (
                    <li key={index}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 12l2 2 4-4"></path>
                        <circle cx="12" cy="12" r="10"></circle>
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>

          {/* Booking Form */}
          <main className="booking-main">
            <div className="booking-header">
              <h1>Book {service.title}</h1>
              <p>Fill in the details below to book this service</p>
            </div>

            {/* Progress Steps */}
            <div className="progress-steps">
              {[1, 2, 3].map((step) => (
                <div
                  key={step}
                  className={`step ${currentStep >= step ? "active" : ""} ${currentStep > step ? "completed" : ""}`}
                >
                  <div className="step-number">{step}</div>
                  <div className="step-label">
                    {step === 1 && "Event Details"}
                    {step === 2 && "Contact & Payment"}
                    {step === 3 && "Review & Confirm"}
                  </div>
                </div>
              ))}
            </div>

            {/* Step Content */}
            <div className="booking-form">
              {renderStepContent()}

              {/* Navigation Buttons */}
              <div className="form-actions">
                {currentStep > 1 && (
                  <button type="button" onClick={prevStep} className="btn btn-outline">
                    Previous
                  </button>
                )}

                {currentStep < 3 ? (
                  <button type="button" onClick={nextStep} className="btn btn-primary">
                    Next Step
                  </button>
                ) : (
                  <button type="button" onClick={handleSubmit} className="btn btn-primary">
                    Confirm Booking & Pay
                  </button>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default BookingPage
