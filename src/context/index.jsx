import React, { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const raw = localStorage.getItem('cp_user')
    if (raw) setUser(JSON.parse(raw))
    setLoading(false)
  }, [])

  const signIn = (email, name) => {
    const u = { email, name }
    localStorage.setItem('cp_user', JSON.stringify(u))
    setUser(u)
  }

  const signUp = (email, name) => {
    // For now same as signIn
    signIn(email, name)
  }

  const signOut = () => {
    localStorage.removeItem('cp_user')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut, signUp }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
