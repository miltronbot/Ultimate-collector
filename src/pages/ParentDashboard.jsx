import { useState } from 'react'
import { teksStandards, getOverallMastery, getSubjectMastery, getMasteryLevel } from '../data/teksStandards'
import { REQUIRED_WEEKLY_MINUTES, loadData } from '../data/config'

export default function ParentDashboard() {
  const [hours] = useState(() => loadData('savannah-hours', []))
  const [attendance] = useState(() => loadData('savannah-attendance', {}))

  const overallMastery = getOverallMastery()
  const masteryInfo = getMasteryLevel(overallMastery)

  const thisWeekHours = hours
    .filter(h => {
      const d = new Date(h.date)
      const now = new Date()
      const weekStart = new Date(now)
      weekStart.setDate(now.getDate() - now.getDay())
      weekStart.setHours(0, 0, 0, 0)
      return d >= weekStart
    })
    .reduce((sum, h) => sum + h.minutes, 0)

  const compliancePct = Math.min(100, Math.round((thisWeekHours / REQUIRED_WEEKLY_MINUTES) * 100))

  const totalDaysAttended = Object.values(attendance).filter(Boolean).length

  const journalEntries = loadData('savannah-journal', []).length
  const books = loadData('savannah-reading-log', []).length
  const stickers = loadData('savannah-stickers', []).length

  const subjects = Object.entries(teksStandards)

  return (
    <div>
      <div className="sec">👩 Parent Dashboard</div>
      <div className="note">
        <span className="ni">📋</span>
        <div>
          Overview of Savannah's progress, Texas compliance status, and academic performance.
          This view is designed for parents and guardians.
        </div>
      </div>

      <div className="g4" style={{ marginBottom: 20 }}>
        <div className="stat sb">
          <div className="lbl">This Week</div>
          <div className="val">{(thisWeekHours / 60).toFixed(1)}h</div>
          <div className="sub">of 25.5h required</div>
        </div>
        <div className="stat sg">
          <div className="lbl">Overall Mastery</div>
          <div className="val">{overallMastery}%</div>
          <div className="sub" style={{ color: masteryInfo.color, fontWeight: 700 }}>{masteryInfo.label}</div>
        </div>
        <div className="stat sy">
          <div className="lbl">Days Attended</div>
          <div className="val">{totalDaysAttended}</div>
          <div className="sub">this semester</div>
        </div>
        <div className="stat sp">
          <div className="lbl">Activities</div>
          <div className="val">{journalEntries + books + stickers}</div>
          <div className="sub">{journalEntries} journal, {books} books</div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: 16 }}>
        <div className="sec-sm">📊 Texas Compliance — Weekly Hours</div>
        <div className="note note-blue" style={{ marginBottom: 12 }}>
          <span className="ni">⚖️</span>
          <div>
            Texas law requires <strong>25.5 instructional hours per week</strong> (Texas Education Code §25.086).
            Log hours in the <strong>Time Log</strong> tab to track compliance.
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <div style={{ flex: 1, height: 20, background: 'var(--border)', borderRadius: 10, overflow: 'hidden' }}>
            <div style={{
              width: `${compliancePct}%`,
              height: '100%',
              background: compliancePct >= 100 ? 'var(--green)' : compliancePct >= 70 ? 'var(--yellow)' : 'var(--red)',
              borderRadius: 10,
              transition: 'width 0.5s',
            }} />
          </div>
          <span style={{ fontFamily: "'Fredoka One', cursive", fontSize: 16, minWidth: 50, color: compliancePct >= 100 ? 'var(--green)' : 'var(--dark)' }}>
            {compliancePct}%
          </span>
        </div>
        <div style={{ fontSize: 13, color: 'var(--mid)' }}>
          {(thisWeekHours / 60).toFixed(1)} hours logged / 25.5 hours required
          {compliancePct >= 100 && <span style={{ color: 'var(--green)', fontWeight: 700 }}> — ✅ Compliant!</span>}
          {compliancePct < 100 && <span> — {((REQUIRED_WEEKLY_MINUTES - thisWeekHours) / 60).toFixed(1)} hours remaining</span>}
        </div>
      </div>

      <div className="card" style={{ marginBottom: 16 }}>
        <div className="sec-sm">📚 Subject Mastery (TEKS Alignment)</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {subjects.map(([key, subject]) => {
            const mastery = getSubjectMastery(key)
            const info = getMasteryLevel(mastery)
            const standardsCount = subject.standards.length
            const masteredCount = subject.standards.filter(s => s.mastery >= 90).length
            return (
              <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 20, minWidth: 30 }}>{subject.emoji}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontWeight: 800, fontSize: 14 }}>{subject.name}</span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: info.color, background: info.bg, padding: '2px 8px', borderRadius: 8 }}>
                      {mastery}% — {info.label}
                    </span>
                  </div>
                  <div style={{ height: 8, background: 'var(--border)', borderRadius: 4, overflow: 'hidden' }}>
                    <div style={{ width: `${mastery}%`, height: '100%', background: subject.color, borderRadius: 4, transition: 'width 0.5s' }} />
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--light)', marginTop: 3 }}>
                    {masteredCount}/{standardsCount} standards mastered
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="g2">
        <div className="card">
          <div className="sec-sm">📝 Recent Journal Entries</div>
          {loadData('savannah-journal', []).slice(0, 3).map((entry, i) => (
            <div key={i} style={{ padding: '8px 0', borderBottom: i < 2 ? '1px solid var(--border)' : 'none', fontSize: 13 }}>
              <div style={{ fontWeight: 700, color: 'var(--mid)', fontSize: 11 }}>
                {new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </div>
              <div style={{ color: 'var(--dark)' }}>{entry.text.slice(0, 80)}{entry.text.length > 80 ? '...' : ''}</div>
            </div>
          ))}
          {loadData('savannah-journal', []).length === 0 && (
            <div style={{ fontSize: 13, color: 'var(--light)', textAlign: 'center', padding: 20 }}>No journal entries yet</div>
          )}
        </div>

        <div className="card">
          <div className="sec-sm">📚 Recent Books</div>
          {loadData('savannah-reading-log', []).slice(0, 3).map((book, i) => (
            <div key={i} style={{ padding: '8px 0', borderBottom: i < 2 ? '1px solid var(--border)' : 'none', fontSize: 13, display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontWeight: 700 }}>{book.title}</div>
                <div style={{ color: 'var(--mid)', fontSize: 11 }}>{book.author}</div>
              </div>
              <div style={{ fontSize: 14 }}>{'⭐'.repeat(book.rating)}</div>
            </div>
          ))}
          {loadData('savannah-reading-log', []).length === 0 && (
            <div style={{ fontSize: 13, color: 'var(--light)', textAlign: 'center', padding: 20 }}>No books logged yet</div>
          )}
        </div>
      </div>
    </div>
  )
}
