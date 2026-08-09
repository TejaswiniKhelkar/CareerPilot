import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { AppLayout } from '../components/layout'
import Home from '../pages/Home'
import UploadCV from '../pages/UploadCV'
import AnalysisResults from '../pages/AnalysisResults'
import Opportunities from '../pages/Opportunities'
import OpportunityDetails from '../pages/Opportunities/OpportunityDetails'
import SignIn from '../pages/Auth/SignIn'
import SignUp from '../pages/Auth/SignUp'
import Onboarding from '../pages/Onboarding/Onboarding'
import Dashboard from '../pages/Dashboard/Dashboard'
import CareerRoadmap from '../pages/CareerRoadmap/CareerRoadmap'
import ForgotPassword from '../pages/Auth/ForgotPassword'
import Profile from '../pages/Profile/Profile'
import Saved from '../pages/Saved/Saved'
import Settings from '../pages/Settings'
import ComingSoon from '../pages/ComingSoon'
import ProtectedRoute from '../components/layout/ProtectedRoute'

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/upload',
        element: (
          <ProtectedRoute>
            <UploadCV />
          </ProtectedRoute>
        ),
      },
      {
        path: '/signin',
        element: <SignIn />,
      },
      {
        path: '/forgot-password',
        element: <ForgotPassword />,
      },
      {
        path: '/signup',
        element: <SignUp />,
      },
      {
        path: '/onboarding',
        element: (
          <ProtectedRoute>
            <Onboarding />
          </ProtectedRoute>
        ),
      },
      {
        path: '/dashboard',
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: '/analysis-results',
        element: (
          <ProtectedRoute>
            <AnalysisResults />
          </ProtectedRoute>
        ),
      },
      {
        path: '/opportunities',
        element: (
          <ProtectedRoute>
            <Opportunities />
          </ProtectedRoute>
        ),
      },
      {
        path: '/opportunities/:id',
        element: (
          <ProtectedRoute>
            <OpportunityDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: '/profile',
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: '/saved',
        element: (
          <ProtectedRoute>
            <Saved />
          </ProtectedRoute>
        ),
      },
      {
        path: '/career-roadmap',
        element: (
          <ProtectedRoute>
            <CareerRoadmap />
          </ProtectedRoute>
        ),
      },
      {
        path: '/settings',
        element: (
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        ),
      },
      // Placeholder routes for nav/footer links
      { path: '/features', element: <ComingSoon /> },
      { path: '/about', element: <ComingSoon /> },
      { path: '/pricing', element: <ComingSoon /> },
      { path: '/changelog', element: <ComingSoon /> },
      { path: '/blog', element: <ComingSoon /> },
      { path: '/careers', element: <ComingSoon /> },
      { path: '/help', element: <ComingSoon /> },
      { path: '/contact', element: <ComingSoon /> },
      { path: '/privacy', element: <ComingSoon /> },
      // Catch-all for any unknown route
      { path: '*', element: <ComingSoon /> },
    ],
  },
])

export default router
