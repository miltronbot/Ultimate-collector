import { useState, useEffect } from 'react'
import { getSemesterSchoolDays } from '../data/config'

const STORAGE_KEY = 'savannah-attendance'

function loadAttendance() {
  try {
    const d = localStorage.getItem(STORAGE_KEY)
    return d ? JSON.parse(d) : {}
  } catch { return {} }
}

function getMonthDays(year, month) {
  const days = []
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const startPad = firstDay.getDay()
  for (let i = 0; i < startPad; i++) days.push(null)
  for (let d = 1; d <= lastDay.getDate(); d++) days.push(d)
  return days
}

function formatDateKey(year, month, day) {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
}

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

export default function Attendance() {
  const [attendance, setAttendance] = useState(loadAttendance)
  const now = new Date()
  const [viewMonth, setViewMonth] = useState(now.getMonth())
  const [viewYear, setViewYear] = useState(now.getFullYear())

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(attendance))
  }, [attendance])

  const days = getMonthDays(viewYear, viewMonth)

  const toggleDay = (day) => {
    if (!day) return
    const key = formatDateKey(viewYear, viewMonth, day)
    setAttendance(prev => {
      const next = { ...prev }
      if (next[key]) {
        delete next[key]
      } else {
        next[key] = true
      }
      return next
    })
  }

  const monthAttendance = Object.keys(attendance).filter(key => {
    const [y, m] = key.split('-')
    return parseInt(y) === viewYear && parseInt(m) === viewMonth + 1
  }).length

  const totalAttendance = Object.keys(attendance).filter(Boolean).length

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1) }
    else setViewMonth(m => m - 1)
  }

  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1) }
    else setViewMonth(m => m + 1)
  }

  const totalSchoolDays = getSemesterSchoolDays()
  const attendancePct = totalSchoolDays > 0 ? Math.round((totalAttendance / totalSchoolDays) * 100) : 0

  return (
    <div>
      <div className="sec">📅 Attendance Tracker</div>
      <div className="note">
        <span className="ni">✅</span>
        <div>
          Track school days for your homeschool records. Click a day to mark it as attended.
          Texas homeschool law requires instruction on a regular basis.
        </div>
      </div>

      <div className="g3" style={{ marginBottom: 20 }}>
        <div className="stat sg">
          <div className="lbl">This Month</div>
          <div className="val">{monthAttendance}</div>
          <div className="sub">days attended</div>
        </div>
        <div className="stat sb">
          <div className="lbl">Total Days</div>
          <div className="val">{totalAttendance}</div>
          <div className="sub">this semester</div>
        </div>
        <div className="stat sp">
          <div className="lbl">Attendance Rate</div>
          <div className="val">{attendancePct}%</div>
          <div className="sub">of school days</div>
        </div>
      </div>

      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <button className="game-btn game-btn-outline" onClick={prevMonth} aria-label="Previous month" style={{ padding: '8px 16px', fontSize: 14 }}>
            ◀
          </button>
          <div style={{ fontFamily: "'Fredoka One', cursive", fontSize: 20 }}>
            {months[viewMonth]} {viewYear}
          </div>
          <button className="game-btn game-btn-outline" onClick={nextMonth} aria-label="Next month" style={{ padding: '8px 16px', fontSize: 14 }}>
            ▶
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4, textAlign: 'center', marginBottom: 8 }}>
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
            <div key={d} style={{ fontSize: 11, fontWeight: 800, color: 'var(--mid)', padding: 4 }}>{d}</div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4 }}>
          {days.map((day, i) => {
            if (!day) return <div key={`pad-${i}`} />
            const key = formatDateKey(viewYear, viewMonth, day)
            const isAttended = attendance[key]
            const isToday = day === now.getDate() && viewMonth === now.getMonth() && viewYear === now.getFullYear()
            const dayOfWeek = new Date(viewYear, viewMonth, day).getDay()
            const isWeekend = dayOfWeek === 0 || dayOfWeek === 6

            return (
              <div
                key={day}
                onClick={() => toggleDay(day)}
                role="button"
                tabIndex={0}
                onKeyDown={e => e.key === 'Enter' && toggleDay(day)}
                aria-label={`${months[viewMonth]} ${day}${isAttended ? ', attended' : ''}`}
                style={{
                  aspectRatio: '1',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 10,
                  cursor: 'pointer',
                  fontSize: 14,
                  fontWeight: 700,
                  transition: '0.2s',
                  background: isAttended ? 'var(--green)' : isToday ? 'var(--blue-s)' : isWeekend ? '#f8fafd' : '#fff',
                  color: isAttended ? '#fff' : isWeekend ? 'var(--light)' : 'var(--dark)',
                  border: isToday && !isAttended ? '2px solid var(--blue)' : '1px solid var(--border)',
                }}
              >
                {isAttended ? '✓' : day}
              </div>
            )
          })}
        </div>

        <div style={{ marginTop: 16, display: 'flex', gap: 16, justifyContent: 'center', fontSize: 12, color: 'var(--mid)' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ width: 12, height: 12, borderRadius: 3, background: 'var(--green)', display: 'inline-block' }} /> Attended
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ width: 12, height: 12, borderRadius: 3, border: '2px solid var(--blue)', display: 'inline-block' }} /> Today
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ width: 12, height: 12, borderRadius: 3, background: '#f8fafd', border: '1px solid var(--border)', display: 'inline-block' }} /> Weekend
          </span>
        </div>
      </div>
    </div>
  )
}
