import { getGradeData } from './grades'

export function loadData(key, fallback) {
  try {
    const d = localStorage.getItem(key)
    return d ? JSON.parse(d) : fallback
  } catch {
    return fallback
  }
}

export function saveData(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data))
    return true
  } catch {
    return false
  }
}

export const SETTINGS_KEY = 'savannah-settings'

export const DEFAULT_SETTINGS = {
  studentName: 'Savannah',
  gradeLevel: '2',
  location: 'Kerrville, TX',
  semesterLabel: 'Spring 2026',
  semesterStart: '2026-01-12',
  semesterEnd: '2026-05-22',
  weeklyHours: 25.5,
}

const settings = { ...DEFAULT_SETTINGS, ...loadData(SETTINGS_KEY, {}) }

// The active grade-level data pack (TEKS, curriculum, word lists, game difficulty)
export const GRADE_DATA = getGradeData(settings.gradeLevel)
export const GRADE_LEVEL = GRADE_DATA.id

export const STUDENT_NAME = settings.studentName
export const GRADE = GRADE_DATA.label
export const LOCATION = settings.location
export const SEMESTER_LABEL = settings.semesterLabel
export const REQUIRED_WEEKLY_HOURS = Number(settings.weeklyHours) || 25.5
export const REQUIRED_WEEKLY_MINUTES = REQUIRED_WEEKLY_HOURS * 60

function parseDate(str, fallback) {
  const d = new Date(`${str}T00:00:00`)
  return isNaN(d.getTime()) ? fallback : d
}

export const SEMESTER_START = parseDate(settings.semesterStart, new Date(2026, 0, 12))
export const SEMESTER_END = parseDate(settings.semesterEnd, new Date(2026, 4, 22))

export function getSettings() {
  return { ...settings }
}

export function getSemesterSchoolDays() {
  let count = 0
  const d = new Date(SEMESTER_START)
  while (d <= SEMESTER_END) {
    if (d.getDay() >= 1 && d.getDay() <= 5) count++
    d.setDate(d.getDate() + 1)
  }
  return count
}

export function getCurrentWeek() {
  const now = new Date()
  const diff = now - SEMESTER_START
  const weeks = Math.floor(diff / (7 * 24 * 60 * 60 * 1000)) + 1
  return Math.max(1, Math.min(8, weeks))
}

// Local-timezone YYYY-MM-DD key — used for attendance, lessons, and logs.
// Never use toISOString() for day keys: it shifts dates near midnight in non-UTC zones.
export function localDateKey(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

// All localStorage keys the app uses — single source of truth for backup/restore.
// Game results are stored per grade level so progress is kept when switching grades.
export const ALL_DATA_KEYS = [
  'savannah-settings',
  'savannah-journal',
  'savannah-reading-log',
  'savannah-stickers',
  'savannah-hours',
  'savannah-attendance',
  'savannah-game-results', // legacy (pre-grade-levels)
  ...['K', '1', '2', '3', '4', '5'].map(g => `savannah-game-results-${g}`),
  'savannah-spelling-results',
  'savannah-portfolio',
  'savannah-lessons',
]
