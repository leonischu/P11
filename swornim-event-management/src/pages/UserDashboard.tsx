"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./UserDashboard.css"

const UserDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview")
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    }
    setIsLoading(false)
  }, [])

  // Redirect if not logged in
  useEffect(() => {
    if (!isLoading && (!user || !user.isAuthenticated)) {
      navigate("/login")
    }
  }, [user, isLoading, navigate])

  const bookings = [
    {
      id: 1,
      service: "Wedding Photography",
      vendor: "Pixel Perfect Studios",
      date: "2024-04-15",
      status: "confirmed",
      amount: 25000,
      image: "/images/services/wedding-photography.jpg",
    },
    {
      id: 2,
      service: "Event Decoration",
      vendor: "Dream Decorators",
      date: "2024-04-15",
      status: "pending",
      amount: 15000,
      image: "/images/services/decoration.jpg",
    },
    {
      id: 3,
      service: "Bridal Makeup",
      vendor: "Glamour Studio",
      date: "2024-03-20",
      status: "completed",
      amount: 8000,
      image: "/images/services/makeup.jpg",
    },
  ]

  const favorites = [
    {
      id: 1,
      name: "Royal Caterers",
      service: "Catering Services",
      rating: 4.8,
      image: "/images/vendors/royal-caterers.jpg",
    },
    {
      id: 2,
      name: "Music Masters",
      service: "DJ Services",
      rating: 4.7,
      image: "/images/vendors/music-masters.jpg",
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
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12,6 12,12 16,14"></polyline>
            </svg>
          </div>
          <div className="stat-info">
            <h3>{bookings.filter((b) => b.status === "confirmed" || b.status === "pending").length}</h3>
            <p>Upcoming Events</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </div>
          <div className="stat-info">
            <h3>{favorites.length}</h3>
            <p>Favorite Vendors</p>
          </div>
        </div>
      </div>

      <div className="recent-activity">
        <h3>Recent Bookings</h3>
        <div className="activity-list">
          {bookings.slice(0, 3).map((booking) => (
            <div key={booking.id} className="activity-item">
              <img src={booking.image || "/placeholder.svg"} alt={booking.service} />
              <div className="activity-info">
                <h4>{booking.service}</h4>
                <p>{booking.vendor}</p>
                <span className="activity-date">{new Date(booking.date).toLocaleDateString()}</span>
              </div>
              <div className={`activity-status ${getStatusColor(booking.status)}`}>{booking.status}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderBookings = () => (
    <div className="bookings-content">
      <div className="bookings-header">
        <h3>My Bookings</h3>
        <Link to="/services" className="btn btn-primary">
          Book New Service
        </Link>
      </div>

      <div className="bookings-list">
        {bookings.map((booking) => (
          <div key={booking.id} className="booking-card">
            <img src={booking.image || "/placeholder.svg"} alt={booking.service} />
            <div className="booking-info">
              <h4>{booking.service}</h4>
              <p className="vendor-name">{booking.vendor}</p>
              <p className="booking-date">Date: {new Date(booking.date).toLocaleDateString()}</p>
              <p className="booking-amount">Amount: NPR {booking.amount.toLocaleString()}</p>
            </div>
            <div className="booking-actions">
              <div className={`booking-status ${getStatusColor(booking.status)}`}>{booking.status}</div>
              <div className="action-buttons">
                <button className="btn btn-outline btn-sm">View Details</button>
                {booking.status === "pending" && <button className="btn btn-secondary btn-sm">Cancel</button>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderFavorites = () => (
    <div className="favorites-content">
      <h3>Favorite Vendors</h3>
      <div className="favorites-grid">
        {favorites.map((vendor) => (
          <div key={vendor.id} className="favorite-card">
            <img src={vendor.image || "/placeholder.svg"} alt={vendor.name} />
            <div className="favorite-info">
              <h4>{vendor.name}</h4>
              <p>{vendor.service}</p>
              <div className="rating">
                <span className="stars">★★★★★</span>
                <span>{vendor.rating}</span>
              </div>
            </div>
            <div className="favorite-actions">
              <Link to={`/vendor/${vendor.id}`} className="btn btn-primary btn-sm">
                View Profile
              </Link>
              <button className="btn btn-outline btn-sm">Remove</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderProfile = () => (
    <div className="profile-content">
      <h3>Profile Settings</h3>
      <form className="profile-form">
        <div className="form-grid">
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input type="text" className="form-input" defaultValue={user?.name || ""} />
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input type="email" className="form-input" defaultValue={user?.email || ""} />
          </div>
          <div className="form-group">
            <label className="form-label">Phone</label>
            <input type="tel" className="form-input" defaultValue="+977-9841234567" />
          </div>
          <div className="form-group">
            <label className="form-label">Location</label>
            <select className="form-select">
              <option>Kathmandu</option>
              <option>Pokhara</option>
              <option>Chitwan</option>
            </select>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Update Profile
        </button>
      </form>
    </div>
  )

  if (isLoading) {
    return (
      <div className="dashboard-page">
        <div className="container">
          <div className="loading-message">
            <h2>Loading...</h2>
          </div>
        </div>
      </div>
    )
  }

  if (!user || !user.isAuthenticated) {
    return null // Will redirect in useEffect
  }

  return (
    <div className="dashboard-page">
      <div className="container">
        <div className="dashboard-header">
          <h1>Welcome back, {user.name?.split(" ")[0] || "User"}!</h1>
          <p>Manage your bookings and discover new services</p>
        </div>

        <div className="dashboard-layout">
          <aside className="dashboard-sidebar">
            <div className="user-info">
              <div className="user-avatar">
                <img src="/images/avatars/default-user.jpg" alt={user.name} />
              </div>
              <h3>{user.name || "User"}</h3>
              <p>Member since January 2024</p>
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
                className={`nav-item ${activeTab === "bookings" ? "active" : ""}`}
                onClick={() => setActiveTab("bookings")}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                My Bookings
              </button>
              <button
                className={`nav-item ${activeTab === "favorites" ? "active" : ""}`}
                onClick={() => setActiveTab("favorites")}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
                Favorites
              </button>
              <button
                className={`nav-item ${activeTab === "profile" ? "active" : ""}`}
                onClick={() => setActiveTab("profile")}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                Profile
              </button>
            </nav>
          </aside>

          <main className="dashboard-main">
            {activeTab === "overview" && renderOverview()}
            {activeTab === "bookings" && renderBookings()}
            {activeTab === "favorites" && renderFavorites()}
            {activeTab === "profile" && renderProfile()}
          </main>
        </div>
      </div>
    </div>
  )
}

export default UserDashboard
