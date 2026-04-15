import { useState } from 'react'
import Overview from './pages/Overview'
import Schedule from './pages/Schedule'
import PlayLearn from './pages/PlayLearn'
import Spelling from './pages/Spelling'
import Journal from './pages/Journal'
import ReadingLog from './pages/ReadingLog'
import Progress from './pages/Progress'
import Badges from './pages/Badges'
import FieldTrips from './pages/FieldTrips'

const tabs = [
  { id: 'overview', label: '🏠 Overview' },
  { id: 'schedule', label: '📅 Schedule' },
  { id: 'play', label: '🎮 Play & Learn' },
  { id: 'spelling', label: '✏️ Spelling' },
  { id: 'journal', label: '📓 My Journal' },
  { id: 'reading', label: '📚 Reading Log' },
  { id: 'progress', label: '📊 Progress' },
  { id: 'badges', label: '🏆 Badges' },
  { id: 'fieldtrips', label: '🌍 Field Trips' },
]

const pages = {
  overview: Overview,
  schedule: Schedule,
  play: PlayLearn,
  spelling: Spelling,
  journal: Journal,
  reading: ReadingLog,
  progress: Progress,
  badges: Badges,
  fieldtrips: FieldTrips,
}

export default function App() {
  const [currentTab, setCurrentTab] = useState('overview')
  const Page = pages[currentTab]

  return (
    <>
      <header className="header">
        <div>
          <div className="logo">🦋 Savannah's School</div>
          <div className="logo-sub">2nd Grade &bull; Kerrville, TX</div>
        </div>
        <div className="header-right">
          <span className="streak-badge">🔥 3-day streak!</span>
          <span>Spring 2026</span>
        </div>
      </header>

      <nav className="nav-bar">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`nav-btn ${currentTab === tab.id ? 'active' : ''}`}
            onClick={() => setCurrentTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <main>
        <Page />
      </main>
    </>
  )
}
