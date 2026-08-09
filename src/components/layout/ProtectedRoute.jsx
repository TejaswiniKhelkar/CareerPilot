import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context'
import Loading from '../ui/Loading'

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-6rem)] flex items-center justify-center bg-mesh">
        <Loading />
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/signin" state={{ from: location }} replace />
  }

  return children
}
