import type React from "react"
import { Link } from "react-router-dom"
import "./FeaturedServices.css"

const FeaturedServices: React.FC = () => {
  const services = [
    {
      id: 1,
      title: "Wedding Photography",
      description:
        "Capture your special moments with professional wedding photographers who specialize in creating timeless memories",
      image: "../../public/images/weddingphotography.jpeg? height=300&width=400",
      price: "Starting from NPR 25,000",
      rating: 4.9,
      reviews: 156,
      category: "Photography",
      features: ["Professional Equipment", "Edited Photos", "Online Gallery"],
    },
    {
      id: 2,
      title: "Event Decoration",
      description:
        "Transform your venue with stunning decorations, themes, and creative setups that match your vision perfectly",
      image: "../../public/images/grand-ballroom.jpg? height=300&width=400",
      price: "Starting from NPR 15,000",
      rating: 4.8,
      reviews: 203,
      category: "Decoration",
      features: ["Custom Themes", "Setup & Cleanup", "Premium Materials"],
    },
    {
      id: 3,
      title: "Makeup Artist",
      description:
        "Professional makeup services for brides and special occasions with premium products and expert techniques",
      image: "../../public/images/makeupartist.jpg?height=300&width=400",
      price: "Starting from NPR 8,000",
      rating: 4.9,
      reviews: 89,
      category: "Beauty",
      features: ["Bridal Makeup", "Trial Session", "Touch-up Kit"],
    },
    {
      id: 4,
      title: "Catering Services",
      description:
        "Delicious food and beverages for all types of events with customizable menus and professional service",
      image: "../../public/images/catering.jpg?height=300&width=400",
      price: "Starting from NPR 500/person",
      rating: 4.7,
      reviews: 312,
      category: "Catering",
      features: ["Custom Menu", "Professional Staff", "Equipment Included"],
    },
    {
      id: 5,
      title: "Event Venues",
      description:
        "Beautiful venues for weddings, parties, and corporate events with modern amenities and flexible packages",
      image: "../../public/images/himalayan-view.jpg? height=300&width=400",
      price: "Starting from NPR 20,000",
      rating: 4.8,
      reviews: 145,
      category: "Venues",
      features: ["Modern Facilities", "Parking Available", "Flexible Timing"],
    },
    {
      id: 6,
      title: "Music & DJ",
      description:
        "Professional DJs and live music for unforgettable entertainment that keeps your guests dancing all night",
      image: "../../public/images/dj.jpg? height=300&width=400",
      price: "Starting from NPR 12,000",
      rating: 4.6,
      reviews: 78,
      category: "Entertainment",
      features: ["Professional Equipment", "Music Library", "MC Services"],
    },
  ]

  return (
    <section className="featured-services">
      <div className="container">
        <div className="section-header">
          <h2>Featured Services</h2>
          <p>Discover our most popular event services trusted by thousands of customers across Nepal</p>
        </div>

        <div className="services-grid">
          {services.map((service) => (
            <div key={service.id} className="service-card">
              <div className="service-image">
                <img src={service.image || "/placeholder.svg"} alt={service.title} />
                <div className="service-category">{service.category}</div>
                <div className="service-overlay">
                  <Link to="/services" className="btn btn-primary btn-sm">
                    View Details
                  </Link>
                </div>
              </div>

              <div className="service-content">
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>

                <div className="service-features">
                  {service.features.map((feature, index) => (
                    <span key={index} className="feature-tag">
                      {feature}
                    </span>
                  ))}
                </div>

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
                  <span className="rating-text">
                    {service.rating} ({service.reviews} reviews)
                  </span>
                </div>

                <div className="service-footer">
                  <div className="service-price">{service.price}</div>
                  <Link to="/services" className="btn btn-primary btn-sm">
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="section-footer">
          <Link to="/services" className="btn btn-outline btn-lg">
            View All Services
          </Link>
        </div>
      </div>
    </section>
  )
}

export default FeaturedServices
