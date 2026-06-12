import { useState } from 'react'
import { teksStandards, getMasteryLevel } from '../data/teksStandards'
import { getDynamicMastery, getSubjectMasteryDynamic } from '../data/progressStore'
import { GRADE } from '../data/config'

const subjectKeys = Object.keys(teksStandards)

export default function TEKSTracker() {
  const [selectedSubject, setSelectedSubject] = useState('reading')
  const [expandedStandard, setExpandedStandard] = useState(null)

  const subject = teksStandards[selectedSubject]
  const mastery = getSubjectMasteryDynamic(selectedSubject)
  const info = getMasteryLevel(mastery)

  // resolve each standard's live mastery once for counting + display
  const liveStandards = subject.standards.map(s => ({ ...s, ...getDynamicMastery(s) }))
  const masteredCount = liveStandards.filter(s => s.mastery >= 90).length
  const proficientCount = liveStandards.filter(s => s.mastery >= 75 && s.mastery < 90).length
  const developingCount = liveStandards.filter(s => s.mastery >= 60 && s.mastery < 75).length
  const emergingCount = liveStandards.filter(s => s.mastery < 60).length

  return (
    <div>
      <div className="sec">📋 TEKS Standards Tracker</div>
      <div className="note">
        <span className="ni">🏛️</span>
        <div>
          Track mastery of <strong>Texas Essential Knowledge and Skills (TEKS)</strong> standards
          for {GRADE}. Each standard is assessed through lessons, games, and activities.
        </div>
      </div>

      <div className="day-btns" style={{ marginBottom: 20 }}>
        {subjectKeys.map(key => (
          <button
            key={key}
            className={`day-btn ${selectedSubject === key ? 'active' : ''}`}
            onClick={() => setSelectedSubject(key)}
            style={selectedSubject === key ? { background: teksStandards[key].color, borderColor: teksStandards[key].color } : {}}
          >
            {teksStandards[key].emoji} {teksStandards[key].name}
          </button>
        ))}
      </div>

      <div className="g4" style={{ marginBottom: 20 }}>
        <div className="stat" style={{ borderLeft: `4px solid var(--green)` }}>
          <div className="lbl">Mastered</div>
          <div className="val" style={{ color: 'var(--green)' }}>{masteredCount}</div>
          <div className="sub">90%+</div>
        </div>
        <div className="stat" style={{ borderLeft: '4px solid var(--blue)' }}>
          <div className="lbl">Proficient</div>
          <div className="val" style={{ color: 'var(--blue)' }}>{proficientCount}</div>
          <div className="sub">75-89%</div>
        </div>
        <div className="stat" style={{ borderLeft: '4px solid var(--yellow)' }}>
          <div className="lbl">Developing</div>
          <div className="val" style={{ color: 'var(--yellow-d)' }}>{developingCount}</div>
          <div className="sub">60-74%</div>
        </div>
        <div className="stat" style={{ borderLeft: '4px solid var(--red)' }}>
          <div className="lbl">Emerging</div>
          <div className="val" style={{ color: 'var(--red)' }}>{emergingCount}</div>
          <div className="sub">Below 60%</div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div className="sec-sm" style={{ marginBottom: 0 }}>
            {subject.emoji} {subject.name} — Standards
          </div>
          <span style={{ fontSize: 14, fontWeight: 700, color: info.color, background: info.bg, padding: '4px 12px', borderRadius: 8 }}>
            {mastery}% Overall
          </span>
        </div>

        {liveStandards.map((std, i) => {
          const stdInfo = getMasteryLevel(std.mastery)
          const isExpanded = expandedStandard === std.id
          return (
            <div
              key={std.id}
              style={{
                padding: '14px 0',
                borderBottom: i < liveStandards.length - 1 ? '1px solid var(--border)' : 'none',
                cursor: 'pointer',
              }}
              onClick={() => setExpandedStandard(isExpanded ? null : std.id)}
              role="button"
              aria-expanded={isExpanded}
              aria-label={`${std.id}: ${std.desc}, mastery ${std.mastery}%`}
              tabIndex={0}
              onKeyDown={e => e.key === 'Enter' && setExpandedStandard(isExpanded ? null : std.id)}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{
                  fontSize: 11, fontWeight: 800, fontFamily: "'Nunito', sans-serif",
                  background: stdInfo.bg, color: stdInfo.color,
                  padding: '3px 8px', borderRadius: 6, minWidth: 90, textAlign: 'center',
                }}>
                  {std.id}
                </span>
                <div style={{ flex: 1, fontSize: 14, fontWeight: 600 }}>{std.desc}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                  <div style={{ width: 80, height: 8, background: 'var(--border)', borderRadius: 4, overflow: 'hidden' }}>
                    <div style={{ width: `${std.mastery}%`, height: '100%', background: stdInfo.color, borderRadius: 4 }} />
                  </div>
                  <span style={{ fontWeight: 800, fontSize: 13, color: stdInfo.color, minWidth: 35 }}>
                    {std.mastery}%{std.live && <span title="Updated live from game practice" aria-label="updated from game practice"> ⚡</span>}
                  </span>
                  <span style={{ fontSize: 12, transform: isExpanded ? 'rotate(180deg)' : 'rotate(0)', transition: '0.2s' }}>▼</span>
                </div>
              </div>
              {isExpanded && (
                <div style={{ marginTop: 10, marginLeft: 102, fontSize: 13, color: 'var(--mid)', lineHeight: 1.6 }}>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 4 }}>
                    <span style={{ fontWeight: 700 }}>Status:</span>
                    <span style={{ fontWeight: 700, color: stdInfo.color }}>{stdInfo.label}</span>
                  </div>
                  <div>
                    {std.mastery >= 90 && '✅ This standard has been mastered. Continue to review periodically.'}
                    {std.mastery >= 75 && std.mastery < 90 && '📈 Good progress! A few more practice sessions should reach mastery.'}
                    {std.mastery >= 60 && std.mastery < 75 && '📝 Developing well. Focus on targeted practice with this skill.'}
                    {std.mastery < 60 && '🎯 Needs focused attention. Consider extra practice activities and hands-on learning.'}
                  </div>
                  {std.live && (
                    <div style={{ marginTop: 4, color: 'var(--blue)', fontWeight: 700 }}>
                      ⚡ This score updates live as games mapped to this standard are played.
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
