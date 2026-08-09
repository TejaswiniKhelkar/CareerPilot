// Lightweight mock CV analyzer service for MVP
// Exports: analyzeCV(file) => Promise<analysisResult>

const SKILLS = [
  'react', 'javascript', 'typescript', 'node', 'express', 'python', 'django', 'flask', 'sql', 'postgres', 'mongodb', 'aws', 'docker', 'kubernetes', 'product', 'data analysis', 'excel', 'sql', 'machine learning', 'nlp', 'figma', 'design']

function guessNameFromText(text) {
  if (!text) return null
  const lines = text.split(/\r?\n/).map(s=>s.trim()).filter(Boolean)
  // First line often is name if short
  if (lines.length && /^[A-Z][a-z]+\s[A-Z][a-z]+/.test(lines[0])) return lines[0].split(/\s+/).slice(0,3).join(' ')
  // Search for lines that look like a name (two capitalized words)
  for (const l of lines.slice(0,6)) {
    if (/^[A-Z][a-z]{1,}\s[A-Z][a-z]{1,}/.test(l)) return l.split(/\s+/).slice(0,3).join(' ')
  }
  return null
}

function extractSkills(text) {
  if (!text) return []
  const t = text.toLowerCase()
  const found = new Set()
  for (const s of SKILLS) if (t.includes(s)) found.add(s)
  return Array.from(found).slice(0,12)
}

function extractEducation(text) {
  if (!text) return []
  const edu = []
  const lines = text.split(/\r?\n/)
  for (const l of lines) {
    if (/bachelor|b\.sc|bsc|b\.eng|master|m\.sc|msc|mba|phd|university|college/i.test(l)) {
      edu.push(l.trim())
    }
  }
  return edu.slice(0,4)
}

function extractExperience(text) {
  if (!text) return []
  const ex = []
  const lines = text.split(/\r?\n/)
  for (const l of lines) {
    if (/\b(company|at|inc|llc|systems|labs|technologies)\b/i.test(l) && /\b(software|engineer|analyst|manager|product|consultant)\b/i.test(l)) {
      ex.push(l.trim())
    }
  }
  if (ex.length === 0 && lines.length > 6) {
    // fallback: take some lines as experience snippets
    ex.push(lines.slice(0,3).join(' '))
  }
  return ex.slice(0,6)
}

function extractProjects(text) {
  if (!text) return []
  const projects = []
  const lines = text.split(/\r?\n/)
  for (let i = 0; i < lines.length; i++) {
    const l = lines[i]
    if (/project/i.test(l) || /implemented/i.test(l) || /built/i.test(l)) {
      projects.push((l + ' ' + (lines[i + 1] || '')).trim())
    }
  }
  return projects.slice(0, 6)
}

function extractInterests(text) {
  if (!text) return []
  const t = text.toLowerCase()
  const candidates = ['product analytics', 'data strategy', 'ai', 'machine learning', 'design thinking', 'business intelligence', 'data storytelling', 'career growth', 'remote work', 'user research', 'product strategy']
  return candidates.filter((interest) => t.includes(interest)).slice(0, 5)
}

function makeSuggestion(missingSkills) {
  if (!missingSkills.length) return ['Keep strengthening your core skills and add measurable achievements.']
  return missingSkills.slice(0,5).map(s=>`Gain hands-on experience with ${s} through a small project or course.`)
}

export function analyzeCV(file) {
  return new Promise((resolve) => {
    const result = {
      name: null,
      education: [],
      degree: null,
      skills: [],
      projects: [],
      experience: [],
      certifications: [],
      interests: [],
      strengths: [],
      weaknesses: [],
      suggestions: [],
      score: 55,
      source: file.name || 'file'
    }

    const finalize = (text) => {
      const name = guessNameFromText(text) || (file.name ? file.name.split(/[._-]/).slice(0,2).join(' ') : 'Candidate')
      const skills = extractSkills(text)
      const education = extractEducation(text)
      const experience = extractExperience(text)
      const projects = extractProjects(text)
      const strengths = skills.slice(0,4)
      const weaknesses = ['kubernetes','nlp','docker'].filter(s=>!skills.includes(s)).slice(0,4)
      const suggestions = makeSuggestion(weaknesses)
      const score = Math.min(90, 40 + skills.length * 6 + (education.length?10:0) + (experience.length?10:0))

      result.name = name
      result.skills = skills
      result.education = education
      result.experience = experience
      result.projects = projects
      result.certifications = []
      result.interests = []
      result.strengths = strengths
      result.weaknesses = weaknesses
      result.suggestions = suggestions
      result.score = score

      // simulate async analysis time
      setTimeout(()=> resolve(result), 900 + Math.random()*700)
    }

    // try read as text for simple extraction
    const reader = new FileReader()
    reader.onload = (e) => {
      const txt = e.target.result
      finalize(String(txt || ''))
    }
    reader.onerror = () => {
      // fallback: no text available, return mock based on filename
      finalize('')
    }

    // For common text-like files, read as text. For binaries, attempt text anyway and let onerror handle.
    try {
      reader.readAsText(file)
    } catch (e) {
      // fallback finalize
      finalize('')
    }
  })
}

export default { analyzeCV }
