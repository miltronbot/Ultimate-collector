export const STUDENT_NAME = 'Savannah'
export const GRADE = '2nd Grade'
export const LOCATION = 'Kerrville, TX'
export const REQUIRED_WEEKLY_HOURS = 25.5
export const REQUIRED_WEEKLY_MINUTES = REQUIRED_WEEKLY_HOURS * 60
export const SEMESTER_LABEL = 'Spring 2026'

export const SEMESTER_START = new Date(2026, 0, 12)
export const SEMESTER_END = new Date(2026, 4, 22)

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
  } catch {
    // quota exceeded — silent fail
  }
}
