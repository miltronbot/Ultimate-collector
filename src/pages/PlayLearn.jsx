import { useState, useEffect, useCallback } from 'react'
import { games, sightWordsList, wordBuilderWords, rhymePairs, shapes } from '../data/schoolData'

function MathFlash() {
  const [score, setScore] = useState(0)
  const [total, setTotal] = useState(0)
  const [problem, setProblem] = useState(null)
  const [answer, setAnswer] = useState('')
  const [feedback, setFeedback] = useState('')

  const newProblem = useCallback(() => {
    const ops = ['+', '-']
    const op = ops[Math.floor(Math.random() * ops.length)]
    let a, b
    if (op === '+') {
      a = Math.floor(Math.random() * 50) + 1
      b = Math.floor(Math.random() * 50) + 1
    } else {
      a = Math.floor(Math.random() * 50) + 20
      b = Math.floor(Math.random() * (a - 1)) + 1
    }
    setProblem({ a, b, op, correct: op === '+' ? a + b : a - b })
    setAnswer('')
    setFeedback('')
  }, [])

  useEffect(() => { newProblem() }, [newProblem])

  const check = () => {
    const num = parseInt(answer)
    setTotal(t => t + 1)
    if (num === problem.correct) {
      setScore(s => s + 1)
      setFeedback('correct')
    } else {
      setFeedback('wrong')
    }
    setTimeout(newProblem, 1200)
  }

  if (!problem) return null

  return (
    <div className="game-area">
      <div className="game-score">Score: {score} / {total}</div>
      <div className="game-question">
        {problem.a} {problem.op} {problem.b} = ?
      </div>
      <div>
        <input
          type="number"
          className="game-input"
          value={answer}
          onChange={e => setAnswer(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && answer && check()}
          autoFocus
          placeholder="?"
        />
      </div>
      <div className={`game-feedback ${feedback}`}>
        {feedback === 'correct' && '✅ Great job!'}
        {feedback === 'wrong' && `❌ It was ${problem.correct}`}
      </div>
      <button className="game-btn game-btn-primary" onClick={check} disabled={!answer}>
        Check Answer
      </button>
    </div>
  )
}

function SpellingQuiz() {
  const words = ['play', 'small', 'home', 'read', 'hand', 'high', 'year', 'live', 'girl', 'help']
  const [idx, setIdx] = useState(0)
  const [answer, setAnswer] = useState('')
  const [score, setScore] = useState(0)
  const [feedback, setFeedback] = useState('')
  const [done, setDone] = useState(false)

  const check = () => {
    if (answer.toLowerCase().trim() === words[idx]) {
      setScore(s => s + 1)
      setFeedback('correct')
    } else {
      setFeedback('wrong')
    }
    setTimeout(() => {
      if (idx + 1 >= words.length) {
        setDone(true)
      } else {
        setIdx(i => i + 1)
        setAnswer('')
        setFeedback('')
      }
    }, 1200)
  }

  const hint = words[idx].charAt(0) + '_ '.repeat(words[idx].length - 1)

  if (done) {
    return (
      <div className="game-area">
        <div style={{ fontSize: 48, marginBottom: 16 }}>🎉</div>
        <div className="sec">Spelling Quiz Complete!</div>
        <div className="game-score" style={{ fontSize: 28 }}>{score} / {words.length}</div>
        <button className="game-btn game-btn-primary" onClick={() => {
          setIdx(0); setScore(0); setDone(false); setAnswer(''); setFeedback('')
        }}>Play Again</button>
      </div>
    )
  }

  return (
    <div className="game-area">
      <div className="game-score">Word {idx + 1} of {words.length} &bull; Score: {score}</div>
      <div className="note" style={{ justifyContent: 'center', maxWidth: 400, margin: '0 auto 20px' }}>
        <span className="ni">🔊</span>
        <div>Listen and spell: <strong>"{words[idx]}"</strong></div>
      </div>
      <div style={{ fontFamily: "'Patrick Hand', cursive", fontSize: 24, color: 'var(--mid)', marginBottom: 16 }}>
        Hint: {hint}
      </div>
      <input
        type="text"
        className="game-input"
        value={answer}
        onChange={e => setAnswer(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && answer && check()}
        autoFocus
        placeholder="Type the word..."
        style={{ width: 300 }}
      />
      <div className={`game-feedback ${feedback}`}>
        {feedback === 'correct' && '✅ Perfect spelling!'}
        {feedback === 'wrong' && `❌ Correct: ${words[idx]}`}
      </div>
      <button className="game-btn game-btn-primary" onClick={check} disabled={!answer}>
        Check
      </button>
    </div>
  )
}

function SightWords() {
  const [words] = useState(() => {
    const shuffled = [...sightWordsList].sort(() => Math.random() - 0.5)
    return shuffled.slice(0, 10)
  })
  const [idx, setIdx] = useState(0)
  const [found, setFound] = useState([])
  const [options, setOptions] = useState([])
  const [feedback, setFeedback] = useState('')

  useEffect(() => {
    const target = words[idx]
    const others = sightWordsList.filter(w => w !== target).sort(() => Math.random() - 0.5).slice(0, 3)
    setOptions([target, ...others].sort(() => Math.random() - 0.5))
  }, [idx, words])

  const check = (word) => {
    if (word === words[idx]) {
      setFeedback('correct')
      setFound(f => [...f, word])
      setTimeout(() => {
        setFeedback('')
        setIdx(i => Math.min(i + 1, words.length - 1))
      }, 800)
    } else {
      setFeedback('wrong')
      setTimeout(() => setFeedback(''), 800)
    }
  }

  if (found.length === words.length) {
    return (
      <div className="game-area">
        <div style={{ fontSize: 48, marginBottom: 16 }}>🌟</div>
        <div className="sec">All Sight Words Found!</div>
        <div className="game-score">You found all {words.length} words!</div>
      </div>
    )
  }

  return (
    <div className="game-area">
      <div className="game-score">{found.length} of {words.length} found</div>
      <div style={{ marginBottom: 20 }}>
        <div className="sec-sm">Find this word:</div>
        <div className="game-question">{words[idx]}</div>
      </div>
      <div className="answer-options">
        {options.map((w, i) => (
          <button
            key={i}
            className={`answer-option ${feedback === 'correct' && w === words[idx] ? 'correct' : ''}`}
            onClick={() => check(w)}
            aria-label={`Choose word: ${w}`}
          >
            {w}
          </button>
        ))}
      </div>
      <div className={`game-feedback ${feedback}`}>
        {feedback === 'correct' && '✅ You found it!'}
        {feedback === 'wrong' && '❌ Try again!'}
      </div>
    </div>
  )
}

function WordBuilder() {
  const [wordIdx, setWordIdx] = useState(0)
  const [selected, setSelected] = useState([])
  const [feedback, setFeedback] = useState('')
  const [score, setScore] = useState(0)
  const [tiles, setTiles] = useState([])

  const word = wordBuilderWords[wordIdx]

  useEffect(() => {
    const letters = word.split('')
    const extras = 'abcdefghijklmnopqrstuvwxyz'.split('').filter(l => !letters.includes(l))
    const extraLetters = extras.sort(() => Math.random() - 0.5).slice(0, Math.max(3, 6 - letters.length))
    setTiles([...letters, ...extraLetters].sort(() => Math.random() - 0.5))
    setSelected([])
    setFeedback('')
  }, [word])

  const toggleTile = (idx) => {
    if (selected.includes(idx)) {
      setSelected(s => s.filter(i => i !== idx))
    } else {
      setSelected(s => [...s, idx])
    }
  }

  const check = () => {
    const built = selected.map(i => tiles[i]).join('')
    if (built === word) {
      setScore(s => s + 1)
      setFeedback('correct')
      setTimeout(() => {
        setWordIdx(i => (i + 1) % wordBuilderWords.length)
      }, 1200)
    } else {
      setFeedback('wrong')
      setTimeout(() => setFeedback(''), 1000)
    }
  }

  return (
    <div className="game-area">
      <div className="game-score">Score: {score}</div>
      <div className="sec-sm">Build this word:</div>
      <div className="note" style={{ justifyContent: 'center', maxWidth: 300, margin: '0 auto 16px' }}>
        <span className="ni">💡</span>
        <div><strong>{word.length} letters</strong> — tap letters in order!</div>
      </div>
      <div className="word-display">
        {selected.length > 0 ? selected.map(i => tiles[i]).join('') : '_ '.repeat(word.length)}
      </div>
      <div className="letter-tiles">
        {tiles.map((letter, i) => (
          <div
            key={i}
            className={`letter-tile ${selected.includes(i) ? 'selected' : ''}`}
            onClick={() => toggleTile(i)}
          >
            {letter}
          </div>
        ))}
      </div>
      <div className={`game-feedback ${feedback}`}>
        {feedback === 'correct' && '✅ Perfect!'}
        {feedback === 'wrong' && '❌ Not quite — try again!'}
      </div>
      <div>
        <button className="game-btn game-btn-primary" onClick={check} disabled={selected.length === 0}>
          Check Word
        </button>
        <button className="game-btn game-btn-outline" onClick={() => setSelected([])}>
          Clear
        </button>
      </div>
    </div>
  )
}

function RhymeTime() {
  const [idx, setIdx] = useState(0)
  const [score, setScore] = useState(0)
  const [feedback, setFeedback] = useState('')
  const [answered, setAnswered] = useState(false)

  const pair = rhymePairs[idx]

  const check = (word) => {
    if (answered) return
    setAnswered(true)
    if (word === pair.answer) {
      setScore(s => s + 1)
      setFeedback('correct')
    } else {
      setFeedback('wrong')
    }
    setTimeout(() => {
      setIdx(i => (i + 1) % rhymePairs.length)
      setFeedback('')
      setAnswered(false)
    }, 1200)
  }

  return (
    <div className="game-area">
      <div className="game-score">Score: {score}</div>
      <div className="sec-sm">Which word rhymes with...</div>
      <div className="game-question">{pair.word}</div>
      <div className="answer-options">
        {pair.options.map((w, i) => (
          <button
            key={i}
            className={`answer-option ${answered && w === pair.answer ? 'correct' : ''} ${answered && feedback === 'wrong' && w !== pair.answer ? 'wrong' : ''}`}
            onClick={() => check(w)}
            aria-label={`Choose: ${w}`}
          >
            {w}
          </button>
        ))}
      </div>
      <div className={`game-feedback ${feedback}`}>
        {feedback === 'correct' && '✅ They rhyme!'}
        {feedback === 'wrong' && `❌ It was "${pair.answer}"`}
      </div>
    </div>
  )
}

function ShapeMatch() {
  const [score, setScore] = useState(0)
  const [current, setCurrent] = useState(null)
  const [options, setOptions] = useState([])
  const [feedback, setFeedback] = useState('')

  const newRound = useCallback(() => {
    const shuffled = [...shapes].sort(() => Math.random() - 0.5)
    const target = shuffled[0]
    const opts = shuffled.slice(0, 4).sort(() => Math.random() - 0.5)
    setCurrent(target)
    setOptions(opts)
    setFeedback('')
  }, [])

  useEffect(() => { newRound() }, [newRound])

  const check = (shape) => {
    if (shape.name === current.name) {
      setScore(s => s + 1)
      setFeedback('correct')
    } else {
      setFeedback('wrong')
    }
    setTimeout(newRound, 1000)
  }

  if (!current) return null

  return (
    <div className="game-area">
      <div className="game-score">Score: {score}</div>
      <div className="sec-sm">Find the shape:</div>
      <div className="game-question">{current.name}</div>
      <div className="answer-options">
        {options.map((s, i) => (
          <button
            key={i}
            className="answer-option"
            onClick={() => check(s)}
            style={{ fontSize: 32, padding: 20 }}
          >
            {s.emoji}
          </button>
        ))}
      </div>
      <div className={`game-feedback ${feedback}`}>
        {feedback === 'correct' && '✅ Correct shape!'}
        {feedback === 'wrong' && '❌ Try the next one!'}
      </div>
    </div>
  )
}

function CountMatch() {
  const [score, setScore] = useState(0)
  const [problem, setProblem] = useState(null)
  const [feedback, setFeedback] = useState('')

  const newProblem = useCallback(() => {
    const emojis = ['🍎', '⭐', '🌸', '🐟', '🦋', '🎈']
    const emoji = emojis[Math.floor(Math.random() * emojis.length)]
    const count = Math.floor(Math.random() * 9) + 2
    const display = (emoji + ' ').repeat(count)
    const opts = new Set([count])
    while (opts.size < 4) opts.add(Math.floor(Math.random() * 12) + 1)
    setProblem({ display, count, options: [...opts].sort(() => Math.random() - 0.5) })
    setFeedback('')
  }, [])

  useEffect(() => { newProblem() }, [newProblem])

  const check = (n) => {
    if (n === problem.count) {
      setScore(s => s + 1)
      setFeedback('correct')
    } else {
      setFeedback('wrong')
    }
    setTimeout(newProblem, 1000)
  }

  if (!problem) return null

  return (
    <div className="game-area">
      <div className="game-score">Score: {score}</div>
      <div className="sec-sm">How many do you see?</div>
      <div style={{ fontSize: 32, margin: '16px 0', lineHeight: 1.6, maxWidth: 350, marginLeft: 'auto', marginRight: 'auto' }}>
        {problem.display}
      </div>
      <div className="answer-options">
        {problem.options.map((n, i) => (
          <button key={i} className="answer-option" onClick={() => check(n)}>{n}</button>
        ))}
      </div>
      <div className={`game-feedback ${feedback}`}>
        {feedback === 'correct' && '✅ Great counting!'}
        {feedback === 'wrong' && `❌ There were ${problem.count}`}
      </div>
    </div>
  )
}

function TellTime() {
  const [score, setScore] = useState(0)
  const [time, setTime] = useState(null)
  const [options, setOptions] = useState([])
  const [feedback, setFeedback] = useState('')

  const newRound = useCallback(() => {
    const h = Math.floor(Math.random() * 12) + 1
    const m = [0, 15, 30, 45][Math.floor(Math.random() * 4)]
    const answer = `${h}:${m.toString().padStart(2, '0')}`
    const opts = new Set([answer])
    while (opts.size < 4) {
      const rh = Math.floor(Math.random() * 12) + 1
      const rm = [0, 15, 30, 45][Math.floor(Math.random() * 4)]
      opts.add(`${rh}:${rm.toString().padStart(2, '0')}`)
    }
    setTime({ h, m, answer })
    setOptions([...opts].sort(() => Math.random() - 0.5))
    setFeedback('')
  }, [])

  useEffect(() => { newRound() }, [newRound])

  if (!time) return null

  const hourAngle = (time.h % 12) * 30 + time.m * 0.5
  const minuteAngle = time.m * 6

  return (
    <div className="game-area">
      <div className="game-score">Score: {score}</div>
      <div className="sec-sm">What time does the clock show?</div>
      <svg width="180" height="180" viewBox="0 0 180 180" style={{ margin: '16px auto', display: 'block' }}>
        <circle cx="90" cy="90" r="85" fill="white" stroke="var(--blue)" strokeWidth="4" />
        {[...Array(12)].map((_, i) => {
          const angle = (i + 1) * 30 * Math.PI / 180
          const x = 90 + 68 * Math.sin(angle)
          const y = 90 - 68 * Math.cos(angle)
          return <text key={i} x={x} y={y} textAnchor="middle" dominantBaseline="central" fontSize="14" fontWeight="800" fill="var(--dark)">{i + 1}</text>
        })}
        <line
          x1="90" y1="90"
          x2={90 + 40 * Math.sin(hourAngle * Math.PI / 180)}
          y2={90 - 40 * Math.cos(hourAngle * Math.PI / 180)}
          stroke="var(--dark)" strokeWidth="4" strokeLinecap="round"
        />
        <line
          x1="90" y1="90"
          x2={90 + 60 * Math.sin(minuteAngle * Math.PI / 180)}
          y2={90 - 60 * Math.cos(minuteAngle * Math.PI / 180)}
          stroke="var(--blue)" strokeWidth="3" strokeLinecap="round"
        />
        <circle cx="90" cy="90" r="4" fill="var(--dark)" />
      </svg>
      <div className="answer-options">
        {options.map((o, i) => (
          <button
            key={i}
            className={`answer-option ${feedback === 'correct' && o === time.answer ? 'correct' : ''}`}
            onClick={() => {
              if (o === time.answer) {
                setScore(s => s + 1)
                setFeedback('correct')
              } else {
                setFeedback('wrong')
              }
              setTimeout(newRound, 1000)
            }}
          >
            {o}
          </button>
        ))}
      </div>
      <div className={`game-feedback ${feedback}`}>
        {feedback === 'correct' && '✅ You can tell time!'}
        {feedback === 'wrong' && `❌ It was ${time.answer}`}
      </div>
    </div>
  )
}

function MoneyMath() {
  const [score, setScore] = useState(0)
  const [problem, setProblem] = useState(null)
  const [feedback, setFeedback] = useState('')

  const coins = [
    { name: 'penny', value: 1, emoji: '🪙' },
    { name: 'nickel', value: 5, emoji: '🪙' },
    { name: 'dime', value: 10, emoji: '🪙' },
    { name: 'quarter', value: 25, emoji: '🪙' },
  ]

  const newProblem = useCallback(() => {
    const picked = []
    const count = Math.floor(Math.random() * 4) + 2
    let total = 0
    for (let i = 0; i < count; i++) {
      const coin = coins[Math.floor(Math.random() * coins.length)]
      picked.push(coin)
      total += coin.value
    }
    const opts = new Set([total])
    while (opts.size < 4) opts.add(Math.floor(Math.random() * 100) + 5)
    setProblem({ picked, total, options: [...opts].sort((a, b) => a - b) })
    setFeedback('')
  }, [])

  useEffect(() => { newProblem() }, [newProblem])

  if (!problem) return null

  return (
    <div className="game-area">
      <div className="game-score">Score: {score}</div>
      <div className="sec-sm">How much money is this?</div>
      <div style={{ margin: '16px 0', fontSize: 14 }}>
        {problem.picked.map((c, i) => (
          <span key={i} style={{ display: 'inline-block', margin: 4, padding: '6px 12px', background: 'var(--yellow-s)', borderRadius: 8, fontWeight: 700, border: '1.5px solid var(--yellow)' }}>
            {c.emoji} {c.name}
          </span>
        ))}
      </div>
      <div className="answer-options">
        {problem.options.map((n, i) => (
          <button key={i} className="answer-option" onClick={() => {
            if (n === problem.total) {
              setScore(s => s + 1)
              setFeedback('correct')
            } else {
              setFeedback('wrong')
            }
            setTimeout(newProblem, 1000)
          }}>
            {n}¢
          </button>
        ))}
      </div>
      <div className={`game-feedback ${feedback}`}>
        {feedback === 'correct' && '✅ Great counting!'}
        {feedback === 'wrong' && `❌ It was ${problem.total}¢`}
      </div>
    </div>
  )
}

const gameComponents = {
  'math-flash': MathFlash,
  'spelling-quiz': SpellingQuiz,
  'sight-words': SightWords,
  'word-builder': WordBuilder,
  'count-match': CountMatch,
  'rhyme-time': RhymeTime,
  'shape-match': ShapeMatch,
  'tell-time': TellTime,
  'money-math': MoneyMath,
}

export default function PlayLearn() {
  const [activeGame, setActiveGame] = useState(null)

  if (activeGame) {
    const Game = gameComponents[activeGame]
    return (
      <div>
        <button className="game-btn game-btn-outline" onClick={() => setActiveGame(null)} style={{ marginBottom: 16 }}>
          ← Back to Games
        </button>
        <div className="sec">{games.find(g => g.id === activeGame)?.emoji} {games.find(g => g.id === activeGame)?.name}</div>
        <Game />
      </div>
    )
  }

  return (
    <div>
      <div className="sec">🎮 Play & Learn</div>
      <div className="note">
        <span className="ni">🌟</span>
        <div>Pick a game to practice your skills! Each game helps you learn while having fun.</div>
      </div>
      <div className="game-grid">
        {games.map(game => (
          <div key={game.id} className="game-card" onClick={() => setActiveGame(game.id)}>
            <div className="game-emoji">{game.emoji}</div>
            <div className="game-name">{game.name}</div>
            <div className="game-desc">{game.desc}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
