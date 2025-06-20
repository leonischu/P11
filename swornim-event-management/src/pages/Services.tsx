"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useSearchParams, Link } from "react-router-dom"
import SearchBar from "../components/SearchBar"
import "./Services.css"

const Services: React.FC = () => {
  const [searchParams] = useSearchParams()
  const [filteredServices, setFilteredServices] = useState<any[]>([])
  const [selectedCategory, setSelectedCategory] = useState("")
  const [priceRange, setPriceRange] = useState("")
  const [sortBy, setSortBy] = useState("popular")

  const services = [
    {
      id: 1,
      title: "Professional Wedding Photography",
      description: "Capture your special moments with experienced wedding photographers",
      image: "../../public/images/couple.jpg? height=200&width=350",
      price: 25000,
      rating: 4.9,
      reviews: 156,
      category: "photography",
      location: "Kathmandu",
      vendor: "Pixel Perfect Studios",
      featured: true,
    },
    {
      id: 2,
      title: "Elegant Event Decoration",
      description: "Transform your venue with stunning decorations and themes",
      image: "../../public/images/venue.jpg? height=200&width=350",
      price: 15000,
      rating: 4.8,
      reviews: 203,
      category: "decoration",
      location: "Lalitpur",
      vendor: "Dream Decorators",
      featured: true,
    },
    {
      id: 3,
      title: "Bridal Makeup Artist",
      description: "Professional makeup services for brides and special occasions",
      image: "../../public/images/makeup-2.jpg? height=200&width=350",
      price: 8000,
      rating: 4.9,
      reviews: 89,
      category: "makeup",
      location: "Kathmandu",
      vendor: "Glamour Studio",
      featured: false,
    },
    {
      id: 4,
      title: "Premium Catering Services",
      description: "Delicious food and beverages for all types of events",
      image: "../../public/images/catering-2.jpg? height=200&width=350",
      price: 500,
      rating: 4.7,
      reviews: 312,
      category: "catering",
      location: "Pokhara",
      vendor: "Royal Caterers",
      featured: true,
    },
    {
      id: 5,
      title: "Luxury Event Venues",
      description: "Beautiful venues for weddings, parties, and corporate events",
      image: "../../public/images/luxury.jpg? height=200&width=350",
      price: 20000,
      rating: 4.8,
      reviews: 145,
      category: "venue",
      location: "Kathmandu",
      vendor: "Grand Palace",
      featured: false,
    },
    {
      id: 6,
      title: "DJ & Music Services",
      description: "Professional DJs and live music for unforgettable entertainment",
      image: "../../public/images/dj.jpg? height=200&width=350",
      price: 12000,
      rating: 4.6,
      reviews: 78,
      category: "music",
      location: "Bhaktapur",
      vendor: "Beat Masters",
      featured: false,
    },
  ]

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0)

    let filtered = [...services]

    // Filter by search query
    const query = searchParams.get("q")
    if (query) {
      filtered = filtered.filter(
        (service) =>
          service.title.toLowerCase().includes(query.toLowerCase()) ||
          service.description.toLowerCase().includes(query.toLowerCase()),
      )
    }

    // Filter by category
    const categoryParam = searchParams.get("category") || selectedCategory
    if (categoryParam) {
      filtered = filtered.filter((service) => service.category === categoryParam)
    }

    // Filter by location
    const location = searchParams.get("location")
    if (location) {
      filtered = filtered.filter((service) => service.location.toLowerCase() === location.toLowerCase())
    }

    // Filter by price range
    if (priceRange) {
      const [min, max] = priceRange.split("-").map(Number)
      filtered = filtered.filter((service) => service.price >= min && (max ? service.price <= max : true))
    }

    // Sort services
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case "popular":
      default:
        filtered.sort((a, b) => b.reviews - a.reviews)
        break
    }

    setFilteredServices(filtered)
  }, [searchParams, selectedCategory, priceRange, sortBy])

  const categories = [
    { value: "", label: "All Categories" },
    { value: "photography", label: "Photography" },
    { value: "decoration", label: "Decoration" },
    { value: "makeup", label: "Makeup & Beauty" },
    { value: "catering", label: "Catering" },
    { value: "venue", label: "Venues" },
    { value: "music", label: "Music & DJ" },
    { value: "planning", label: "Event Planning" },
  ]

  return (
    <div className="services-page">
      <div className="services-header">
        <div className="container">
          <h1>Event Services</h1>
          <p>Find the perfect vendors for your special event</p>
          <SearchBar />
        </div>
      </div>

      <div className="services-content">
        <div className="container">
          <div className="services-layout">
            {/* Filters Sidebar */}
            <aside className="filters-sidebar">
              <div className="filter-section">
                <h3>Category</h3>
                <div className="filter-options">
                  {categories.map((cat) => (
                    <label key={cat.value} className="filter-option">
                      <input
                        type="radio"
                        name="category"
                        value={cat.value}
                        checked={selectedCategory === cat.value}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                      />
                      <span>{cat.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="filter-section">
                <h3>Price Range</h3>
                <div className="filter-options">
                  <label className="filter-option">
                    <input
                      type="radio"
                      name="price"
                      value=""
                      checked={priceRange === ""}
                      onChange={(e) => setPriceRange(e.target.value)}
                    />
                    <span>All Prices</span>
                  </label>
                  <label className="filter-option">
                    <input
                      type="radio"
                      name="price"
                      value="0-10000"
                      checked={priceRange === "0-10000"}
                      onChange={(e) => setPriceRange(e.target.value)}
                    />
                    <span>Under NPR 10,000</span>
                  </label>
                  <label className="filter-option">
                    <input
                      type="radio"
                      name="price"
                      value="10000-25000"
                      checked={priceRange === "10000-25000"}
                      onChange={(e) => setPriceRange(e.target.value)}
                    />
                    <span>NPR 10,000 - 25,000</span>
                  </label>
                  <label className="filter-option">
                    <input
                      type="radio"
                      name="price"
                      value="25000-50000"
                      checked={priceRange === "25000-50000"}
                      onChange={(e) => setPriceRange(e.target.value)}
                    />
                    <span>NPR 25,000 - 50,000</span>
                  </label>
                  <label className="filter-option">
                    <input
                      type="radio"
                      name="price"
                      value="50000"
                      checked={priceRange === "50000"}
                      onChange={(e) => setPriceRange(e.target.value)}
                    />
                    <span>Above NPR 50,000</span>
                  </label>
                </div>
              </div>
            </aside>

            {/* Services Grid */}
            <main className="services-main">
              <div className="services-toolbar">
                <div className="results-count">{filteredServices.length} services found</div>
                <div className="sort-options">
                  <label htmlFor="sort">Sort by:</label>
                  <select id="sort" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                    <option value="popular">Most Popular</option>
                    <option value="rating">Highest Rated</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>
                </div>
              </div>

              <div className="services-grid">
                {filteredServices.map((service) => (
                  <div key={service.id} className="service-card">
                    {service.featured && <div className="featured-badge">Featured</div>}

                    <div className="service-image">
                      <img src={service.image || "/placeholder.svg"} alt={service.title} />
                    </div>

                    <div className="service-content">
                      <div className="service-header">
                        <h3>{service.title}</h3>
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
                            {service.rating} ({service.reviews})
                          </span>
                        </div>
                      </div>

                      <p className="service-description">{service.description}</p>

                      <div className="service-meta">
                        <div className="vendor-info">
                          <span className="vendor-name">{service.vendor}</span>
                          <span className="location">{service.location}</span>
                        </div>
                      </div>

                      <div className="service-footer">
                        <div className="price">
                          Starting from <strong>NPR {service.price.toLocaleString()}</strong>
                        </div>
                        <Link to={`/booking/${service.id}`} className="btn btn-primary">
                          Book Now
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredServices.length === 0 && (
                <div className="no-results">
                  <h3>No services found</h3>
                  <p>Try adjusting your search criteria or browse all services.</p>
                  <Link to="/services" className="btn btn-primary">
                    View All Services
                  </Link>
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Services
