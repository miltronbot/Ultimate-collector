import { useState, useEffect } from 'react'

const STORAGE_KEY = 'savannah-reading-log'

function loadBooks() {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : [
      { id: 1, title: "Charlotte's Web", author: 'E.B. White', pages: 184, rating: 5, date: '2026-03-10', emoji: '🕷️' },
      { id: 2, title: 'Diary of a Wimpy Kid', author: 'Jeff Kinney', pages: 217, rating: 4, date: '2026-03-18', emoji: '📔' },
      { id: 3, title: 'Magic Tree House #1', author: 'Mary Pope Osborne', pages: 68, rating: 5, date: '2026-03-25', emoji: '🏠' },
      { id: 4, title: 'Junie B. Jones', author: 'Barbara Park', pages: 69, rating: 4, date: '2026-04-02', emoji: '👧' },
      { id: 5, title: 'Dog Man', author: 'Dav Pilkey', pages: 231, rating: 5, date: '2026-04-05', emoji: '🐕' },
    ]
  } catch {
    return []
  }
}

function saveBooks(books) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(books))
}

const bookEmojis = ['📕', '📗', '📘', '📙', '📔', '📚', '📖', '🕷️', '🐕', '🏠', '👧', '🦁', '🐱', '🌟', '🚀', '🦋', '🧙', '🐉']

export default function ReadingLog() {
  const [books, setBooks] = useState(loadBooks)
  const [showForm, setShowForm] = useState(false)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [pages, setPages] = useState('')
  const [rating, setRating] = useState(5)
  const [selectedEmoji, setSelectedEmoji] = useState('📕')

  useEffect(() => {
    saveBooks(books)
  }, [books])

  const addBook = () => {
    if (!title.trim()) return
    const book = {
      id: Date.now(),
      title: title.trim(),
      author: author.trim(),
      pages: parseInt(pages) || 0,
      rating,
      date: new Date().toISOString().split('T')[0],
      emoji: selectedEmoji,
    }
    setBooks(prev => [book, ...prev])
    setTitle('')
    setAuthor('')
    setPages('')
    setRating(5)
    setSelectedEmoji('📕')
    setShowForm(false)
  }

  const deleteBook = (id) => {
    setBooks(prev => prev.filter(b => b.id !== id))
  }

  const totalPages = books.reduce((sum, b) => sum + (b.pages || 0), 0)

  return (
    <div>
      <div className="sec">📚 Reading Log</div>
      <div className="note">
        <span className="ni">📖</span>
        <div>Keep track of all the books you read! Add new books and rate them with stars.</div>
      </div>

      <div className="g3" style={{ marginBottom: 20 }}>
        <div className="stat sb">
          <div className="lbl">Books Read</div>
          <div className="val">{books.length}</div>
        </div>
        <div className="stat sg">
          <div className="lbl">Pages Read</div>
          <div className="val">{totalPages}</div>
        </div>
        <div className="stat sy">
          <div className="lbl">Avg Rating</div>
          <div className="val">{books.length ? (books.reduce((s, b) => s + b.rating, 0) / books.length).toFixed(1) : '0'}</div>
        </div>
      </div>

      <button className="game-btn game-btn-primary" onClick={() => setShowForm(!showForm)} style={{ marginBottom: 16 }}>
        {showForm ? '✕ Cancel' : '+ Add a Book'}
      </button>

      {showForm && (
        <div className="card" style={{ marginBottom: 20 }}>
          <div className="sec-sm">Add a New Book</div>
          <div className="g2" style={{ marginBottom: 12 }}>
            <div>
              <label className="form-label">Book Title</label>
              <input className="form-input" value={title} onChange={e => setTitle(e.target.value)} placeholder="What did you read?" />
            </div>
            <div>
              <label className="form-label">Author</label>
              <input className="form-input" value={author} onChange={e => setAuthor(e.target.value)} placeholder="Who wrote it?" />
            </div>
          </div>
          <div className="g2" style={{ marginBottom: 12 }}>
            <div>
              <label className="form-label">Number of Pages</label>
              <input className="form-input" type="number" value={pages} onChange={e => setPages(e.target.value)} placeholder="How many pages?" />
            </div>
            <div>
              <label className="form-label">Rating</label>
              <div style={{ display: 'flex', gap: 4, marginTop: 8 }}>
                {[1, 2, 3, 4, 5].map(n => (
                  <span key={n} onClick={() => setRating(n)} style={{ fontSize: 28, cursor: 'pointer' }}>
                    {n <= rating ? '⭐' : '☆'}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div style={{ marginBottom: 12 }}>
            <label className="form-label">Pick an emoji for this book</label>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {bookEmojis.map(e => (
                <span
                  key={e}
                  onClick={() => setSelectedEmoji(e)}
                  style={{
                    fontSize: 24,
                    cursor: 'pointer',
                    padding: 6,
                    borderRadius: 8,
                    border: selectedEmoji === e ? '2px solid var(--blue)' : '2px solid transparent',
                    background: selectedEmoji === e ? 'var(--blue-s)' : 'transparent',
                  }}
                >
                  {e}
                </span>
              ))}
            </div>
          </div>
          <button className="game-btn game-btn-success" onClick={addBook} disabled={!title.trim()}>
            📚 Add to Reading Log
          </button>
        </div>
      )}

      <div className="g2">
        {books.map(book => (
          <div className="book-card" key={book.id}>
            <div className="book-emoji">{book.emoji}</div>
            <div className="book-info">
              <div className="book-title">{book.title}</div>
              <div className="book-author">{book.author}</div>
              {book.pages > 0 && <div className="book-pages">{book.pages} pages</div>}
              <div className="book-rating">
                {'⭐'.repeat(book.rating)}{'☆'.repeat(5 - book.rating)}
              </div>
            </div>
            <button
              onClick={() => deleteBook(book.id)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, color: 'var(--light)', alignSelf: 'flex-start' }}
            >
              🗑️
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
