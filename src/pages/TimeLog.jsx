import { useState, useEffect } from 'react'
import { REQUIRED_WEEKLY_HOURS, REQUIRED_WEEKLY_MINUTES, loadData, saveData, localDateKey } from '../data/config'

const STORAGE_KEY = 'savannah-hours'
const subjects = [
  { id: 'reading', name: 'Reading & Phonics', emoji: '📖', color: 'var(--blue)' },
  { id: 'math', name: 'Mathematics', emoji: '🔢', color: 'var(--yellow)' },
  { id: 'writing', name: 'Writing', emoji: '✏️', color: 'var(--teal)' },
  { id: 'science', name: 'Science', emoji: '🔬', color: 'var(--green)' },
  { id: 'social', name: 'Social Studies', emoji: '🗺️', color: 'var(--purple)' },
  { id: 'art', name: 'Art & Music', emoji: '🎨', color: 'var(--pink)' },
  { id: 'pe', name: 'Physical Education', emoji: '🏃', color: 'var(--orange)' },
  { id: 'other', name: 'Other Learning', emoji: '⭐', color: 'var(--mid)' },
]

function getWeekStart(date) {
  const d = new Date(date)
  d.setDate(d.getDate() - d.getDay())
  d.setHours(0, 0, 0, 0)
  return d
}

