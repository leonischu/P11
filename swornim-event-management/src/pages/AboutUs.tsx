"use client"

import type React from "react"
import "./AboutUs.css"

const AboutUs: React.FC = () => {
  const teamMembers = [
    {
      name: "Rajesh Sharma",
      position: "CEO & Founder",
      image: "/placeholder.svg?height=200&width=200",
      description: "10+ years experience in event management and business development.",
    },
    {
      name: "Priya Thapa",
      position: "Head of Operations",
      image: "/placeholder.svg?height=200&width=200",
      description: "Expert in vendor management and customer relations.",
    },
    {
      name: "Amit Gurung",
      position: "Technology Lead",
      image: "/placeholder.svg?height=200&width=200",
      description: "Full-stack developer with passion for creating seamless user experiences.",
    },
    {
      name: "Sunita Rai",
      position: "Marketing Director",
      image: "/placeholder.svg?height=200&width=200",
      description: "Creative marketing strategist with focus on digital growth.",
    },
  ]

  const milestones = [
    {
      year: "2020",
      title: "Company Founded",
      description: "Started with a vision to revolutionize event management in Nepal",
    },
    {
      year: "2021",
      title: "100+ Vendors",
      description: "Reached our first milestone of 100 registered vendors",
    },
    {
      year: "2022",
      title: "1000+ Events",
      description: "Successfully managed over 1000 events across Nepal",
    },
    {
      year: "2023",
      title: "Digital Platform",
      description: "Launched our comprehensive digital platform",
    },
    {
      year: "2024",
      title: "Market Leader",
      description: "Became the leading event management platform in Nepal",
    },
  ]

  return (
    <div className="about-page">
      {/* Hero Section */}
      <div className="about-hero">
        <div className="container">
          <h1>About Swornim</h1>
          <p>Transforming events, creating memories, building connections</p>
        </div>
      </div>

      {/* Story Section */}
      <div className="about-content">
        <div className="container">
          <div className="story-section">
            <div className="story-content">
              <h2>Our Story</h2>
              <p>
                Founded in 2020, Swornim Event Management was born from a simple yet powerful vision: to make event
                planning accessible, efficient, and enjoyable for everyone in Nepal. What started as a small team of
                passionate event enthusiasts has grown into the country's leading event management platform.
              </p>
              <p>
                We recognized the challenges that both event organizers and service providers faced in the traditional
                event planning process. Long hours spent searching for vendors, difficulty in comparing services, and
                lack of transparency in pricing were just some of the pain points we set out to solve.
              </p>
              <p>
                Today, we're proud to connect thousands of customers with hundreds of trusted vendors, making every
                celebration - from intimate gatherings to grand celebrations - truly memorable.
              </p>
            </div>
            <div className="story-image">
              <img src="/placeholder.svg?height=400&width=500" alt="Our Story" />
            </div>
          </div>

          {/* Mission & Vision */}
          <div className="mission-vision">
            <div className="mission">
              <div className="icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
              </div>
              <h3>Our Mission</h3>
              <p>
                To simplify event planning by connecting customers with the best vendors, ensuring every celebration is
                seamless, memorable, and stress-free.
              </p>
            </div>
            <div className="vision">
              <div className="icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              </div>
              <h3>Our Vision</h3>
              <p>
                To become the most trusted and comprehensive event management ecosystem in South Asia, empowering
                communities to celebrate life's precious moments.
              </p>
            </div>
          </div>

          {/* Values */}
          <div className="values-section">
            <h2>Our Values</h2>
            <div className="values-grid">
              <div className="value-item">
                <div className="value-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22,4 12,14.01 9,11.01"></polyline>
                  </svg>
                </div>
                <h4>Quality</h4>
                <p>We maintain the highest standards in vendor selection and service delivery.</p>
              </div>
              <div className="value-item">
                <div className="value-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
                <h4>Trust</h4>
                <p>Building lasting relationships through transparency and reliability.</p>
              </div>
              <div className="value-item">
                <div className="value-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
                  </svg>
                </div>
                <h4>Innovation</h4>
                <p>Continuously improving our platform with cutting-edge technology.</p>
              </div>
              <div className="value-item">
                <div className="value-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                    <line x1="9" y1="9" x2="9.01" y2="9"></line>
                    <line x1="15" y1="9" x2="15.01" y2="9"></line>
                  </svg>
                </div>
                <h4>Customer Focus</h4>
                <p>Putting our customers' needs and satisfaction at the center of everything we do.</p>
              </div>
            </div>
          </div>

          {/* Team Section */}
          <div className="team-section">
            <h2>Meet Our Team</h2>
            <p className="team-intro">
              Our diverse team of professionals brings together expertise in technology, event management, and customer
              service to deliver exceptional experiences.
            </p>
            <div className="team-grid">
              {teamMembers.map((member, index) => (
                <div key={index} className="team-member">
                  <div className="member-image">
                    <img src={member.image || "/placeholder.svg"} alt={member.name} />
                  </div>
                  <div className="member-info">
                    <h4>{member.name}</h4>
                    <p className="position">{member.position}</p>
                    <p className="description">{member.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div className="timeline-section">
            <h2>Our Journey</h2>
            <div className="timeline">
              {milestones.map((milestone, index) => (
                <div key={index} className="timeline-item">
                  <div className="timeline-marker"></div>
                  <div className="timeline-content">
                    <div className="timeline-year">{milestone.year}</div>
                    <h4>{milestone.title}</h4>
                    <p>{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Statistics */}
          <div className="stats-section">
            <h2>Our Impact</h2>
            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-number">500+</div>
                <div className="stat-label">Trusted Vendors</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">5000+</div>
                <div className="stat-label">Events Managed</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">50000+</div>
                <div className="stat-label">Happy Customers</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">25+</div>
                <div className="stat-label">Cities Covered</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutUs
