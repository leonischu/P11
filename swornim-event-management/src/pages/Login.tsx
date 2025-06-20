"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./Login.css"
import { apiRequest } from '../api'

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    userType: "customer", // customer, vendor, admin
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  // Check if already logged in
  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      const user = JSON.parse(userData)
      if (user.isAuthenticated) {
        // Redirect based on user type
        switch (user.userType) {
          case "admin":
            navigate("/admin")
            break
          case "vendor":
            navigate("/vendor-dashboard")
            break
          default:
            navigate("/dashboard")
        }
      }
    }
  }, [navigate])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const result = await apiRequest('/auth/login', {
        method: 'POST',
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      })

      const { user, tokens } = result.data

      localStorage.setItem(
        "user",
        JSON.stringify({
          ...user,
          token: tokens.access.token,
          refreshToken: tokens.refresh.token,
          isAuthenticated: true,
        })
      )

      switch (user.userType) {
        case "admin":
          navigate("/admin")
          break
        case "vendor":
          navigate("/vendor-dashboard")
          break
        default:
          navigate("/dashboard")
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-content">
          <div className="login-header">
            <h1>Welcome Back</h1>
            <p>Sign in to your Swornim account</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            {error && <div className="alert alert-error">{error}</div>}

            <div className="form-group">
              <label htmlFor="userType" className="form-label">
                I am a:
              </label>
              <select
                id="userType"
                name="userType"
                value={formData.userType}
                onChange={handleChange}
                className="form-select"
                required
              >
                <option value="customer">Customer</option>
                <option value="vendor">Vendor (Photographer, Decorator, etc.)</option>
                <option value="admin">Admin</option>
              </select>
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
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="form-options">
              <label className="checkbox-label">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>
              <Link to="/forgot-password" className="forgot-link">
                Forgot password?
              </Link>
            </div>

            <button type="submit" className="btn btn-primary btn-lg w-100" disabled={isLoading}>
              {isLoading ? (
                <>
                  <span className="loading"></span>
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <div className="login-footer">
            <p>
              Don't have an account?{" "}
              <Link to="/register" className="signup-link">
                Sign up here
              </Link>
            </p>

            {formData.userType === "vendor" && (
              <div className="vendor-info">
                <p className="text-center text-muted">
                  New vendor? <Link to="/vendor-registration">Register your business</Link>
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="login-image">
          <img src="/images/login-bg.jpg" alt="Event celebration" />
          <div className="image-overlay">
            <h2>Join Nepal's Premier Event Platform</h2>
            <p>Connect with thousands of customers and grow your event business</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
