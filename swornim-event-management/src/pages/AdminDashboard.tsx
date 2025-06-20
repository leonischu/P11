"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "./AdminDashboard.css"

const AdminDashboard: React.FC = () => {
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

  // Redirect if not logged in or not admin
  useEffect(() => {
    if (!isLoading && (!user || user.userType !== "admin")) {
      navigate("/login")
    }
  }, [user, isLoading, navigate])

  const stats = {
    totalUsers: 10500,
    totalVendors: 450,
    totalBookings: 2800,
    revenue: 1250000,
    pendingApprovals: 12,
    activeEvents: 45,
  }

  const recentBookings = [
    {
      id: 1,
      customer: "John Doe",
      service: "Wedding Photography",
      vendor: "Pixel Perfect Studios",
      amount: 25000,
      status: "confirmed",
      date: "2024-04-15",
    },
    {
      id: 2,
      customer: "Jane Smith",
      service: "Event Decoration",
      vendor: "Dream Decorators",
      amount: 15000,
      status: "pending",
      date: "2024-04-16",
    },
  ]

  const pendingVendors = [
    {
      id: 1,
      name: "Royal Photography",
      type: "Photography Studio",
      owner: "Ram Sharma",
      submittedDate: "2024-03-10",
      status: "pending",
      email: "ram@royalphoto.com",
      phone: "+977-9841234567",
      location: "Kathmandu",
    },
    {
      id: 2,
      name: "Elite Decorators",
      type: "Event Decoration",
      owner: "Sita Patel",
      submittedDate: "2024-03-12",
      status: "pending",
      email: "sita@elitedecorators.com",
      phone: "+977-9851234567",
      location: "Pokhara",
    },
    {
      id: 3,
      name: "Melody Music",
      type: "DJ Services",
      owner: "Raj Kumar",
      submittedDate: "2024-03-14",
      status: "pending",
      email: "raj@melodymusic.com",
      phone: "+977-9861234567",
      location: "Lalitpur",
    },
  ]

  const handleVendorAction = (vendorId: number, action: "approve" | "reject") => {
    // In a real app, this would make an API call
    console.log(`${action} vendor with ID: ${vendorId}`)
    alert(`Vendor ${action}d successfully!`)
  }

  const renderOverview = () => (
    <div className="admin-overview">
      <div className="admin-stats-grid">
        <div className="admin-stat-card users">
          <div className="stat-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
          </div>
          <div className="stat-info">
            <h3>{stats.totalUsers.toLocaleString()}</h3>
            <p>Total Users</p>
          </div>
        </div>

        <div className="admin-stat-card vendors">
          <div className="stat-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 12l2 2 4-4"></path>
              <path d="M21 12c.552 0 1-.448 1-1V5c0-.552-.448-1-1-1H3c-.552 0-1 .448-1 1v6c0 .552.448 1 1 1h18z"></path>
            </svg>
          </div>
          <div className="stat-info">
            <h3>{stats.totalVendors}</h3>
            <p>Active Vendors</p>
          </div>
        </div>

        <div className="admin-stat-card bookings">
          <div className="stat-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
          </div>
          <div className="stat-info">
            <h3>{stats.totalBookings.toLocaleString()}</h3>
            <p>Total Bookings</p>
          </div>
        </div>

        <div className="admin-stat-card revenue">
          <div className="stat-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="1" x2="12" y2="23"></line>
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
            </svg>
          </div>
          <div className="stat-info">
            <h3>NPR {(stats.revenue / 1000).toFixed(0)}K</h3>
            <p>Total Revenue</p>
          </div>
        </div>
      </div>

      <div className="admin-charts">
        <div className="chart-card">
          <h3>Recent Activity</h3>
          <div className="activity-list">
            {recentBookings.map((booking) => (
              <div key={booking.id} className="activity-item">
                <div className="activity-info">
                  <h4>
                    {booking.customer} booked {booking.service}
                  </h4>
                  <p>Vendor: {booking.vendor}</p>
                  <span className="activity-date">{booking.date}</span>
                </div>
                <div className={`activity-status ${booking.status}`}>NPR {booking.amount.toLocaleString()}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="chart-card">
          <h3>Pending Actions</h3>
          <div className="pending-actions">
            <div className="action-item">
              <span>Vendor Approvals</span>
              <span className="action-count">{stats.pendingApprovals}</span>
            </div>
            <div className="action-item">
              <span>Active Events</span>
              <span className="action-count">{stats.activeEvents}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderVendors = () => (
    <div className="vendors-management">
      <div className="section-header">
        <h3>Vendor Management</h3>
        <div className="header-actions">
          <button className="btn btn-outline">Export Data</button>
          <button className="btn btn-primary">Add Vendor</button>
        </div>
      </div>

      <div className="vendors-grid">
        {pendingVendors.map((vendor) => (
          <div key={vendor.id} className="vendor-card">
            <div className="vendor-header">
              <h4>{vendor.name}</h4>
              <span className={`status-badge ${vendor.status}`}>{vendor.status}</span>
            </div>

            <div className="vendor-details">
              <div className="detail-item">
                <span className="label">Type:</span>
                <span className="value">{vendor.type}</span>
              </div>
              <div className="detail-item">
                <span className="label">Owner:</span>
                <span className="value">{vendor.owner}</span>
              </div>
              <div className="detail-item">
                <span className="label">Email:</span>
                <span className="value">{vendor.email}</span>
              </div>
              <div className="detail-item">
                <span className="label">Phone:</span>
                <span className="value">{vendor.phone}</span>
              </div>
              <div className="detail-item">
                <span className="label">Location:</span>
                <span className="value">{vendor.location}</span>
              </div>
              <div className="detail-item">
                <span className="label">Submitted:</span>
                <span className="value">{vendor.submittedDate}</span>
              </div>
            </div>

            <div className="vendor-actions">
              <button className="btn btn-sm btn-primary" onClick={() => handleVendorAction(vendor.id, "approve")}>
                Approve
              </button>
              <button className="btn btn-sm btn-outline" onClick={() => handleVendorAction(vendor.id, "reject")}>
                Reject
              </button>
              <button className="btn btn-sm btn-secondary">View Details</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  if (isLoading) {
    return <div className="loading-screen">Loading...</div>
  }

  if (!user || user.userType !== "admin") {
    return null // Will redirect in useEffect
  }

  return (
    <div className="admin-dashboard">
      <div className="container">
        <div className="admin-header">
          <h1>Admin Dashboard</h1>
          <p>Welcome back, {user.name || "Admin"}! Manage your platform and monitor performance</p>
        </div>

        <div className="admin-layout">
          <aside className="admin-sidebar">
            <nav className="admin-nav">
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
                className={`nav-item ${activeTab === "vendors" ? "active" : ""}`}
                onClick={() => setActiveTab("vendors")}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 12l2 2 4-4"></path>
                  <path d="M21 12c.552 0 1-.448 1-1V5c0-.552-.448-1-1-1H3c-.552 0-1 .448-1 1v6c0 .552.448 1 1 1h18z"></path>
                </svg>
                Vendors
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
                className={`nav-item ${activeTab === "users" ? "active" : ""}`}
                onClick={() => setActiveTab("users")}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
                Users
              </button>
            </nav>
          </aside>

          <main className="admin-main">
            {activeTab === "overview" && renderOverview()}
            {activeTab === "vendors" && renderVendors()}
            {activeTab === "bookings" && <div className="coming-soon">Bookings Management Coming Soon...</div>}
            {activeTab === "users" && <div className="coming-soon">User Management Coming Soon...</div>}
          </main>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
