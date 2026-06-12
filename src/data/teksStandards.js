export const teksStandards = {
  reading: {
    name: 'Reading & Language Arts',
    color: 'var(--blue)',
    emoji: '📖',
    standards: [
      { id: 'ELA.2.1A', desc: 'Decode words with closed syllables, open syllables, and VCe syllables', mastery: 85 },
      { id: 'ELA.2.1B', desc: 'Decode words with consonant blends (bl, cr, str, etc.)', mastery: 90 },
      { id: 'ELA.2.1C', desc: 'Decode words with consonant digraphs (sh, ch, th, wh)', mastery: 78 },
      { id: 'ELA.2.2A', desc: 'Read high-frequency sight words automatically', mastery: 92 },
      { id: 'ELA.2.3A', desc: 'Read aloud grade-level text with fluency and comprehension', mastery: 80 },
      { id: 'ELA.2.4A', desc: 'Use context clues to determine word meaning', mastery: 72 },
      { id: 'ELA.2.6A', desc: 'Identify main idea and supporting details', mastery: 68 },
      { id: 'ELA.2.7A', desc: 'Make and confirm predictions using text features', mastery: 75 },
      { id: 'ELA.2.8A', desc: 'Sequence and summarize plot elements', mastery: 70 },
      { id: 'ELA.2.9A', desc: 'Compare and contrast characters, settings, events', mastery: 65 },
    ],
  },
  math: {
    name: 'Mathematics',
    color: 'var(--yellow)',
    emoji: '🔢',
    standards: [
      { id: 'MATH.2.2A', desc: 'Use concrete models to compose and decompose numbers up to 1,200', mastery: 88 },
      { id: 'MATH.2.2B', desc: 'Use place value to compare and order whole numbers up to 1,200', mastery: 82 },
      { id: 'MATH.2.4A', desc: 'Recall basic addition facts to add within 20', mastery: 95 },
      { id: 'MATH.2.4B', desc: 'Recall basic subtraction facts to subtract within 20', mastery: 90 },
      { id: 'MATH.2.4C', desc: 'Solve one-step and multi-step word problems (add/subtract to 1,000)', mastery: 70 },
      { id: 'MATH.2.6A', desc: 'Model, create, and describe contextual multiplication (equal groups)', mastery: 55 },
      { id: 'MATH.2.7A', desc: 'Determine value of a collection of coins up to one dollar', mastery: 78 },
      { id: 'MATH.2.8A', desc: 'Create two-dimensional shapes (circles, triangles, rectangles, squares)', mastery: 85 },
      { id: 'MATH.2.9A', desc: 'Read and write time to the nearest five minutes on analog/digital clocks', mastery: 72 },
      { id: 'MATH.2.9B', desc: 'Determine the length of an object using concrete models (standard units)', mastery: 80 },
    ],
  },
  writing: {
    name: 'Writing',
    color: 'var(--teal)',
    emoji: '✏️',
    standards: [
      { id: 'ELA.2.10A', desc: 'Plan a first draft by generating ideas (drawing, sharing, writing)', mastery: 82 },
      { id: 'ELA.2.10B', desc: 'Develop drafts by sequencing ideas through writing sentences', mastery: 75 },
      { id: 'ELA.2.10C', desc: 'Revise drafts by adding, deleting, or rearranging words or sentences', mastery: 68 },
      { id: 'ELA.2.11A', desc: 'Publish and share writing with others', mastery: 80 },
      { id: 'ELA.2.12A', desc: 'Write brief compositions (personal narratives)', mastery: 72 },
      { id: 'ELA.2.12B', desc: 'Write short poems using sensory details', mastery: 60 },
    ],
  },
  science: {
    name: 'Science',
    color: 'var(--green)',
    emoji: '🔬',
    standards: [
      { id: 'SCI.2.1A', desc: 'Ask questions about organisms, objects, and events observed in nature', mastery: 90 },
      { id: 'SCI.2.2A', desc: 'Plan and conduct simple descriptive investigations', mastery: 78 },
      { id: 'SCI.2.5A', desc: 'Classify matter by physical properties (shape, mass, temperature)', mastery: 72 },
      { id: 'SCI.2.7A', desc: 'Observe, describe, and record patterns of objects in the sky (sun, moon)', mastery: 85 },
      { id: 'SCI.2.8A', desc: 'Observe and describe how weather changes from day to day', mastery: 88 },
      { id: 'SCI.2.9A', desc: 'Identify basic needs of plants and animals (food, water, shelter)', mastery: 92 },
      { id: 'SCI.2.10A', desc: 'Observe and identify how living organisms depend on each other', mastery: 70 },
    ],
  },
  socialStudies: {
    name: 'Social Studies',
    color: 'var(--purple)',
    emoji: '🗺️',
    standards: [
      { id: 'SS.2.1A', desc: 'Describe the order of events using time-related vocabulary', mastery: 82 },
      { id: 'SS.2.3A', desc: 'Identify ways people have modified the physical environment (roads, dams)', mastery: 75 },
      { id: 'SS.2.4A', desc: 'Identify functions of government (laws, services)', mastery: 65 },
      { id: 'SS.2.5A', desc: 'Identify the roles of elected leaders', mastery: 60 },
      { id: 'SS.2.7A', desc: 'Distinguish between producing and consuming', mastery: 78 },
      { id: 'SS.2.8A', desc: 'Identify examples of technology used at home, school, and community', mastery: 88 },
      { id: 'SS.2.14A', desc: 'Identify contributions of historical figures (Sam Houston, etc.)', mastery: 72 },
    ],
  },
}

export const getOverallMastery = () => {
  const allStandards = Object.values(teksStandards).flatMap(s => s.standards)
  return Math.round(allStandards.reduce((sum, s) => sum + s.mastery, 0) / allStandards.length)
}

export const getSubjectMastery = (subjectKey) => {
  const standards = teksStandards[subjectKey].standards
  return Math.round(standards.reduce((sum, s) => sum + s.mastery, 0) / standards.length)
}

export const getMasteryLevel = (score) => {
  if (score >= 90) return { label: 'Mastered', color: 'var(--green)', bg: 'var(--green-s)' }
  if (score >= 75) return { label: 'Proficient', color: 'var(--blue)', bg: 'var(--blue-s)' }
  if (score >= 60) return { label: 'Developing', color: 'var(--yellow-d)', bg: 'var(--yellow-s)' }
  return { label: 'Emerging', color: 'var(--red)', bg: 'var(--red-s)' }
}
