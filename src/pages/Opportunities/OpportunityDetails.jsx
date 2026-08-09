import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Shield, Sparkles, CalendarDays, MapPin, ClipboardList, CheckCircle2, AlertTriangle } from 'lucide-react'
import { Button, Badge, Card } from '../../components/ui'
import { opportunities } from '../../data/opportunities'

export default function OpportunityDetails() {
  const navigate = useNavigate()
  const { id } = useParams()
  const opportunity = opportunities.find((item) => item.id === id)

  if (!opportunity) {
    return (
      <div className="relative min-h-[calc(100vh-6rem)] bg-mesh py-12 px-4 sm:px-6">
        <div className="relative max-w-4xl mx-auto rounded-[2rem] bg-white/95 border border-lavender-100 shadow-card p-8 text-center">
          <AlertTriangle className="mx-auto mb-6 w-12 h-12 text-amber-500" />
          <h1 className="text-2xl font-heading font-bold text-slate-900 mb-3">Opportunity not found</h1>
          <p className="text-sm text-slate-500 mb-6">
            The opportunity you are looking for does not exist or may have been removed.
          </p>
          <Button size="lg" onClick={() => navigate('/opportunities')}>
            Back to opportunities
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="relative min-h-[calc(100vh-6rem)] bg-mesh py-10 sm:py-14">
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute -top-28 left-0 w-[380px] h-[380px] bg-violet-300/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[320px] h-[320px] bg-lavender-300/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <button
              onClick={() => navigate('/opportunities')}
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-violet-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to opportunities
            </button>
            <div className="mt-5">
              <p className="text-sm uppercase tracking-[0.24em] text-violet-500 font-semibold">Opportunity details</p>
              <h1 className="mt-3 text-3xl sm:text-4xl font-heading font-extrabold text-slate-900">{opportunity.title}</h1>
              <p className="mt-2 text-sm sm:text-base text-slate-500">{opportunity.organization} · {opportunity.location}</p>
            </div>
          </div>

          <div className="flex flex-col sm:items-end gap-4">
            <div className="rounded-3xl bg-violet-50 border border-violet-100 px-5 py-4 shadow-sm text-right">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Match score</p>
              <p className="mt-2 text-3xl font-semibold text-slate-900">{opportunity.matchScore}%</p>
            </div>
            <Button size="lg" iconRight={ArrowRight} onClick={() => navigate('/career-roadmap')}>
              View Career Roadmap
            </Button>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.4fr_0.85fr]">
          <section className="space-y-6">
            <Card className="p-6">
              <div className="flex flex-wrap items-center gap-3 mb-5">
                <Badge variant="primary" className="capitalize">{opportunity.type}</Badge>
                <Badge variant="secondary">{opportunity.location}</Badge>
                <Badge variant="info">Deadline: {opportunity.deadline}</Badge>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-lavender-100 bg-lavender-50 p-5">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Eligibility requirements</p>
                  <ul className="mt-4 space-y-3 text-sm text-slate-600">
                    {opportunity.eligibility.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <Shield className="w-4 h-4 text-violet-600 mt-1" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-3xl border border-lavender-100 bg-white p-5">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Application link</p>
                  <div className="mt-4 rounded-3xl bg-lavender-50 border border-lavender-100 p-4 text-sm text-slate-700">
                    <p className="font-medium text-slate-900">Placeholder link</p>
                    <p className="mt-1 text-slate-500">www.careerpilot.ai/apply/{opportunity.id}</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3 mb-5">
                <Sparkles className="w-5 h-5 text-violet-600" />
                <h2 className="text-lg font-semibold text-slate-900">Why you are a good match</h2>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">{opportunity.matchText} This opportunity aligns with your practical product analytics experience and your ability to translate data into product decisions.</p>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3 mb-5">
                <ClipboardList className="w-5 h-5 text-violet-600" />
                <h2 className="text-lg font-semibold text-slate-900">What to do next</h2>
              </div>
              <div className="space-y-4 text-sm text-slate-600">
                <p>1. Refine your resume with impact statements for product metrics.</p>
                <p>2. Add a short achievement bullet about your dashboard or analytics project.</p>
                <p>3. Prepare a concise explanation of how you move from insight to action.</p>
              </div>
            </Card>
          </section>

          <aside className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-5">
                <CalendarDays className="w-5 h-5 text-violet-600" />
                <h2 className="text-lg font-semibold text-slate-900">Required skills</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {opportunity.skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="text-sm">{skill}</Badge>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3 mb-5">
                <CheckCircle2 className="w-5 h-5 text-violet-600" />
                <h2 className="text-lg font-semibold text-slate-900">Your matching skills</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {opportunity.userSkills.map((skill) => (
                  <Badge key={skill} variant="success" className="text-sm">{skill}</Badge>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3 mb-5">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
                <h2 className="text-lg font-semibold text-slate-900">Skill gaps</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {opportunity.missingSkills.map((skill) => (
                  <Badge key={skill} variant="warning" className="text-sm">{skill}</Badge>
                ))}
              </div>
            </Card>
          </aside>
        </div>
      </div>
    </div>
  )
}
