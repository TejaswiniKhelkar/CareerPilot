import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Card } from '../../components/ui'
import { opportunities } from '../../data/opportunities'

export default function Dashboard() {
  const navigate = useNavigate()
  const profile = JSON.parse(localStorage.getItem('cp_profile') || '{}')
  const saved = JSON.parse(localStorage.getItem('cp_saved_opps') || '[]')
  const recently = JSON.parse(localStorage.getItem('cp_recently_viewed') || '[]')

  const recommended = opportunities.slice().sort((a,b) => b.matchScore - a.matchScore).slice(0,3)

  // compute average match among recommended
  const avgMatch = Math.round((recommended.reduce((s,i)=>s+i.matchScore,0) / (recommended.length||1)))

  const skillGaps = (() => {
    const userSkills = new Set(profile.skills || [])
    const needed = {}
    opportunities.forEach((op) => {
      (op.skills||[]).forEach((s) => { if (!userSkills.has(s)) needed[s] = (needed[s] || 0) + 1 })
    })
    return Object.entries(needed).sort((a,b)=>b[1]-a[1]).map(([skill,count])=>skill).slice(0,6)
  })()

  return (
    <div className="relative min-h-[calc(100vh-6rem)] bg-mesh py-10 sm:py-14">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">Welcome back,</p>
                  <h2 className="text-2xl font-heading font-bold text-slate-900">{profile.name || 'Ayesha'}</h2>
                  <p className="text-sm text-slate-500">{profile.role || 'Product Analyst'} · {profile.location || 'Mumbai, India'}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Button variant="ghost" onClick={() => navigate('/upload')}>Upload CV</Button>
                  <Button onClick={() => navigate('/analysis-results')}>View latest report</Button>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="rounded-3xl bg-lavender-50 p-4 border border-lavender-100">
                  <p className="text-xs text-slate-400">Profile completion</p>
                  <p className="text-xl font-semibold">{Math.round((Object.keys(profile).length)?( (Object.values(profile).filter(Boolean).length) / Object.keys(profile).length * 100):0)}%</p>
                </div>
                <div className="rounded-3xl bg-white p-4 border border-lavender-100">
                  <p className="text-xs text-slate-400">CV analysis</p>
                  <p className="text-xl font-semibold">{localStorage.getItem('cp_cv_analysis_status') || 'Not analyzed'}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-3">Recommended For You</h3>
              <div className="grid gap-3">
                {recommended.map((r) => (
                  <div key={r.id} className="rounded-2xl border border-lavender-100 p-3 bg-white flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-slate-900">{r.title}</p>
                      <p className="text-sm text-slate-500">{r.organization}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold">{r.matchScore}%</p>
                      <p className="text-xs text-slate-400">match</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-3">Next steps</h3>
              <ol className="list-decimal list-inside text-sm text-slate-600">
                <li>Upload or update your CV for tailored matches</li>
                <li>Add 2-3 project highlights to improve matches</li>
                <li>Save interesting opportunities and apply</li>
              </ol>
            </Card>
          </div>

          <aside className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-3">Your Skill Gaps</h3>
              <div className="flex flex-wrap gap-2">
                {skillGaps.length === 0 ? <div className="text-sm text-slate-500">No major gaps detected</div> : skillGaps.map((s) => <Badge key={s} variant="warning">{s}</Badge>)}
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-3">Saved</h3>
              {saved.length === 0 ? <p className="text-sm text-slate-500">No saved opportunities yet.</p> : (
                <div className="space-y-2 text-sm text-slate-700">
                  {saved.map((id) => {
                    const it = opportunities.find((o) => o.id === id)
                    return it ? <div key={id} className="flex items-center justify-between"><div>{it.title}</div><div className="text-xs text-slate-400">{it.matchScore}%</div></div> : null
                  })}
                </div>
              )}
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-3">Recently viewed</h3>
              {recently.length === 0 ? <p className="text-sm text-slate-500">No recent views yet.</p> : (
                <div className="space-y-2 text-sm text-slate-700">
                  {recently.map((id) => { const it = opportunities.find((o)=>o.id===id); return it ? <div key={id}>{it.title}</div> : null })}
                </div>
              )}
            </Card>
          </aside>
        </div>
      </div>
    </div>
  )
}
