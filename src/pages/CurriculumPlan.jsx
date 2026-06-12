import { useState } from 'react'
import { weeklyPlan, resources } from '../data/curriculumPlan'
import { teksStandards } from '../data/teksStandards'

const weeks = Object.keys(weeklyPlan)
const subjectIcons = { reading: '📖', math: '🔢', writing: '✏️', science: '🔬', socialStudies: '🗺️' }
const subjectColors = { reading: 'var(--blue)', math: 'var(--yellow)', writing: 'var(--teal)', science: 'var(--green)', socialStudies: 'var(--purple)' }
const subjectBgs = { reading: 'var(--blue-s)', math: 'var(--yellow-s)', writing: 'var(--teal-s)', science: 'var(--green-s)', socialStudies: 'var(--purple-s)' }

export default function CurriculumPlan() {
  const [selectedWeek, setSelectedWeek] = useState(5)
  const [showResources, setShowResources] = useState(false)
  const plan = weeklyPlan[selectedWeek]

  const allTeksStandards = Object.values(teksStandards).flatMap(s => s.standards)

  return (
    <div>
      <div className="sec">📚 Curriculum Planner</div>
      <div className="note">
        <span className="ni">📋</span>
        <div>
          8-week curriculum aligned to <strong>Texas TEKS standards</strong> for 2nd grade.
          Each week has a theme with detailed plans for every core subject.
        </div>
      </div>

      <div className="day-btns" style={{ marginBottom: 20 }}>
        {weeks.map(w => (
          <button
            key={w}
            className={`day-btn ${selectedWeek === parseInt(w) ? 'active' : ''}`}
            onClick={() => setSelectedWeek(parseInt(w))}
          >
            Week {w}
          </button>
        ))}
      </div>

      <div className="card" style={{ marginBottom: 16, background: 'linear-gradient(135deg, #fce4f2, var(--yellow-s))', borderColor: 'var(--pink)' }}>
        <div style={{ fontFamily: "'Fredoka One', cursive", fontSize: 22, marginBottom: 4 }}>
          Week {selectedWeek}: {plan.theme}
        </div>
        <div style={{ fontSize: 13, color: 'var(--mid)' }}>
          {plan.teksIds.length} TEKS standards covered this week
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
        {['reading', 'math', 'writing', 'science', 'socialStudies'].map(subj => (
          <div
            key={subj}
            className="card"
            style={{ borderLeft: `5px solid ${subjectColors[subj]}`, paddingLeft: 20 }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <span style={{ fontSize: 22 }}>{subjectIcons[subj]}</span>
              <div>
                <div style={{ fontFamily: "'Fredoka One', cursive", fontSize: 16 }}>
                  {subj === 'socialStudies' ? 'Social Studies' : subj.charAt(0).toUpperCase() + subj.slice(1)}
                </div>
              </div>
            </div>
            <div style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--dark)' }}>
              {plan[subj]}
            </div>
            <div style={{ marginTop: 8, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {plan.teksIds
                .filter(id => {
                  const std = allTeksStandards.find(s => s.id === id)
                  if (!std) return false
                  if (subj === 'reading' && (id.startsWith('ELA.2.1') || id.startsWith('ELA.2.2') || id.startsWith('ELA.2.3') || id.startsWith('ELA.2.4') || id.startsWith('ELA.2.6') || id.startsWith('ELA.2.7') || id.startsWith('ELA.2.8') || id.startsWith('ELA.2.9'))) return true
                  if (subj === 'math' && id.startsWith('MATH')) return true
                  if (subj === 'writing' && (id.startsWith('ELA.2.10') || id.startsWith('ELA.2.11') || id.startsWith('ELA.2.12'))) return true
                  if (subj === 'science' && id.startsWith('SCI')) return true
                  if (subj === 'socialStudies' && id.startsWith('SS')) return true
                  return false
                })
                .map(id => {
                  const std = allTeksStandards.find(s => s.id === id)
                  return (
                    <span
                      key={id}
                      style={{
                        fontSize: 11, fontWeight: 800,
                        background: subjectBgs[subj], color: subjectColors[subj],
                        padding: '3px 8px', borderRadius: 6,
                      }}
                      title={std?.desc}
                    >
                      {id}
                    </span>
                  )
                })}
            </div>
          </div>
        ))}
      </div>

      <button
        className="game-btn game-btn-outline"
        onClick={() => setShowResources(!showResources)}
        style={{ marginBottom: 16 }}
        aria-expanded={showResources}
      >
        {showResources ? '▲ Hide' : '▼ Show'} Recommended Resources
      </button>

      {showResources && (
        <div className="g2">
          {Object.entries(resources).map(([category, items]) => (
            <div className="card" key={category}>
              <div className="sec-sm" style={{ textTransform: 'capitalize' }}>
                {category === 'socialStudies' ? 'Social Studies' : category === 'general' ? '📌 General Resources' : `${subjectIcons[category] || '📚'} ${category.charAt(0).toUpperCase() + category.slice(1)}`}
              </div>
              {items.map((item, i) => (
                <div key={i} style={{ padding: '8px 0', borderBottom: i < items.length - 1 ? '1px solid var(--border)' : 'none' }}>
                  <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--blue)' }}>{item.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--mid)' }}>{item.desc}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
