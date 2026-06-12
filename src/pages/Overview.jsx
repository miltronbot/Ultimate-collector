import { STUDENT_NAME, getCurrentWeek } from '../data/config'

export default function Overview() {
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'
  const currentWeek = getCurrentWeek()

  return (
    <div>
      <div className="welcome">
        <div>
          <h2>{greeting}, {STUDENT_NAME}! 🌸</h2>
          <p>
            Welcome to your homeschool dashboard! You're doing amazing this semester.
            Keep up the great work — remember, learning is an adventure! 🦋
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
          <div className="lbl">Lessons Done</div>
          <div className="val">24</div>
          <div className="sub">out of 40</div>
        </div>
        <div className="stat sy">
          <div className="lbl">Stickers</div>
          <div className="val">18</div>
          <div className="sub">earned so far</div>
        </div>
        <div className="stat sp">
          <div className="lbl">Books Read</div>
          <div className="val">7</div>
          <div className="sub">this semester</div>
        </div>
      </div>

      <div className="note">
        <span className="ni">💡</span>
        <div>
          <strong>Today's Tip:</strong> Try the new <strong>Rhyme Time</strong> game in Play & Learn!
          It's a fun way to practice word families.
        </div>
      </div>

      <div className="g2">
        <div className="card">
          <div className="sec-sm">📅 Today's Highlights</div>
          <div style={{ fontSize: 14, lineHeight: 1.8 }}>
            <div>🕘 <strong>9:15</strong> — Reading & Phonics (blends)</div>
            <div>🕥 <strong>10:30</strong> — Math (telling time)</div>
            <div>🕚 <strong>11:00</strong> — Science (weather patterns)</div>
            <div>🕛 <strong>12:00</strong> — Journal & Wrap-Up</div>
          </div>
        </div>

        <div className="card">
          <div className="sec-sm">🎯 Weekly Goals</div>
          <div style={{ fontSize: 14, lineHeight: 2 }}>
            <div>✅ Finish Week 5 spelling words</div>
            <div>✅ Read 2 chapters of Charlotte's Web</div>
            <div>⬜ Complete math worksheet on time</div>
            <div>⬜ Write a journal entry about spring</div>
            <div>⬜ Earn 3 new stickers</div>
          </div>
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
