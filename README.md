# 🦋 Savannah's Homeschool Dashboard

A comprehensive Texas homeschool dashboard for a 2nd grader in Kerrville, TX — aligned with **Texas Essential Knowledge and Skills (TEKS)** standards.

## Features

### 🦋 Student View
| Tab | Description |
|-----|-------------|
| 🏠 Overview | Welcome dashboard with stats, weekly goals, and announcements |
| 📅 Schedule | Mon–Fri daily schedule (9:00 AM – 12:10 PM) with guided/independent labels |
| 🎮 Play & Learn | 9 interactive games: Math Flash, Spelling Quiz, Sight Words, Word Builder, Count & Match, Rhyme Time, Shape Match, Tell the Time, Money Math |
| ✏️ Spelling | 8-week spelling program with practice and test modes |
| 📓 Journal | Writing journal with prompts and word counter |
| 📚 Reading Log | Book tracker with ratings and reading stats |
| 📊 Progress | 40-slot sticker chart with weekly progress bars |
| 🏆 Badges | 12 achievement badges |
| 🌍 Field Trips | Kerrville-area learning destinations |

### 👩 Parent View
| Tab | Description |
|-----|-------------|
| 👩 Parent Hub | Compliance overview, subject mastery, activity summary |
| 📋 TEKS Standards | Full 2nd-grade TEKS tracker with mastery levels per standard |
| ⏱️ Time Log | Instructional hour tracking (25.5 hr/week Texas compliance — TEC §25.086) |
| 📚 Curriculum | 8-week TEKS-aligned curriculum planner with free resources |
| 📅 Attendance | Calendar-based attendance tracker with semester stats |
| 📄 Reports | Printable progress reports with signature line |

## Tech Stack

- **React 18** + **Vite 5** — no other runtime dependencies
- All data persisted in `localStorage` (private, no server, no accounts)
- iPad/tablet optimized: touch targets, safe-area insets, orientation-aware layouts
- Print stylesheet for generating paper records

## Getting Started

```bash
npm install
npm run dev      # development server at http://localhost:5173
npm run build    # production build into dist/
npm run preview  # preview the production build
```

## Configuration

Student name, grade, location, semester dates, and required weekly hours all live in
[`src/data/config.js`](src/data/config.js). Edit that one file to adapt the app to a
different student or school year.

## Project Structure

```
src/
├── App.jsx                  # Header, student/parent mode toggle, navigation
├── index.css                # Full design system + responsive/print styles
├── components/
│   └── ErrorBoundary.jsx    # Per-page crash protection
├── data/
│   ├── config.js            # Student/semester config + safe localStorage helpers
│   ├── schoolData.js        # Schedule, spelling words, games, badges, field trips
│   ├── teksStandards.js     # TEKS standards with mastery tracking
│   └── curriculumPlan.js    # 8-week curriculum plan + resource links
└── pages/                   # 15 page components (student + parent views)
```
