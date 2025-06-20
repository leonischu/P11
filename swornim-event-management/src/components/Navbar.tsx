"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import Logo from "./Logo"
import "./Navbar.css"

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [user, setUser] = useState<any>(null)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    // Check for user in localStorage
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [location]) // Re-check when location changes (e.g., after login/logout)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const isActive = (path: string) => {
    return location.pathname === path ? "active" : ""
  }

  const handleLogout = () => {
    localStorage.removeItem("user")
    setUser(null)
    navigate("/")
  }

  const getDashboardLink = () => {
    if (!user) return "/login"

    switch (user.userType) {
      case "admin":
        return "/admin"
      case "vendor":
        return "/vendor-dashboard"
      default:
        return "/dashboard"
    }
  }

  return (
    <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-brand" onClick={closeMenu}>
          <Logo />
        </Link>

        <div className={`navbar-menu ${isMenuOpen ? "active" : ""}`}>
          <Link to="/" className={`navbar-link ${isActive("/")}`} onClick={closeMenu}>
            Home
          </Link>
          <Link to="/services" className={`navbar-link ${isActive("/services")}`} onClick={closeMenu}>
            Services
          </Link>
          <Link to="/events" className={`navbar-link ${isActive("/events")}`} onClick={closeMenu}>
            Events
          </Link>
          
          <Link to="/contact" className={`navbar-link ${isActive("/contact")}`} onClick={closeMenu}>
            Contact Us
          </Link>
          {!user?.userType || user?.userType !== "vendor" ? (
            <Link
              to="/vendor-registration"
              className={`navbar-link ${isActive("/vendor-registration")}`}
              onClick={closeMenu}
            >
              Become a Vendor
            </Link>
          ) : null}
          {user && (
            <Link to={getDashboardLink()} className={`navbar-link`} onClick={closeMenu}>
              Dashboard
            </Link>
          )}
        </div>

        <div className="navbar-actions">
          {user ? (
            <>
              <div className="user-dropdown">
                <button className="user-dropdown-toggle">
                  <span className="user-name">{user.name || "User"}</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </button>
                <div className="user-dropdown-menu">
                  <Link to={getDashboardLink()} className="dropdown-item" onClick={closeMenu}>
                    Dashboard
                  </Link>
                  <Link to="/profile" className="dropdown-item" onClick={closeMenu}>
                    Profile
                  </Link>
                  <button className="dropdown-item logout-btn" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline btn-sm" onClick={closeMenu}>
                Login
              </Link>
              <Link to="/register" className="btn btn-primary btn-sm" onClick={closeMenu}>
                Sign Up
              </Link>
            </>
          )}
        </div>

        <button className={`navbar-toggle ${isMenuOpen ? "active" : ""}`} onClick={toggleMenu} aria-label="Toggle menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  )
}

export default Navbar
