import type React from "react"
import Hero from "../components/Hero"
import FeaturedServices from "../components/FeaturedServices"
import Testimonials from "../components/Testimonials"
import RecentEvents from "../components/RecentEvents"
import "./Home.css"
import HowItWorks from "../components/HowItWorks"

const Home: React.FC = () => {
  return (
    <div className="home">
      <Hero />
      
      <FeaturedServices />
      <HowItWorks/>
      <RecentEvents />
      <Testimonials />
      
      
    </div>
  )
}

export default Home
