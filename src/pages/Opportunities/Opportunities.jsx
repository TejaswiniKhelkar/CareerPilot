import React, { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, MapPin, Sparkles, Bookmark, CalendarDays, Briefcase, ArrowRight } from 'lucide-react'
import { Button, Badge, Card, Input } from '../../components/ui'

const opportunities = [
  {
    id: 'opp-001',
    title: 'Product Analyst Intern',
    organization: 'InsightEdge Labs',
    type: 'Internship',
    location: 'Remote',
    deadline: '2026-09-30',
    matchScore: 92,
    skills: ['SQL', 'Tableau', 'A/B Testing', 'Analytics'],
    matchText: 'Your background in product analytics and dashboard design closely matches this internship’s focus on conversion optimization.',
  },
  {
    id: 'opp-002',
    title: 'Business Intelligence Associate',
    organization: 'Nexa Solutions',
    type: 'Job',
    location: 'Bengaluru, India',
    deadline: '2026-10-12',
    matchScore: 88,
    skills: ['Python', 'Data Visualization', 'SQL', 'Stakeholder Communication'],
    matchText: 'Strong reporting experience and stakeholder collaboration make you a solid fit for this BI role.',
  },
  {
    id: 'opp-003',
    title: 'Data Product Scholarship',
    organization: 'FutureMetrics Academy',
    type: 'Scholarship',
    location: 'Online',
    deadline: '2026-10-05',
    matchScore: 85,
    skills: ['Product Strategy', 'Data Storytelling', 'Resume Building'],
    matchText: 'Your product analytics focus and leadership potential align with this advanced scholarship cohort.',
  },
  {
    id: 'opp-004',
    title: 'AI Hackathon Participant',
    organization: 'BuildAI Collective',
    type: 'Hackathon',
    location: 'Mumbai, India',
    deadline: '2026-09-22',
    matchScore: 79,
    skills: ['Python', 'Presentation', 'Design Thinking'],
    matchText: 'Your project-driven profile is ideal for a fast-paced AI innovation challenge.',
  },
  {
    id: 'opp-005',
    title: 'Junior Data Strategist',
    organization: 'ScaleBridge Ventures',
    type: 'Job',
    location: 'Remote',
    deadline: '2026-10-20',
    matchScore: 90,
    skills: ['Market Research', 'SQL', 'Cross-functional Planning'],
    matchText: 'Your combination of analytics and product insight matches this strategic remote role.',
  },
]

const typeOptions = ['All', 'Job', 'Internship', 'Scholarship', 'Hackathon']
const locationOptions = ['All', 'Remote', 'Mumbai, India', 'Bengaluru, India', 'Online']
const sortOptions = [
  { value: 'score', label: 'Match Score' },
  { value: 'deadline', label: 'Deadline' },
]

