import { useState, useEffect } from 'react'
import './LandingPage.css'

export default function LandingPage({ onNext }) {
  const [step, setStep] = useState(0)

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 400),
      setTimeout(() => setStep(2), 1200),
      setTimeout(() => setStep(3), 2200),
      setTimeout(() => setStep(4), 3200),
    ]
    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <div className="landing-page">
      <div className="landing-content">
        {/* Photo */}
        <div className={`photo-frame ${step >= 1 ? 'show' : ''}`}>
          <div className="photo-glow" />
          <img src="/photos/photo1.jpg" alt="Sonali" className="hero-photo" />
          <div className="photo-border" />
        </div>

        <h1 className={`landing-title ${step >= 2 ? 'show' : ''}`}>
          Hey Sonali
        </h1>

        <div className={`typewriter-container ${step >= 3 ? 'show' : ''}`}>
          <p className="typewriter-text">
            I've been meaning to tell you something...
          </p>
        </div>

        <button className={`next-btn ${step >= 4 ? 'show' : ''}`} onClick={onNext}>
          Let me take you on a journey 💫
        </button>
      </div>

      <div className="landing-sparkles">
        {Array.from({ length: 30 }, (_, i) => (
          <div
            key={i}
            className="l-sparkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${1.5 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
    </div>
  )
}
