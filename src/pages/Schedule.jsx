import { useState } from 'react'
import { scheduleData } from '../data/schoolData'

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']

export default function Schedule() {
  const today = new Date().getDay()
  const defaultDay = today >= 1 && today <= 5 ? days[today - 1] : 'Monday'
  const [selectedDay, setSelectedDay] = useState(defaultDay)

  const blocks = scheduleData[selectedDay]

  return (
    <div>
      <div className="sec">📅 Daily Schedule</div>

      <div className="note">
        <span className="ni">🕘</span>
        <div>
          School runs <strong>9:00 AM – 12:10 PM</strong> each day.
          🧑‍🏫 = Guided by parent &nbsp; ⭐ = Independent work
        </div>
      </div>

      <div className="day-btns">
        {days.map(day => (
          <button
            key={day}
            className={`day-btn ${selectedDay === day ? 'active' : ''}`}
            onClick={() => setSelectedDay(day)}
          >
            {day}
          </button>
        ))}
      </div>

      {blocks.map((block, i) => (
        <div className="blk" key={i}>
          <div className="blk-time">{block.time}</div>
          <div className={`blk-card ${block.type}`}>
            <div className="blk-icon">{block.icon}</div>
            <div className="blk-info">
              <div className="blk-title">{block.title}</div>
              <div className="blk-desc">{block.desc}</div>
            </div>
            {block.badge && <div className="blk-badge">{block.badge}</div>}
          </div>
        </div>
      ))}
    </div>
  )
}
