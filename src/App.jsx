import { useState } from 'react'
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

function App() {
  const [page, setPage] = useState('envelope')
  const [transitioning, setTransitioning] = useState(false)

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
