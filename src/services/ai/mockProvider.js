const KNOWN_SKILLS = [
  'react', 'javascript', 'typescript', 'node', 'express', 'python', 'django', 'flask', 'sql', 'postgres', 'mongodb', 'aws', 'docker', 'kubernetes', 'product', 'data analysis', 'excel', 'machine learning', 'nlp', 'figma', 'design', 'analytics', 'leadership', 'communication', 'stakeholder management', 'sql', 'python', 'power bi', 'tableau', 'data visualization', 'project management'
]

const ROLE_MAP = [
  { matcher: ['product', 'analytics', 'data'], roles: ['Product Analyst', 'Data Analyst', 'Business Intelligence Analyst'] },
  { matcher: ['machine learning', 'ml', 'ai'], roles: ['Machine Learning Engineer', 'AI Specialist', 'Data Scientist'] },
  { matcher: ['design', 'figma', 'ux'], roles: ['UX Designer', 'Product Designer', 'Design Researcher'] },
  { matcher: ['software', 'react', 'node', 'javascript'], roles: ['Frontend Engineer', 'Full Stack Developer', 'Software Engineer'] },
]

const toArray = (value) => {
  if (!value) return []
  if (Array.isArray(value)) return value
  return String(value)
    .split(/\r?\n|,|;/)
    .map((item) => item.trim())
    .filter(Boolean)
}

const guessNameFromText = (text, file) => {
  const lines = String(text || '').split(/\r?\n/).map((line) => line.trim()).filter(Boolean)
  if (!lines.length) return file.name ? file.name.split(/[._-]/).slice(0, 2).join(' ') : 'Candidate'
  if (/^[A-Z][a-z]+\s[A-Z][a-z]+/.test(lines[0])) return lines[0].split(/\s+/).slice(0, 3).join(' ')
  const candidate = lines.find((line) => /^[A-Z][a-z]+\s[A-Z][a-z]+/.test(line))
  return candidate ? candidate.split(/\s+/).slice(0, 3).join(' ') : lines[0].slice(0, 24)
}

const extractSkills = (text) => {
  const lower = String(text || '').toLowerCase()
  return KNOWN_SKILLS.filter((skill, index) => lower.includes(skill) && index < 12)
}

const extractEducation = (text) => {
  const lines = String(text || '').split(/\r?\n/)
  return lines.filter((line) => /bachelor|b\.sc|bsc|b\.eng|master|m\.sc|msc|mba|phd|university|college|high school|diploma/i.test(line)).slice(0, 4)
}

const extractExperience = (text) => {
  const lines = String(text || '').split(/\r?\n/)
  const matches = []
  lines.forEach((line) => {
    if (/\b(company|inc|llc|solutions|labs|technologies|systems)\b/i.test(line) && /\b(engineer|analyst|manager|consultant|specialist|intern|lead|director)\b/i.test(line)) {
      matches.push(line.trim())
    }
  })
  if (!matches.length && lines.length > 4) {
    matches.push(lines.slice(0, 3).join(' '))
  }
  return matches.slice(0, 6)
}

const extractCertifications = (text) => {
  const lines = String(text || '').split(/\r?\n/)
  return lines.filter((line) => /certified|certification|certificate|aws|google cloud|pmp|scrum/i.test(line)).slice(0, 4)
}

const extractProjects = (text) => {
  const lines = String(text || '').split(/\r?\n/)
  const projects = []
  lines.forEach((line, index) => {
    if (/project|implemented|built|developed|designed|launched/i.test(line)) {
      projects.push((line + ' ' + (lines[index + 1] || '')).trim())
    }
  })
  return projects.slice(0, 6)
}

const extractInterests = (text) => {
  const lower = String(text || '').toLowerCase()
  const candidates = ['product analytics', 'data strategy', 'ai', 'machine learning', 'design thinking', 'business intelligence', 'data storytelling', 'career growth', 'remote work', 'user research', 'product strategy', 'software development']
  return candidates.filter((interest) => lower.includes(interest)).slice(0, 5)
}

const suggestRoles = (skills, interests) => {
  const text = [...skills, ...interests].join(' ').toLowerCase()
  const matches = new Set()
  ROLE_MAP.forEach((item) => {
    if (item.matcher.some((keyword) => text.includes(keyword))) {
      item.roles.forEach((role) => matches.add(role))
    }
  })
  if (!matches.size) {
    return ['Professional Development Specialist', 'Career Growth Analyst', 'Business Analyst']
  }
  return Array.from(matches).slice(0, 4)
}

const normalizeScore = (skills, education, experience) => {
  const base = 30
  const score = base + Math.min(skills.length * 5, 30) + Math.min(education.length * 8, 24) + Math.min(experience.length * 8, 24)
  return Math.min(98, Math.max(30, Math.round(score)))
}

const extractSkillGaps = (skills) => {
  const core = ['sql', 'python', 'communication', 'leadership', 'project management', 'data visualization', 'cloud', 'react']
  return core.filter((skill) => !skills.includes(skill)).slice(0, 5)
}

export async function analyzeCV(file) {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onload = (event) => {
      const text = String(event.target.result || '')
      const name = guessNameFromText(text, file)
      const skills = extractSkills(text)
      const education = extractEducation(text)
      const experience = extractExperience(text)
      const certifications = extractCertifications(text)
      const projects = extractProjects(text)
      const interests = extractInterests(text)
      const strengths = skills.slice(0, 4)
      const skillGaps = extractSkillGaps(skills)
      const suggestedRoles = suggestRoles(skills, interests)
      const suggestions = skillGaps.length
        ? skillGaps.map((gap) => `Boost your CV by learning ${gap} with a project or certification.`)
        : ['Add a measurable achievement to one of your top skills.']

      resolve({
        name,
        role: suggestedRoles[0] || 'Career Growth Candidate',
        location: 'Remote / India',
        education,
        skills,
        projects,
        experience,
        certifications,
        interests,
        strengths,
        weaknesses: skillGaps,
        skillGaps,
        suggestedRoles,
        suggestions,
        score: normalizeScore(skills, education, experience),
        source: 'fallback',
      })
    }
    reader.onerror = () => {
      resolve({
        name: file.name ? file.name.split(/[._-]/).slice(0, 2).join(' ') : 'Candidate',
        role: 'Career Growth Candidate',
        location: 'Remote / India',
        education: [],
        skills: [],
        projects: [],
        experience: [],
        certifications: [],
        interests: [],
        strengths: [],
        skillGaps: [],
        suggestedRoles: [],
        suggestions: ['Provide a readable resume file for better analysis.'],
        score: 40,
        source: 'fallback',
      })
    }
    reader.readAsText(file)
  })
}

export default { analyzeCV }
