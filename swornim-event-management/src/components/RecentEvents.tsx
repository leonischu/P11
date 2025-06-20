import type React from "react"
import { Link } from "react-router-dom"
import "./RecentEvents.css"

const RecentEvents: React.FC = () => {
  const events = [
    {
      id: 1,
      title: "Royal Wedding Celebration",
      category: "Wedding",
      image: "../../public/images/soaltee.jpg",
      venue: "Hotel Soaltee Crowne Plaza",
      date: "December 2024",
      guests: 500,
      budget: "NPR 25,00,000",
      rating: 5.0,
      testimonial: "Absolutely perfect! Every detail was flawlessly executed.",
      client: "Priya & Rajesh",
    },
    {
      id: 2,
      title: "Tech Summit 2024",
      category: "Corporate",
      image: "../../public/images/hyatt.jpg",
      venue: "Hyatt Regency Kathmandu",
      date: "November 2024",
      guests: 300,
      budget: "NPR 15,00,000",
      rating: 4.9,
      testimonial: "Professional service that exceeded our expectations.",
      client: "TechCorp Nepal",
    },
    {
      id: 3,
      title: "Golden Anniversary",
      category: "Anniversary",
      image: "../../public/images/anniversary.jpg",
      venue: "Gokarna Forest Resort",
      date: "October 2024",
      guests: 150,
      budget: "NPR 8,00,000",
      rating: 5.0,
      testimonial: "Made our special day truly memorable and magical.",
      client: "The Sharma Family",
    },
  ]

  const achievements = [
    { icon: "🏆", title: "Best Event Management", subtitle: "Nepal Awards 2024" },
    { icon: "⭐", title: "5-Star Rating", subtitle: "Customer Satisfaction" },
    { icon: "🎖️", title: "ISO Certified", subtitle: "Quality Management" },
    { icon: "🌟", title: "Top Rated", subtitle: "Industry Recognition" },
  ]

  return (
    <section className="recent-events">
      <div className="container">
        <div className="section-header">
          <h2>Recent Success Stories</h2>
          <p>See how we've helped create unforgettable moments for our clients across Nepal</p>
        </div>

        <div className="events-grid">
          {events.map((event) => (
            <div key={event.id} className="event-card">
              <div className="event-image">
                <img src={event.image || "/placeholder.svg"} alt={event.title} />
                <div className="event-category">{event.category}</div>
                <div className="event-rating">
                  <span className="rating-stars">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`star ${i < Math.floor(event.rating) ? "filled" : ""}`}
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </span>
                  <span className="rating-number">{event.rating}</span>
                </div>
              </div>

              <div className="event-content">
                <h3>{event.title}</h3>
                <div className="event-details">
                  <div className="detail-item">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    {event.venue}
                  </div>
                  <div className="detail-item">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="16" y1="2" x2="16" y2="6"></line>
                      <line x1="8" y1="2" x2="8" y2="6"></line>
                      <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                    {event.date}
                  </div>
                  <div className="detail-item">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                    {event.guests} Guests
                  </div>
                </div>

                <div className="event-budget">
                  <span className="budget-label">Budget:</span>
                  <span className="budget-amount">{event.budget}</span>
                </div>

                <blockquote className="event-testimonial">
                  "{event.testimonial}"<cite>- {event.client}</cite>
                </blockquote>
              </div>
            </div>
          ))}
        </div>

        <div className="achievements-section">
          <h3>Our Achievements</h3>
          <div className="achievements-grid">
            {achievements.map((achievement, index) => (
              <div key={index} className="achievement-item">
                <div className="achievement-icon">{achievement.icon}</div>
                <div className="achievement-content">
                  <h4>{achievement.title}</h4>
                  <p>{achievement.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="cta-section">
          <h3>Ready to Create Your Success Story?</h3>
          <p>Join our satisfied clients and let us make your event dreams come true</p>
          <Link to="/services" className="btn btn-primary btn-lg">
            Start Planning Now
          </Link>
        </div>
      </div>
    </section>
  )
}

export default RecentEvents
