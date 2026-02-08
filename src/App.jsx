import { useState, useRef, useEffect } from 'react'
import EnvelopePage from './components/EnvelopePage'
import LandingPage from './components/LandingPage'
import TimelinePage from './components/TimelinePage'
import DistancePage from './components/DistancePage'
import ReasonsPage from './components/ReasonsPage'
import ProposalPage from './components/ProposalPage'
import YesPage from './components/YesPage'
import FloatingHearts from './components/FloatingHearts'
import './App.css'

const PAGES = ['envelope', 'landing', 'timeline', 'distance', 'reasons', 'proposal', 'yes']
const MUSIC_START = 30

function MusicPlayer({ audioRef }) {
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    const onPlay = () => setPlaying(true)
    const onPause = () => setPlaying(false)
    audio.addEventListener('play', onPlay)
    audio.addEventListener('pause', onPause)
    return () => {
      audio.removeEventListener('play', onPlay)
      audio.removeEventListener('pause', onPause)
    }
  }, [audioRef])

  const toggle = () => {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
    } else {
      if (audio.currentTime < MUSIC_START) audio.currentTime = MUSIC_START
      audio.play().catch(() => {})
    }
  }

  return (
    <button className="music-btn" onClick={toggle} title={playing ? 'Pause music' : 'Play music'}>
      {playing ? '🎵' : '🔇'}
    </button>
  )
}

function App() {
  const [page, setPage] = useState('envelope')
  const [transitioning, setTransitioning] = useState(false)
  const audioRef = useRef(null)

  // Auto-play music on first user interaction + handle loop restart
  useEffect(() => {
    const startMusic = () => {
      const audio = audioRef.current
      if (audio && audio.paused) {
        audio.currentTime = MUSIC_START
        audio.play().catch(() => {})
      }
      window.removeEventListener('click', startMusic)
      window.removeEventListener('touchstart', startMusic)
    }
    window.addEventListener('click', startMusic, { once: true })
    window.addEventListener('touchstart', startMusic, { once: true })

    // When the track loops, jump back to MUSIC_START instead of 0
    const audio = audioRef.current
    const onSeeked = () => {
      if (audio && audio.currentTime < MUSIC_START) {
        audio.currentTime = MUSIC_START
      }
    }
    if (audio) audio.addEventListener('seeked', onSeeked)

    return () => {
      window.removeEventListener('click', startMusic)
      window.removeEventListener('touchstart', startMusic)
      if (audio) audio.removeEventListener('seeked', onSeeked)
    }
  }, [])

  const goTo = (p) => {
    setTransitioning(true)
    setTimeout(() => {
      setPage(p)
      setTransitioning(false)
    }, 400)
  }

  const nextPage = () => {
    const idx = PAGES.indexOf(page)
    if (idx < PAGES.length - 1) goTo(PAGES[idx + 1])
  }

  return (
    <div className="app">
      <audio ref={audioRef} src="/music.mp3" loop preload="auto" />
      <MusicPlayer audioRef={audioRef} />
      <FloatingHearts />
      <div
        key={page}
        className="page-transition"
        style={transitioning ? { opacity: 0, transform: 'scale(0.96)', filter: 'blur(6px)', transition: 'all 0.4s ease' } : undefined}
      >
        {page === 'envelope' && <EnvelopePage onNext={nextPage} />}
        {page === 'landing' && <LandingPage onNext={nextPage} />}
        {page === 'timeline' && <TimelinePage onNext={nextPage} />}
        {page === 'distance' && <DistancePage onNext={nextPage} />}
        {page === 'reasons' && <ReasonsPage onNext={nextPage} />}
        {page === 'proposal' && <ProposalPage onYes={() => goTo('yes')} />}
        {page === 'yes' && <YesPage />}
      </div>
    </div>
  )
}

export default App
