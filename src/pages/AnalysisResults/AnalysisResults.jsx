import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowRight,
  Briefcase,
  GraduationCap,
  Sparkles,
  Shield,
  Star,
  ClipboardCheck,
  CalendarDays,
  TrendingUp,
} from 'lucide-react'
import { Button, Card, Loading, EmptyState } from '../../components/ui'

const SAMPLE = null

export default function AnalysisResults() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [result, setResult] = useState(null)

  useEffect(() => {
    setLoading(true)
    try {
      const raw = localStorage.getItem('cp_cv_analysis_result')
      if (raw) {
        setResult(JSON.parse(raw))
      } else {
        setResult(null)
      }
    } catch (e) {
      setError('Failed to load analysis result')
    } finally {
      setLoading(false)
    }
  }, [])

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-6rem)] flex items-center justify-center bg-mesh">
        <Loading />
      </div>
    )
  }

  if (!result) {
    return (
      <div className="relative min-h-[calc(100vh-6rem)] bg-mesh py-10 sm:py-14">
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <div className="absolute -top-24 right-0 w-[420px] h-[420px] bg-violet-300/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-4 w-[320px] h-[320px] bg-lavender-300/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6">
          <div className="rounded-[2rem] bg-white/95 border border-lavender-100 shadow-card p-10 text-center">
            <h1 className="text-3xl font-heading font-bold text-slate-900 mb-4">No analysis available yet</h1>
            <p className="text-sm text-slate-500 mb-6">Upload your CV to generate a personalized career analysis report.</p>
            <div className="flex justify-center gap-3">
              <Button size="lg" onClick={() => navigate('/upload')}>Upload CV</Button>
              <Button variant="secondary" size="lg" onClick={() => navigate('/dashboard')}>Go to dashboard</Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative min-h-[calc(100vh-6rem)] bg-mesh py-10 sm:py-14">
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute -top-24 right-0 w-[420px] h-[420px] bg-violet-300/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-4 w-[320px] h-[320px] bg-lavender-300/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid gap-10 xl:grid-cols-[1.8fr_1fr] items-start">
          <section className="space-y-8">
            <div className="rounded-[2rem] bg-white/95 border border-lavender-100 shadow-card p-7 sm:p-8">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-violet-500 font-semibold mb-3">
                    CV Analysis Report
                  </p>
                  <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-slate-900 mb-2">
                    {result?.name || 'Your CV Analysis'}
                  </h1>
                  <p className="text-sm sm:text-base text-slate-500 max-w-2xl">
                    {result?.role || ''} {result?.location ? `· ${result.location}` : ''}
                  </p>
                  {result?.source && (
                    <p className="text-xs text-slate-400 mt-2">
                      {result.source === 'ai' ? 'Secure backend AI analysis' : 'Local fallback analysis'}
                    </p>
                  )}
                </div>

                <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                  <div className="flex items-center gap-3 rounded-3xl bg-violet-50 px-4 py-3 border border-violet-100">
                    <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-violet-600 to-lavender-500 flex items-center justify-center text-white shadow-soft">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Profile Score</p>
                      <p className="text-xl font-semibold text-slate-900">{result?.score ?? '—'}%</p>
                    </div>
                  </div>
                  <Button size="lg" iconRight={ArrowRight} onClick={() => navigate('/opportunities')}>
                    Find My Opportunities
                  </Button>
                </div>
              </div>
            </div>

            <section className="grid gap-6 xl:grid-cols-2">
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-5">
                  <GraduationCap className="w-5 h-5 text-violet-600" />
                  <h2 className="text-lg font-semibold text-slate-900">Education</h2>
                </div>
                  <div className="space-y-5">
                    {(result?.education?.length ? result.education : []).map((item, idx) => (
                      <div key={idx} className="space-y-2">
                        <div className="flex items-center justify-between gap-4">
                          <div>
                            <p className="font-semibold text-slate-900">{item}</p>
                            {/* institution/details may be embedded in string */}
                          </div>
                        </div>
                        {/* Details not structured in mock; show raw line */}
                      </div>
                    ))}
                    {!result?.education?.length && <p className="text-sm text-slate-500">No formal education detected.</p>}
                  </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center gap-3 mb-5">
                  <Star className="w-5 h-5 text-violet-600" />
                  <h2 className="text-lg font-semibold text-slate-900">Top Skills</h2>
                </div>
                <div className="flex flex-wrap gap-3">
                  {(result?.skills||[]).map((skill) => (
                    <span key={skill} className="rounded-2xl border border-lavender-200 bg-lavender-50 px-4 py-2 text-sm font-medium text-slate-700">
                      {skill}
                    </span>
                  ))}
                  {!(result?.skills?.length) && <p className="text-sm text-slate-500">No skills detected.</p>}
                </div>
              </Card>
            </section>

            <Card className="p-6">
              <div className="flex items-center gap-3 mb-5">
                <ClipboardCheck className="w-5 h-5 text-violet-600" />
                <h2 className="text-lg font-semibold text-slate-900">Projects</h2>
              </div>
              <div className="space-y-4">
                {(result?.projects||[]).length ? (result.projects.map((project, i) => (
                  <div key={i} className="rounded-3xl border border-lavender-100 bg-lavender-50 p-5">
                    <div className="flex items-center justify-between gap-4">
                      <p className="text-base font-semibold text-slate-900">{project.name || project}</p>
                    </div>
                    {project.summary && <p className="mt-2 text-sm text-slate-500">{project.summary}</p>}
                  </div>
                ))) : <p className="text-sm text-slate-500">No projects detected.</p>}
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3 mb-5">
                <Briefcase className="w-5 h-5 text-violet-600" />
                <h2 className="text-lg font-semibold text-slate-900">Experience</h2>
              </div>
              <div className="space-y-5">
                {(result?.experience||[]).length ? (result.experience.map((item, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div>
                        <p className="font-semibold text-slate-900">{item.title || item}</p>
                        {item.company && <p className="text-sm text-slate-500">{item.company}</p>}
                      </div>
                      {item.period && <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{item.period}</p>}
                    </div>
                    {item.description && <p className="text-sm text-slate-500">{item.description}</p>}
                    {!item.description && typeof item === 'string' && <p className="text-sm text-slate-500">{item}</p>}
                  </div>
                ))) : <p className="text-sm text-slate-500">No experience detected.</p>}
              </div>
            </Card>
          </section>

          <aside className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-5">
                <TrendingUp className="w-5 h-5 text-violet-600" />
                <h2 className="text-lg font-semibold text-slate-900">Profile Highlights</h2>
              </div>
              <div className="space-y-4">
                <div className="rounded-3xl border border-lavender-100 bg-white p-4">
                  <p className="text-sm text-slate-500">Resume strength</p>
                  <p className="mt-2 text-2xl font-bold text-slate-900">{result?.score ?? '—'}%</p>
                </div>
                <div className="rounded-3xl border border-lavender-100 bg-white p-4">
                  <p className="text-sm text-slate-500">Recommended focus</p>
                  <p className="mt-2 text-lg font-semibold text-slate-900">{(result?.interests&&result.interests[0])|| 'General opportunities'}</p>
                </div>
                {loading && <Loading />}
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3 mb-5">
                <Shield className="w-5 h-5 text-violet-600" />
                <h2 className="text-lg font-semibold text-slate-900">Detected Strengths</h2>
              </div>
              <div className="grid gap-3">
                {(result?.strengths||[]).map((item) => (
                  <div key={item} className="rounded-3xl border border-lavender-100 bg-violet-50 p-4 text-sm font-medium text-slate-700">
                    {item}
                  </div>
                ))}
                {!result?.strengths?.length && <div className="text-sm text-slate-500">No clear strengths detected.</div>}
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3 mb-5">
                <Sparkles className="w-5 h-5 text-violet-600" />
                <h2 className="text-lg font-semibold text-slate-900">Suggested Roles</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {(result?.suggestedRoles||[]).map((role) => (
                  <span key={role} className="rounded-full border border-lavender-200 bg-lavender-50 px-3 py-2 text-sm text-slate-700">
                    {role}
                  </span>
                ))}
                {!result?.suggestedRoles?.length && <p className="text-sm text-slate-500">No suggested roles available.</p>}
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3 mb-5">
                <CalendarDays className="w-5 h-5 text-violet-600" />
                <h2 className="text-lg font-semibold text-slate-900">Skill Gaps</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {(result?.skillGaps||[]).map((gap) => (
                  <span key={gap} className="rounded-full border border-lavender-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
                    {gap}
                  </span>
                ))}
                {!result?.skillGaps?.length && <p className="text-sm text-slate-500">No gaps detected. Great work!</p>}
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3 mb-5">
                <CalendarDays className="w-5 h-5 text-violet-600" />
                <h2 className="text-lg font-semibold text-slate-900">Suggested Improvements</h2>
              </div>
              <ul className="space-y-3">
                {(result?.suggestions||[]).map((item, i) => (
                  <li key={i} className="flex items-start gap-3 rounded-3xl border border-lavender-100 bg-white p-4 text-sm text-slate-600">
                    <span className="mt-1 text-violet-600"><ArrowRight className="w-3.5 h-3.5" /></span>
                    <span>{item}</span>
                  </li>
                ))}
                {!result?.suggestions?.length && <li className="text-sm text-slate-500">No suggestions available.</li>}
              </ul>
            </Card>
          </aside>
        </div>
      </div>
    </div>
  )
}
