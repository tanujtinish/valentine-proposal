import { useEffect, useState, useRef } from 'react'
import './YesPage.css'

function Confetti() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const colors = ['#ff6b9d', '#ff8a80', '#ffd54f', '#ff4081', '#e040fb', '#7c4dff', '#448aff', '#69f0ae', '#fff', '#f48fb1']
    const pieces = []

    for (let i = 0; i < 250; i++) {
      pieces.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        w: 4 + Math.random() * 10,
        h: 3 + Math.random() * 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: 2 + Math.random() * 5,
        angle: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 0.2,
        drift: (Math.random() - 0.5) * 2,
        opacity: 0.6 + Math.random() * 0.4,
        shape: Math.random() > 0.5 ? 'rect' : 'circle',
      })
    }

    let animId
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      pieces.forEach((p) => {
        p.y += p.speed
        p.x += p.drift + Math.sin(p.angle) * 0.5
        p.angle += p.spin
        if (p.y > canvas.height) { p.y = -10; p.x = Math.random() * canvas.width }
        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate(p.angle)
        ctx.globalAlpha = p.opacity
        ctx.fillStyle = p.color
        if (p.shape === 'circle') {
          ctx.beginPath()
          ctx.arc(0, 0, p.w / 2, 0, Math.PI * 2)
          ctx.fill()
        } else {
          ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h)
        }
        ctx.restore()
      })
      animId = requestAnimationFrame(animate)
    }
    animate()

    const handleResize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
    window.addEventListener('resize', handleResize)
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', handleResize) }
  }, [])

  return <canvas ref={canvasRef} className="confetti-canvas" />
}

const loveMessages = [
  "From Bathinda to forever 💓",
  "7,195 km is nothing when you're my everything 🌍",
  "Every love story is beautiful, but ours is my favourite 📖",
  "You had me at 'class of 2009' 🏫",
  "My Meta data says I'm 100% yours 💻❤️",
  "Strategy consultant, but you've already won my heart 🏆",
  "Two cities, one heartbeat 🇬🇧❤️🇮🇳",
]

export default function YesPage() {
  const [step, setStep] = useState(0)
  const [msgIdx, setMsgIdx] = useState(0)
  const [clickCount, setClickCount] = useState(0)
  const [bursts, setBursts] = useState([])

  useEffect(() => {
    setTimeout(() => setStep(1), 300)
    setTimeout(() => setStep(2), 1500)
    setTimeout(() => setStep(3), 2800)
    setTimeout(() => setStep(4), 4200)
  }, [])

  useEffect(() => {
    const t = setInterval(() => setMsgIdx((p) => (p + 1) % loveMessages.length), 4000)
    return () => clearInterval(t)
  }, [])

  const handleClick = (e) => {
    const emojis = ['❤️', '💕', '💖', '💗', '💝', '🥰', '😘', '💘', '🌹', '✨']
    const newBursts = Array.from({ length: 6 }, (_, i) => ({
      id: Date.now() + i,
      x: e.clientX + (Math.random() - 0.5) * 80,
      y: e.clientY,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      angle: (Math.random() - 0.5) * 60,
    }))
    setBursts((p) => [...p, ...newBursts])
    setClickCount((p) => p + 1)
    setTimeout(() => setBursts((p) => p.filter((b) => !newBursts.find((n) => n.id === b.id))), 2000)
  }

  return (
    <div className="yes-page" onClick={handleClick}>
      <Confetti />

      <div className="yes-content">
        <div className={`celebration ${step >= 1 ? 'show' : ''}`}>
          <span className="celeb-side">🎉</span>
          <span className="celeb-heart">❤️</span>
          <span className="celeb-side">🎉</span>
        </div>

        <h1 className={`yes-title ${step >= 1 ? 'show' : ''}`}>
          She Said Yes!!!
        </h1>

        <p className={`yes-sub ${step >= 2 ? 'show' : ''}`}>
          Sonali, you just made me the happiest person on the planet!
        </p>

        {/* Photo with glow */}
        <div className={`yes-photo-wrap ${step >= 2 ? 'show' : ''}`}>
          <div className="yes-photo-glow" />
          <img src="/photos/photo1.jpg" alt="Us" className="yes-photo" />
        </div>

        <div className={`love-carousel ${step >= 3 ? 'show' : ''}`}>
          <p className="carousel-msg" key={msgIdx}>
            {loveMessages[msgIdx]}
          </p>
        </div>

        <div className={`couple-section ${step >= 4 ? 'show' : ''}`}>
          <div className="couple-row">
            <span className="person bounce-l">🧑</span>
            <span className="couple-heart">❤️</span>
            <span className="person bounce-r">👩</span>
          </div>
          <p className="forever-text">
            Happy Valentine's Day, Sonali ❤️
          </p>
        </div>

        <p className={`tap-hint ${step >= 4 ? 'show' : ''}`}>
          tap anywhere for love ✨
        </p>

        {clickCount >= 14 && (
          <p className="secret-msg">
            I love you to the moon and back — and then some more 🚀🌙
          </p>
        )}
      </div>

      {bursts.map((b) => (
        <span
          key={b.id}
          className="burst"
          style={{ left: b.x, top: b.y, '--angle': `${b.angle}deg` }}
        >
          {b.emoji}
        </span>
      ))}

      {/* Fireworks */}
      <div className="fireworks-layer">
        {Array.from({ length: 10 }, (_, i) => (
          <span
            key={i}
            className="fw"
            style={{
              left: `${5 + Math.random() * 90}%`,
              top: `${5 + Math.random() * 45}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          >
            {['✨', '🎆', '💥', '⭐'][Math.floor(Math.random() * 4)]}
          </span>
        ))}
      </div>
    </div>
  )
}
