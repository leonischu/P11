import React from 'react';
import { Link } from 'react-router-dom';
import './HowItWorks.css';

interface Step {
  number: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

const HowItWorks: React.FC = () => {
  const steps: Step[] = [
    {
      number: "01",
      title: "Browse & Search",
      description: "Explore our curated selection of verified vendors and services. Use filters to find exactly what you need for your event.",
      icon: "🔍",
      features: [
        "Advanced search filters",
        "Verified vendor profiles",
        "Real customer reviews",
        "Instant availability check",
      ],
    },
    {
      number: "02",
      title: "Compare & Select",
      description: "Compare prices, packages, and reviews. Chat directly with vendors to discuss your requirements and get custom quotes.",
      icon: "⚖️",
      features: [
        "Side-by-side comparison",
        "Direct vendor messaging",
        "Custom quote requests",
        "Package customization",
      ],
    },
    {
      number: "03",
      title: "Book & Pay Securely",
      description: "Book your chosen services with our secure payment system. Pay online or choose flexible payment options.",
      icon: "💳",
      features: [
        "Secure payment gateway",
        "Multiple payment options",
        "Booking confirmation",
        "Digital contracts"
      ],
    },
    {
      number: "04",
      title: "Enjoy Your Event",
      description: "Relax and enjoy your perfectly planned event. Our support team is available 24/7 for any assistance you need.",
      icon: "🎉",
      features: [
        "24/7 customer support",
        "Event day coordination",
        "Quality assurance",
        "Post-event feedback"
      ],
    },
  ];

  return (
    <section className="how-it-works">
      <div className="container">
        {/* Header Section */}
        <div className="section-header">
          <div className="badge">Simple Process</div>
          <h2>How <span className="brand-text">Swornim</span> Works</h2>
          <p>Planning your perfect event is easier than ever with our streamlined, user-friendly process</p>
        </div>

        {/* Steps Container */}
        <div className="steps-container">
          {steps.map((step, index) => (
            <div key={index} className="step-wrapper">
              <div className="step-card">
                {/* Step Number */}
                <div className={`step-number step-${index + 1}`}>
                  {step.number}
                </div>

                {/* Step Icon */}
                <div className="step-icon">
                  {step.icon}
                </div>

                {/* Step Content */}
                <div className="step-content">
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>

                  {/* Features List */}
                  <ul className="step-features">
                    {step.features.map((feature, featureIndex) => (
                      <li key={featureIndex}>
                        <svg className="check-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M9 12l2 2 4-4"></path>
                          <circle cx="12" cy="12" r="10"></circle>
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="step-connector">
                  <div className="connector-line"></div>
                  <div className="connector-arrow"></div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="cta-section">
          <div className="cta-background"></div>
          <div className="cta-content">
            <h3>Ready to Start Planning?</h3>
            <p>Join thousands of satisfied customers who trust Swornim for their perfect events</p>
            <div className="cta-buttons">
              <Link to="/services" className="btn btn-primary">
                Browse Services
              </Link>
              <Link to="/register" className="btn btn-outline">
                Create Account
              </Link>
            </div>
          </div>
          <div className="cta-decorations">
            <div className="decoration decoration-1"></div>
            <div className="decoration decoration-2"></div>
            <div className="decoration decoration-3"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;