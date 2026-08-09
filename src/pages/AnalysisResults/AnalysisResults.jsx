import React from 'react'
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
import { Button, Card } from '../../components/ui'

const profile = {
  name: 'Ayesha Sharma',
  title: 'Product Analyst',
  location: 'Mumbai, India',
  completion: 92,
  education: [
    {
      title: 'MBA in Business Analytics',
      institution: 'IIM Bangalore',
      date: '2024',
      details: 'Graduated with honors. Capstone focused on market segmentation and AI-driven hiring models.',
    },
    {
      title: 'B.Tech in Computer Science',
      institution: 'IIT Bombay',
      date: '2021',
      details: 'Specialized in data systems and human-centered design.',
    },
  ],
  skills: [
    'SQL',
    'Python',
    'Tableau',
    'Data Visualization',
    'Product Strategy',
    'Stakeholder Communication',
    'A/B Testing',
  ],
  projects: [
    {
      name: 'Campus Placement Optimizer',
      summary: 'Built a dashboard to prioritize candidate outreach and improve placement conversion by 18%.',
    },
    {
      name: 'SkillScope Dashboard',
      summary: 'Designed an internal tool for skill gap analysis across student cohorts.',
    },
    {
      name: 'Resume Rewrite Engine',
      summary: 'Led an automation prototype to standardize resume highlights for product roles.',
    },
  ],
  experience: [
    {
      title: 'Product Analyst Intern',
      company: 'VentureLeap Labs',
      period: 'Jan 2024 - Jun 2024',
      description: 'Analyzed user adoption metrics, created weekly dashboards, and supported GTM readiness for two product pilots.',
    },
    {
      title: 'Business Analyst',
      company: 'FutureWave Consulting',
      period: 'Jul 2021 - Dec 2023',
      description: 'Delivered market research insights and helped launch three B2B analytics products.',
    },
  ],
  strengths: [
    'Data-driven decision making',
    'Clear cross-team communication',
    'Product storytelling',
    'Strong stakeholder influence',
  ],
  improvements: [
    'Add measurable outcomes for key achievements',
    'Highlight leadership in cross-functional projects',
    'Streamline technical skills into focused categories',
    'Tailor the resume summary for product analytics roles',
  ],
}

export default function AnalysisResults() {
  const navigate = useNavigate()

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
                    {profile.name}
                  </h1>
                  <p className="text-sm sm:text-base text-slate-500 max-w-2xl">
                    {profile.title} · {profile.location}
                  </p>
                </div>

                <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                  <div className="flex items-center gap-3 rounded-3xl bg-violet-50 px-4 py-3 border border-violet-100">
                    <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-violet-600 to-lavender-500 flex items-center justify-center text-white shadow-soft">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Profile Score</p>
                      <p className="text-xl font-semibold text-slate-900">{profile.completion}%</p>
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
                  {profile.education.map((item) => (
                    <div key={item.title} className="space-y-2">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="font-semibold text-slate-900">{item.title}</p>
                          <p className="text-sm text-slate-500">{item.institution}</p>
                        </div>
                        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-500">{item.date}</span>
                      </div>
                      <p className="text-sm text-slate-500">{item.details}</p>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center gap-3 mb-5">
                  <Star className="w-5 h-5 text-violet-600" />
                  <h2 className="text-lg font-semibold text-slate-900">Top Skills</h2>
                </div>
                <div className="flex flex-wrap gap-3">
                  {profile.skills.map((skill) => (
                    <span key={skill} className="rounded-2xl border border-lavender-200 bg-lavender-50 px-4 py-2 text-sm font-medium text-slate-700">
                      {skill}
                    </span>
                  ))}
                </div>
              </Card>
            </section>

            <Card className="p-6">
              <div className="flex items-center gap-3 mb-5">
                <ClipboardCheck className="w-5 h-5 text-violet-600" />
                <h2 className="text-lg font-semibold text-slate-900">Projects</h2>
              </div>
              <div className="space-y-4">
                {profile.projects.map((project) => (
                  <div key={project.name} className="rounded-3xl border border-lavender-100 bg-lavender-50 p-5">
                    <div className="flex items-center justify-between gap-4">
                      <p className="text-base font-semibold text-slate-900">{project.name}</p>
                      <span className="text-xs uppercase tracking-[0.2em] text-violet-500">Featured</span>
                    </div>
                    <p className="mt-2 text-sm text-slate-500">{project.summary}</p>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3 mb-5">
                <Briefcase className="w-5 h-5 text-violet-600" />
                <h2 className="text-lg font-semibold text-slate-900">Experience</h2>
              </div>
              <div className="space-y-5">
                {profile.experience.map((item) => (
                  <div key={item.title} className="space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div>
                        <p className="font-semibold text-slate-900">{item.title}</p>
                        <p className="text-sm text-slate-500">{item.company}</p>
                      </div>
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{item.period}</p>
                    </div>
                    <p className="text-sm text-slate-500">{item.description}</p>
                  </div>
                ))}
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
                  <p className="mt-2 text-2xl font-bold text-slate-900">92%</p>
                </div>
                <div className="rounded-3xl border border-lavender-100 bg-white p-4">
                  <p className="text-sm text-slate-500">Recommended focus</p>
                  <p className="mt-2 text-lg font-semibold text-slate-900">Product analytics roles</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3 mb-5">
                <Shield className="w-5 h-5 text-violet-600" />
                <h2 className="text-lg font-semibold text-slate-900">Detected Strengths</h2>
              </div>
              <div className="grid gap-3">
                {profile.strengths.map((item) => (
                  <div key={item} className="rounded-3xl border border-lavender-100 bg-violet-50 p-4 text-sm font-medium text-slate-700">
                    {item}
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3 mb-5">
                <CalendarDays className="w-5 h-5 text-violet-600" />
                <h2 className="text-lg font-semibold text-slate-900">Suggested Improvements</h2>
              </div>
              <ul className="space-y-3">
                {profile.improvements.map((item) => (
                  <li key={item} className="flex items-start gap-3 rounded-3xl border border-lavender-100 bg-white p-4 text-sm text-slate-600">
                    <span className="mt-1 text-violet-600"><ArrowRight className="w-3.5 h-3.5" /></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </aside>
        </div>
      </div>
    </div>
  )
}
