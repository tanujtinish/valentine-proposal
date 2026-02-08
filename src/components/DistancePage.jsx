import { useState, useEffect } from 'react'
import './DistancePage.css'

export default function DistancePage({ onNext }) {
  const [step, setStep] = useState(0)
  const [km, setKm] = useState(0)

  useEffect(() => {
    setTimeout(() => setStep(1), 500)
    setTimeout(() => setStep(2), 1500)
    setTimeout(() => setStep(3), 3000)
    setTimeout(() => setStep(4), 5000)
    setTimeout(() => setStep(5), 7000)
  }, [])

  // Counter animation for km
  useEffect(() => {
    if (step < 2) return
    const target = 7195
    const duration = 2000
    const startTime = Date.now()
    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setKm(Math.floor(eased * target))
      if (progress >= 1) clearInterval(timer)
    }, 16)
    return () => clearInterval(timer)
  }, [step])

  return (
    <div className="distance-page">
      <div className="distance-content">
        {/* Cities */}
        <div className={`cities-row ${step >= 1 ? 'show' : ''}`}>
          <div className="city">
            <span className="city-emoji">🇬🇧</span>
            <h3 className="city-name">London</h3>
            <p className="city-role">SWE @ Meta</p>
          </div>

          <div className="flight-path">
            <div className={`plane ${step >= 2 ? 'flying' : ''}`}>✈️</div>
            <div className="path-line" />
            <div className="path-hearts">
              {['❤️', '💕', '💖'].map((h, i) => (
                <span
                  key={i}
                  className={`path-heart ${step >= 2 ? 'show' : ''}`}
                  style={{ animationDelay: `${i * 0.3 + 0.5}s` }}
                >
                  {h}
                </span>
              ))}
            </div>
          </div>

          <div className="city">
            <span className="city-emoji">🇮🇳</span>
            <h3 className="city-name">Mumbai</h3>
            <p className="city-role">Strategy @ Accenture</p>
          </div>
        </div>

        {/* Distance counter */}
        <div className={`distance-counter ${step >= 2 ? 'show' : ''}`}>
          <span className="counter-number">{km.toLocaleString()}</span>
          <span className="counter-unit">km apart</span>
        </div>

        {/* Messages that fade in one by one */}
        <p className={`distance-msg ${step >= 3 ? 'show' : ''}`}>
          But distance is just a number...
        </p>

        <p className={`distance-msg highlight ${step >= 4 ? 'show' : ''}`}>
          Because every single kilometer is worth it for you, Sonali.
        </p>

        <div className={`distance-quote ${step >= 5 ? 'show' : ''}`}>
          <p>"I carry your heart with me — I carry it in my heart"</p>
          <span className="quote-author">— e.e. cummings</span>
        </div>

        <button className={`next-btn ${step >= 5 ? 'show' : ''}`} onClick={onNext}>
          There's something more... 💖
        </button>
      </div>

      {/* Animated stars */}
      <div className="stars">
        {Array.from({ length: 50 }, (_, i) => (
          <div
            key={i}
            className="star"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
              width: `${1 + Math.random() * 3}px`,
              height: `${1 + Math.random() * 3}px`,
            }}
          />
        ))}
      </div>
    </div>
  )
}
