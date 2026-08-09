import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Card, Input, useToast } from '../../components/ui'
import { useAuth } from '../../context'

export default function SignUp() {
  const navigate = useNavigate()
  const toast = useToast()
  const { signUp } = useAuth()
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  const submit = (e) => {
    e.preventDefault()
    if (!email || !password) {
      toast.error('Please enter email and password.')
      return
    }
    signUp(email, name || email.split('@')[0])
    navigate('/onboarding')
  }

  return (
    <div className="relative min-h-[calc(100vh-6rem)] bg-mesh py-12 px-4 sm:px-6">
      <div className="relative max-w-md mx-auto">
        <Card className="p-6">
          <h1 className="text-2xl font-heading font-bold text-slate-900 mb-2">Create an account</h1>
          <p className="text-sm text-slate-500 mb-4">Join CareerPilot to save opportunities and access your dashboard.</p>
          <form onSubmit={submit} className="space-y-4">
            <Input label="Email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input label="Full name" placeholder="Ayesha Sharma" value={name} onChange={(e) => setName(e.target.value)} />
            <Input label="Password" type="password" placeholder="Choose a password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <div className="flex items-center gap-3">
              <Button size="lg" className="flex-1" type="submit">Create account</Button>
              <Button variant="ghost" size="lg" onClick={() => navigate('/signin')}>Sign In</Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  )
}
