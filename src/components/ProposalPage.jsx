import { useState, useRef, useEffect, useCallback } from 'react'
import './ProposalPage.css'

const noMessages = [
  "No 😢",
  "Are you sure? 🥺",
  "Really sure?? 😭",
  "Sonali pls 💔",
  "Think again! 🥹",
  "I'll fly to Mumbai to ask in person! ✈️",
  "I'll tell your IIM K batchmates 😏",
  "Don't make this SWE debug heartbreak 💻💔",
  "I'll send my twin to convince you 👯",
  "Fine... I knew you'd say yes anyway! 😏",
]

export default function ProposalPage({ onYes }) {
  const [noCount, setNoCount] = useState(0)
  const [step, setStep] = useState(0)
  const [yesSize, setYesSize] = useState(1)
  const [noPos, setNoPos] = useState(null)
  const noRef = useRef(null)
  const containerRef = useRef(null)
  const FLEE_RADIUS = 150

  useEffect(() => {
    setTimeout(() => setStep(1), 300)
    setTimeout(() => setStep(2), 1200)
    setTimeout(() => setStep(3), 2200)
  }, [])

  // Track mouse and make No button flee immediately on hover
  const handleMouseMove = useCallback((e) => {
    if (!noRef.current) return

    const btn = noRef.current
    const rect = btn.getBoundingClientRect()
    const btnCenterX = rect.left + rect.width / 2
    const btnCenterY = rect.top + rect.height / 2

    const dx = e.clientX - btnCenterX
    const dy = e.clientY - btnCenterY
    const dist = Math.sqrt(dx * dx + dy * dy)

    if (dist < FLEE_RADIUS) {
      // Flee away from cursor
      const angle = Math.atan2(dy, dx)
      const fleeDistance = FLEE_RADIUS + 80 + Math.random() * 60
      let newX = btnCenterX - Math.cos(angle) * fleeDistance - rect.width / 2
      let newY = btnCenterY - Math.sin(angle) * fleeDistance - rect.height / 2

      // Keep within viewport
      const pad = 10
      const maxX = window.innerWidth - rect.width - pad
      const maxY = window.innerHeight - rect.height - pad
      if (newX < pad) newX = maxX - Math.random() * 200
      if (newX > maxX) newX = pad + Math.random() * 200
      if (newY < pad) newY = maxY - Math.random() * 200
      if (newY > maxY) newY = pad + Math.random() * 200

      newX = Math.max(pad, Math.min(maxX, newX))
      newY = Math.max(pad, Math.min(maxY, newY))

      setNoPos({ x: newX, y: newY })
    }
  }, [])

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [handleMouseMove])

  // Also flee on touch (mobile)
  const handleTouchMove = useCallback((e) => {
    if (!noRef.current || !e.touches[0]) return
    handleMouseMove({ clientX: e.touches[0].clientX, clientY: e.touches[0].clientY })
  }, [handleMouseMove])

  useEffect(() => {
    window.addEventListener('touchmove', handleTouchMove)
    return () => window.removeEventListener('touchmove', handleTouchMove)
  }, [handleTouchMove])

  const handleNoClick = () => {
    const next = noCount + 1
    setNoCount(next)
    setYesSize((prev) => Math.min(prev + 0.3, 2.8))

    // Immediately jump somewhere random after click
    const pad = 30
    const maxX = window.innerWidth - 160 - pad
    const maxY = window.innerHeight - 60 - pad
    setNoPos({ x: pad + Math.random() * maxX, y: pad + Math.random() * maxY })
  }

  const noStyle = noPos
    ? {
        position: 'fixed',
        left: `${noPos.x}px`,
        top: `${noPos.y}px`,
        zIndex: 100,
        transition: 'left 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), top 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)',
        fontSize: `${Math.max(0.55, 1 - noCount * 0.06)}rem`,
        opacity: Math.max(0.35, 1 - noCount * 0.06),
      }
    : {
        fontSize: `${Math.max(0.55, 1 - noCount * 0.06)}rem`,
        opacity: Math.max(0.35, 1 - noCount * 0.06),
      }

  return (
    <div className="proposal-page" ref={containerRef}>
      {/* Ambient orbs */}
      <div className="ambient-orb orb-1" />
      <div className="ambient-orb orb-2" />
      <div className="ambient-orb orb-3" />

      <div className="proposal-content">
        <div className={`proposal-hearts ${step >= 1 ? 'show' : ''}`}>
          <span className="p-side-heart">💕</span>
          <span className="p-center-heart">💝</span>
          <span className="p-side-heart r">💕</span>
        </div>

        <h1 className={`proposal-title ${step >= 2 ? 'show' : ''}`}>
          Sonali, Will You Be My Valentine?
        </h1>

        <p className={`proposal-sub ${step >= 2 ? 'show' : ''}`}>
          From Bathinda classmates to this moment ✨
        </p>

        {noCount > 0 && (
          <div className="no-response-wrap" key={noCount}>
            <p className="no-response">
              {noMessages[Math.min(noCount - 1, noMessages.length - 1)]}
            </p>
          </div>
        )}

        <div className={`button-group ${step >= 3 ? 'show' : ''}`}>
          <button
            className="yes-button"
            onClick={onYes}
            style={{
              transform: `scale(${yesSize})`,
              transition: 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
          >
            <span className="yes-glow" />
            <span className="yes-text">Yes! 💖</span>
          </button>

          <button
            ref={noRef}
            className="no-button"
            onClick={handleNoClick}
            style={noStyle}
          >
            {noCount === 0 ? "No 😢" : noMessages[Math.min(noCount, noMessages.length - 1)]}
          </button>
        </div>
      </div>

      {/* Rose petals */}
      <div className="petals-bg">
        {Array.from({ length: 20 }, (_, i) => (
          <span
            key={i}
            className="petal"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${6 + Math.random() * 8}s`,
              fontSize: `${14 + Math.random() * 14}px`,
            }}
          >
            🌸
          </span>
        ))}
      </div>
    </div>
  )
}
