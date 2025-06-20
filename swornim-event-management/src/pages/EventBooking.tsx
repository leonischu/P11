"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import "./EventBooking.css"

interface Event {
  id: number
  title: string
  date: string
  time: string
  location: string
  description: string
  image: string
  price: number
  category: string
  organizer: string
  capacity: number
  availableTickets: number
}

const EventBooking: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>()
  const navigate = useNavigate()
  const [event, setEvent] = useState<Event | null>(null)
  const [currentStep, setCurrentStep] = useState(1)
  const [bookingData, setBookingData] = useState({
    tickets: 1,
    ticketType: "general",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    specialRequests: "",
  })
  const [isLoading, setIsLoading] = useState(false)

  // Mock event data
  const events: Event[] = [
    {
      id: 1,
      title: "Tech Conference 2024",
      date: "2024-03-15",
      time: "09:00 AM",
      location: "Kathmandu Convention Center",
      description: "Annual technology conference featuring latest innovations",
      image: "/placeholder.svg?height=300&width=400",
      price: 2500,
      category: "Conference",
      organizer: "Tech Nepal",
      capacity: 500,
      availableTickets: 150,
    },
    {
      id: 2,
      title: "Music Festival",
      date: "2024-04-20",
      time: "06:00 PM",
      location: "Tundikhel Ground",
      description: "Live music festival with local and international artists",
      image: "/placeholder.svg?height=300&width=400",
      price: 1500,
      category: "Music",
      organizer: "Music Events Nepal",
      capacity: 2000,
      availableTickets: 800,
    },
  ]

  useEffect(() => {
    if (eventId) {
      const foundEvent = events.find((e) => e.id === Number.parseInt(eventId))
      setEvent(foundEvent || null)
    }
  }, [eventId])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setBookingData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleKhaltiPayment = async () => {
    setIsLoading(true)

    // Simulate Khalti payment integration
    try {
      // In real implementation, you would integrate with Khalti SDK
      const totalAmount = event!.price * bookingData.tickets * 100 // Convert to paisa

      // Mock payment success
      setTimeout(() => {
        alert("Payment successful! Your tickets have been booked.")
        navigate("/dashboard")
      }, 2000)
    } catch (error) {
      alert("Payment failed. Please try again.")
      setIsLoading(false)
    }
  }

  if (!event) {
    return (
      <div className="event-booking-page">
        <div className="container">
          <div className="error-message">
            <h2>Event not found</h2>
            <p>The event you're looking for doesn't exist.</p>
            <button onClick={() => navigate("/events")} className="btn btn-primary">
              Back to Events
            </button>
          </div>
        </div>
      </div>
    )
  }

  const totalPrice = event.price * bookingData.tickets

  return (
    <div className="event-booking-page">
      <div className="container">
        <div className="booking-layout">
          {/* Event Details Sidebar */}
          <div className="event-details-sidebar">
            <div className="event-card">
              <img src={event.image || "/placeholder.svg"} alt={event.title} className="event-image" />
              <div className="event-info">
                <h3>{event.title}</h3>
                <div className="event-meta">
                  <div className="meta-item">
                    <span className="label">Date:</span>
                    <span className="value">{new Date(event.date).toLocaleDateString()}</span>
                  </div>
                  <div className="meta-item">
                    <span className="label">Time:</span>
                    <span className="value">{event.time}</span>
                  </div>
                  <div className="meta-item">
                    <span className="label">Location:</span>
                    <span className="value">{event.location}</span>
                  </div>
                  <div className="meta-item">
                    <span className="label">Organizer:</span>
                    <span className="value">{event.organizer}</span>
                  </div>
                </div>
                <p className="event-description">{event.description}</p>
              </div>
            </div>

            {/* Booking Summary */}
            <div className="booking-summary">
              <h4>Booking Summary</h4>
              <div className="summary-item">
                <span>Ticket Type:</span>
                <span>{bookingData.ticketType === "general" ? "General" : "VIP"}</span>
              </div>
              <div className="summary-item">
                <span>Number of Tickets:</span>
                <span>{bookingData.tickets}</span>
              </div>
              <div className="summary-item">
                <span>Price per Ticket:</span>
                <span>NPR {event.price.toLocaleString()}</span>
              </div>
              <div className="summary-item total">
                <span>Total Amount:</span>
                <span>NPR {totalPrice.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div className="booking-form-container">
            <div className="step-indicator">
              <div className={`step ${currentStep >= 1 ? "active" : ""}`}>
                <span className="step-number">1</span>
                <span className="step-label">Ticket Selection</span>
              </div>
              <div className={`step ${currentStep >= 2 ? "active" : ""}`}>
                <span className="step-number">2</span>
                <span className="step-label">Contact Information</span>
              </div>
              <div className={`step ${currentStep >= 3 ? "active" : ""}`}>
                <span className="step-number">3</span>
                <span className="step-label">Payment</span>
              </div>
            </div>

            <div className="booking-form">
              {currentStep === 1 && (
                <div className="step-content">
                  <h3>Select Tickets</h3>
                  <div className="form-group">
                    <label htmlFor="ticketType">Ticket Type</label>
                    <select
                      id="ticketType"
                      name="ticketType"
                      value={bookingData.ticketType}
                      onChange={handleInputChange}
                    >
                      <option value="general">General - NPR {event.price.toLocaleString()}</option>
                      <option value="vip">VIP - NPR {(event.price * 1.5).toLocaleString()}</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="tickets">Number of Tickets</label>
                    <input
                      type="number"
                      id="tickets"
                      name="tickets"
                      min="1"
                      max="10"
                      value={bookingData.tickets}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="available-tickets">
                    <span>Available Tickets: {event.availableTickets}</span>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="step-content">
                  <h3>Contact Information</h3>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="firstName">First Name *</label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={bookingData.firstName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="lastName">Last Name *</label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={bookingData.lastName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={bookingData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={bookingData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="specialRequests">Special Requests (Optional)</label>
                    <textarea
                      id="specialRequests"
                      name="specialRequests"
                      value={bookingData.specialRequests}
                      onChange={handleInputChange}
                      rows={3}
                    />
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="step-content">
                  <h3>Payment</h3>
                  <div className="payment-summary">
                    <h4>Order Summary</h4>
                    <div className="summary-details">
                      <p>
                        <strong>Event:</strong> {event.title}
                      </p>
                      <p>
                        <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
                      </p>
                      <p>
                        <strong>Tickets:</strong> {bookingData.tickets} x {bookingData.ticketType}
                      </p>
                      <p>
                        <strong>Total:</strong> NPR {totalPrice.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="payment-methods">
                    <h4>Payment Method</h4>
                    <div className="payment-option">
                      <div className="khalti-payment">
                        <img src="/placeholder.svg?height=40&width=120" alt="Khalti" className="khalti-logo" />
                        <p>Pay securely with Khalti</p>
                        <button
                          onClick={handleKhaltiPayment}
                          disabled={isLoading}
                          className="btn btn-primary khalti-btn"
                        >
                          {isLoading ? "Processing..." : `Pay NPR ${totalPrice.toLocaleString()} with Khalti`}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="form-actions">
                {currentStep > 1 && (
                  <button onClick={handlePrevStep} className="btn btn-outline">
                    Previous
                  </button>
                )}
                {currentStep < 3 && (
                  <button onClick={handleNextStep} className="btn btn-primary">
                    Next
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventBooking
