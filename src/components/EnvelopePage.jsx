import { useState } from 'react'
import './EnvelopePage.css'

export default function EnvelopePage({ onNext }) {
  const [opened, setOpened] = useState(false)

  const handleClick = () => {
    setOpened(true)
    setTimeout(onNext, 1200)
  }

  return (
    <div className="envelope-page">
      <div className={`envelope-wrapper ${opened ? 'opened' : ''}`} onClick={handleClick}>
        <div className="envelope-box">
          <div className="envelope-flap" />
          <div className="envelope-body">
            <div className="envelope-letter-inner">
              <p className="letter-name">For Sonali</p>
              <p className="letter-heart">❤️</p>
            </div>
          </div>
        </div>
        <p className="envelope-tap">tap to open</p>
      </div>

      <div className="envelope-sparkles">
        {Array.from({ length: 25 }, (_, i) => (
          <div
            key={i}
            className="e-sparkle"
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
