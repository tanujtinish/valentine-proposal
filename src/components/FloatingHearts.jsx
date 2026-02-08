import { useEffect, useState } from 'react'
import './FloatingHearts.css'

const heartEmojis = ['❤️', '💕', '💖', '💗', '💝', '💘', '🌹', '✨', '💫']

export default function FloatingHearts() {
  const [hearts, setHearts] = useState([])

  useEffect(() => {
    const initialHearts = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      emoji: heartEmojis[Math.floor(Math.random() * heartEmojis.length)],
      left: Math.random() * 100,
      delay: Math.random() * 10,
      duration: 8 + Math.random() * 12,
      size: 14 + Math.random() * 24,
      opacity: 0.15 + Math.random() * 0.4,
    }))
    setHearts(initialHearts)
  }, [])

  return (
    <div className="floating-hearts">
      {hearts.map((heart) => (
        <span
          key={heart.id}
          className="floating-heart"
          style={{
            left: `${heart.left}%`,
            animationDelay: `${heart.delay}s`,
            animationDuration: `${heart.duration}s`,
            fontSize: `${heart.size}px`,
            opacity: heart.opacity,
          }}
        >
          {heart.emoji}
        </span>
      ))}
    </div>
  )
}
