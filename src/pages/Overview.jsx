import { useState } from 'react'
import { STUDENT_NAME, getCurrentWeek, loadData, saveData, localDateKey } from '../data/config'
import { weeklyPlan } from '../data/curriculumPlan'
import { computeBadges } from '../data/progressStore'

const LESSONS_KEY = 'savannah-lessons'

const todaysSubjects = [
  { key: 'reading', label: 'Reading', emoji: '📖' },
  { key: 'math', label: 'Math', emoji: '🔢' },
  { key: 'writing', label: 'Writing', emoji: '✏️' },
  { key: 'science', label: 'Science', emoji: '🔬' },
  { key: 'socialStudies', label: 'Social Studies', emoji: '🗺️' },
]

export default function Overview() {
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'
  const currentWeek = getCurrentWeek()
  const plan = weeklyPlan[currentWeek] || weeklyPlan[1]

  const [lessons, setLessons] = useState(() => loadData(LESSONS_KEY, {}))
  const today = localDateKey()
  const todayDone = lessons[today] || []

  const toggleLesson = (key) => {
    setLessons(prev => {
      const done = prev[today] || []
      const nextDone = done.includes(key) ? done.filter(k => k !== key) : [...done, key]
      const next = { ...prev, [today]: nextDone }
      saveData(LESSONS_KEY, next)
      return next
    })
  }

  const stickers = loadData('savannah-stickers', []).length
  const books = loadData('savannah-reading-log', []).length
  const journalCount = loadData('savannah-journal', []).length
  const badgesEarned = computeBadges().filter(b => b.earned).length

  return (
    <div>
      <div className="welcome">
        <div>
          <h2>{greeting}, {STUDENT_NAME}! 🌸</h2>
          <p>
            Welcome to your homeschool dashboard! This is Week {currentWeek}:{' '}
            <strong>{plan.theme}</strong>. Check off today's lessons below — learning is an
            adventure! 🦋
          </p>
        </div>
        <div className="welcome-emoji">📚</div>
      </div>

      <div className="g4" style={{ marginBottom: 20 }}>
        <div className="stat sb">
          <div className="lbl">Week</div>
          <div className="val">{currentWeek}</div>
          <div className="sub">of 8 weeks</div>
        </div>
        <div className="stat sg">
          <div className="lbl">Books Read</div>
          <div className="val">{books}</div>
          <div className="sub">in the reading log</div>
        </div>
        <div className="stat sy">
          <div className="lbl">Stickers</div>
          <div className="val">{stickers}</div>
          <div className="sub">earned so far</div>
        </div>
        <div className="stat sp">
          <div className="lbl">Badges</div>
          <div className="val">{badgesEarned}</div>
          <div className="sub">{journalCount} journal entries</div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <div className="sec-sm" style={{ marginBottom: 0 }}>✅ Today's Lessons</div>
          <span style={{ fontSize: 13, fontWeight: 800, color: todayDone.length === todaysSubjects.length ? 'var(--green)' : 'var(--mid)' }}>
            {todayDone.length}/{todaysSubjects.length} done
            {todayDone.length === todaysSubjects.length && ' 🎉'}
          </span>
        </div>
        {todaysSubjects.map(subj => {
          const done = todayDone.includes(subj.key)
          return (
            <div
              key={subj.key}
              onClick={() => toggleLesson(subj.key)}
              role="checkbox"
              aria-checked={done}
              tabIndex={0}
              onKeyDown={e => e.key === 'Enter' && toggleLesson(subj.key)}
              style={{
                display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0',
                borderBottom: '1px solid var(--border)', cursor: 'pointer',
              }}
            >
              <span style={{
                width: 24, height: 24, borderRadius: 6, flexShrink: 0,
                border: done ? 'none' : '2px solid var(--border)',
                background: done ? 'var(--green)' : '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontWeight: 800, fontSize: 14,
              }}>
                {done && '✓'}
              </span>
              <span style={{ fontSize: 18 }}>{subj.emoji}</span>
              <div style={{ flex: 1 }}>
                <span style={{ fontWeight: 800, fontSize: 14, textDecoration: done ? 'line-through' : 'none', opacity: done ? 0.55 : 1 }}>
                  {subj.label}
                </span>
                <div style={{ fontSize: 12, color: 'var(--mid)', opacity: done ? 0.55 : 1 }}>
                  {plan[subj.key]}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="note">
        <span className="ni">💡</span>
        <div>
          <strong>Today's Tip:</strong> Try the new <strong>Story Time</strong> game in Play & Learn —
          read short stories and answer questions to level up your reading mastery!
        </div>
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <div className="sec-sm">📢 Announcements</div>
        <div className="note" style={{ marginBottom: 10 }}>
          <span className="ni">🎨</span>
          <div>
            <strong>Art Show Next Friday!</strong> — Bring your best artwork from this semester
            to display at the Kerrville Community Center.
          </div>
        </div>
        <div className="note note-blue" style={{ marginBottom: 10 }}>
          <span className="ni">📚</span>
          <div>
            <strong>Library Visit Thursday</strong> — We'll visit the Kerrville Public Library
            for story time and to pick up new books.
          </div>
        </div>
        <div className="note note-green" style={{ marginBottom: 0 }}>
          <span className="ni">🌿</span>
          <div>
            <strong>Nature Walk Wednesday</strong> — Don't forget your journal and colored pencils
            for our walk along the Guadalupe River!
          </div>
        </div>
      </div>
    </div>
  )
}
