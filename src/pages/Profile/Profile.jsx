import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context'
import { Button, Card, Input, Badge, EmptyState } from '../../components/ui'

function computeCompletion(profile) {
  const fields = ['name','email','education','skills','experience','projects','careerInterests','preferredJobType','preferredLocation','resume']
  const filled = fields.filter((f) => {
    const v = profile[f]
    if (!v) return false
    if (Array.isArray(v)) return v.length > 0
    return String(v).trim().length > 0
  }).length
  return Math.round((filled / fields.length) * 100)
}

export default function Profile() {
  const { user } = useAuth()
  const [profile, setProfile] = useState(() => {
    try { return JSON.parse(localStorage.getItem('cp_profile') || '{}') } catch (e) { return {} }
  })
  const [edit, setEdit] = useState(false)
  const [avatarPreview, setAvatarPreview] = useState(profile.avatar || '')
  const [resumeName, setResumeName] = useState(profile.resume?.name || '')

  useEffect(() => {
    if (!profile.name && user) setProfile((p) => ({ ...p, name: user.name || '', email: user.email || '' }))
  }, [user])

  const save = () => {
    localStorage.setItem('cp_profile', JSON.stringify(profile))
    setEdit(false)
  }

  const handleAvatar = (e) => {
    const f = e.target.files?.[0]
    if (!f) return
    const reader = new FileReader()
    reader.onload = () => {
      setAvatarPreview(reader.result)
      setProfile((p) => ({ ...p, avatar: reader.result }))
    }
    reader.readAsDataURL(f)
  }

  const handleResume = (e) => {
    const f = e.target.files?.[0]
    if (!f) return
    setResumeName(f.name)
    setProfile((p) => ({ ...p, resume: { name: f.name } }))
  }

  const addSkill = (skill) => {
    if (!skill) return
    setProfile((p) => ({ ...p, skills: Array.from(new Set([...(p.skills||[]), skill])) }))
  }

  const removeSkill = (skill) => setProfile((p) => ({ ...p, skills: (p.skills||[]).filter((s) => s !== skill) }))

  const completion = computeCompletion(profile)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-heading font-bold text-slate-900">My Profile</h1>
        <div className="flex items-center gap-3">
          <div className="text-sm text-slate-500">Profile completion</div>
          <div className="rounded-2xl bg-lavender-50 px-3 py-2 border border-lavender-100">
            <div className="text-sm font-semibold">{completion}%</div>
          </div>
          <Button variant="ghost" onClick={() => setEdit(!edit)}>{edit ? 'Cancel' : 'Edit Profile'}</Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <aside>
          <Card className="p-6">
            <div className="flex flex-col items-center gap-3">
              <div className="w-28 h-28 rounded-2xl overflow-hidden bg-lavender-50 flex items-center justify-center">
                {avatarPreview ? <img src={avatarPreview} alt="avatar" className="w-full h-full object-cover" /> : <div className="text-slate-400">No photo</div>}
              </div>
              {edit && (
                <>
                  <input type="file" accept="image/*" onChange={handleAvatar} />
                </>
              )}

              <div className="w-full text-sm text-slate-600">
                <p><strong>Name:</strong> {profile.name || '—'}</p>
                <p><strong>Email:</strong> {profile.email || '—'}</p>
                <p><strong>Resume:</strong> {profile.resume?.name || 'None'}</p>
                {edit && (
                  <>
                    <input type="file" accept=".pdf,.docx" onChange={handleResume} />
                    {resumeName && <div className="text-xs text-slate-500">Uploaded: {resumeName}</div>}
                  </>
                )}
              </div>
            </div>
          </Card>

          <Card className="p-6 mt-4">
            <h3 className="font-semibold text-slate-900 mb-3">Career snapshot</h3>
            <p className="text-sm text-slate-600">Skills: {(profile.skills||[]).slice(0,5).join(', ') || '—'}</p>
            <p className="text-sm text-slate-600">Experience: {profile.experience?.length ? 'Has experience' : 'Beginner'}</p>
            <p className="text-sm text-slate-600">Career goal: {profile.careerInterests?.[0] || '—'}</p>
            <p className="mt-3 text-sm font-semibold">Profile strength: {completion}%</p>
          </Card>
        </aside>

        <div className="lg:col-span-2 space-y-4">
          <Card className="p-6">
            {edit ? (
              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); save() }}>
                <Input label="Full name" value={profile.name || ''} onChange={(e) => setProfile((p) => ({ ...p, name: e.target.value }))} />
                <Input label="Email" value={profile.email || ''} onChange={(e) => setProfile((p) => ({ ...p, email: e.target.value }))} />
                <Input label="Education" value={profile.education || ''} onChange={(e) => setProfile((p) => ({ ...p, education: e.target.value }))} />
                <Input label="College / University" value={profile.college || ''} onChange={(e) => setProfile((p) => ({ ...p, college: e.target.value }))} />
                <Input label="Degree / Specialization" value={profile.degree || ''} onChange={(e) => setProfile((p) => ({ ...p, degree: e.target.value }))} />

                <div>
                  <label className="text-sm font-medium text-slate-700">Skills</label>
                  <div className="flex gap-2 mt-2">
                    <input id="new-skill" className="px-3 py-2 rounded-lg border border-lavender-200" placeholder="Add a skill and press Enter" onKeyDown={(e) => {
                      if (e.key === 'Enter') { e.preventDefault(); addSkill(e.target.value); e.target.value = '' }
                    }} />
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {(profile.skills||[]).map((s) => (
                      <Badge key={s} variant="secondary" className="flex items-center gap-2">
                        {s} <button onClick={() => removeSkill(s)} className="text-xs text-slate-400">×</button>
                      </Badge>
                    ))}
                  </div>
                </div>

                <Input label="Career interests" value={(profile.careerInterests||[]).join(', ')} onChange={(e) => setProfile((p) => ({ ...p, careerInterests: e.target.value.split(',').map(s => s.trim()).filter(Boolean) }))} />
                <Input label="Preferred job type" value={profile.preferredJobType || ''} onChange={(e) => setProfile((p) => ({ ...p, preferredJobType: e.target.value }))} />
                <Input label="Preferred location" value={profile.preferredLocation || ''} onChange={(e) => setProfile((p) => ({ ...p, preferredLocation: e.target.value }))} />

                <div className="flex items-center gap-3">
                  <Button size="lg" type="submit">Save profile</Button>
                  <Button variant="ghost" onClick={() => { setEdit(false); setProfile(JSON.parse(localStorage.getItem('cp_profile')||'{}')) }}>Cancel</Button>
                </div>
              </form>
            ) : (
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-slate-900">About</h3>
                <p className="text-sm text-slate-600">{profile.bio || 'No bio yet.'}</p>

                <h3 className="text-lg font-semibold text-slate-900">Education</h3>
                <p className="text-sm text-slate-600">{profile.education || '—'}</p>

                <h3 className="text-lg font-semibold text-slate-900">Experience</h3>
                <p className="text-sm text-slate-600">{(profile.experience||[]).length ? profile.experience.map((e) => <div key={e.title}><strong>{e.title}</strong> — {e.company}</div>) : 'No experience added.'}</p>

                <h3 className="text-lg font-semibold text-slate-900">Projects</h3>
                <p className="text-sm text-slate-600">{(profile.projects||[]).length ? profile.projects.map((p) => <div key={p.name}><strong>{p.name}</strong> — {p.summary}</div>) : 'No projects added.'}</p>
              </div>
            )}
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-3">Profile completeness</h3>
            <div className="w-full bg-lavender-50 rounded-full h-3 overflow-hidden border border-lavender-100">
              <div style={{ width: `${completion}%` }} className="h-full bg-gradient-to-r from-violet-500 to-lavender-500" />
            </div>
            <p className="text-sm text-slate-500 mt-2">Complete your profile to improve your match results.</p>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-3">Actions</h3>
            <div className="flex flex-col gap-3">
              <Button onClick={() => document.getElementById('new-skill')?.focus()}>Add a skill</Button>
              <Button variant="ghost" onClick={() => window.alert('Export profile (not implemented)')}>Export profile</Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
