import { useState, useRef, useEffect } from 'react'
import './ProposalPage.css'

const noMessages = [
  "No 😢",
  "Are you sure? 🥺",
  "Really sure?? 😭",
  "Sonali pls 💔",
  "Think again! 🥹",
  "Remember those 4 days in Delhi? 🏙️",
  "I'm flying back in March anyway! ✈️",
  "I'll tell your IIM K batchmates 😏",
  "Don't make this SWE debug heartbreak 💻💔",
  "Fine... I knew you'd say yes anyway! 😏",
]

function fleeFrom(btn, mouseX, mouseY) {
  const rect = btn.getBoundingClientRect()
  const btnCX = rect.left + rect.width / 2
  const btnCY = rect.top + rect.height / 2
  const angle = Math.atan2(mouseY - btnCY, mouseX - btnCX)
  const flee = 200 + Math.random() * 100

  let nx = btnCX - Math.cos(angle) * flee - rect.width / 2
  let ny = btnCY - Math.sin(angle) * flee - rect.height / 2

  const pad = 15
  const mxX = window.innerWidth - rect.width - pad
  const mxY = window.innerHeight - rect.height - pad

  // If pushed out of bounds, teleport to opposite area
  if (nx < pad || nx > mxX) nx = pad + Math.random() * (mxX - pad)
  if (ny < pad || ny > mxY) ny = pad + Math.random() * (mxY - pad)

  nx = Math.max(pad, Math.min(mxX, nx))
  ny = Math.max(pad, Math.min(mxY, ny))

  btn.style.position = 'fixed'
  btn.style.left = nx + 'px'
  btn.style.top = ny + 'px'
  btn.style.zIndex = '100'
  btn.style.transition = 'left 0.3s cubic-bezier(0.34,1.56,0.64,1), top 0.3s cubic-bezier(0.34,1.56,0.64,1)'
}

export default function ProposalPage({ onYes }) {
  const [noCount, setNoCount] = useState(0)
  const [step, setStep] = useState(0)
  const [yesSize, setYesSize] = useState(1)
  const noRef = useRef(null)

  useEffect(() => {
    setTimeout(() => setStep(1), 300)
    setTimeout(() => setStep(2), 1200)
    setTimeout(() => setStep(3), 2200)
  }, [])

  // Flee on mousemove — direct DOM, no React state
  useEffect(() => {
    const RADIUS = 150

    const onMove = (e) => {
      const btn = noRef.current
      if (!btn) return

      const rect = btn.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy

      if (Math.sqrt(dx * dx + dy * dy) < RADIUS) {
        fleeFrom(btn, e.clientX, e.clientY)
      }
    }

    const onTouch = (e) => {
      if (e.touches[0]) onMove(e.touches[0])
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('touchmove', onTouch)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('touchmove', onTouch)
    }
  }, [])

  const handleNoClick = () => {
    const next = noCount + 1
    setNoCount(next)
    setYesSize((prev) => Math.min(prev + 0.3, 2.8))

    // Also flee on click
    if (noRef.current) {
      const pad = 30
      const btn = noRef.current
      const mxX = window.innerWidth - btn.offsetWidth - pad
      const mxY = window.innerHeight - btn.offsetHeight - pad
      btn.style.position = 'fixed'
      btn.style.left = (pad + Math.random() * mxX) + 'px'
      btn.style.top = (pad + Math.random() * mxY) + 'px'
      btn.style.zIndex = '100'
    }
  }

  return (
    <div className="proposal-page">
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
          From Bathinda classmates to Delhi nights to this moment ✨
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
            style={{
              fontSize: `${Math.max(0.55, 1 - noCount * 0.06)}rem`,
              opacity: Math.max(0.35, 1 - noCount * 0.06),
            }}
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
