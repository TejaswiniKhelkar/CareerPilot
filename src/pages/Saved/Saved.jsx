import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Badge } from '../../components/ui'
import { opportunities } from '../../data/opportunities'

export default function Saved() {
  const navigate = useNavigate()
  let saved = []
  try { saved = JSON.parse(localStorage.getItem('cp_saved_opps') || '[]') } catch (e) {}
  const items = saved.map((id) => opportunities.find((o) => o.id === id)).filter(Boolean)

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-heading font-bold text-slate-900">Saved opportunities</h1>
      {items.length === 0 ? (
        <Card className="p-6">No saved opportunities yet.</Card>
      ) : (
        <div className="grid gap-4">
          {items.map((it) => (
            <Card key={it.id} className="p-4 flex items-center justify-between">
              <div>
                <p className="font-semibold text-slate-900">{it.title}</p>
                <p className="text-sm text-slate-500">{it.organization}</p>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="primary">{it.type}</Badge>
                <button className="text-sm text-violet-600" onClick={() => navigate(`/opportunities/${it.id}`)}>View</button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
