import { useState, useEffect } from 'react'
import './TimelinePage.css'

const milestones = [
  {
    year: '2009',
    emoji: '🏫',
    title: 'Where It All Began',
    desc: 'Two kids in the same class in Bathinda. Little did we know...',
    photo: '/photos/photo2.jpg',
    place: 'Bathinda, Punjab',
  },
  {
    year: '2010',
    emoji: '📚',
    title: 'School Days',
    desc: 'Classmates, chapter tests, and stolen glances across the room.',
    photo: null,
    place: 'Bathinda, Punjab',
  },
  {
    year: 'Later',
    emoji: '🎓',
    title: 'IIM Kozhikode',
    desc: 'Fate had more plans — you became batchmates with my twin at IIM K. The universe really wanted us connected.',
    photo: '/photos/photo3.jpg',
    place: 'Kozhikode, Kerala',
  },
  {
    year: 'Now',
    emoji: '🌍',
    title: 'Across The World',
    desc: 'Me building things at Meta in London. You shaping strategy at Accenture in Mumbai. Different cities, same heartbeat.',
    photo: '/photos/photo4.jpg',
    place: 'London 🇬🇧 × Mumbai 🇮🇳',
  },
  {
    year: '2025',
    emoji: '💝',
    title: 'This Moment',
    desc: "All those years, all those paths — they all led here. To me, asking you something I've wanted to ask for a long time...",
    photo: null,
    place: 'Right here, right now',
  },
]

export default function TimelinePage({ onNext }) {
  const [visibleIdx, setVisibleIdx] = useState(-1)
  const [showNext, setShowNext] = useState(false)

  useEffect(() => {
    milestones.forEach((_, i) => {
      setTimeout(() => setVisibleIdx(i), 800 + i * 1200)
    })
    setTimeout(() => setShowNext(true), 800 + milestones.length * 1200 + 600)
  }, [])

  return (
    <div className="timeline-page">
      <h2 className="timeline-header">Our Story</h2>

      <div className="timeline">
        <div className="timeline-line" />

        {milestones.map((m, i) => (
          <div
            key={i}
            className={`timeline-item ${i % 2 === 0 ? 'left' : 'right'} ${i <= visibleIdx ? 'visible' : ''}`}
          >
            <div className="timeline-dot">
              <span>{m.emoji}</span>
            </div>
            <div className="timeline-card">
              {m.photo && (
                <div className="timeline-photo-wrap">
                  <img src={m.photo} alt={m.title} className="timeline-photo" />
                </div>
              )}
              <span className="timeline-year">{m.year}</span>
              <h3 className="timeline-title">{m.title}</h3>
              <p className="timeline-desc">{m.desc}</p>
              <span className="timeline-place">📍 {m.place}</span>
            </div>
          </div>
        ))}
      </div>

      <button className={`next-btn ${showNext ? 'show' : ''}`} onClick={onNext}>
        But there's more... 💫
      </button>
    </div>
  )
}
