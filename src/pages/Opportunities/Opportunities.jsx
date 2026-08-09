import React, { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, MapPin, Sparkles, Bookmark, CalendarDays, Briefcase, ArrowRight } from 'lucide-react'
import { Button, Badge, Card, Input } from '../../components/ui'
import { opportunities, typeOptions, locationOptions, sortOptions } from '../../data/opportunities'
import { getUserOpportunityContext, matchOpportunity } from '../../services/opportunityMatcher'

const matchFilterOptions = ['Any', '75+%', '85+%', '90+%']
const deadlineFilterOptions = ['All', 'Next 7 days', 'Next 14 days', 'Next 30 days', 'Later']

export default function Opportunities() {
  const [query, setQuery] = useState('')
  const [selectedType, setSelectedType] = useState('All')
  const [selectedLocation, setSelectedLocation] = useState('All')
  const [sortBy, setSortBy] = useState('score')
  const [filterMatch, setFilterMatch] = useState('Any')
  const [filterDeadline, setFilterDeadline] = useState('All')
  const [savedItems, setSavedItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('cp_saved_opps') || '[]')
    } catch (e) {
      return []
    }
  })
  const [selectedDetailId, setSelectedDetailId] = useState(null)

  const userContext = useMemo(() => getUserOpportunityContext(), [])
  const matchedOpportunities = useMemo(() => opportunities.map((item) => matchOpportunity(item, userContext)), [userContext])

  const filteredList = useMemo(() => {
    const now = new Date()

    return matchedOpportunities
      .filter((item) => {
        const matchesQuery = [item.title, item.organization, item.type, item.location, item.matchText, item.computedMatch.why]
          .join(' ')
          .toLowerCase()
          .includes(query.toLowerCase())
        const matchesType = selectedType === 'All' || item.type === selectedType
        const matchesLocation = selectedLocation === 'All' || item.location === selectedLocation
        if (!matchesQuery || !matchesType || !matchesLocation) return false

        if (filterMatch !== 'Any') {
          const threshold = Number(filterMatch.replace(/[^0-9]/g, ''))
          if (item.computedMatch.overall < threshold) return false
        }

        if (filterDeadline !== 'All') {
          const deadlineDate = new Date(item.deadline)
          const daysUntil = (deadlineDate - now) / (1000 * 60 * 60 * 24)
          if (filterDeadline === 'Next 7 days' && daysUntil > 7) return false
          if (filterDeadline === 'Next 14 days' && (daysUntil < 0 || daysUntil > 14)) return false
          if (filterDeadline === 'Next 30 days' && (daysUntil < 0 || daysUntil > 30)) return false
          if (filterDeadline === 'Later' && daysUntil <= 30) return false
        }

        return true
      })
      .sort((a, b) => {
        if (sortBy === 'deadline') {
          return new Date(a.deadline) - new Date(b.deadline)
        }
        return b.computedMatch.overall - a.computedMatch.overall
      })
  }, [matchedOpportunities, query, selectedType, selectedLocation, sortBy, filterMatch, filterDeadline])

  const navigate = useNavigate()

  const toggleSave = (id) => {
    setSavedItems((current) => {
      const next = current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
      try { localStorage.setItem('cp_saved_opps', JSON.stringify(next)) } catch (e) {}
      return next
    })
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
              <div className="flex flex-wrap items-center gap-3">
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
                <div className="flex items-center gap-3">
                  <label className="text-sm font-medium text-slate-700">Match</label>
                  <select
                    value={filterMatch}
                    onChange={(event) => setFilterMatch(event.target.value)}
                    className="rounded-xl border border-lavender-200 bg-white px-4 py-2.5 text-sm text-slate-800 outline-none transition-all duration-200 focus:border-violet-400 focus:ring-2 focus:ring-violet-100 shadow-soft"
                  >
                    {matchFilterOptions.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center gap-3">
                  <label className="text-sm font-medium text-slate-700">Deadline</label>
                  <select
                    value={filterDeadline}
                    onChange={(event) => setFilterDeadline(event.target.value)}
                    className="rounded-xl border border-lavender-200 bg-white px-4 py-2.5 text-sm text-slate-800 outline-none transition-all duration-200 focus:border-violet-400 focus:ring-2 focus:ring-violet-100 shadow-soft"
                  >
                    {deadlineFilterOptions.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
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
                        <div className="grid gap-2 sm:grid-cols-2">
                          <div className="rounded-3xl bg-white border border-lavender-100 p-3">
                            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Matching skills</p>
                            <div className="mt-3 flex flex-wrap gap-2">
                              {item.computedMatch.matchingSkills.length ? item.computedMatch.matchingSkills.map((skill) => (
                                <Badge key={`match-${skill}`} variant="success" className="text-sm">{skill}</Badge>
                              )) : <span className="text-sm text-slate-500">None yet</span>}
                            </div>
                          </div>
                          <div className="rounded-3xl bg-white border border-lavender-100 p-3">
                            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Missing skills</p>
                            <div className="mt-3 flex flex-wrap gap-2">
                              {item.computedMatch.missingSkills.length ? item.computedMatch.missingSkills.map((skill) => (
                                <Badge key={`miss-${skill}`} variant="warning" className="text-sm">{skill}</Badge>
                              )) : <span className="text-sm text-slate-500">Good fit</span>}
                            </div>
                          </div>
                        </div>
                        <div className="rounded-3xl bg-lavender-50 border border-lavender-100 p-4">
                          <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Why this matches you</p>
                          <p className="mt-2 text-sm text-slate-600">{item.computedMatch.why}</p>
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
