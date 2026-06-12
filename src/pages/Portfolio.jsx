import { useState, useEffect, useRef } from 'react'
import { loadData, saveData } from '../data/config'

const STORAGE_KEY = 'savannah-portfolio'
const SUBJECTS = ['Reading', 'Math', 'Writing', 'Science', 'Social Studies', 'Art', 'Other']

// Downscale uploaded photos so localStorage stays well under quota
function downscaleImage(file, maxSize = 480) {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => reject(new Error('image load timeout')), 8000)
    const fail = (msg) => { clearTimeout(timeout); reject(new Error(msg)) }
    const reader = new FileReader()
    reader.onerror = () => fail('read failed')
    reader.onload = () => {
      const img = new Image()
      img.onerror = () => fail('not an image')
      img.onload = () => {
        clearTimeout(timeout)
        const scale = Math.min(1, maxSize / Math.max(img.width, img.height))
        const canvas = document.createElement('canvas')
        canvas.width = Math.round(img.width * scale)
        canvas.height = Math.round(img.height * scale)
        canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height)
        resolve(canvas.toDataURL('image/jpeg', 0.7))
      }
      img.src = reader.result
    }
    reader.readAsDataURL(file)
  })
}

export default function Portfolio() {
  const [items, setItems] = useState(() => loadData(STORAGE_KEY, []))
  const [showForm, setShowForm] = useState(false)
  const [title, setTitle] = useState('')
  const [subject, setSubject] = useState('Art')
  const [notes, setNotes] = useState('')
  const [photo, setPhoto] = useState(null)
  const [photoError, setPhotoError] = useState('')
  const fileRef = useRef(null)

  useEffect(() => {
    saveData(STORAGE_KEY, items)
  }, [items])

  const handlePhoto = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setPhotoError('')
    try {
      const dataUrl = await downscaleImage(file)
      setPhoto(dataUrl)
    } catch {
      setPhotoError('That file could not be read as a photo. Try a different image.')
    }
  }

  const addItem = () => {
    if (!title.trim()) return
    const item = {
      id: Date.now(),
      title: title.trim(),
      subject,
      notes: notes.trim(),
      photo,
      date: new Date().toISOString(),
    }
    const next = [item, ...items]
    if (!saveData(STORAGE_KEY, next)) {
      setPhotoError('Storage is full — try removing an older item or adding without a photo.')
      return
    }
    setItems(next)
    setTitle('')
    setNotes('')
    setPhoto(null)
    if (fileRef.current) fileRef.current.value = ''
    setShowForm(false)
  }

  const deleteItem = (id) => {
    setItems(prev => prev.filter(i => i.id !== id))
  }

  return (
    <div>
      <div className="sec">🖼️ My Portfolio</div>
      <div className="note">
        <span className="ni">📸</span>
        <div>
          Save your best work! Snap a photo of worksheets, art projects, and writing —
          it all becomes part of your official homeschool records.
        </div>
      </div>

      <button className="game-btn game-btn-primary" onClick={() => setShowForm(!showForm)} style={{ marginBottom: 16 }} aria-label={showForm ? 'Cancel' : 'Add work sample'}>
        {showForm ? '✕ Cancel' : '+ Add Work Sample'}
      </button>

      {showForm && (
        <div className="card" style={{ marginBottom: 20 }}>
          <div className="sec-sm">New Work Sample</div>
          <div className="g2" style={{ marginBottom: 12 }}>
            <div>
              <label className="form-label" htmlFor="pf-title">Title</label>
              <input id="pf-title" className="form-input" value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. My Sunflower Painting" />
            </div>
            <div>
              <label className="form-label" htmlFor="pf-subject">Subject</label>
              <select id="pf-subject" className="form-input" value={subject} onChange={e => setSubject(e.target.value)}>
                {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
          <div style={{ marginBottom: 12 }}>
            <label className="form-label" htmlFor="pf-notes">Notes (optional)</label>
            <input id="pf-notes" className="form-input" value={notes} onChange={e => setNotes(e.target.value)} placeholder="What did you learn making this?" />
          </div>
          <div style={{ marginBottom: 12 }}>
            <label className="form-label" htmlFor="pf-photo">Photo (optional)</label>
            <input id="pf-photo" ref={fileRef} className="form-input" type="file" accept="image/*" onChange={handlePhoto} />
            {photo && <img src={photo} alt="Preview of work sample" style={{ marginTop: 10, maxWidth: 200, borderRadius: 10, border: '2px solid var(--border)' }} />}
            {photoError && <div style={{ color: 'var(--red)', fontSize: 13, fontWeight: 700, marginTop: 6 }}>{photoError}</div>}
          </div>
          <button className="game-btn game-btn-success" onClick={addItem} disabled={!title.trim()}>
            💾 Save to Portfolio
          </button>
        </div>
      )}

      {items.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: 40, color: 'var(--mid)' }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🎨</div>
          <p>No work samples yet. Add your first masterpiece above!</p>
        </div>
      ) : (
        <div className="g3">
          {items.map(item => (
            <div className="card" key={item.id} style={{ marginBottom: 0 }}>
              {item.photo && (
                <img src={item.photo} alt={item.title} style={{ width: '100%', borderRadius: 10, marginBottom: 10, border: '1px solid var(--border)' }} />
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
                <div>
                  <div style={{ fontFamily: "'Fredoka One', cursive", fontSize: 15 }}>{item.title}</div>
                  <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--purple)', marginTop: 2 }}>
                    {item.subject} &bull; {new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </div>
                </div>
                <button
                  onClick={() => deleteItem(item.id)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, color: 'var(--light)' }}
                  aria-label={`Delete ${item.title}`}
                >
                  🗑️
                </button>
              </div>
              {item.notes && <div style={{ fontSize: 13, color: 'var(--mid)', marginTop: 6, lineHeight: 1.5 }}>{item.notes}</div>}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
