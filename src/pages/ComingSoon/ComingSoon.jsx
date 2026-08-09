import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Construction, ArrowLeft, Sparkles } from 'lucide-react'
import { Button } from '../../components/ui'

/**
 * Generic "Coming Soon" placeholder for unbuilt routes.
 * Displays a clean message with the current route name and a back button.
 */
export default function ComingSoon() {
  const navigate = useNavigate()
  const location = useLocation()

  // Extract a human-readable page name from the path
  const pageName = location.pathname
    .replace(/^\//, '')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase()) || 'This Page'

  return (
    <div className="relative min-h-[calc(100vh-6rem)] flex items-center justify-center">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/4 -left-20 w-[350px] h-[350px] bg-violet-300/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 w-[300px] h-[300px] bg-lavender-300/10 rounded-full blur-3xl" />
      </div>

      <div className="relative text-center px-4 py-16 max-w-md mx-auto animate-fade-in-up">
        {/* Icon */}
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-violet-100 to-lavender-100 flex items-center justify-center mx-auto mb-6">
          <Construction className="w-10 h-10 text-violet-500" />
        </div>

        {/* Text */}
        <h1 className="text-3xl sm:text-4xl font-heading font-extrabold tracking-tight text-slate-900 mb-3">
          Coming Soon
        </h1>
        <p className="text-base text-slate-500 mb-2 leading-relaxed">
          <span className="font-semibold text-violet-600">{pageName}</span> is under construction.
        </p>
        <p className="text-sm text-slate-400 mb-8 leading-relaxed">
          We're building something amazing. Check back soon!
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button
            size="lg"
            icon={ArrowLeft}
            onClick={() => navigate('/')}
            className="w-full sm:w-auto"
          >
            Back to Home
          </Button>
          <Button
            variant="secondary"
            size="lg"
            icon={Sparkles}
            onClick={() => navigate('/upload')}
            className="w-full sm:w-auto"
          >
            Try CV Upload
          </Button>
        </div>
      </div>
    </div>
  )
}
