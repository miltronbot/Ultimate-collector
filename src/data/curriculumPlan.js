import { GRADE_DATA } from './config'

// 8-week curriculum plan for the active grade level (set in Settings)
export const weeklyPlan = GRADE_DATA.weeklyPlan

export const resources = {
  reading: [
    { name: 'Starfall', url: 'https://www.starfall.com', desc: 'Free phonics and reading activities' },
    { name: 'ReadWorks', url: 'https://www.readworks.org', desc: 'Free reading comprehension passages' },
    { name: 'Epic!', url: 'https://www.getepic.com', desc: 'Digital library for kids' },
  ],
  math: [
    { name: 'Math Playground', url: 'https://www.mathplayground.com', desc: 'Free math games and logic puzzles' },
    { name: 'Prodigy Math', url: 'https://www.prodigygame.com', desc: 'Adaptive math game' },
    { name: 'Xtra Math', url: 'https://xtramath.org', desc: 'Free math fact fluency' },
  ],
  science: [
    { name: 'Mystery Science', url: 'https://mysteryscience.com', desc: 'Engaging science lessons with videos' },
    { name: 'SciShow Kids', url: 'https://www.youtube.com/c/scishowkids', desc: 'Fun science videos' },
    { name: 'National Geographic Kids', url: 'https://kids.nationalgeographic.com', desc: 'Science articles and activities' },
  ],
  general: [
    { name: 'Super Teacher Worksheets', url: 'https://www.superteacherworksheets.com', desc: 'Printable worksheets' },
    { name: 'Teachers Pay Teachers', url: 'https://www.teacherspayteachers.com', desc: 'Teacher-made resources' },
    { name: 'Texas Home School Coalition', url: 'https://thsc.org', desc: 'Texas homeschool support & legal info' },
  ],
}
