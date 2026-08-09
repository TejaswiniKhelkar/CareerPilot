import { opportunities } from '../data/opportunities'
import { matchOpportunity } from './opportunityMatcher'

const ROADMAP_STORAGE_KEY = 'cp_roadmap_status'

const safeJson = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key) || 'null') || null
  } catch (e) {
    return null
  }
}

const normalize = (value) => String(value || '').toLowerCase().trim()

const getUserContext = () => {
  const profile = safeJson('cp_profile') || {}
  const analysis = safeJson('cp_cv_analysis_result') || {}
  const skills = Array.from(new Set([...(profile.skills || []), ...(analysis.skills || [])].map((skill) => normalize(skill)).filter(Boolean)))
  const education = normalize(profile.education || profile.degree || profile.college || (analysis.education || []).join(', '))
  const careerGoal = (profile.careerInterests && profile.careerInterests.length)
    ? profile.careerInterests[0]
    : (analysis.interests && analysis.interests.length)
      ? analysis.interests[0]
      : (profile.preferredJobType || profile.preferredLocation || '')
  const experienceCount = Array.isArray(profile.experience)
    ? profile.experience.length
    : profile.experience
      ? 1
      : (analysis.experience || []).length
  const topOpportunities = opportunities
    .map((opp) => matchOpportunity(opp, { skills, education: [education], careerInterests: [normalize(careerGoal)], experienceYears: experienceCount }))
    .sort((a, b) => b.computedMatch.overall - a.computedMatch.overall)

  return {
    profile,
    analysis,
    skills,
    education,
    careerGoal,
    experienceCount,
    topOpportunity: topOpportunities[0] || null,
  }
}

const loadRoadmapStatus = () => {
  try {
    return JSON.parse(localStorage.getItem(ROADMAP_STORAGE_KEY) || '{}')
  } catch (e) {
    return {}
  }
}

const saveRoadmapStatus = (status) => {
  try {
    localStorage.setItem(ROADMAP_STORAGE_KEY, JSON.stringify(status))
  } catch (e) {
    // ignore
  }
}

const createRoadmapSteps = (context, status = {}) => {
  const { skills, education, careerGoal, experienceCount, topOpportunity } = context
  const missingSkills = Array.from(new Set([
    ...(context.analysis?.skillGaps || context.analysis?.weaknesses || []),
    ...(topOpportunity?.computedMatch?.missingSkills || []),
  ]))
  const primaryGap = missingSkills[0] || 'a relevant skill gap'
  const targetRole = topOpportunity?.title || careerGoal || 'your target role'
  const interestText = careerGoal || 'your chosen career area'

  return [
    {
      id: 'current-skills',
      title: 'Review your current profile',
      description: `You have ${skills.length || 'a few'} skills and ${experienceCount || 'some'} experience entries. Use this insight to focus your next steps.`,
      why: 'Understanding your current strengths helps shape a practical roadmap.',
      effort: '10 mins',
      completed: Boolean(status['current-skills']),
      details: {
        education: education || 'Not defined yet',
        skills: skills.length ? skills : ['No skills detected yet'],
        experience: experienceCount ? `${experienceCount} entries` : 'Early career',
        careerGoal: careerGoal || 'Add a career goal in your profile',
      },
    },
    {
      id: 'learn-skill',
      title: `Learn ${primaryGap}`,
      description: `Fill the most important skill gap by learning ${primaryGap} through a course, tutorial, or mini-project.`,
      why: `This skill is missing from your matching opportunities and will boost your fit for ${targetRole}.`, 
      effort: '1-2 weeks',
      completed: Boolean(status['learn-skill']),
    },
    {
      id: 'build-project',
      title: `Build a ${interestText} project`, 
      description: `Create a project that showcases ${interestText} and your ability to apply data-driven thinking.`, 
      why: `Hands-on work proves your skills and gives you stories to share in applications.`, 
      effort: '2-4 weeks',
      completed: Boolean(status['build-project']),
    },
    {
      id: 'earn-certification',
      title: `Earn a certification`, 
      description: 'Choose a relevant certification or micro-credential that validates your new skills.', 
      why: 'Certifications help recruiters and algorithms recognize your skill growth.',
      effort: '2-6 weeks',
      completed: Boolean(status['earn-certification']),
    },
    {
      id: 'apply-opportunities',
      title: 'Apply for matched roles', 
      description: `Submit applications to opportunities like ${targetRole} with your updated resume and project examples.`, 
      why: 'Applying to roles while your profile is fresh maximizes momentum.',
      effort: 'Ongoing',
      completed: Boolean(status['apply-opportunities']),
    },
    {
      id: 'target-role',
      title: `Target ${targetRole}`,
      description: `Prepare for the role you want by refining your resume, interview answers, and portfolio.`, 
      why: 'A clear target turns your roadmap into a career path.',
      effort: '1-2 months',
      completed: Boolean(status['target-role']),
    },
  ]
}

const buildRecommendations = (context) => {
  const { skills, careerGoal, experienceCount, topOpportunity } = context
  const missingSkill = (context.analysis?.skillGaps || context.analysis?.weaknesses || [])[0] || (topOpportunity?.computedMatch?.missingSkills || [])[0]
  return [
    missingSkill ? `Learn ${missingSkill} through a focused course and add it to a new portfolio project.` : 'Add one new high-impact skill to your resume.',
    careerGoal ? `Tailor your resume and summary to ${careerGoal}.` : 'Set a clear career goal in your profile so opportunities can match you better.',
    topOpportunity ? `Apply to ${topOpportunity.title} and mention your relevant project experience in the application.` : 'Explore top recommended roles from your opportunities page.',
  ]
}

export const getRoadmapContext = () => {
  const context = getUserContext()
  const status = loadRoadmapStatus()
  const steps = createRoadmapSteps(context, status)
  const completedCount = steps.filter((step) => step.completed).length
  const progress = steps.length ? Math.round((completedCount / steps.length) * 100) : 0
  const recommendations = buildRecommendations(context)
  return {
    context,
    steps,
    status,
    progress,
    completedCount,
    remainingCount: steps.length - completedCount,
    recommendations,
  }
}

export const toggleRoadmapStep = (stepId) => {
  const status = loadRoadmapStatus()
  const next = { ...status, [stepId]: !status[stepId] }
  saveRoadmapStatus(next)
  return next
}

export default { getRoadmapContext, toggleRoadmapStep }
