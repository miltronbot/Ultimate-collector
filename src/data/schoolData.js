import { GRADE_DATA } from './config'

// Grade-specific content comes from the active grade pack (see Settings)
export const spellingWords = GRADE_DATA.spellingWords
export const sightWordsList = GRADE_DATA.sightWords
export const wordBuilderWords = GRADE_DATA.wordBuilderWords
export const rhymePairs = GRADE_DATA.rhymePairs
export const phonicsBlends = GRADE_DATA.phonicsBlends
export const readingPassages = GRADE_DATA.readingPassages
export const gameParams = GRADE_DATA.gameParams

export const scheduleData = {
  Monday: [
    { time: '9:00', title: 'Morning Circle', desc: 'Calendar, weather, daily goal', icon: '🌅', type: 'cbrk', badge: '🧑‍🏫 Guided' },
    { time: '9:15', title: 'Reading & Phonics', desc: 'CVC words, blends, and reading practice', icon: '📖', type: 'cr', badge: '🧑‍🏫 Guided' },
    { time: '9:45', title: 'Writing', desc: 'Sentence building and handwriting', icon: '✏️', type: 'cw', badge: '🧑‍🏫 Guided' },
    { time: '10:15', title: 'Snack & Movement', desc: 'Brain break and healthy snack', icon: '🍎', type: 'cbrk', badge: '' },
    { time: '10:30', title: 'Math', desc: 'Place value and addition to 100', icon: '🔢', type: 'cm', badge: '🧑‍🏫 Guided' },
    { time: '11:00', title: 'Science', desc: 'Living organisms and habitats', icon: '🔬', type: 'cs', badge: '⭐ Independent' },
    { time: '11:30', title: 'Art & Music', desc: 'Creative expression time', icon: '🎨', type: 'ca', badge: '⭐ Independent' },
    { time: '12:00', title: 'Wrap-Up & Read Aloud', desc: 'Review the day and story time', icon: '📚', type: 'cr', badge: '🧑‍🏫 Guided' },
  ],
  Tuesday: [
    { time: '9:00', title: 'Morning Circle', desc: 'Calendar, weather, daily goal', icon: '🌅', type: 'cbrk', badge: '🧑‍🏫 Guided' },
    { time: '9:15', title: 'Reading & Phonics', desc: 'Digraphs and sight words', icon: '📖', type: 'cr', badge: '🧑‍🏫 Guided' },
    { time: '9:45', title: 'Spelling', desc: 'Weekly spelling words practice', icon: '📝', type: 'cw', badge: '⭐ Independent' },
    { time: '10:15', title: 'Snack & Movement', desc: 'Outdoor play and snack', icon: '🏃', type: 'cbrk', badge: '' },
    { time: '10:30', title: 'Math', desc: 'Subtraction and number lines', icon: '🔢', type: 'cm', badge: '🧑‍🏫 Guided' },
    { time: '11:00', title: 'Social Studies', desc: 'Community helpers and Texas geography', icon: '🗺️', type: 'css2', badge: '🧑‍🏫 Guided' },
    { time: '11:30', title: 'Play & Learn Games', desc: 'Educational games on the dashboard', icon: '🎮', type: 'ca', badge: '⭐ Independent' },
    { time: '12:00', title: 'Journal & Wrap-Up', desc: 'Write in journal and review', icon: '📓', type: 'cw', badge: '⭐ Independent' },
  ],
  Wednesday: [
    { time: '9:00', title: 'Morning Circle', desc: 'Calendar, weather, daily goal', icon: '🌅', type: 'cbrk', badge: '🧑‍🏫 Guided' },
    { time: '9:15', title: 'Reading Comprehension', desc: 'Read and answer questions', icon: '📖', type: 'cr', badge: '🧑‍🏫 Guided' },
    { time: '9:45', title: 'Writing Workshop', desc: 'Narrative and opinion writing', icon: '✏️', type: 'cw', badge: '🧑‍🏫 Guided' },
    { time: '10:15', title: 'Snack & Movement', desc: 'Yoga and stretching break', icon: '🧘', type: 'cbrk', badge: '' },
    { time: '10:30', title: 'Math', desc: 'Geometry and shapes', icon: '🔢', type: 'cm', badge: '🧑‍🏫 Guided' },
    { time: '11:00', title: 'Science Lab', desc: 'Hands-on experiment day', icon: '🧪', type: 'cs', badge: '🧑‍🏫 Guided' },
    { time: '11:30', title: 'Art Project', desc: 'Weekly art project', icon: '🖌️', type: 'ca', badge: '⭐ Independent' },
    { time: '12:00', title: 'Read Aloud & Wrap-Up', desc: 'Chapter book time', icon: '📚', type: 'cr', badge: '🧑‍🏫 Guided' },
  ],
  Thursday: [
    { time: '9:00', title: 'Morning Circle', desc: 'Calendar, weather, daily goal', icon: '🌅', type: 'cbrk', badge: '🧑‍🏫 Guided' },
    { time: '9:15', title: 'Phonics & Word Work', desc: 'Word families and blends', icon: '📖', type: 'cr', badge: '🧑‍🏫 Guided' },
    { time: '9:45', title: 'Spelling Test Practice', desc: 'Practice spelling words', icon: '📝', type: 'cw', badge: '⭐ Independent' },
    { time: '10:15', title: 'Snack & Movement', desc: 'Dance break and snack', icon: '💃', type: 'cbrk', badge: '' },
    { time: '10:30', title: 'Math', desc: 'Measurement and telling time', icon: '🔢', type: 'cm', badge: '🧑‍🏫 Guided' },
    { time: '11:00', title: 'Social Studies', desc: 'Economics and government basics', icon: '🏛️', type: 'css2', badge: '🧑‍🏫 Guided' },
    { time: '11:30', title: 'Reading Log', desc: 'Independent reading time', icon: '📚', type: 'cr', badge: '⭐ Independent' },
    { time: '12:00', title: 'Journal & Wrap-Up', desc: 'Reflect and write', icon: '📓', type: 'cw', badge: '⭐ Independent' },
  ],
  Friday: [
    { time: '9:00', title: 'Morning Circle', desc: 'Calendar, weather, weekly review', icon: '🌅', type: 'cbrk', badge: '🧑‍🏫 Guided' },
    { time: '9:15', title: 'Reading Review', desc: 'Week in review reading activities', icon: '📖', type: 'cr', badge: '🧑‍🏫 Guided' },
    { time: '9:45', title: 'Spelling Test', desc: 'Weekly spelling assessment', icon: '📝', type: 'cw', badge: '🧑‍🏫 Guided' },
    { time: '10:15', title: 'Snack & Movement', desc: 'Fun Friday movement games', icon: '🎉', type: 'cbrk', badge: '' },
    { time: '10:30', title: 'Math Games', desc: 'Math review through games', icon: '🎲', type: 'cm', badge: '⭐ Independent' },
    { time: '11:00', title: 'Science or Social Studies', desc: 'Finishing weekly projects', icon: '🔬', type: 'cs', badge: '🧑‍🏫 Guided' },
    { time: '11:30', title: 'Free Choice', desc: 'Choose a learning activity', icon: '⭐', type: 'ca', badge: '⭐ Independent' },
    { time: '12:00', title: 'Show & Tell / Wrap-Up', desc: 'Share what you learned this week', icon: '🎤', type: 'cbrk', badge: '🧑‍🏫 Guided' },
  ],
}


