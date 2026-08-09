import React, { useMemo, useState } from 'react'
import { Button, Card, Badge } from '../../components/ui'
import { useNavigate } from 'react-router-dom'
import { Clock3, CheckCircle2, Sparkles, ArrowRight, Award, BookOpen, Layers } from 'lucide-react'
import { getRoadmapContext, toggleRoadmapStep } from '../../services/roadmapService'

export default function CareerRoadmap() {
  const navigate = useNavigate()
  const [roadmap, setRoadmap] = useState(() => getRoadmapContext())

  const handleToggle = (id) => {
    const status = toggleRoadmapStep(id)
    setRoadmap(getRoadmapContext())
  }

  const progressLabel = `${roadmap.completedCount} of ${roadmap.steps.length} steps completed`

  return (
    <div className="relative min-h-[calc(100vh-6rem)] bg-mesh py-10 sm:py-14">
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute -top-32 right-0 w-[420px] h-[420px] bg-violet-300/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-4 w-[320px] h-[320px] bg-lavender-300/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
          <section className="space-y-6">
            <Card className="p-8">
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.26em] text-violet-500 font-semibold">Personalized roadmap</p>
                  <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-slate-900 mt-3">Career progression plan</h1>
                  <p className="mt-3 text-sm text-slate-500 max-w-2xl">A tailored path based on your profile, CV analysis, and opportunity matching.</p>
                </div>
                <div className="rounded-3xl bg-violet-50 border border-violet-100 p-5 shadow-sm text-right">
                  <p className="text-xs uppercase tracking-[0.26em] text-slate-400">Roadmap progress</p>
                  <p className="mt-3 text-3xl font-semibold text-slate-900">{roadmap.progress}%</p>
                  <p className="text-sm text-slate-500 mt-1">{progressLabel}</p>
                </div>
              </div>
              <div className="mt-6 bg-lavender-50 rounded-full h-3 overflow-hidden border border-lavender-100">
                <div className="h-full rounded-full bg-gradient-to-r from-violet-600 to-lavender-500 transition-all duration-500" style={{ width: `${roadmap.progress}%` }} />
              </div>
            </Card>

            <Card className="p-8 space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-lavender-100 bg-white p-5">
                  <div className="flex items-center gap-2 text-violet-600 mb-4"><Award className="w-5 h-5" /><h2 className="text-lg font-semibold text-slate-900">Current profile</h2></div>
                  <p className="text-sm text-slate-500"><strong>Education:</strong> {roadmap.context.education || 'Not defined'}</p>
                  <p className="text-sm text-slate-500 mt-2"><strong>Experience:</strong> {roadmap.context.experienceCount ? `${roadmap.context.experienceCount} entries` : 'Early career'}</p>
                  <p className="text-sm text-slate-500 mt-2"><strong>Career goal:</strong> {roadmap.context.careerGoal || 'Add a goal in your profile'}</p>
                </div>
                <div className="rounded-3xl border border-lavender-100 bg-white p-5">
                  <div className="flex items-center gap-2 text-violet-600 mb-4"><BookOpen className="w-5 h-5" /><h2 className="text-lg font-semibold text-slate-900">Skill gap</h2></div>
                  <p className="text-sm text-slate-500">Current skills:</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {roadmap.context.skills.length ? roadmap.context.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-sm">{skill}</Badge>
                    )) : <span className="text-sm text-slate-500">No skills detected yet</span>}
                  </div>
                  <p className="text-sm text-slate-500 mt-4">Priority gaps are based on matching data and your top opportunity.</p>
                </div>
              </div>
            </Card>

            <div className="space-y-5">
              {roadmap.steps.map((step, index) => (
                <Card key={step.id} className={`p-6 transition-all duration-300 ${step.completed ? 'border-violet-200 bg-violet-50/60' : 'border-lavender-100 bg-white'}`}>
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-500 text-white shadow-soft">
                      <span className="text-sm font-semibold">{index + 1}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-xl font-semibold text-slate-900">{step.title}</h3>
                        {step.completed && <Badge variant="success">Completed</Badge>}
                      </div>
                      <p className="mt-3 text-sm text-slate-600">{step.description}</p>
                      <div className="mt-4 grid gap-3 sm:grid-cols-2">
                        <div className="rounded-3xl border border-lavender-100 bg-lavender-50 p-4">
                          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Why</p>
                          <p className="mt-2 text-sm text-slate-600">{step.why}</p>
                        </div>
                        <div className="rounded-3xl border border-lavender-100 bg-lavender-50 p-4">
                          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Estimated effort</p>
                          <p className="mt-2 text-sm font-semibold text-slate-900">{step.effort}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 flex flex-wrap items-center gap-3">
                    <Button onClick={() => handleToggle(step.id)}>{step.completed ? 'Mark incomplete' : 'Mark as completed'}</Button>
                    <Button variant="ghost" onClick={() => navigate('/profile')}>Review profile</Button>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          <aside className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4 text-violet-600"><Layers className="w-5 h-5" /><h2 className="text-lg font-semibold text-slate-900">Your next best actions</h2></div>
              <div className="space-y-4">
                {roadmap.recommendations.map((item, index) => (
                  <div key={index} className="rounded-3xl border border-lavender-100 bg-white p-4 text-sm text-slate-600">
                    <p className="font-semibold text-slate-900">Action {index + 1}</p>
                    <p className="mt-2">{item}</p>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4 text-violet-600"><CheckCircle2 className="w-5 h-5" /><h2 className="text-lg font-semibold text-slate-900">Quick wins</h2></div>
              <ul className="space-y-3 text-sm text-slate-600">
                <li>Update your resume with one new project bullet.</li>
                <li>Learn or practice one missing skill from your roadmap.</li>
                <li>Apply to at least two matched opportunities this week.</li>
              </ul>
            </Card>
          </aside>
        </div>
      </div>
    </div>
  )
}