export default function TimeLog() {
  const [entries, setEntries] = useState(() => loadData(STORAGE_KEY, []))
  const [showForm, setShowForm] = useState(false)
  const [date, setDate] = useState(() => localDateKey())
  const [subject, setSubject] = useState('reading')
  const [minutes, setMinutes] = useState('')
  const [notes, setNotes] = useState('')
  const [viewWeek, setViewWeek] = useState('current')

  useEffect(() => {
    saveData(STORAGE_KEY, entries)
  }, [entries])

  const addEntry = () => {
    if (!minutes || parseInt(minutes) <= 0) return
    const entry = {
      id: Date.now(),
      date,
      subject,
      minutes: parseInt(minutes, 10),
      notes: notes.trim(),
    }
    setEntries(prev => [entry, ...prev])
    setMinutes('')
    setNotes('')
    setShowForm(false)
  }

  const deleteEntry = (id) => {
    setEntries(prev => prev.filter(e => e.id !== id))
  }

  const now = new Date()
  const weekStart = getWeekStart(now)
  const lastWeekStart = new Date(weekStart)
  lastWeekStart.setDate(lastWeekStart.getDate() - 7)

  const filterStart = viewWeek === 'current' ? weekStart : lastWeekStart
  const filterEnd = viewWeek === 'current' ? new Date(weekStart.getTime() + 7 * 86400000) : weekStart

  const weekEntries = entries.filter(e => {
    const d = new Date(e.date)
    return d >= filterStart && d < filterEnd
  })

  const totalMinutes = weekEntries.reduce((sum, e) => sum + e.minutes, 0)
  const requiredMinutes = REQUIRED_WEEKLY_MINUTES
  const compliancePct = Math.min(100, Math.round((totalMinutes / requiredMinutes) * 100))

  const bySubject = {}
  weekEntries.forEach(e => {
    bySubject[e.subject] = (bySubject[e.subject] || 0) + e.minutes
  })

  const byDay = {}
  weekEntries.forEach(e => {
    const dayName = new Date(e.date).toLocaleDateString('en-US', { weekday: 'short' })
    byDay[dayName] = (byDay[dayName] || 0) + e.minutes
  })

  return (
    <div>
      <div className="sec">⏱️ Time Log</div>
      <div className="note">
        <span className="ni">⚖️</span>
        <div>
          Texas requires <strong>{REQUIRED_WEEKLY_HOURS} hours of instruction per week</strong>.
          Log your daily learning time to stay compliant and build your records.
        </div>
      </div>

      <div className="card" style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <div className="sec-sm" style={{ marginBottom: 0 }}>Weekly Compliance</div>
          <div className="day-btns" style={{ marginBottom: 0 }}>
            <button className={`day-btn ${viewWeek === 'current' ? 'active' : ''}`} onClick={() => setViewWeek('current')}>This Week</button>
            <button className={`day-btn ${viewWeek === 'last' ? 'active' : ''}`} onClick={() => setViewWeek('last')}>Last Week</button>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
          <div style={{ flex: 1, height: 24, background: 'var(--border)', borderRadius: 12, overflow: 'hidden' }}>
            <div style={{
              width: `${compliancePct}%`,
              height: '100%',
              background: compliancePct >= 100 ? 'var(--green)' : compliancePct >= 70 ? 'var(--blue)' : compliancePct >= 40 ? 'var(--yellow)' : 'var(--red)',
              borderRadius: 12,
              transition: 'width 0.5s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 11,
              fontWeight: 800,
              color: '#fff',
            }}>
              {compliancePct >= 15 && `${compliancePct}%`}
            </div>
          </div>
          <span style={{ fontFamily: "'Fredoka One', cursive", fontSize: 18, minWidth: 60, textAlign: 'right', color: compliancePct >= 100 ? 'var(--green)' : 'var(--dark)' }}>
            {(totalMinutes / 60).toFixed(1)}h
          </span>
        </div>

        <div style={{ fontSize: 13, color: 'var(--mid)', display: 'flex', justifyContent: 'space-between' }}>
          <span>{(totalMinutes / 60).toFixed(1)} of {REQUIRED_WEEKLY_HOURS} hours logged</span>
          {compliancePct >= 100
            ? <span style={{ color: 'var(--green)', fontWeight: 700 }}>✅ Compliant</span>
            : <span>{((requiredMinutes - totalMinutes) / 60).toFixed(1)} hours remaining</span>
          }
        </div>
      </div>

      <div className="g2" style={{ marginBottom: 16 }}>
        <div className="card">
          <div className="sec-sm">By Subject</div>
          {subjects.map(s => {
            const mins = bySubject[s.id] || 0
            if (mins === 0 && Object.keys(bySubject).length > 0) return null
            return (
              <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0', borderBottom: '1px solid var(--border)' }}>
                <span style={{ fontSize: 16 }}>{s.emoji}</span>
                <span style={{ flex: 1, fontSize: 13, fontWeight: 700 }}>{s.name}</span>
                <span style={{ fontSize: 13, fontWeight: 800, color: s.color }}>
                  {mins >= 60 ? `${Math.floor(mins / 60)}h ${mins % 60}m` : `${mins}m`}
                </span>
              </div>
            )
          })}
          {Object.keys(bySubject).length === 0 && (
            <div style={{ fontSize: 13, color: 'var(--light)', textAlign: 'center', padding: 16 }}>No hours logged yet</div>
          )}
        </div>

        <div className="card">
          <div className="sec-sm">By Day</div>
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => {
            const mins = byDay[day] || 0
            const pct = Math.min(100, (mins / (REQUIRED_WEEKLY_MINUTES / 5)) * 100)
            return (
              <div key={day} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '5px 0' }}>
                <span style={{ fontSize: 12, fontWeight: 800, minWidth: 30, color: 'var(--mid)' }}>{day}</span>
                <div style={{ flex: 1, height: 10, background: 'var(--border)', borderRadius: 5, overflow: 'hidden' }}>
                  <div style={{ width: `${pct}%`, height: '100%', background: 'var(--blue)', borderRadius: 5 }} />
                </div>
                <span style={{ fontSize: 11, fontWeight: 700, minWidth: 40, textAlign: 'right', color: mins > 0 ? 'var(--dark)' : 'var(--light)' }}>
                  {mins > 0 ? (mins >= 60 ? `${Math.floor(mins / 60)}h${mins % 60 > 0 ? ` ${mins % 60}m` : ''}` : `${mins}m`) : '—'}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      <button className="game-btn game-btn-primary" onClick={() => setShowForm(!showForm)} style={{ marginBottom: 16 }} aria-label={showForm ? 'Cancel adding time' : 'Add time entry'}>
        {showForm ? '✕ Cancel' : '+ Log Time'}
      </button>

      {showForm && (
        <div className="card" style={{ marginBottom: 16 }}>
          <div className="sec-sm">Log Learning Time</div>
          <div className="g2" style={{ marginBottom: 12 }}>
            <div>
              <label className="form-label" htmlFor="time-date">Date</label>
              <input id="time-date" className="form-input" type="date" value={date} onChange={e => setDate(e.target.value)} />
            </div>
            <div>
              <label className="form-label" htmlFor="time-minutes">Minutes</label>
              <input id="time-minutes" className="form-input" type="number" value={minutes} onChange={e => setMinutes(e.target.value)} placeholder="e.g. 45" min="1" max="480" />
            </div>
          </div>
          <div style={{ marginBottom: 12 }}>
            <label className="form-label">Subject</label>
            <div className="day-btns">
              {subjects.map(s => (
                <button
                  key={s.id}
                  className={`day-btn ${subject === s.id ? 'active' : ''}`}
                  onClick={() => setSubject(s.id)}
                  style={subject === s.id ? { background: s.color, borderColor: s.color } : {}}
                >
                  {s.emoji} {s.name}
                </button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 12 }}>
            <label className="form-label" htmlFor="time-notes">Notes (optional)</label>
            <input id="time-notes" className="form-input" value={notes} onChange={e => setNotes(e.target.value)} placeholder="What did you work on?" />
          </div>
          <button className="game-btn game-btn-success" onClick={addEntry} disabled={!minutes || parseInt(minutes, 10) <= 0} aria-label="Save time entry">
            💾 Save Entry
          </button>
        </div>
      )}

      {weekEntries.length > 0 && (
        <div className="card">
          <div className="sec-sm">Recent Entries</div>
          {weekEntries.sort((a, b) => new Date(b.date) - new Date(a.date)).map(entry => {
            const subj = subjects.find(s => s.id === entry.subject)
            return (
              <div key={entry.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
                <span style={{ fontSize: 18 }}>{subj?.emoji || '📝'}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{subj?.name || entry.subject}</div>
                  <div style={{ fontSize: 12, color: 'var(--mid)' }}>
                    {new Date(entry.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                    {entry.notes && ` — ${entry.notes}`}
                  </div>
                </div>
                <span style={{ fontWeight: 800, fontSize: 14, color: subj?.color || 'var(--dark)' }}>
                  {entry.minutes >= 60 ? `${Math.floor(entry.minutes / 60)}h ${entry.minutes % 60}m` : `${entry.minutes}m`}
                </span>
                <button
                  onClick={() => deleteEntry(entry.id)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, color: 'var(--light)' }}
                  aria-label={`Delete ${subj?.name} entry`}
                >
                  🗑️
                </button>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
