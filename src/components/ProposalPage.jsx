import { useState, useRef, useEffect, useCallback } from 'react'
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

export default function ProposalPage({ onYes }) {
  const [noCount, setNoCount] = useState(0)
  const [step, setStep] = useState(0)
  const [yesSize, setYesSize] = useState(1)
  const noRef = useRef(null)
  const dodgeRef = useRef({ tx: 0, ty: 0, count: 0 })

  useEffect(() => {
    setTimeout(() => setStep(1), 300)
    setTimeout(() => setStep(2), 1200)
    setTimeout(() => setStep(3), 2200)
  }, [])

  const nudge = useCallback((btn, mouseX, mouseY) => {
    const d = dodgeRef.current
    d.count++

    const rect = btn.getBoundingClientRect()
    const btnCX = rect.left + rect.width / 2
    const btnCY = rect.top + rect.height / 2

    // Direction away from cursor
    const angle = Math.atan2(mouseY - btnCY, mouseX - btnCX)

    // Small nudge: 30-50px base, slowly grows up to ~80px max
    const dist = 30 + Math.min(d.count * 3, 50) + Math.random() * 20

    // Random sideways wiggle for playfulness
    const wiggle = (Math.random() - 0.5) * 25

    // Calculate new translate offset (accumulates on current position)
    let newTx = d.tx - Math.cos(angle) * dist + Math.sin(angle) * wiggle
    let newTy = d.ty - Math.sin(angle) * dist - Math.cos(angle) * wiggle

    // Clamp so it doesn't go off screen — check where it would end up
    // Get the button's original (untranslated) position
    const origLeft = rect.left - d.tx
    const origTop = rect.top - d.ty
    const pad = 15
    const maxTx = window.innerWidth - origLeft - rect.width - pad
    const minTx = -origLeft + pad
    const maxTy = window.innerHeight - origTop - rect.height - pad
    const minTy = -origTop + pad

    newTx = Math.max(minTx, Math.min(maxTx, newTx))
    newTy = Math.max(minTy, Math.min(maxTy, newTy))

    d.tx = newTx
    d.ty = newTy

    btn.style.transform = `translate(${newTx}px, ${newTy}px)`
  }, [])

  // Dodge on mousemove
  useEffect(() => {
    let lastDodge = 0

    const onMove = (e) => {
      const btn = noRef.current
      if (!btn) return

      // Throttle: max once every 250ms
      const now = Date.now()
      if (now - lastDodge < 250) return

      const rect = btn.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const dist = Math.sqrt(dx * dx + dy * dy)

      // Trigger when cursor is within 70px
      if (dist < 70) {
        lastDodge = now
        nudge(btn, e.clientX, e.clientY)
      }
    }

    const onTouch = (e) => {
      if (e.touches[0]) {
        onMove({ clientX: e.touches[0].clientX, clientY: e.touches[0].clientY })
      }
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('touchmove', onTouch, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('touchmove', onTouch)
    }
  }, [nudge])

  const handleNoClick = () => {
    const next = noCount + 1
    setNoCount(next)
    setYesSize((prev) => Math.min(prev + 0.3, 2.8))

    if (noRef.current) {
      nudge(noRef.current,
        noRef.current.getBoundingClientRect().left + noRef.current.offsetWidth / 2,
        noRef.current.getBoundingClientRect().top
      )
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
