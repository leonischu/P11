"use client"

import type React from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import "./Events.css"

const Events: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedCity, setSelectedCity] = useState("all")

  const events = [
    {
      id: 1,
      title: "Nepali New Year Concert 2024",
      description: "Celebrate Nepali New Year with live performances by top artists",
      image: "../../public/images/concert.jpeg",
      date: "2024-04-14",
      time: "7:00 PM",
      venue: "Dasharath Stadium",
      city: "Kathmandu",
      category: "concert",
      price: 1500,
      maxPrice: 5000,
      organizer: "Event Masters Nepal",
      featured: true,
      ticketsAvailable: 2500,
    },
    {
      id: 2,
      title: "Comedy Night with Nepali Comedians",
      description: "An evening of laughter with Nepal's funniest comedians",
      image: "../../public/images/standup-comedy.jpg",
      date: "2024-03-20",
      time: "8:00 PM",
      venue: "Nepal Academy Hall",
      city: "Kathmandu",
      category: "comedy",
      price: 800,
      maxPrice: 1500,
      organizer: "Laugh Factory Nepal",
      featured: false,
      ticketsAvailable: 300,
    },
    {
      id: 3,
      title: "Pokhara Food Festival 2024",
      description: "Taste the best local and international cuisines",
      image: "../../public/images/streetfest.jpeg",
      date: "2024-03-25",
      time: "11:00 AM",
      venue: "Phewa Lake Side",
      city: "Pokhara",
      category: "festival",
      price: 500,
      maxPrice: 500,
      organizer: "Pokhara Tourism Board",
      featured: true,
      ticketsAvailable: 1000,
    },
    {
      id: 4,
      title: "Tech Conference Nepal 2024",
      description: "Leading technology conference featuring international speakers",
      image: "../../public/images/conferencee.jpeg",
      date: "2024-04-05",
      time: "9:00 AM",
      venue: "Hotel Soaltee",
      city: "Kathmandu",
      category: "conference",
      price: 2500,
      maxPrice: 5000,
      organizer: "Tech Nepal",
      featured: false,
      ticketsAvailable: 500,
    },
    {
      id: 5,
      title: "Cultural Dance Performance",
      description: "Traditional Nepali dance performances by renowned artists",
      image: "../../public/images/cultural-dance.jpg",
      date: "2024-03-30",
      time: "6:30 PM",
      venue: "National Theatre",
      city: "Kathmandu",
      category: "cultural",
      price: 1000,
      maxPrice: 2000,
      organizer: "Cultural Heritage Nepal",
      featured: false,
      ticketsAvailable: 400,
    },
    {
      id: 6,
      title: "Chitwan Wildlife Photography Workshop",
      description: "Learn wildlife photography in the heart of Chitwan National Park",
      image: "../../public/images/wildlife.jpg",
      date: "2024-04-10",
      time: "6:00 AM",
      venue: "Chitwan National Park",
      city: "Chitwan",
      category: "workshop",
      price: 3500,
      maxPrice: 3500,
      organizer: "Wildlife Photography Nepal",
      featured: true,
      ticketsAvailable: 50,
    },
  ]

  const categories = [
    { value: "all", label: "All Events" },
    { value: "concert", label: "Concerts" },
    { value: "comedy", label: "Comedy Shows" },
    { value: "festival", label: "Festivals" },
    { value: "conference", label: "Conferences" },
    { value: "cultural", label: "Cultural Events" },
    { value: "workshop", label: "Workshops" },
  ]

  const cities = [
    { value: "all", label: "All Cities" },
    { value: "Kathmandu", label: "Kathmandu" },
    { value: "Pokhara", label: "Pokhara" },
    { value: "Chitwan", label: "Chitwan" },
    { value: "Lalitpur", label: "Lalitpur" },
    { value: "Bhaktapur", label: "Bhaktapur" },
  ]

  const filteredEvents = events.filter((event) => {
    const categoryMatch = selectedCategory === "all" || event.category === selectedCategory
    const cityMatch = selectedCity === "all" || event.city === selectedCity
    return categoryMatch && cityMatch
  })

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div className="events-page">
      <div className="events-header">
        <div className="container">
          <h1>Live Events</h1>
          <p>Discover and book tickets for amazing events happening across Nepal</p>
        </div>
      </div>

      <div className="events-content">
        <div className="container">
          {/* Filters */}
          <div className="events-filters">
            <div className="filter-group">
              <label htmlFor="category-filter">Category:</label>
              <select
                id="category-filter"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="filter-select"
              >
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label htmlFor="city-filter">City:</label>
              <select
                id="city-filter"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="filter-select"
              >
                {cities.map((city) => (
                  <option key={city.value} value={city.value}>
                    {city.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Featured Events */}
          <section className="featured-events">
            <h2>Featured Events</h2>
            <div className="featured-grid">
              {filteredEvents
                .filter((event) => event.featured)
                .map((event) => (
                  <div key={event.id} className="featured-event-card">
                    <div className="event-image">
                      <img src={event.image || "/placeholder.svg"} alt={event.title} />
                      <div className="event-category">{event.category}</div>
                    </div>
                    <div className="event-content">
                      <h3>{event.title}</h3>
                      <p>{event.description}</p>
                      <div className="event-details">
                        <div className="event-date">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                            <line x1="16" y1="2" x2="16" y2="6"></line>
                            <line x1="8" y1="2" x2="8" y2="6"></line>
                            <line x1="3" y1="10" x2="21" y2="10"></line>
                          </svg>
                          {formatDate(event.date)} at {event.time}
                        </div>
                        <div className="event-venue">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                            <circle cx="12" cy="10" r="3"></circle>
                          </svg>
                          {event.venue}, {event.city}
                        </div>
                      </div>
                      <div className="event-footer">
                        <div className="event-price">
                          NPR {event.price.toLocaleString()}
                          {event.maxPrice > event.price && ` - ${event.maxPrice.toLocaleString()}`}
                        </div>
                        <Link to={`/event-booking/${event.id}`} className="btn btn-primary">
                          Book Tickets
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </section>

          {/* All Events */}
          <section className="all-events">
            <h2>All Events</h2>
            <div className="events-grid">
              {filteredEvents.map((event) => (
                <div key={event.id} className="event-card">
                  <div className="event-image">
                    <img src={event.image || "/placeholder.svg"} alt={event.title} />
                    {event.featured && <div className="featured-badge">Featured</div>}
                  </div>
                  <div className="event-content">
                    <div className="event-header">
                      <h3>{event.title}</h3>
                      <span className="event-category-tag">{event.category}</span>
                    </div>
                    <p>{event.description}</p>
                    <div className="event-meta">
                      <div className="event-date">
                        {formatDate(event.date)} • {event.time}
                      </div>
                      <div className="event-venue">
                        {event.venue}, {event.city}
                      </div>
                      <div className="event-organizer">by {event.organizer}</div>
                    </div>
                    <div className="event-footer">
                      <div className="event-pricing">
                        <span className="price">NPR {event.price.toLocaleString()}</span>
                        {event.maxPrice > event.price && (
                          <span className="price-range"> - {event.maxPrice.toLocaleString()}</span>
                        )}
                      </div>
                      <div className="tickets-info">{event.ticketsAvailable} tickets available</div>
                      <Link to={`/event-booking/${event.id}`} className="btn btn-primary btn-sm">
                        Book Now
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {filteredEvents.length === 0 && (
            <div className="no-events">
              <h3>No events found</h3>
              <p>Try adjusting your filters or check back later for new events.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Events
