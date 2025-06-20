import type React from "react"

interface LogoProps {
  className?: string
}

const Logo: React.FC<LogoProps> = ({ className = "" }) => {
  return (
    <div className={`logo ${className}`}>
      {/* Replace this img src with your actual logo path */}
      <img src="../../public/images/logo.jpg" alt="Swornim Event Management" className="logo-image" height="40" />
    </div>
  )
}

export default Logo
