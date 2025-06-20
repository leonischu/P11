import type React from "react"
import "./WhyChooseUs.css"

const WhyChooseUs: React.FC = () => {
  const features = [
    {
      icon: "🛡️",
      title: "100% Verified Vendors",
      description: "All our vendors are thoroughly vetted and verified for quality, reliability, and professionalism.",
      guarantee: "Quality Guarantee",
    },
    {
      icon: "💰",
      title: "Best Price Promise",
      description: "We guarantee competitive pricing. Find a lower price elsewhere? We'll match it or beat it.",
      guarantee: "Price Match Guarantee",
    },
    {
      icon: "🎯",
      title: "Personalized Service",
      description: "Dedicated event coordinators work with you to ensure every detail is perfect for your special day.",
      guarantee: "Personal Touch",
    },
    {
      icon: "⚡",
      title: "Instant Booking",
      description:
        "Book services instantly with real-time availability. No waiting, no delays, just quick confirmations.",
      guarantee: "Instant Confirmation",
    },
    {
      icon: "🔒",
      title: "Secure Payments",
      description:
        "Your payments are protected with bank-level security. Multiple payment options for your convenience.",
      guarantee: "Payment Protection",
    },
    {
      icon: "📞",
      title: "24/7 Support",
      description: "Round-the-clock customer support to assist you before, during, and after your event.",
      guarantee: "Always Available",
    },
  ]

  const stats = [
    { number: "50,000+", label: "Happy Customers" },
    { number: "99.8%", label: "Success Rate" },
    { number: "500+", label: "Expert Vendors" },
    { number: "24/7", label: "Customer Support" },
  ]

  return (
    <section className="why-choose-us">
      <div className="container">
        <div className="section-header">
          <h2>Why Choose Swornim?</h2>
          <p>
            We're not just another event platform. We're your trusted partner in creating unforgettable experiences.
          </p>
        </div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <div className="feature-content">
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
                <div className="feature-guarantee">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 12l2 2 4-4"></path>
                    <circle cx="12" cy="12" r="10"></circle>
                  </svg>
                  {feature.guarantee}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="stats-section">
          <h3>Trusted by Thousands</h3>
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item">
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="guarantee-section">
          <div className="guarantee-card">
            <div className="guarantee-icon">🏆</div>
            <div className="guarantee-content">
              <h3>Our Promise to You</h3>
              <p>
                If you're not completely satisfied with our service, we'll work tirelessly to make it right. Your
                happiness is our success.
              </p>
              <div className="guarantee-badges">
                <span className="badge">Money Back Guarantee</span>
                <span className="badge">Quality Assurance</span>
                <span className="badge">Professional Service</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUs
