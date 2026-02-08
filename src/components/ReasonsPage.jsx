import { useState, useEffect } from 'react'
import './ReasonsPage.css'

const reasons = [
  { emoji: '😊', title: 'Your Smile', text: 'The one that makes everything else disappear' },
  { emoji: '🧠', title: 'Your Brilliance', text: 'Strategy consultant who outsmarts everyone in the room' },
  { emoji: '💪', title: 'Your Ambition', text: 'From Bathinda to IIM K to Accenture Strategy — unstoppable' },
  { emoji: '🤣', title: 'Your Laugh', text: 'The sound I want to hear every single day' },
  { emoji: '🦋', title: 'The Butterflies', text: 'Still there, after all these years' },
  { emoji: '🌟', title: 'Everything Else', text: "The way you talk, think, care — I could go on forever" },
]

export default function ReasonsPage({ onNext }) {
  const [flipped, setFlipped] = useState(new Set())
  const [allRevealed, setAllRevealed] = useState(false)
  const [showIntro, setShowIntro] = useState(false)

  useEffect(() => {
    setTimeout(() => setShowIntro(true), 300)
  }, [])

  useEffect(() => {
    if (flipped.size === reasons.length) {
      setTimeout(() => setAllRevealed(true), 600)
    }
  }, [flipped])

  const toggleCard = (i) => {
    setFlipped((prev) => {
      const next = new Set(prev)
      if (next.has(i)) next.delete(i)
      else next.add(i)
      return next
    })
  }

  return (
    <div className="reasons-page">
      <h2 className={`reasons-header ${showIntro ? 'show' : ''}`}>
        Reasons I'm Crazy About You
      </h2>
      <p className={`reasons-sub ${showIntro ? 'show' : ''}`}>
        Tap each card to reveal 💝
      </p>

      <div className="reasons-grid">
        {reasons.map((r, i) => (
          <div
            key={i}
            className={`reason-card ${flipped.has(i) ? 'flipped' : ''}`}
            onClick={() => toggleCard(i)}
            style={{ animationDelay: `${i * 0.15}s` }}
          >
            <div className="card-inner">
              <div className="card-front">
                <span className="card-q">?</span>
                <span className="card-num">#{i + 1}</span>
              </div>
              <div className="card-back">
                <span className="card-emoji">{r.emoji}</span>
                <h3 className="card-title">{r.title}</h3>
                <p className="card-text">{r.text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {allRevealed && (
        <div className="reasons-final">
          <p className="reasons-final-text">
            And the biggest reason of all...
          </p>
          <button className="next-btn show" onClick={onNext}>
            Let me ask you something ❤️
          </button>
        </div>
      )}

      {!allRevealed && flipped.size > 0 && flipped.size < reasons.length && (
        <p className="remaining-hint">
          {reasons.length - flipped.size} more to reveal...
        </p>
      )}
    </div>
  )
}
