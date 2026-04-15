import { useState } from 'react'

const stickers = ['⭐', '🌟', '💫', '🎯', '🏆', '🌈', '🦋', '🌸', '🎨', '📚', '✏️', '🧮', '🔬', '🎵', '💎', '🌻', '🐝', '🦊', '🐢', '🎈']

export default function Progress() {
  const [earned, setEarned] = useState(() => {
    try {
      const data = localStorage.getItem('savannah-stickers')
      return data ? JSON.parse(data) : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]
    } catch {
      return []
    }
  })

  const toggleSticker = (idx) => {
    setEarned(prev => {
      const next = prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
      localStorage.setItem('savannah-stickers', JSON.stringify(next))
      return next
    })
  }

  const progress = Math.round((earned.length / 40) * 100)

  return (
    <div>
      <div className="sec">📊 Progress & Stickers</div>
      <div className="note">
        <span className="ni">🌟</span>
        <div>Earn stickers by completing lessons, playing games, and doing your best! Click a slot to earn or unearn a sticker.</div>
      </div>

      <div className="g3" style={{ marginBottom: 20 }}>
        <div className="stat sb">
          <div className="lbl">Stickers Earned</div>
          <div className="val">{earned.length}</div>
          <div className="sub">of 40 total</div>
        </div>
        <div className="stat sg">
          <div className="lbl">Progress</div>
          <div className="val">{progress}%</div>
          <div className="sub">of semester</div>
        </div>
        <div className="stat sy">
          <div className="lbl">Current Week</div>
          <div className="val">5</div>
          <div className="sub">of 8 weeks</div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: 20 }}>
        <div className="sec-sm">Weekly Progress</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[1, 2, 3, 4, 5, 6, 7, 8].map(week => {
            const weekStart = (week - 1) * 5
            const weekEarned = earned.filter(i => i >= weekStart && i < weekStart + 5).length
            const pct = (weekEarned / 5) * 100
            return (
              <div key={week} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontWeight: 800, fontSize: 13, minWidth: 55, color: week <= 5 ? 'var(--dark)' : 'var(--light)' }}>
                  Week {week}
                </span>
                <div style={{ flex: 1, height: 12, background: 'var(--border)', borderRadius: 6, overflow: 'hidden' }}>
                  <div style={{ width: `${pct}%`, height: '100%', background: pct === 100 ? 'var(--green)' : 'var(--blue)', borderRadius: 6, transition: 'width 0.3s' }} />
                </div>
                <span style={{ fontWeight: 800, fontSize: 12, color: 'var(--mid)', minWidth: 30 }}>{weekEarned}/5</span>
              </div>
            )
          })}
        </div>
      </div>

      <div className="card">
        <div className="sec-sm">🌟 Sticker Chart</div>
        <div className="sticker-chart">
          {Array.from({ length: 40 }, (_, i) => (
            <div
              key={i}
              className={`sticker-slot ${earned.includes(i) ? 'filled' : ''}`}
              onClick={() => toggleSticker(i)}
              title={earned.includes(i) ? 'Click to remove' : 'Click to earn'}
              style={{ cursor: 'pointer' }}
            >
              {earned.includes(i) ? stickers[i % stickers.length] : ''}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
