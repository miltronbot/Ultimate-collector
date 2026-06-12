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
  grade: '2nd Grade',
  location: 'Kerrville, TX',
  semesterLabel: 'Spring 2026',
  semesterStart: '2026-01-12',
  semesterEnd: '2026-05-22',
  weeklyHours: 25.5,
}

const settings = { ...DEFAULT_SETTINGS, ...loadData(SETTINGS_KEY, {}) }

export const STUDENT_NAME = settings.studentName
export const GRADE = settings.grade
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

// All localStorage keys the app uses — single source of truth for backup/restore
export const ALL_DATA_KEYS = [
  'savannah-settings',
  'savannah-journal',
  'savannah-reading-log',
  'savannah-stickers',
  'savannah-hours',
  'savannah-attendance',
  'savannah-game-results',
  'savannah-spelling-results',
  'savannah-portfolio',
  'savannah-lessons',
]
