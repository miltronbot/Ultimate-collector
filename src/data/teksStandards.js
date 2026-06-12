import { GRADE_DATA } from './config'

// TEKS standards for the active grade level (set in Settings)
export const teksStandards = GRADE_DATA.teksStandards

export const getMasteryLevel = (score) => {
  if (score >= 90) return { label: 'Mastered', color: 'var(--green)', bg: 'var(--green-s)' }
  if (score >= 75) return { label: 'Proficient', color: 'var(--blue)', bg: 'var(--blue-s)' }
  if (score >= 60) return { label: 'Developing', color: 'var(--yellow-d)', bg: 'var(--yellow-s)' }
  return { label: 'Emerging', color: 'var(--red)', bg: 'var(--red-s)' }
}
