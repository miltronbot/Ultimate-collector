import { loadData, saveData, localDateKey, GRADE_DATA, GRADE_LEVEL } from './config'
import { teksStandards } from './teksStandards'

// Results are stored per grade level so progress is preserved across grades
const RESULTS_KEY = `savannah-game-results-${GRADE_LEVEL}`
const LEGACY_RESULTS_KEY = 'savannah-game-results'
const SPELLING_KEY = 'savannah-spelling-results'

// Maps each game to the TEKS standard(s) it practices — from the active grade pack
export const gameTeksMap = GRADE_DATA.gameTeksMap

export function getGameResults() {
  const results = loadData(RESULTS_KEY, null)
  if (results) return results
  // migrate pre-grade-level data into the 2nd grade bucket it was recorded under
  if (GRADE_LEVEL === '2') return loadData(LEGACY_RESULTS_KEY, {})
  return {}
}

export function recordGameResult(gameId, wasCorrect) {
  const results = getGameResults()
  const stats = results[gameId] || { correct: 0, total: 0 }
  stats.total += 1
  if (wasCorrect) stats.correct += 1
  results[gameId] = stats
  saveData(RESULTS_KEY, results)
}

export function recordSpellingTest(week, score, total) {
  const tests = loadData(SPELLING_KEY, [])
  tests.push({ week, score, total, date: new Date().toISOString() })
  saveData(SPELLING_KEY, tests)
}

// Dynamic mastery: blends the baseline assessment with live game accuracy
// once a standard has at least 5 practice answers recorded.
export function getDynamicMastery(standard) {
  const results = getGameResults()
  let correct = 0
  let total = 0
  for (const [gameId, teksIds] of Object.entries(gameTeksMap)) {
    if (teksIds.includes(standard.id) && results[gameId]) {
      correct += results[gameId].correct
      total += results[gameId].total
    }
  }
  if (total < 5) return { mastery: standard.mastery, live: false }
  const accuracy = (correct / total) * 100
  const blended = Math.round(Math.min(100, standard.mastery * 0.6 + accuracy * 0.4))
  return { mastery: blended, live: true }
}

export function getSubjectMasteryDynamic(subjectKey) {
  const standards = teksStandards[subjectKey].standards
  const sum = standards.reduce((acc, s) => acc + getDynamicMastery(s).mastery, 0)
  return Math.round(sum / standards.length)
}

export function getOverallMasteryDynamic() {
  const keys = Object.keys(teksStandards)
  const sum = keys.reduce((acc, k) => acc + getSubjectMasteryDynamic(k), 0)
  return Math.round(sum / keys.length)
}

// Attendance streak: consecutive school days (Mon–Fri) marked attended,
// counting back from today (or the most recent school day).
export function computeStreak() {
  const attendance = loadData('savannah-attendance', {})
  const d = new Date()
  let streak = 0
  for (let i = 0; i < 365; i++) {
    const dow = d.getDay()
    if (dow >= 1 && dow <= 5) {
      const key = localDateKey(d)
      if (attendance[key]) {
        streak++
      } else if (streak > 0 || i > 0) {
        // today not yet marked is forgiven; any other gap ends the streak
        break
      }
    }
    d.setDate(d.getDate() - 1)
  }
  return streak
}

function hasPerfectWeek(attendance) {
  const byWeek = {}
  for (const key of Object.keys(attendance)) {
    if (!attendance[key]) continue
    const date = new Date(`${key}T00:00:00`)
    if (isNaN(date.getTime())) continue
    const dow = date.getDay()
    if (dow < 1 || dow > 5) continue
    const monday = new Date(date)
    monday.setDate(date.getDate() - (dow - 1))
    const weekKey = localDateKey(monday)
    byWeek[weekKey] = (byWeek[weekKey] || 0) + 1
  }
  return Object.values(byWeek).some(count => count >= 5)
}

// Badges auto-earn from real, measurable activity
export function computeBadges() {
  const journal = loadData('savannah-journal', [])
  const books = loadData('savannah-reading-log', [])
  const results = getGameResults()
  const attendance = loadData('savannah-attendance', {})
  const portfolio = loadData('savannah-portfolio', [])
  const hours = loadData('savannah-hours', [])
  const spellingTests = loadData(SPELLING_KEY, [])
  const streak = computeStreak()

  const mathCorrect =
    (results['math-flash']?.correct || 0) +
    (results['count-match']?.correct || 0) +
    (results.multiplication?.correct || 0)
  const scienceMinutes = hours
    .filter(h => h.subject === 'science')
    .reduce((sum, h) => sum + h.minutes, 0)
  const gamesPlayed = Object.keys(results).length

  return [
    { id: 'first-login', name: 'First Day', emoji: '🌟', desc: 'Started your school journey', earned: true },
    { id: 'math-25', name: 'Math Whiz', emoji: '🧮', desc: 'Answer 25 math questions correctly', earned: mathCorrect >= 25, progress: `${Math.min(mathCorrect, 25)}/25` },
    { id: 'reader', name: 'Bookworm', emoji: '📚', desc: 'Log 8 books in your Reading Log', earned: books.length >= 8, progress: `${Math.min(books.length, 8)}/8` },
    { id: 'speller', name: 'Spelling Bee', emoji: '🐝', desc: 'Score a perfect 10/10 on a spelling test', earned: spellingTests.some(t => t.total >= 10 && t.score === t.total) },
    { id: 'writer', name: 'Author', emoji: '✍️', desc: 'Write 5 journal entries', earned: journal.length >= 5, progress: `${Math.min(journal.length, 5)}/5` },
    { id: 'artist', name: 'Picasso', emoji: '🎨', desc: 'Add 3 work samples to your Portfolio', earned: portfolio.length >= 3, progress: `${Math.min(portfolio.length, 3)}/3` },
    { id: 'scientist', name: 'Explorer', emoji: '🔬', desc: 'Log 5 hours of science time', earned: scienceMinutes >= 300, progress: `${Math.min(Math.round(scienceMinutes / 60), 5)}/5 hrs` },
    { id: 'streak-3', name: '3 Day Streak', emoji: '🔥', desc: 'Attend school 3 days in a row', earned: streak >= 3, progress: `${Math.min(streak, 3)}/3` },
    { id: 'streak-7', name: 'Weekly Warrior', emoji: '⚔️', desc: 'Attend school 7 school days in a row', earned: streak >= 7, progress: `${Math.min(streak, 7)}/7` },
    { id: 'games-all', name: 'Game Master', emoji: '🎮', desc: 'Play all 12 games at least once', earned: gamesPlayed >= 12, progress: `${Math.min(gamesPlayed, 12)}/12` },
    { id: 'perfect-week', name: 'Perfect Week', emoji: '💎', desc: 'Attend all 5 school days in one week', earned: hasPerfectWeek(attendance) },
    { id: 'helper', name: 'Kind Heart', emoji: '💝', desc: 'Help someone with their schoolwork', earned: true },
  ]
}
