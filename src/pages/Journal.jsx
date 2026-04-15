import { useState, useEffect } from 'react'

const STORAGE_KEY = 'savannah-journal'

function loadEntries() {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

function saveEntries(entries) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries))
}

const prompts = [
  'What made you smile today?',
  'Write about your favorite animal.',
  'If you could go anywhere, where would you go?',
  'What is something new you learned today?',
  'Describe your best friend.',
  'What is your favorite thing about spring?',
  'Write about a time you were brave.',
  'What do you want to be when you grow up?',
  'Describe your favorite meal.',
  'What is the best book you have ever read?',
  'If you had a superpower, what would it be?',
  'Write about something kind you did for someone.',
]

export default function Journal() {
  const [entries, setEntries] = useState(loadEntries)
  const [text, setText] = useState('')
  const [prompt, setPrompt] = useState('')

  useEffect(() => {
    saveEntries(entries)
  }, [entries])

  const newPrompt = () => {
    setPrompt(prompts[Math.floor(Math.random() * prompts.length)])
  }

  const saveEntry = () => {
    if (!text.trim()) return
    const entry = {
      id: Date.now(),
      text: text.trim(),
      date: new Date().toISOString(),
      prompt: prompt || null,
    }
    setEntries(prev => [entry, ...prev])
    setText('')
    setPrompt('')
  }

  const deleteEntry = (id) => {
    setEntries(prev => prev.filter(e => e.id !== id))
  }

  return (
    <div>
      <div className="sec">📓 My Journal</div>
      <div className="note">
        <span className="ni">✍️</span>
        <div>Write about your day, your thoughts, or anything you'd like! Your journal is saved on this device.</div>
      </div>

      <div className="card" style={{ marginBottom: 20 }}>
        <div className="sec-sm">New Entry</div>
        {prompt && (
          <div className="note note-blue" style={{ marginBottom: 12 }}>
            <span className="ni">💡</span>
            <div><strong>Writing Prompt:</strong> {prompt}</div>
          </div>
        )}
        <button className="game-btn game-btn-outline" onClick={newPrompt} style={{ marginBottom: 12, fontSize: 13 }}>
          🎲 Give me a writing prompt
        </button>
        <textarea
          className="journal-textarea"
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Dear Journal..."
        />
        <div style={{ marginTop: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 13, color: 'var(--mid)', fontWeight: 600 }}>
            {text.split(/\s+/).filter(Boolean).length} words
          </span>
          <button className="game-btn game-btn-primary" onClick={saveEntry} disabled={!text.trim()}>
            💾 Save Entry
          </button>
        </div>
      </div>

      {entries.length > 0 && (
        <div>
          <div className="sec-sm">Past Entries ({entries.length})</div>
          {entries.map(entry => (
            <div className="journal-entry" key={entry.id}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div className="journal-date">
                  📅 {new Date(entry.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                </div>
                <button
                  onClick={() => deleteEntry(entry.id)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, color: 'var(--light)' }}
                >
                  🗑️
                </button>
              </div>
              {entry.prompt && (
                <div style={{ fontSize: 12, color: 'var(--blue)', fontWeight: 700, marginBottom: 4 }}>
                  Prompt: {entry.prompt}
                </div>
              )}
              <div className="journal-text">{entry.text}</div>
            </div>
          ))}
        </div>
      )}

      {entries.length === 0 && (
        <div className="card" style={{ textAlign: 'center', padding: 40, color: 'var(--mid)' }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>📝</div>
          <p>No journal entries yet. Start writing above!</p>
        </div>
      )}
    </div>
  )
}
