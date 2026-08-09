import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Sparkles, Play } from 'lucide-react'
import { Button, Badge, useToast } from '../../components/ui'
import { HeroIllustration, FeatureHighlights } from '../../components/landing'

export default function Home() {
  const navigate = useNavigate()
  const toast = useToast()
  return (
    <>
      {/* ─── Hero Section ─── */}
      <section className="relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          {/* Large radial glows */}
          <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-violet-300/15 rounded-full blur-3xl" />
          <div className="absolute -top-20 right-0 w-[400px] h-[400px] bg-lavender-300/12 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/3 w-[350px] h-[350px] bg-lavender-200/10 rounded-full blur-3xl" />

          {/* Subtle grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(139,92,246,0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(139,92,246,0.3) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px',
            }}
          />

          {/* Floating dots */}
          <div className="absolute top-32 left-[10%] w-2 h-2 rounded-full bg-violet-400/30 animate-float" />
          <div className="absolute top-48 right-[15%] w-3 h-3 rounded-full bg-lavender-400/25 animate-float" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-32 left-[20%] w-2 h-2 rounded-full bg-violet-300/35 animate-float" style={{ animationDelay: '2s' }} />
          <div className="absolute top-60 left-[45%] w-1.5 h-1.5 rounded-full bg-lavender-500/20 animate-float" style={{ animationDelay: '0.5s' }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 lg:pt-16 pb-16 sm:pb-20 lg:pb-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* ── Left: Copy ── */}
            <div className="text-center lg:text-left">
              {/* Pill badge */}
              <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                <Badge
                  variant="primary"
                  size="lg"
                  className="mb-6 inline-flex"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  AI-Powered Career Platform
                </Badge>
              </div>

              {/* Headline */}
              <h1
                className="text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-6xl font-heading font-extrabold tracking-tight leading-[1.1] mb-6 animate-fade-in-up"
                style={{ animationDelay: '0.2s' }}
              >
                Your AI-Powered{' '}
                <br className="hidden sm:block" />
                <span className="text-gradient">Career Navigator</span>
              </h1>

              {/* Description */}
              <p
                className="text-base sm:text-lg text-slate-500 leading-relaxed max-w-xl mx-auto lg:mx-0 mb-8 animate-fade-in-up"
                style={{ animationDelay: '0.3s' }}
              >
                CareerPilot analyzes your CV with advanced AI to uncover
                personalized career opportunities, identify skill gaps, and
                match you with roles where you'll truly thrive.
              </p>

              {/* CTA buttons */}
              <div
                className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 justify-center lg:justify-start mb-10 animate-fade-in-up"
                style={{ animationDelay: '0.4s' }}
              >
                <Button size="lg" iconRight={ArrowRight} className="w-full sm:w-auto" onClick={() => navigate('/upload')}>
                  Get Started
                </Button>
                <Button variant="secondary" size="lg" icon={Play} className="w-full sm:w-auto" onClick={() => toast.info('Demo video coming soon! Stay tuned.')}>
                  Watch Demo
                </Button>
              </div>

              {/* Trust indicators */}
              <div
                className="flex flex-wrap items-center gap-4 sm:gap-6 justify-center lg:justify-start animate-fade-in-up"
                style={{ animationDelay: '0.5s' }}
              >
                <TrustStat value="10K+" label="Active Users" />
                <div className="w-px h-8 bg-lavender-200 hidden sm:block" />
                <TrustStat value="95%" label="Match Accuracy" />
                <div className="w-px h-8 bg-lavender-200 hidden sm:block" />
                <TrustStat value="4.9★" label="User Rating" />
              </div>
            </div>

            {/* ── Right: Illustration ── */}
            <div
              className="animate-fade-in-up lg:pl-4"
              style={{ animationDelay: '0.35s' }}
            >
              <HeroIllustration />
            </div>
          </div>
        </div>

        {/* Curved divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full text-background" preserveAspectRatio="none">
            <path d="M0 60V30C240 5 480 0 720 10C960 20 1200 45 1440 30V60H0Z" fill="currentColor" />
          </svg>
        </div>
      </section>

      {/* ─── Feature Highlights ─── */}
      <section className="relative -mt-2 pb-20 sm:pb-28">
        {/* Section title */}
        <div className="text-center mb-10 sm:mb-14 px-4">
          <p
            className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-500 mb-3 animate-fade-in-up"
            style={{ animationDelay: '0.1s' }}
          >
            Core Features
          </p>
          <h2
            className="text-2xl sm:text-3xl font-heading font-bold text-slate-900 mb-3 animate-fade-in-up"
            style={{ animationDelay: '0.15s' }}
          >
            Everything You Need to{' '}
            <span className="text-gradient">Advance Your Career</span>
          </h2>
          <p
            className="text-sm sm:text-base text-slate-500 max-w-md mx-auto animate-fade-in-up"
            style={{ animationDelay: '0.2s' }}
          >
            Powered by cutting-edge AI to give you an unfair advantage
          </p>
        </div>

        <FeatureHighlights />
      </section>
    </>
  )
}

/* ── Sub-component ── */
function TrustStat({ value, label }) {
  return (
    <div className="text-center lg:text-left">
      <p className="text-lg sm:text-xl font-bold text-slate-800 leading-none">{value}</p>
      <p className="text-[11px] text-slate-400 mt-0.5">{label}</p>
    </div>
  )
}
