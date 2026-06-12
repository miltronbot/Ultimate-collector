import { useState } from 'react'
import { STUDENT_NAME, GRADE, LOCATION, SEMESTER_LABEL } from './data/config'
import Overview from './pages/Overview'
import Schedule from './pages/Schedule'
import PlayLearn from './pages/PlayLearn'
import Spelling from './pages/Spelling'
import Journal from './pages/Journal'
import ReadingLog from './pages/ReadingLog'
import Progress from './pages/Progress'
import Badges from './pages/Badges'
import FieldTrips from './pages/FieldTrips'
import ParentDashboard from './pages/ParentDashboard'
import TEKSTracker from './pages/TEKSTracker'
import TimeLog from './pages/TimeLog'
import CurriculumPlan from './pages/CurriculumPlan'
import Attendance from './pages/Attendance'
import Reports from './pages/Reports'

const studentTabs = [
  { id: 'overview', label: '🏠 Overview' },
  { id: 'schedule', label: '📅 Schedule' },
  { id: 'play', label: '🎮 Play & Learn' },
  { id: 'spelling', label: '✏️ Spelling' },
  { id: 'journal', label: '📓 Journal' },
  { id: 'reading', label: '📚 Reading Log' },
  { id: 'progress', label: '📊 Progress' },
  { id: 'badges', label: '🏆 Badges' },
  { id: 'fieldtrips', label: '🌍 Field Trips' },
]

const parentTabs = [
  { id: 'parent', label: '👩 Parent Hub' },
  { id: 'teks', label: '📋 TEKS Standards' },
  { id: 'timelog', label: '⏱️ Time Log' },
  { id: 'curriculum', label: '📚 Curriculum' },
  { id: 'attendance', label: '📅 Attendance' },
  { id: 'reports', label: '📄 Reports' },
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
  parent: ParentDashboard,
  teks: TEKSTracker,
  timelog: TimeLog,
  curriculum: CurriculumPlan,
  attendance: Attendance,
  reports: Reports,
}

export default function App() {
  const [currentTab, setCurrentTab] = useState('overview')
  const [mode, setMode] = useState('student')
  const Page = pages[currentTab]

  const tabs = mode === 'student' ? studentTabs : parentTabs

  const switchMode = (newMode) => {
    setMode(newMode)
    setCurrentTab(newMode === 'student' ? 'overview' : 'parent')
  }

  return (
    <>
      <header className="header">
        <div>
          <div className="logo">🦋 {STUDENT_NAME}'s School</div>
          <div className="logo-sub">{GRADE} &bull; {LOCATION} &bull; TEKS Aligned</div>
        </div>
        <div className="header-right">
          <div className="mode-toggle">
            <button
              className={`mode-btn ${mode === 'student' ? 'active' : ''}`}
              onClick={() => switchMode('student')}
              aria-label="Switch to student view"
            >
              🦋 Student
            </button>
            <button
              className={`mode-btn ${mode === 'parent' ? 'active' : ''}`}
              onClick={() => switchMode('parent')}
              aria-label="Switch to parent view"
            >
              👩 Parent
            </button>
          </div>
          <span className="streak-badge">🔥 3-day streak!</span>
        </div>
      </header>

      <nav className="nav-bar" role="tablist" aria-label="Main navigation">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`nav-btn ${currentTab === tab.id ? 'active' : ''}`}
            onClick={() => setCurrentTab(tab.id)}
            role="tab"
            aria-selected={currentTab === tab.id}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <main role="main">
        <Page />
      </main>

      <footer className="app-footer">
        <div>{STUDENT_NAME}'s Homeschool Dashboard &bull; {LOCATION}</div>
        <div>Aligned with Texas Essential Knowledge and Skills (TEKS) &bull; {GRADE}</div>
      </footer>
    </>
  )
}
