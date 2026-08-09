import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { AppLayout } from '../components/layout'
import Home from '../pages/Home'
import UploadCV from '../pages/UploadCV'
import AnalysisResults from '../pages/AnalysisResults'
import Opportunities from '../pages/Opportunities'
import OpportunityDetails from '../pages/Opportunities/OpportunityDetails'
import ComingSoon from '../pages/ComingSoon'

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
        element: <UploadCV />,
      },
      {
        path: '/analysis-results',
        element: <AnalysisResults />,
      },
      {
        path: '/opportunities',
        element: <Opportunities />,
      },
      {
        path: '/opportunities/:id',
        element: <OpportunityDetails />,
      },
      {
        path: '/career-roadmap',
        element: <ComingSoon />,
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
      { path: '/signin', element: <ComingSoon /> },
      // Catch-all for any unknown route
      { path: '*', element: <ComingSoon /> },
    ],
  },
])

export default router
