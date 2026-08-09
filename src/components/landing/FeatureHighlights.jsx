import React from 'react'
import { ScanSearch, Cpu, BarChart3 } from 'lucide-react'

const features = [
  {
    icon: ScanSearch,
    label: 'AI CV Analysis',
    description: 'Deep-learning powered resume parsing',
  },
  {
    icon: Cpu,
    label: 'Smart Matching',
    description: 'Intelligent career opportunity matching',
  },
  {
    icon: BarChart3,
    label: 'Skill Gap Detection',
    description: 'Pinpoint exactly where to upskill',
  },
]

export default function FeatureHighlights() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        {features.map((feature, i) => (
          <div
            key={feature.label}
            className="
              group relative
              bg-white/80 backdrop-blur-sm
              rounded-2xl
              border border-lavender-100/60
              shadow-soft
              p-6
              transition-all duration-300 ease-out
              hover:-translate-y-1 hover:shadow-card
              animate-fade-in-up
            "
            style={{ animationDelay: `${0.15 + i * 0.1}s` }}
          >
            {/* Icon */}
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-violet-100 to-lavender-100 flex items-center justify-center mb-4 group-hover:from-violet-200 group-hover:to-lavender-200 transition-all duration-300">
              <feature.icon className="w-5 h-5 text-violet-600" />
            </div>

            {/* Text */}
            <h3 className="text-sm font-heading font-bold text-slate-800 mb-1">
              {feature.label}
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              {feature.description}
            </p>

            {/* Hover accent line */}
            <div className="absolute bottom-0 left-6 right-6 h-0.5 rounded-full bg-gradient-to-r from-violet-500 to-lavender-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        ))}
      </div>
    </section>
  )
}
