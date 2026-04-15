import { useState } from 'react'
import { spellingWords } from '../data/schoolData'

const weeks = Object.keys(spellingWords)

export default function Spelling() {
  const [selectedWeek, setSelectedWeek] = useState('Week 5')
  const [testMode, setTestMode] = useState(false)
  const [testIdx, setTestIdx] = useState(0)
  const [answer, setAnswer] = useState('')
  const [score, setScore] = useState(0)
  const [feedback, setFeedback] = useState('')
  const [done, setDone] = useState(false)
  const [results, setResults] = useState([])

  const words = spellingWords[selectedWeek]

  const startTest = () => {
    setTestMode(true)
    setTestIdx(0)
    setScore(0)
    setAnswer('')
    setFeedback('')
    setDone(false)
    setResults([])
  }

  const checkAnswer = () => {
    const correct = answer.toLowerCase().trim() === words[testIdx]
    setResults(r => [...r, { word: words[testIdx], answer: answer.toLowerCase().trim(), correct }])
    if (correct) {
      setScore(s => s + 1)
      setFeedback('correct')
    } else {
      setFeedback('wrong')
    }
    setTimeout(() => {
      if (testIdx + 1 >= words.length) {
        setDone(true)
      } else {
        setTestIdx(i => i + 1)
        setAnswer('')
        setFeedback('')
      }
    }, 1200)
  }

  if (testMode && done) {
    return (
      <div>
        <button className="game-btn game-btn-outline" onClick={() => setTestMode(false)} style={{ marginBottom: 16 }}>
          ← Back to Spelling
        </button>
        <div className="card" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>
            {score === words.length ? '🏆' : score >= words.length * 0.7 ? '⭐' : '💪'}
          </div>
          <div className="sec">{selectedWeek} Spelling Test Results</div>
          <div className="game-score" style={{ fontSize: 32, marginBottom: 20 }}>
            {score} / {words.length}
          </div>
          <div style={{ maxWidth: 400, margin: '0 auto', textAlign: 'left' }}>
            {results.map((r, i) => (
              <div key={i} style={{ padding: '8px 0', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 700 }}>{r.word}</span>
                <span>
                  {r.correct ? '✅' : <span style={{ color: 'var(--red)' }}>❌ wrote: "{r.answer}"</span>}
                </span>
              </div>
            ))}
          </div>
          <button className="game-btn game-btn-primary" onClick={startTest} style={{ marginTop: 20 }}>
            Try Again
          </button>
        </div>
      </div>
    )
  }

  if (testMode) {
    return (
      <div>
        <button className="game-btn game-btn-outline" onClick={() => setTestMode(false)} style={{ marginBottom: 16 }}>
          ← Back to Spelling
        </button>
        <div className="game-area">
          <div className="game-score">Word {testIdx + 1} of {words.length}</div>
          <div className="sec-sm">{selectedWeek} Spelling Test</div>
          <div className="note" style={{ justifyContent: 'center', maxWidth: 400, margin: '0 auto 20px' }}>
            <span className="ni">🔊</span>
            <div>Spell the word: <strong>"{words[testIdx]}"</strong></div>
          </div>
          <input
            type="text"
            className="game-input"
            value={answer}
            onChange={e => setAnswer(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && answer && checkAnswer()}
            autoFocus
            placeholder="Type the word..."
            style={{ width: 300 }}
          />
          <div className={`game-feedback ${feedback}`}>
            {feedback === 'correct' && '✅ Correct!'}
            {feedback === 'wrong' && `❌ It's "${words[testIdx]}"`}
          </div>
          <button className="game-btn game-btn-primary" onClick={checkAnswer} disabled={!answer}>
            Check
          </button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="sec">✏️ Spelling Words</div>
      <div className="note">
        <span className="ni">📝</span>
        <div>Practice your spelling words each week. When you're ready, take the spelling test!</div>
      </div>

      <div className="day-btns" style={{ marginBottom: 20 }}>
        {weeks.map(week => (
          <button
            key={week}
            className={`day-btn ${selectedWeek === week ? 'active' : ''}`}
            onClick={() => setSelectedWeek(week)}
          >
            {week}
          </button>
        ))}
      </div>

      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div className="sec-sm">{selectedWeek} Words</div>
          <button className="game-btn game-btn-primary" onClick={startTest} style={{ margin: 0 }}>
            📝 Take Spelling Test
          </button>
        </div>
        <div className="spell-list">
          {words.map((word, i) => (
            <div className="spell-word" key={i}>
              {word}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
