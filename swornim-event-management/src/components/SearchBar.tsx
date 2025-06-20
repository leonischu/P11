"use client"

import type React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./SearchBar.css"

interface SearchBarProps {
  onSearch?: (query: string, category: string, location: string) => void
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState("")
  const [location, setLocation] = useState("")
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Create search parameters
    const searchParams = new URLSearchParams()
    if (query) searchParams.set("q", query)
    if (category) searchParams.set("category", category)
    if (location) searchParams.set("location", location)

    // Navigate to services page with search parameters
    navigate(`/services?${searchParams.toString()}`)

    // Call onSearch callback if provided
    if (onSearch) {
      onSearch(query, category, location)
    }
  }

  return (
    <div className="search-bar">
      <form onSubmit={handleSubmit} className="search-form">
        <div className="search-inputs">
          <div className="search-field">
            <label htmlFor="search-query" className="search-label">
              What are you looking for?
            </label>
            <input
              id="search-query"
              type="text"
              placeholder="e.g., Wedding photographer, Birthday decorator..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="search-field">
            <label htmlFor="search-category" className="search-label">
              Category
            </label>
            <select
              id="search-category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="search-select"
            >
              <option value="">All Categories</option>
              <option value="photography">Photography</option>
              <option value="decoration">Decoration</option>
              <option value="makeup">Makeup & Beauty</option>
              <option value="catering">Catering</option>
              <option value="venue">Venues</option>
              <option value="music">Music & DJ</option>
              <option value="planning">Event Planning</option>
            </select>
          </div>

          <div className="search-field">
            <label htmlFor="search-location" className="search-label">
              Location
            </label>
            <select
              id="search-location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="search-select"
            >
              <option value="">All Locations</option>
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
        </div>

        <button type="submit" className="search-button">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
          Search
        </button>
      </form>
    </div>
  )
}

export default SearchBar
