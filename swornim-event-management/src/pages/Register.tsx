"use client"

import type React from "react"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./Register.css"
import { apiRequest } from '../api'

const mapUserTypeToRole = (userType: string) => {
  switch (userType) {
    case "vendor":
      return "cameraman" // or dynamically choose based on vendor type later
    case "customer":
    default:
      return "client"
  }
}


const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    userType: "customer",
    agreeToTerms: false,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      setIsLoading(false)
      return
    }

    if (!formData.agreeToTerms) {
      setError("Please agree to the terms and conditions")
      setIsLoading(false)
      return
    }

    try {
      await apiRequest('/auth/register', {
        method: 'POST',
        body: JSON.stringify({
          name: `${formData.firstName} ${formData.lastName}`.trim(),
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
          userType: formData.userType === 'vendor' ? 'cameraman' : 'client',
        }),
      })
      alert("Registration successful! Please verify your email.")
      navigate("/login")
    } catch (err: any) {
      setError(err.message || "Registration failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }


  return (
    <div className="register-page">
      <div className="register-container">
        <div className="register-content">
          <div className="register-header">
            <h1>Create Your Account</h1>
            <p>Join Swornim and start planning amazing events</p>
          </div>

          <form onSubmit={handleSubmit} className="register-form">
            {error && <div className="alert alert-error">{error}</div>}

            <div className="form-group">
              <label htmlFor="userType" className="form-label">
                I want to:
              </label>
              <select
                id="userType"
                name="userType"
                value={formData.userType}
                onChange={handleChange}
                className="form-select"
                required
              >
                <option value="customer">Book services for my events</option>
                <option value="vendor">Offer my services as a vendor</option>
              </select>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName" className="form-label">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Enter your first name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="lastName" className="form-label">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Enter your last name"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone" className="form-label">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="form-input"
                placeholder="+977-XXXXXXXXXX"
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Create a password"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword" className="form-label">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Confirm your password"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  required
                />
                <span>
                  I agree to the{" "}
                  <Link to="/terms" target="_blank">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy" target="_blank">
                    Privacy Policy
                  </Link>
                </span>
              </label>
            </div>

            <button type="submit" className="btn btn-primary btn-lg w-100" disabled={isLoading}>
              {isLoading ? (
                <>
                  <span className="loading"></span>
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="register-footer">
            <p>
              Already have an account?{" "}
              <Link to="/login" className="login-link">
                Sign in here
              </Link>
            </p>
          </div>
        </div>

        <div className="register-image">
          <img src="/images/register-bg.jpg" alt="Event planning" />
          <div className="image-overlay">
            <h2>Start Your Event Journey</h2>
            <p>Connect with the best vendors and create unforgettable memories</p>
            <div className="features-list">
              <div className="feature">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 12l2 2 4-4"></path>
                  <circle cx="12" cy="12" r="10"></circle>
                </svg>
                <span>Verified Vendors</span>
              </div>
              <div className="feature">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <span>Best Prices</span>
              </div>
              <div className="feature">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                <span>24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
