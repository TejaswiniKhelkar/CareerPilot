// This provider sends the CV to a secure backend endpoint.
// The backend should be responsible for storing the AI API key and calling the AI provider.
// Never store API keys in frontend code.
const API_ENDPOINT = import.meta.env.VITE_AI_ANALYSIS_ENDPOINT || ''

const toArray = (value) => {
  if (!value) return []
  if (Array.isArray(value)) return value
  if (typeof value === 'string') {
    return value
      .split(/\r?\n|,|;/)
      .map((item) => item.trim())
      .filter(Boolean)
  }
  return []
}

const normalizeResponse = (payload) => {
  const result = payload?.analysis || payload || {}
  return {
    name: result.name || result.fullName || null,
    role: result.role || result.targetRole || null,
    location: result.location || result.region || null,
    education: toArray(result.education),
    skills: toArray(result.skills),
    projects: toArray(result.projects),
    experience: toArray(result.experience),
    certifications: toArray(result.certifications),
    interests: toArray(result.interests),
    strengths: toArray(result.strengths),
    weaknesses: toArray(result.skillGaps || result.missingSkills || result.weaknesses),
    skillGaps: toArray(result.skillGaps || result.missingSkills || result.weaknesses),
    suggestedRoles: toArray(result.suggestedRoles || result.recommendedRoles),
    suggestions: toArray(result.suggestions),
    score: Number(result.score || 0),
    source: 'ai',
  }
}

export async function analyzeCV(file) {
  if (!API_ENDPOINT) {
    throw new Error('AI analysis endpoint is not configured.')
  }

  const formData = new FormData()
  formData.append('file', file)

  const response = await fetch(API_ENDPOINT, {
    method: 'POST',
    body: formData,
    credentials: 'same-origin',
  })

  if (!response.ok) {
    const text = await response.text()
    throw new Error(`AI backend error: ${response.status} ${text}`)
  }

  const json = await response.json()
  const normalized = normalizeResponse(json)
  if (!normalized.skills.length && !normalized.education.length && !normalized.experience.length) {
    throw new Error('AI backend returned an incomplete analysis result.')
  }

  return normalized
}

export default { analyzeCV }
