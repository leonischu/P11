"use client"

import type React from "react"
import { useState } from "react"
import "./Profile.css"

const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = useState("personal")
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+977-9841234567",
    address: "Kathmandu, Nepal",
    dateOfBirth: "1990-01-15",
    bio: "Event enthusiast who loves organizing memorable celebrations.",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSave = () => {
    // Save logic here
    setIsEditing(false)
  }

  const renderPersonalInfo = () => (
    <div className="profile-section">
      <div className="section-header">
        <h3>Personal Information</h3>
        <button
          className={`btn ${isEditing ? "btn-primary" : "btn-outline"}`}
          onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
        >
          {isEditing ? "Save Changes" : "Edit Profile"}
        </button>
      </div>

      <div className="profile-form">
        <div className="form-grid">
          <div className="form-group">
            <label className="form-label">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="form-input"
              disabled={!isEditing}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="form-input"
              disabled={!isEditing}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-input"
              disabled={!isEditing}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="form-input"
              disabled={!isEditing}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Date of Birth</label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              className="form-input"
              disabled={!isEditing}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="form-input"
              disabled={!isEditing}
            />
          </div>

          <div className="form-group full-width">
            <label className="form-label">Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className="form-textarea"
              rows={4}
              disabled={!isEditing}
            />
          </div>
        </div>
      </div>
    </div>
  )

  const renderSecurity = () => (
    <div className="profile-section">
      <h3>Security Settings</h3>

      <div className="security-options">
        <div className="security-item">
          <div className="security-info">
            <h4>Password</h4>
            <p>Last changed 3 months ago</p>
          </div>
          <button className="btn btn-outline">Change Password</button>
        </div>

        <div className="security-item">
          <div className="security-info">
            <h4>Two-Factor Authentication</h4>
            <p>Add an extra layer of security to your account</p>
          </div>
          <button className="btn btn-primary">Enable 2FA</button>
        </div>

        <div className="security-item">
          <div className="security-info">
            <h4>Login Sessions</h4>
            <p>Manage your active sessions</p>
          </div>
          <button className="btn btn-outline">View Sessions</button>
        </div>
      </div>
    </div>
  )

  const renderNotifications = () => (
    <div className="profile-section">
      <h3>Notification Preferences</h3>

      <div className="notification-options">
        <div className="notification-group">
          <h4>Email Notifications</h4>
          <div className="notification-items">
            <label className="notification-item">
              <input type="checkbox" defaultChecked />
              <span>Booking confirmations</span>
            </label>
            <label className="notification-item">
              <input type="checkbox" defaultChecked />
              <span>Event reminders</span>
            </label>
            <label className="notification-item">
              <input type="checkbox" />
              <span>Marketing emails</span>
            </label>
          </div>
        </div>

        <div className="notification-group">
          <h4>SMS Notifications</h4>
          <div className="notification-items">
            <label className="notification-item">
              <input type="checkbox" defaultChecked />
              <span>Booking updates</span>
            </label>
            <label className="notification-item">
              <input type="checkbox" />
              <span>Promotional offers</span>
            </label>
          </div>
        </div>
      </div>

      <button className="btn btn-primary">Save Preferences</button>
    </div>
  )

  return (
    <div className="profile-page">
      <div className="container">
        <div className="profile-header">
          <div className="profile-avatar">
            <img src="/images/avatars/default-user.jpg" alt="Profile" />
            <button className="avatar-edit">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg>
            </button>
          </div>
          <div className="profile-info">
            <h1>
              {formData.firstName} {formData.lastName}
            </h1>
            <p>{formData.email}</p>
            <span className="member-since">Member since January 2024</span>
          </div>
        </div>

        <div className="profile-layout">
          <aside className="profile-sidebar">
            <nav className="profile-nav">
              <button
                className={`nav-item ${activeTab === "personal" ? "active" : ""}`}
                onClick={() => setActiveTab("personal")}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                Personal Info
              </button>
              <button
                className={`nav-item ${activeTab === "security" ? "active" : ""}`}
                onClick={() => setActiveTab("security")}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <circle cx="12" cy="16" r="1"></circle>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
                Security
              </button>
              <button
                className={`nav-item ${activeTab === "notifications" ? "active" : ""}`}
                onClick={() => setActiveTab("notifications")}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                  <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                </svg>
                Notifications
              </button>
            </nav>
          </aside>

          <main className="profile-main">
            {activeTab === "personal" && renderPersonalInfo()}
            {activeTab === "security" && renderSecurity()}
            {activeTab === "notifications" && renderNotifications()}
          </main>
        </div>
      </div>
    </div>
  )
}

export default Profile
