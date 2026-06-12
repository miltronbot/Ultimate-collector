# 🦋 Savannah's Homeschool Dashboard

A comprehensive, **Texas-first** K–5 homeschool platform — TEKS aligned, compliance ready, and 100% private.
Covers **Kindergarten through 5th grade** with a complete data pack per grade; pick the grade in Settings and the whole app adapts.

> See [RESEARCH.md](RESEARCH.md) for the homeschool app market analysis and the pain points this app is designed to solve.

## What Makes It Different

- **Full K–5 coverage** — six grade packs (245 TEKS standards) with grade-appropriate curriculum, spelling, sight words, reading passages, and game difficulty (K adds to 5 with hour-only clocks; 5th adds to 1,000 with 12×12 facts). 4th grade social studies is Texas History; 5th is U.S. History
- **Live TEKS mastery** — every game is mapped to a Texas standard; mastery scores update from real play ⚡
- **Auto-earning badges** — achievements unlock from measurable activity (books logged, attendance streaks, game accuracy), not empty points
- **Texas compliance built in** — weekly hour tracking (TEC §25.086 / 25.5 hrs), attendance calendar, printable signed reports
- **Family-owned data** — everything lives in localStorage; one-click JSON backup & restore; zero accounts, zero tracking
- **Two audiences, one app** — a playful student view and a records-focused parent view behind a single toggle

## Features

### 🦋 Student View
| Tab | Description |
|-----|-------------|
| 🏠 Overview | Daily lesson checklist (from the live curriculum week), real stats, announcements |
| 📅 Schedule | Mon–Fri daily schedule (9:00 AM – 12:10 PM) with guided/independent labels |
| 🎮 Play & Learn | **12 interactive games**: Math Flash, Spelling Quiz, Sight Words, Word Builder, Count & Match, Rhyme Time, Shape Match, Tell the Time, Money Math, Multiplication, Phonics Blender, Story Time |
| ✏️ Spelling | 8-week spelling program; test scores feed the Spelling Bee badge |
| 📓 Journal | Writing journal with prompts and word counter |
| 📚 Reading Log | Book tracker with ratings and reading stats |
| 📊 Progress | 40-slot sticker chart with weekly progress bars |
| 🏆 Badges | 12 badges that **earn themselves** from real activity, with progress meters |
| 🖼️ Portfolio | Photo work samples (auto-compressed) — art, worksheets, writing |
| 🌍 Field Trips | Kerrville-area learning destinations |

### 👩 Parent View
| Tab | Description |
|-----|-------------|
| 👩 Parent Hub | Compliance %, live subject mastery, recent journal/books at a glance |
| 📋 TEKS Standards | Every 2nd-grade standard with live mastery (⚡ = updating from game play) |
| ⏱️ Time Log | Hour tracking vs. the weekly target, by subject and by day |
| 📚 Curriculum | 8-week TEKS-mapped curriculum planner + free resource links |
| 📅 Attendance | Click-to-mark calendar; streaks feed the header and badges |
| 📄 Reports | Printable progress report: mastery table, reading log, work samples, signature line |
| ⚙️ Settings | Edit student/semester/hours; **download or restore a full data backup** |

## Tech Stack

- **React 18** + **Vite 5** — zero other runtime dependencies
- localStorage persistence with quota-safe writes and corruption fallbacks
- iPad/tablet optimized: 44px+ touch targets, safe-area insets, orientation-aware layouts
- Print stylesheet for paper records; per-page error boundaries

## Getting Started

```bash
npm install
npm run dev      # development server at http://localhost:5173
npm run build    # production build into dist/
npm run preview  # preview the production build
```

## Configuration

Open **Parent view → ⚙️ Settings** to change the student name, grade, location, semester dates,
and weekly hour target — no code edits needed. Defaults live in
[`src/data/config.js`](src/data/config.js).

## Project Structure

```
src/
├── App.jsx                  # Header, live streak, student/parent toggle, navigation
├── index.css                # Design system + responsive/touch/print styles
├── components/
│   └── ErrorBoundary.jsx    # Per-page crash protection
├── data/
│   ├── config.js            # Settings-aware config + safe storage helpers
│   ├── progressStore.js     # Game results → live TEKS mastery, badges, streaks
│   ├── schoolData.js        # Shared schedule, game registry, field trips
│   ├── teksStandards.js     # Active grade's TEKS standards
│   ├── curriculumPlan.js    # Active grade's 8-week plan + resource links
│   └── grades/              # Complete K-5 data packs (one file per grade)
└── pages/                   # 17 page components (student + parent views)
```
