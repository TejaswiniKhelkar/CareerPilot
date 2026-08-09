import React from 'react'
import { Button, Card } from '../../components/ui'
import { useNavigate } from 'react-router-dom'

export default function CareerRoadmap() {
  const navigate = useNavigate()
  return (
    <div className="relative min-h-[calc(100vh-6rem)] bg-mesh py-12 px-4 sm:px-6">
      <div className="relative max-w-4xl mx-auto">
        <Card className="p-6">
          <h1 className="text-2xl font-heading font-bold text-slate-900 mb-2">Career Roadmap</h1>
          <p className="text-sm text-slate-500 mb-4">A step-by-step plan to help you progress toward your goal role.</p>
          <div className="space-y-4">
            <div className="rounded-3xl border border-lavender-100 p-4 bg-white">
              <h3 className="font-semibold">Short term (0-3 months)</h3>
              <p className="text-sm text-slate-600">Polish resume, complete one analytics case study, and apply to 5 roles.</p>
            </div>
            <div className="rounded-3xl border border-lavender-100 p-4 bg-white">
              <h3 className="font-semibold">Medium term (3-9 months)</h3>
              <p className="text-sm text-slate-600">Contribute to product analytics projects and build portfolio.</p>
            </div>
            <div className="rounded-3xl border border-lavender-100 p-4 bg-white">
              <h3 className="font-semibold">Long term (9-18 months)</h3>
              <p className="text-sm text-slate-600">Aim for product analytics roles with leadership responsibilities.</p>
            </div>
          </div>
          <div className="mt-6 flex gap-3">
            <Button onClick={() => navigate('/opportunities')}>Find opportunities</Button>
            <Button variant="ghost" onClick={() => navigate('/dashboard')}>Back to dashboard</Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
