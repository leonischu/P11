import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import Services from "./pages/Services"
import Events from "./pages/Events"
import AboutUs from "./pages/AboutUs"
import ContactUs from "./pages/ContactUs"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Profile from "./pages/Profile"
import UserDashboard from "./pages/UserDashboard"
import VendorDashboard from "./pages/VendorDashboard"
import AdminDashboard from "./pages/AdminDashboard"
import VendorRegistration from "./pages/VendorRegistration"
import BookingPage from "./pages/BookingPage"
import EventBooking from "./pages/EventBooking"
import "./styles/global.css"

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/events" element={<Events />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/dashboard" element={<UserDashboard />} />
            <Route path="/vendor-dashboard" element={<VendorDashboard />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/vendor-registration" element={<VendorRegistration />} />
            <Route path="/booking" element={<BookingPage />} />
            <Route path="/event-booking/:id" element={<EventBooking />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
