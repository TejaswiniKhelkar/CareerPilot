import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Card, Input } from '../../components/ui'
import { useAuth } from '../../context'

export default function SignIn() {
  const navigate = useNavigate()
  const { signIn } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    if (!email || !password) return alert('Please enter email and password')
    signIn(email, email.split('@')[0])
    try { if (remember) localStorage.setItem('cp_remember', email) } catch (e) {}
    navigate('/onboarding')
  }

  return (
    <div className="relative min-h-[calc(100vh-6rem)] bg-mesh py-12 px-4 sm:px-6">
      <div className="relative max-w-md mx-auto">
        <Card className="p-6">
          <h1 className="text-2xl font-heading font-bold text-slate-900 mb-2">Sign In</h1>
          <p className="text-sm text-slate-500 mb-4">Sign in to continue to your CareerPilot dashboard.</p>
          <form onSubmit={submit} className="space-y-4">
            <Input label="Email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input label="Password" type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2"><input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} /> Remember me</label>
              <button type="button" className="text-violet-600" onClick={() => navigate('/forgot-password')}>Forgot password?</button>
            </div>
            <div className="flex items-center gap-3">
              <Button size="lg" className="flex-1" type="submit">Sign In</Button>
              <Button variant="ghost" size="lg" onClick={() => navigate('/signup')}>Create account</Button>
            </div>
            <div className="text-center text-sm text-slate-400">or</div>
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1" onClick={() => alert('Google sign-in (mock)')}>
                Sign in with Google
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  )
}
