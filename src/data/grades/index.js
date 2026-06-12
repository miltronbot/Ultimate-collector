import { gradeK } from './gradeK'
import { grade1 } from './grade1'
import { grade2 } from './grade2'
import { grade3 } from './grade3'
import { grade4 } from './grade4'
import { grade5 } from './grade5'

export const allGrades = {
  K: gradeK,
  1: grade1,
  2: grade2,
  3: grade3,
  4: grade4,
  5: grade5,
}

export const gradeOptions = [
  { id: 'K', label: 'Kindergarten' },
  { id: '1', label: '1st Grade' },
  { id: '2', label: '2nd Grade' },
  { id: '3', label: '3rd Grade' },
  { id: '4', label: '4th Grade' },
  { id: '5', label: '5th Grade' },
]

export function getGradeData(level) {
  return allGrades[level] || allGrades['2']
}