export default function Opportunities() {
  const [query, setQuery] = useState('')
  const [selectedType, setSelectedType] = useState('All')
  const [selectedLocation, setSelectedLocation] = useState('All')
  const [sortBy, setSortBy] = useState('score')
  const [savedItems, setSavedItems] = useState([])
  const [selectedDetailId, setSelectedDetailId] = useState(null)

  const filteredList = useMemo(() => {
    return opportunities
      .filter((item) => {
        const matchesQuery = [item.title, item.organization, item.type, item.location, item.matchText]
          .join(' ')
          .toLowerCase()
          .includes(query.toLowerCase())
        const matchesType = selectedType === 'All' || item.type === selectedType
        const matchesLocation = selectedLocation === 'All' || item.location === selectedLocation
        return matchesQuery && matchesType && matchesLocation
      })
      .sort((a, b) => {
        if (sortBy === 'deadline') {
          return new Date(a.deadline) - new Date(b.deadline)
        }
        return b.matchScore - a.matchScore
      })
  }, [query, selectedType, selectedLocation, sortBy])

  const navigate = useNavigate()

  const toggleSave = (id) => {
    setSavedItems((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    )
  }

  return (
    <div className="relative min-h-[calc(100vh-6rem)] bg-mesh py-10 sm:py-14">
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute -top-28 left-0 w-[380px] h-[380px] bg-violet-300/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[320px] h-[320px] bg-lavender-300/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="rounded-[2rem] bg-white/95 border border-lavender-100 shadow-card p-7 sm:p-8 mb-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm uppercase tracking-[0.24em] text-violet-500 font-semibold mb-3">Personalized Opportunities</p>
              <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-slate-900">Career opportunities tailored for you</h1>
              <p className="mt-3 text-sm sm:text-base text-slate-500 max-w-2xl">
                Browse roles, internships, scholarships, and events that align with your strengths and profile score.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 items-center">
              <div className="rounded-3xl bg-violet-50 px-4 py-3 border border-violet-100 shadow-sm flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-violet-600" />
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Saved opportunities</p>
                  <p className="text-lg font-semibold text-slate-900">{savedItems.length}</p>
                </div>
              </div>
              <div className="rounded-3xl bg-lavender-50 px-4 py-3 border border-lavender-100 shadow-sm flex items-center gap-3">
                <MapPin className="w-5 h-5 text-violet-600" />
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Filtered results</p>
                  <p className="text-lg font-semibold text-slate-900">{filteredList.length}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1fr_0.85fr]">
          <section className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-[1.6fr_1fr]">
              <Input
                label="Search opportunities"
                placeholder="Search by title, organization, skill or keyword"
                icon={Search}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-slate-700">Opportunity type</label>
                  <select
                    value={selectedType}
                    onChange={(event) => setSelectedType(event.target.value)}
                    className="w-full rounded-xl border border-lavender-200 bg-white px-4 py-2.5 text-sm text-slate-800 outline-none transition-all duration-200 focus:border-violet-400 focus:ring-2 focus:ring-violet-100 shadow-soft"
                  >
                    {typeOptions.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-slate-700">Location</label>
                  <select
                    value={selectedLocation}
                    onChange={(event) => setSelectedLocation(event.target.value)}
                    className="w-full rounded-xl border border-lavender-200 bg-white px-4 py-2.5 text-sm text-slate-800 outline-none transition-all duration-200 focus:border-violet-400 focus:ring-2 focus:ring-violet-100 shadow-soft"
                  >
                    {locationOptions.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-slate-500">
                  Showing <span className="font-semibold text-slate-900">{filteredList.length}</span> opportunities
                </p>
              </div>
              <div className="flex items-center gap-3">
                <label className="text-sm font-medium text-slate-700">Sort by</label>
                <select
                  value={sortBy}
                  onChange={(event) => setSortBy(event.target.value)}
                  className="rounded-xl border border-lavender-200 bg-white px-4 py-2.5 text-sm text-slate-800 outline-none transition-all duration-200 focus:border-violet-400 focus:ring-2 focus:ring-violet-100 shadow-soft"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid gap-5">
              {filteredList.map((item) => {
                const saved = savedItems.includes(item.id)
                return (
                  <Card key={item.id} className="p-6">
                    <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                      <div className="space-y-4">
                        <div className="flex flex-wrap items-center gap-3">
                          <Badge variant="primary" className="capitalize">{item.type}</Badge>
                          <Badge variant="secondary">{item.location}</Badge>
                          <Badge variant="info">Deadline: {item.deadline}</Badge>
                        </div>
                        <div className="space-y-2">
                          <h2 className="text-xl font-semibold text-slate-900">{item.title}</h2>
                          <p className="text-sm text-slate-500">{item.organization}</p>
                        </div>
                        <p className="text-sm text-slate-500 max-w-2xl">{item.matchText}</p>
                        <div className="flex flex-wrap gap-2">
                          {item.skills.map((skill) => (
                            <Badge key={skill} variant="secondary" className="text-sm">{skill}</Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-col gap-4 min-w-[220px]">
                        <div className="rounded-3xl bg-violet-50 p-4 border border-violet-100 shadow-sm">
                          <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Match score</p>
                          <p className="mt-2 text-3xl font-semibold text-slate-900">{item.matchScore}%</p>
                        </div>
                        <div className="grid gap-3">
                          <Button
                            size="md"
                            className="w-full"
                            onClick={() => navigate(`/opportunities/${item.id}`)}
                          >
                            View Details
                          </Button>
                          <Button
                            variant={saved ? 'secondary' : 'soft'}
                            size="md"
                            className="w-full"
                            onClick={() => toggleSave(item.id)}
                          >
                            <Bookmark className="w-4 h-4" />
                            {saved ? 'Saved' : 'Save'}
                          </Button>
                        </div>
                      </div>
                    </div>

                    {selectedDetailId === item.id && (
                      <div className="mt-6 rounded-3xl border border-lavender-200 bg-lavender-50 p-5">
                        <div className="flex items-center gap-3 text-slate-700">
                          <CalendarDays className="w-4 h-4" />
                          <p className="text-sm font-semibold">Opportunity summary</p>
                        </div>
                        <p className="mt-3 text-sm text-slate-600">
                          This opportunity is a great match because it emphasizes your analytics strengths, collaborative experience, and ability to translate data into actionable product decisions.
                        </p>
                      </div>
                    )}
                  </Card>
                )
              })}
            </div>
          </section>

          <aside className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Briefcase className="w-5 h-5 text-violet-600" />
                <h2 className="text-lg font-semibold text-slate-900">Opportunity snapshot</h2>
              </div>
              <div className="space-y-4 text-sm text-slate-600">
                <p><span className="font-semibold text-slate-900">Best match:</span> Product Analyst Intern at InsightEdge Labs</p>
                <p><span className="font-semibold text-slate-900">Fastest deadline:</span> AI Hackathon Participant</p>
                <p><span className="font-semibold text-slate-900">Most common skill:</span> SQL</p>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Sparkles className="w-5 h-5 text-violet-600" />
                <h2 className="text-lg font-semibold text-slate-900">Saved opportunities</h2>
              </div>
              <div className="grid gap-3">
                {savedItems.length === 0 ? (
                  <p className="text-sm text-slate-500">No saved items yet. Save opportunities to keep them handy.</p>
                ) : (
                  savedItems.map((id) => {
                    const item = opportunities.find((op) => op.id === id)
                    return (
                      <div key={id} className="rounded-3xl border border-lavender-100 bg-lavender-50 p-4">
                        <p className="font-medium text-slate-900">{item?.title}</p>
                        <p className="text-sm text-slate-500">{item?.organization}</p>
                      </div>
                    )
                  })
                )}
              </div>
            </Card>
          </aside>
        </div>
      </div>
    </div>
  )
}
