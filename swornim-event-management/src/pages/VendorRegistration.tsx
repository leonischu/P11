"use client"

import type React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./VendorRegistration.css"

const VendorRegistration: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Business Information
    businessName: "",
    businessType: "",
    description: "",
    experience: "",

    // Contact Information
    ownerName: "",
    email: "",
    phone: "",
    address: "",
    city: "",

    // Services
    services: [] as string[],
    priceRange: "",
    availability: "",

    // Documents
    businessLicense: null as File | null,
    portfolio: [] as File[],

    // Account
    password: "",
    confirmPassword: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const businessTypes = [
    "Photography Studio",
    "Event Decoration",
    "Makeup Artist",
    "Catering Service",
    "Event Venue",
    "Music & DJ",
    "Event Planning",
    "Transportation",
    "Security Services",
    "Other",
  ]

  const serviceOptions = [
    "Wedding Photography",
    "Portrait Photography",
    "Event Decoration",
    "Floral Arrangements",
    "Bridal Makeup",
    "Party Makeup",
    "Catering Services",
    "Venue Rental",
    "DJ Services",
    "Live Music",
    "Event Planning",
    "Coordination",
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleServiceChange = (service: string) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service],
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target
    if (files) {
      if (name === "businessLicense") {
        setFormData((prev) => ({ ...prev, businessLicense: files[0] }))
      } else if (name === "portfolio") {
        setFormData((prev) => ({ ...prev, portfolio: Array.from(files) }))
      }
    }
  }

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Store vendor data
      localStorage.setItem(
        "pendingVendor",
        JSON.stringify({
          ...formData,
          status: "pending",
          submittedAt: new Date().toISOString(),
        }),
      )

      navigate("/vendor-success")
    } catch (error) {
      console.error("Registration failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="step-content">
            <h2>Business Information</h2>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="businessName" className="form-label">
                  Business Name *
                </label>
                <input
                  type="text"
                  id="businessName"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="businessType" className="form-label">
                  Business Type *
                </label>
                <select
                  id="businessType"
                  name="businessType"
                  value={formData.businessType}
                  onChange={handleChange}
                  className="form-select"
                  required
                >
                  <option value="">Select business type</option>
                  {businessTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group full-width">
                <label htmlFor="description" className="form-label">
                  Business Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="form-textarea"
                  rows={4}
                  placeholder="Describe your business, specialties, and what makes you unique..."
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="experience" className="form-label">
                  Years of Experience *
                </label>
                <select
                  id="experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  className="form-select"
                  required
                >
                  <option value="">Select experience</option>
                  <option value="0-1">0-1 years</option>
                  <option value="2-5">2-5 years</option>
                  <option value="6-10">6-10 years</option>
                  <option value="10+">10+ years</option>
                </select>
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="step-content">
            <h2>Contact Information</h2>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="ownerName" className="form-label">
                  Owner/Manager Name *
                </label>
                <input
                  type="text"
                  id="ownerName"
                  name="ownerName"
                  value={formData.ownerName}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone" className="form-label">
                  Phone Number *
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

              <div className="form-group">
                <label htmlFor="city" className="form-label">
                  City *
                </label>
                <select
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="form-select"
                  required
                >
                  <option value="">Select city</option>
                  <option value="kathmandu">Kathmandu</option>
                  <option value="pokhara">Pokhara</option>
                  <option value="chitwan">Chitwan</option>
                  <option value="lalitpur">Lalitpur</option>
                  <option value="bhaktapur">Bhaktapur</option>
                  <option value="biratnagar">Biratnagar</option>
                  <option value="dharan">Dharan</option>
                  <option value="butwal">Butwal</option>
                </select>
              </div>

              <div className="form-group full-width">
                <label htmlFor="address" className="form-label">
                  Business Address *
                </label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="form-textarea"
                  rows={3}
                  required
                />
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="step-content">
            <h2>Services & Pricing</h2>

            <div className="form-group">
              <label className="form-label">Services Offered *</label>
              <div className="checkbox-grid">
                {serviceOptions.map((service) => (
                  <label key={service} className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={formData.services.includes(service)}
                      onChange={() => handleServiceChange(service)}
                    />
                    <span>{service}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="priceRange" className="form-label">
                  Price Range *
                </label>
                <select
                  id="priceRange"
                  name="priceRange"
                  value={formData.priceRange}
                  onChange={handleChange}
                  className="form-select"
                  required
                >
                  <option value="">Select price range</option>
                  <option value="budget">Budget (Under NPR 10,000)</option>
                  <option value="mid">Mid-range (NPR 10,000 - 50,000)</option>
                  <option value="premium">Premium (NPR 50,000 - 100,000)</option>
                  <option value="luxury">Luxury (Above NPR 100,000)</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="availability" className="form-label">
                  Availability *
                </label>
                <select
                  id="availability"
                  name="availability"
                  value={formData.availability}
                  onChange={handleChange}
                  className="form-select"
                  required
                >
                  <option value="">Select availability</option>
                  <option value="weekends">Weekends only</option>
                  <option value="weekdays">Weekdays only</option>
                  <option value="both">Both weekdays and weekends</option>
                  <option value="flexible">Flexible schedule</option>
                </select>
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="step-content">
            <h2>Documents & Account</h2>

            <div className="form-group">
              <label htmlFor="businessLicense" className="form-label">
                Business License/Registration
              </label>
              <input
                type="file"
                id="businessLicense"
                name="businessLicense"
                onChange={handleFileChange}
                className="form-input"
                accept=".pdf,.jpg,.jpeg,.png"
              />
              <small className="form-help">Upload your business registration document (PDF, JPG, PNG)</small>
            </div>

            <div className="form-group">
              <label htmlFor="portfolio" className="form-label">
                Portfolio Images
              </label>
              <input
                type="file"
                id="portfolio"
                name="portfolio"
                onChange={handleFileChange}
                className="form-input"
                accept=".jpg,.jpeg,.png"
                multiple
              />
              <small className="form-help">Upload up to 10 images showcasing your work</small>
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="password" className="form-label">
                  Password *
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword" className="form-label">
                  Confirm Password *
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
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
                  <a href="/privacy" target="_blank" rel="noreferrer">
                    Privacy Policy
                  </a>
                </span>
              </label>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="vendor-registration-page">
      <div className="container">
        <div className="registration-header">
          <h1>Become a Vendor</h1>
          <p>Join Nepal's premier event management platform and grow your business</p>
        </div>

        <div className="registration-container">
          {/* Progress Steps */}
          <div className="progress-steps">
            {[1, 2, 3, 4].map((step) => (
              <div
                key={step}
                className={`step ${currentStep >= step ? "active" : ""} ${currentStep > step ? "completed" : ""}`}
              >
                <div className="step-number">{step}</div>
                <div className="step-label">
                  {step === 1 && "Business Info"}
                  {step === 2 && "Contact Details"}
                  {step === 3 && "Services"}
                  {step === 4 && "Documents"}
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="registration-form">
            {renderStep()}

            <div className="form-actions">
              {currentStep > 1 && (
                <button type="button" onClick={prevStep} className="btn btn-outline">
                  Previous
                </button>
              )}

              {currentStep < 4 ? (
                <button type="button" onClick={nextStep} className="btn btn-primary">
                  Next Step
                </button>
              ) : (
                <button type="submit" className="btn btn-primary" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <span className="loading"></span>
                      Submitting...
                    </>
                  ) : (
                    "Submit Application"
                  )}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default VendorRegistration
