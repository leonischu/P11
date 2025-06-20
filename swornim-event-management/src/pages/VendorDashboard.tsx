"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import "./VendorDashboard.css"

const VendorDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview")
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    }
    setIsLoading(false)
  }, [])

  // Redirect if not logged in or not a vendor
  useEffect(() => {
    if (!isLoading && (!user || user.userType !== "vendor")) {
      window.location.href = "/login"
    }
  }, [user, isLoading])

  const services = [
    {
      id: 1,
      title: "Wedding Photography Package",
      price: 25000,
      bookings: 12,
      rating: 4.8,
      status: "active",
    },
    {
      id: 2,
      title: "Event Photography",
      price: 15000,
      bookings: 8,
      rating: 4.7,
      status: "active",
    },
    {
      id: 3,
      title: "Portrait Session",
      price: 5000,
      bookings: 5,
      rating: 4.9,
      status: "active",
    },
  ]

  const bookings = [
    {
      id: 1,
      service: "Wedding Photography Package",
      client: "Rahul Sharma",
      date: "2024-04-15",
      time: "10:00 AM",
      location: "Hotel Annapurna, Kathmandu",
      status: "confirmed",
      amount: 25000,
    },
    {
      id: 2,
      service: "Event Photography",
      client: "Priya Patel",
      date: "2024-04-20",
      time: "5:00 PM",
      location: "Hyatt Regency, Kathmandu",
      status: "pending",
      amount: 15000,
    },
    {
      id: 3,
      service: "Portrait Session",
      client: "Amit Gurung",
      date: "2024-03-25",
      time: "2:00 PM",
      location: "Studio",
      status: "completed",
      amount: 5000,
    },
  ]

  const recentMessages = [
    {
      id: 1,
      client: "Rahul Sharma",
      message: "Can we discuss the wedding photography package details?",
      time: "2 hours ago",
      unread: true,
    },
    {
      id: 2,
      client: "Priya Patel",
      message: "I need to change the event time. Is that possible?",
      time: "1 day ago",
      unread: false,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "status-confirmed"
      case "pending":
        return "status-pending"
      case "completed":
        return "status-completed"
      case "cancelled":
        return "status-cancelled"
      default:
        return ""
    }
  }

  const renderOverview = () => (
    <div className="overview-content">
      <div className="stats-cards">
        <div className="stat-card">
          <div className="stat-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
          </div>
          <div className="stat-info">
            <h3>{bookings.length}</h3>
            <p>Total Bookings</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
          </div>
          <div className="stat-info">
            <h3>4.8</h3>
            <p>Average Rating</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="1" x2="12" y2="23"></line>
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
            </svg>
          </div>
          <div className="stat-info">
            <h3>NPR {bookings.reduce((sum, booking) => sum + booking.amount, 0).toLocaleString()}</h3>
            <p>Total Revenue</p>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h3>Upcoming Bookings</h3>
          <div className="booking-list">
            {bookings
              .filter((booking) => booking.status === "confirmed" || booking.status === "pending")
              .slice(0, 3)
              .map((booking) => (
                <div key={booking.id} className="booking-item">
                  <div className="booking-info">
                    <h4>{booking.service}</h4>
                    <p>
                      <strong>Client:</strong> {booking.client}
                    </p>
                    <p>
                      <strong>Date:</strong> {new Date(booking.date).toLocaleDateString()} at {booking.time}
                    </p>
                    <p>
                      <strong>Location:</strong> {booking.location}
                    </p>
                  </div>
                  <div className={`booking-status ${getStatusColor(booking.status)}`}>{booking.status}</div>
                </div>
              ))}
          </div>
          <Link to="#" className="view-all">
            View All Bookings
          </Link>
        </div>

        <div className="dashboard-card">
          <h3>Recent Messages</h3>
          <div className="message-list">
            {recentMessages.map((message) => (
              <div key={message.id} className={`message-item ${message.unread ? "unread" : ""}`}>
                <div className="message-header">
                  <h4>{message.client}</h4>
                  <span className="message-time">{message.time}</span>
                </div>
                <p className="message-text">{message.message}</p>
                <button className="btn btn-sm btn-outline">Reply</button>
              </div>
            ))}
          </div>
          <Link to="#" className="view-all">
            View All Messages
          </Link>
        </div>
      </div>
    </div>
  )

  const renderServices = () => (
    <div className="services-content">
      <div className="services-header">
        <h3>My Services</h3>
        <button className="btn btn-primary">Add New Service</button>
      </div>

      <div className="services-table">
        <table>
          <thead>
            <tr>
              <th>Service</th>
              <th>Price (NPR)</th>
              <th>Bookings</th>
              <th>Rating</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service.id}>
                <td>{service.title}</td>
                <td>{service.price.toLocaleString()}</td>
                <td>{service.bookings}</td>
                <td>
                  <div className="rating">
                    <span className="stars">★★★★★</span>
                    <span>{service.rating}</span>
                  </div>
                </td>
                <td>
                  <span className={`status-badge ${service.status}`}>{service.status}</span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="btn btn-sm btn-outline">Edit</button>
                    <button className="btn btn-sm btn-secondary">Manage</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )

  const renderBookings = () => (
    <div className="bookings-content">
      <div className="bookings-header">
        <h3>All Bookings</h3>
        <div className="filter-options">
          <select className="form-select">
            <option value="all">All Statuses</option>
            <option value="confirmed">Confirmed</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <div className="bookings-table">
        <table>
          <thead>
            <tr>
              <th>Service</th>
              <th>Client</th>
              <th>Date & Time</th>
              <th>Location</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td>{booking.service}</td>
                <td>{booking.client}</td>
                <td>
                  {new Date(booking.date).toLocaleDateString()} <br />
                  {booking.time}
                </td>
                <td>{booking.location}</td>
                <td>NPR {booking.amount.toLocaleString()}</td>
                <td>
                  <span className={`status-badge ${booking.status}`}>{booking.status}</span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="btn btn-sm btn-outline">Details</button>
                    {booking.status === "pending" && (
                      <>
                        <button className="btn btn-sm btn-primary">Accept</button>
                        <button className="btn btn-sm btn-secondary">Decline</button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )

  const renderProfile = () => (
    <div className="profile-content">
      <h3>Business Profile</h3>
      <form className="profile-form">
        <div className="form-section">
          <h4>Business Information</h4>
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Business Name</label>
              <input type="text" className="form-input" defaultValue="Pixel Perfect Studios" />
            </div>
            <div className="form-group">
              <label className="form-label">Business Type</label>
              <select className="form-select">
                <option>Photography Studio</option>
                <option>Event Decoration</option>
                <option>Makeup Artist</option>
                <option>Catering Service</option>
              </select>
            </div>
            <div className="form-group full-width">
              <label className="form-label">Business Description</label>
              <textarea
                className="form-textarea"
                defaultValue="Professional photography services for weddings, events, and portraits in Nepal."
              ></textarea>
            </div>
          </div>
        </div>

        <div className="form-section">
          <h4>Contact Information</h4>
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Email</label>
              <input type="email" className="form-input" defaultValue="contact@pixelperfect.com" />
            </div>
            <div className="form-group">
              <label className="form-label">Phone</label>
              <input type="tel" className="form-input" defaultValue="+977-9841234567" />
            </div>
            <div className="form-group">
              <label className="form-label">City</label>
              <select className="form-select">
                <option>Kathmandu</option>
                <option>Pokhara</option>
                <option>Chitwan</option>
                <option>Lalitpur</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Address</label>
              <input type="text" className="form-input" defaultValue="Thamel, Kathmandu" />
            </div>
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          Update Profile
        </button>
      </form>
    </div>
  )

  if (isLoading) {
    return <div className="loading-screen">Loading...</div>
  }

  if (!user || user.userType !== "vendor") {
    return null // Will redirect in useEffect
  }

  return (
    <div className="dashboard-page vendor-dashboard">
      <div className="container">
        <div className="dashboard-header">
          <h1>Welcome back, {user.name || "Vendor"}!</h1>
          <p>Manage your services and bookings</p>
        </div>

        <div className="dashboard-layout">
          <aside className="dashboard-sidebar">
            <div className="user-info">
              <div className="user-avatar">
                <img src="/images/avatars/default-vendor.jpg" alt="Vendor" />
              </div>
              <h3>{user.businessName || "Pixel Perfect Studios"}</h3>
              <p className="business-type">Photography Studio</p>
            </div>

            <nav className="dashboard-nav">
              <button
                className={`nav-item ${activeTab === "overview" ? "active" : ""}`}
                onClick={() => setActiveTab("overview")}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="7" height="7"></rect>
                  <rect x="14" y="3" width="7" height="7"></rect>
                  <rect x="14" y="14" width="7" height="7"></rect>
                  <rect x="3" y="14" width="7" height="7"></rect>
                </svg>
                Overview
              </button>
              <button
                className={`nav-item ${activeTab === "services" ? "active" : ""}`}
                onClick={() => setActiveTab("services")}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
                </svg>
                My Services
              </button>
              <button
                className={`nav-item ${activeTab === "bookings" ? "active" : ""}`}
                onClick={() => setActiveTab("bookings")}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                Bookings
              </button>
              <button
                className={`nav-item ${activeTab === "profile" ? "active" : ""}`}
                onClick={() => setActiveTab("profile")}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                Business Profile
              </button>
            </nav>
          </aside>

          <main className="dashboard-main">
            {activeTab === "overview" && renderOverview()}
            {activeTab === "services" && renderServices()}
            {activeTab === "bookings" && renderBookings()}
            {activeTab === "profile" && renderProfile()}
          </main>
        </div>
      </div>
    </div>
  )
}

export default VendorDashboard
