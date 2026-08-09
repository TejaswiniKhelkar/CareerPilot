import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Card, Input } from '../../components/ui'
import { useAuth } from '../../context'

export default function Onboarding() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [role, setRole] = useState('Product Analyst')
  const [location, setLocation] = useState('Mumbai, India')

  const submit = (e) => {
    e.preventDefault()
    // Save minimal profile to localStorage
    const profile = { name: user?.name || '', role, location }
    localStorage.setItem('cp_profile', JSON.stringify(profile))
    navigate('/dashboard')
  }

  return (
    <div className="relative min-h-[calc(100vh-6rem)] bg-mesh py-12 px-4 sm:px-6">
      <div className="relative max-w-2xl mx-auto">
        <Card className="p-6">
          <h1 className="text-2xl font-heading font-bold text-slate-900 mb-2">Tell us about yourself</h1>
          <p className="text-sm text-slate-500 mb-4">This helps CareerPilot personalize opportunities and your roadmap.</p>
          <form onSubmit={submit} className="space-y-4">
            <Input label="Preferred role" value={role} onChange={(e) => setRole(e.target.value)} />
            <Input label="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
            <div className="flex items-center gap-3">
              <Button size="lg" className="flex-1" type="submit">Continue to Dashboard</Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  )
}
