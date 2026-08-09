import React, { useState } from 'react'
import { Card, Button, Input } from '../../components/ui'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const submit = (e) => { e.preventDefault(); alert('If this were real, we would send a reset email to ' + email) }
  return (
    <div className="relative min-h-[calc(100vh-6rem)] bg-mesh py-12 px-4 sm:px-6">
      <div className="relative max-w-md mx-auto">
        <Card className="p-6">
          <h1 className="text-2xl font-heading font-bold text-slate-900 mb-2">Reset password</h1>
          <p className="text-sm text-slate-500 mb-4">Enter your email and we'll send instructions to reset your password.</p>
          <form onSubmit={submit} className="space-y-4">
            <Input label="Email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            <div className="flex items-center gap-3">
              <Button size="lg" className="flex-1" type="submit">Send reset link</Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  )
}
