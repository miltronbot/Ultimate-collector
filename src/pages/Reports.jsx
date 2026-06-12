import { teksStandards, getMasteryLevel } from '../data/teksStandards'
import { getOverallMasteryDynamic, getSubjectMasteryDynamic, getDynamicMastery } from '../data/progressStore'
import { loadData, STUDENT_NAME, GRADE, LOCATION, SEMESTER_LABEL } from '../data/config'

export default function Reports() {
  const hours = loadData('savannah-hours', [])
  const attendance = loadData('savannah-attendance', {})
  const journal = loadData('savannah-journal', [])
  const books = loadData('savannah-reading-log', [])
  const stickers = loadData('savannah-stickers', [])
  const portfolio = loadData('savannah-portfolio', [])
  const overallMastery = getOverallMasteryDynamic()

  const totalHours = (hours.reduce((sum, h) => sum + h.minutes, 0) / 60).toFixed(1)
  const totalDays = Object.keys(attendance).filter(Boolean).length
  const subjectEntries = Object.entries(teksStandards)

  const printReport = () => {
    window.print()
  }

  return (
    <div>
      <div className="sec">📄 Reports & Records</div>
      <div className="note">
        <span className="ni">🖨️</span>
        <div>
          Generate and print progress reports for your homeschool records.
          Use the <strong>Print Report</strong> button to create a printable version.
        </div>
      </div>

      <button className="game-btn game-btn-primary" onClick={printReport} style={{ marginBottom: 20 }} aria-label="Print this report">
        🖨️ Print Report
      </button>

      <div className="card" id="printable-report" style={{ marginBottom: 16 }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <div style={{ fontFamily: "'Fredoka One', cursive", fontSize: 24, marginBottom: 4 }}>
            {STUDENT_NAME}'s Homeschool Progress Report
          </div>
          <div style={{ fontSize: 14, color: 'var(--mid)' }}>
            {GRADE} — {LOCATION} — {SEMESTER_LABEL}
          </div>
          <div style={{ fontSize: 12, color: 'var(--light)', marginTop: 4 }}>
            Generated {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 24 }}>
          <div style={{ textAlign: 'center', padding: 12, background: 'var(--blue-s)', borderRadius: 10 }}>
            <div style={{ fontFamily: "'Fredoka One', cursive", fontSize: 24, color: 'var(--blue)' }}>{totalHours}h</div>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--mid)' }}>Total Hours Logged</div>
          </div>
          <div style={{ textAlign: 'center', padding: 12, background: 'var(--green-s)', borderRadius: 10 }}>
            <div style={{ fontFamily: "'Fredoka One', cursive", fontSize: 24, color: 'var(--green)' }}>{totalDays}</div>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--mid)' }}>Days Attended</div>
          </div>
          <div style={{ textAlign: 'center', padding: 12, background: 'var(--purple-s)', borderRadius: 10 }}>
            <div style={{ fontFamily: "'Fredoka One', cursive", fontSize: 24, color: 'var(--purple)' }}>{overallMastery}%</div>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--mid)' }}>Overall Mastery</div>
          </div>
          <div style={{ textAlign: 'center', padding: 12, background: 'var(--yellow-s)', borderRadius: 10 }}>
            <div style={{ fontFamily: "'Fredoka One', cursive", fontSize: 24, color: 'var(--yellow-d)' }}>{stickers.length}</div>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--mid)' }}>Stickers Earned</div>
          </div>
        </div>

        <div style={{ marginBottom: 24 }}>
          <div className="sec-sm">Academic Performance by Subject</div>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border)' }}>
                <th style={{ textAlign: 'left', padding: 8, fontWeight: 800, color: 'var(--mid)', fontSize: 11, textTransform: 'uppercase' }}>Subject</th>
                <th style={{ textAlign: 'center', padding: 8, fontWeight: 800, color: 'var(--mid)', fontSize: 11, textTransform: 'uppercase' }}>Mastery</th>
                <th style={{ textAlign: 'center', padding: 8, fontWeight: 800, color: 'var(--mid)', fontSize: 11, textTransform: 'uppercase' }}>Level</th>
                <th style={{ textAlign: 'center', padding: 8, fontWeight: 800, color: 'var(--mid)', fontSize: 11, textTransform: 'uppercase' }}>Standards</th>
              </tr>
            </thead>
            <tbody>
              {subjectEntries.map(([key, subject]) => {
                const mastery = getSubjectMasteryDynamic(key)
                const info = getMasteryLevel(mastery)
                const masteredCount = subject.standards.filter(s => getDynamicMastery(s).mastery >= 90).length
                return (
                  <tr key={key} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: 10, fontWeight: 700 }}>{subject.emoji} {subject.name}</td>
                    <td style={{ textAlign: 'center', padding: 10 }}>
                      <span style={{ fontWeight: 800, color: info.color }}>{mastery}%</span>
                    </td>
                    <td style={{ textAlign: 'center', padding: 10 }}>
                      <span style={{ fontSize: 11, fontWeight: 700, background: info.bg, color: info.color, padding: '3px 8px', borderRadius: 6 }}>
                        {info.label}
                      </span>
                    </td>
                    <td style={{ textAlign: 'center', padding: 10, fontSize: 12, color: 'var(--mid)' }}>
                      {masteredCount}/{subject.standards.length} mastered
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        <div style={{ marginBottom: 24 }}>
          <div className="sec-sm">📚 Reading Log ({books.length} books)</div>
          {books.length > 0 ? (
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border)' }}>
                  <th style={{ textAlign: 'left', padding: 6, fontWeight: 800, color: 'var(--mid)', fontSize: 11 }}>Title</th>
                  <th style={{ textAlign: 'left', padding: 6, fontWeight: 800, color: 'var(--mid)', fontSize: 11 }}>Author</th>
                  <th style={{ textAlign: 'center', padding: 6, fontWeight: 800, color: 'var(--mid)', fontSize: 11 }}>Pages</th>
                  <th style={{ textAlign: 'center', padding: 6, fontWeight: 800, color: 'var(--mid)', fontSize: 11 }}>Rating</th>
                </tr>
              </thead>
              <tbody>
                {books.map((book, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: 6, fontWeight: 600 }}>{book.title}</td>
                    <td style={{ padding: 6, color: 'var(--mid)' }}>{book.author}</td>
                    <td style={{ textAlign: 'center', padding: 6 }}>{book.pages || '—'}</td>
                    <td style={{ textAlign: 'center', padding: 6 }}>{'⭐'.repeat(book.rating)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div style={{ fontSize: 13, color: 'var(--light)', padding: 12 }}>No books logged yet</div>
          )}
        </div>

        {portfolio.length > 0 && (
          <div style={{ marginBottom: 24 }}>
            <div className="sec-sm">🖼️ Work Samples ({portfolio.length} items)</div>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border)' }}>
                  <th style={{ textAlign: 'left', padding: 6, fontWeight: 800, color: 'var(--mid)', fontSize: 11 }}>Title</th>
                  <th style={{ textAlign: 'left', padding: 6, fontWeight: 800, color: 'var(--mid)', fontSize: 11 }}>Subject</th>
                  <th style={{ textAlign: 'center', padding: 6, fontWeight: 800, color: 'var(--mid)', fontSize: 11 }}>Date</th>
                </tr>
              </thead>
              <tbody>
                {portfolio.map((item, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: 6, fontWeight: 600 }}>{item.title}</td>
                    <td style={{ padding: 6, color: 'var(--mid)' }}>{item.subject}</td>
                    <td style={{ textAlign: 'center', padding: 6 }}>{new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div>
          <div className="sec-sm">📓 Journal Entries ({journal.length} entries)</div>
          {journal.length > 0 ? (
            journal.slice(0, 5).map((entry, i) => (
              <div key={i} style={{ padding: '8px 0', borderBottom: '1px solid var(--border)', fontSize: 13 }}>
                <span style={{ fontWeight: 700, color: 'var(--mid)', fontSize: 11 }}>
                  {new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
                <div>{entry.text.slice(0, 120)}{entry.text.length > 120 ? '...' : ''}</div>
              </div>
            ))
          ) : (
            <div style={{ fontSize: 13, color: 'var(--light)', padding: 12 }}>No journal entries yet</div>
          )}
        </div>

        <div style={{ marginTop: 32, paddingTop: 16, borderTop: '2px solid var(--border)', textAlign: 'center', fontSize: 11, color: 'var(--light)' }}>
          <div>This report is generated from {STUDENT_NAME}'s Homeschool Dashboard</div>
          <div>Aligned with Texas Essential Knowledge and Skills (TEKS) — {GRADE}</div>
          <div style={{ marginTop: 8 }}>Parent Signature: ________________________________ &nbsp;&nbsp; Date: ________________</div>
        </div>
      </div>
    </div>
  )
}
