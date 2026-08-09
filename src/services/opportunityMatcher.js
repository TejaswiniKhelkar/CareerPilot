const safeJson = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key) || 'null') || null
  } catch (e) {
    return null
  }
}

const normalize = (value) => String(value || '').toLowerCase().trim()
const splitTerms = (value) => {
  if (!value) return []
  if (Array.isArray(value)) return value.map((v) => normalize(v)).filter(Boolean)
  return String(value)
    .split(/[;,\n]/)
    .map((v) => normalize(v))
    .filter(Boolean)
}

const toYears = (value) => {
  if (!value) return 0
  const text = String(value).toLowerCase()
  const match = text.match(/(\d+(?:\.\d+)?)\s*\+?\s*(?:year|yrs|y)/)
  if (match) return Number(match[1])
  if (text.includes('no experience')) return 0
  if (text.includes('entry') || text.includes('fresh')) return 0
  if (text.match(/\d+/)) return Number(text.match(/\d+/)[0])
  if (text.includes('intern')) return 0
  return 1
}

const buildUserContext = () => {
  const profile = safeJson('cp_profile') || {}
  const analysis = safeJson('cp_cv_analysis_result') || {}

  const profileSkills = splitTerms(profile.skills)
  const analysisSkills = splitTerms(analysis.skills)
  const allSkills = Array.from(new Set([...profileSkills, ...analysisSkills]))

  const education = Array.from(new Set([
    ...(splitTerms(profile.education)),
    ...(splitTerms(profile.degree)),
    ...(splitTerms(profile.college)),
    ...(analysis.education || []).map((item) => normalize(item)),
  ]))

  const careerInterests = Array.from(new Set([
    ...(splitTerms(profile.careerInterests)),
    ...(analysis.interests || []).map((item) => normalize(item)),
  ]))

  const experienceItems = Array.isArray(profile.experience)
    ? profile.experience
    : profile.experience
      ? [profile.experience]
      : []
  const experienceCount = experienceItems.length + (analysis.experience?.length || 0)
  const experienceYears = Math.max(
    experienceCount,
    toYears(profile.experience),
    analysis.experience?.length || 0
  )

  return {
    profile,
    analysis,
    skills: allSkills,
    education,
    careerInterests,
    experienceYears,
  }
}

const percentage = (value) => Math.round(Math.max(0, Math.min(100, value)))

const computeSkillMatch = (opSkills, userSkills) => {
  const normalized = opSkills.map(normalize)
  const matching = normalized.filter((skill) => userSkills.includes(skill))
  const missing = normalized.filter((skill) => !userSkills.includes(skill))
  return {
    matchingSkills: matching.map((skill) => skill),
    missingSkills: missing.map((skill) => skill),
    score: opSkills.length ? percentage((matching.length / opSkills.length) * 100) : 0,
  }
}

const computeEducationMatch = (required, education) => {
  if (!required || !required.length) return { score: 70, matched: false }
  const normalizedRequired = required.map(normalize)
  const matched = normalizedRequired.filter((req) => education.some((edu) => edu.includes(req)))
  const score = percentage((matched.length / normalizedRequired.length) * 100)
  return { score: score || 20, matched: matched.length > 0 }
}

const computeExperienceMatch = (experienceLevel, experienceYears) => {
  if (!experienceLevel) return { score: 70, matched: true }
  const normalized = normalize(experienceLevel)
  if (normalized.includes('0+')) return { score: 100, matched: true }
  const rangeMatch = normalized.match(/(\d+)\s*-\s*(\d+)/)
  const minYears = rangeMatch ? Number(rangeMatch[1]) : 0
  const maxYears = rangeMatch ? Number(rangeMatch[2]) : minYears
  let score = 0
  if (experienceYears >= minYears) score = 100
  else if (minYears === 0 && experienceYears > 0) score = 90
  else score = percentage((experienceYears / Math.max(minYears, 1)) * 100)
  if (score > 100) score = 100
  return { score, matched: experienceYears >= minYears }
}

const computeInterestMatch = (interestAreas, careerInterests) => {
  if (!interestAreas || !interestAreas.length) return { score: 50, matched: false }
  const normalizedAreas = interestAreas.map(normalize)
  const matched = normalizedAreas.filter((area) => careerInterests.some((interest) => interest.includes(area) || area.includes(interest)))
  const score = percentage((matched.length / normalizedAreas.length) * 100)
  return { score, matched: matched.length > 0 }
}

export const matchOpportunity = (opportunity, userContext) => {
  const { skills: userSkills, education, careerInterests, experienceYears } = userContext
  const skillMatch = computeSkillMatch(opportunity.skills || [], userSkills)
  const educationMatch = computeEducationMatch(opportunity.requiredEducation || [], education)
  const experienceMatch = computeExperienceMatch(opportunity.experienceLevel || '', experienceYears)
  const interestMatch = computeInterestMatch(opportunity.interestAreas || [], careerInterests)

  const overall = percentage(
    skillMatch.score * 0.45 +
    educationMatch.score * 0.2 +
    experienceMatch.score * 0.2 +
    interestMatch.score * 0.15
  )

  const eligibilityStatus = educationMatch.matched && experienceMatch.matched && skillMatch.matchingSkills.length >= 1
    ? 'Eligible'
    : 'Worth improving'

  const reasons = []
  if (skillMatch.matchingSkills.length) reasons.push(`You already have ${skillMatch.matchingSkills.length} of the required skills.`)
  if (skillMatch.missingSkills.length) reasons.push(`Develop ${skillMatch.missingSkills.slice(0, 2).join(' and ')} to improve fit.`)
  if (educationMatch.matched) reasons.push('Your education closely matches the role requirements.')
  if (experienceMatch.matched) reasons.push('Your experience level matches this opportunity.')
  if (interestMatch.matched) reasons.push('This aligns with your career interests.')

  const why = reasons.length > 0 ? reasons.join(' ') : opportunity.matchText || 'This opportunity is an interesting potential match for your profile.'

  return {
    ...opportunity,
    computedMatch: {
      overall,
      skillMatchScore: skillMatch.score,
      educationMatchScore: educationMatch.score,
      experienceMatchScore: experienceMatch.score,
      interestMatchScore: interestMatch.score,
      eligibilityStatus,
      matchingSkills: skillMatch.matchingSkills,
      missingSkills: skillMatch.missingSkills,
      why,
    },
  }
}

export const getUserOpportunityContext = () => buildUserContext()

export default { matchOpportunity, getUserOpportunityContext }