export const games = [
  { id: 'math-flash', name: 'Math Flash', emoji: '⚡', desc: 'Quick addition & subtraction', color: 'var(--yellow)' },
  { id: 'spelling-quiz', name: 'Spelling Quiz', emoji: '📝', desc: 'Spell the word you hear', color: 'var(--blue)' },
  { id: 'sight-words', name: 'Sight Words', emoji: '👀', desc: 'Learn high-frequency words', color: 'var(--green)' },
  { id: 'word-builder', name: 'Word Builder', emoji: '🧱', desc: 'Build words from letters', color: 'var(--purple)' },
  { id: 'count-match', name: 'Count & Match', emoji: '🔢', desc: 'Match numbers to groups', color: 'var(--orange)' },
  { id: 'rhyme-time', name: 'Rhyme Time', emoji: '🎵', desc: 'Find the rhyming word', color: 'var(--pink)' },
  { id: 'shape-match', name: 'Shape Match', emoji: '🔷', desc: 'Identify the shapes', color: 'var(--teal)' },
  { id: 'tell-time', name: 'Tell the Time', emoji: '🕐', desc: 'Read the clock', color: 'var(--blue-d)' },
  { id: 'money-math', name: 'Money Math', emoji: '💰', desc: 'Count coins and bills', color: 'var(--green-d)' },
  { id: 'multiplication', name: 'Multiplication', emoji: '✖️', desc: 'Count equal groups', color: 'var(--red)' },
  { id: 'phonics-blender', name: 'Phonics Blender', emoji: '🌀', desc: 'Blend sounds into words', color: 'var(--teal-d)' },
  { id: 'reading-comp', name: 'Story Time', emoji: '📜', desc: 'Read stories & answer questions', color: 'var(--purple-d)' },
]






export const shapes = [
  { name: 'Circle', emoji: '⭕', sides: 0 },
  { name: 'Triangle', emoji: '🔺', sides: 3 },
  { name: 'Square', emoji: '🟦', sides: 4 },
  { name: 'Rectangle', emoji: '🟩', sides: 4 },
  { name: 'Pentagon', emoji: '⬠', sides: 5 },
  { name: 'Hexagon', emoji: '⬡', sides: 6 },
  { name: 'Diamond', emoji: '🔷', sides: 4 },
  { name: 'Star', emoji: '⭐', sides: 10 },
]

// Badge definitions now live in progressStore.js (computeBadges) so they
// can earn themselves from real activity data.

export const fieldTrips = [
  {
    name: 'Riverside Nature Center',
    location: 'Kerrville, TX',
    desc: 'Explore native plants and animals of the Texas Hill Country. Great for science!',
    emoji: '🌿',
    subject: 'Science',
  },
  {
    name: 'Museum of Western Art',
    location: 'Kerrville, TX',
    desc: 'Discover the art and history of the American West through paintings and sculptures.',
    emoji: '🎨',
    subject: 'Art / History',
  },
  {
    name: 'Kerrville Public Library',
    location: 'Kerrville, TX',
    desc: 'Story time, reading programs, and fun activities. Pick up new books!',
    emoji: '📚',
    subject: 'Reading',
  },
  {
    name: 'Guadalupe River',
    location: 'Kerrville, TX',
    desc: 'Nature walk along the river. Observe wildlife and practice nature journaling.',
    emoji: '🏞️',
    subject: 'Science / Writing',
  },
  {
    name: 'Hill Country Arts Foundation',
    location: 'Ingram, TX',
    desc: 'Art classes and theater performances for kids. Only 10 minutes away!',
    emoji: '🎭',
    subject: 'Art',
  },
  {
    name: 'Stonehenge II',
    location: 'Ingram, TX',
    desc: 'Visit the replica of Stonehenge and learn about ancient history and engineering.',
    emoji: '🪨',
    subject: 'History / Science',
  },
]
