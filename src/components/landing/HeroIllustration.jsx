import React from 'react'
import {
  FileText,
  BarChart3,
  Target,
  TrendingUp,
  Star,
  Briefcase,
  CheckCircle2,
} from 'lucide-react'

/**
 * A visually rich, animated illustration card that represents
 * AI-powered career analysis. Composed entirely from code —
 * no external images needed.
 */
export default function HeroIllustration() {
  return (
    <div className="relative w-full max-w-lg mx-auto">
      {/* Ambient glow behind the card */}
      <div className="absolute -inset-4 bg-gradient-to-br from-violet-400/20 via-lavender-300/15 to-lavender-400/20 rounded-[2rem] blur-2xl animate-pulse-glow" />

      {/* Main card */}
      <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl shadow-elevated border border-lavender-100/60 p-6 sm:p-8 overflow-hidden">
        {/* Decorative corner gradient */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-lavender-200/40 to-transparent rounded-bl-[4rem]" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-violet-200/30 to-transparent rounded-tr-[3rem]" />

        {/* Header */}
        <div className="relative flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-lavender-500 flex items-center justify-center shadow-soft">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-sm font-heading font-bold text-slate-800">CV Analysis Report</h3>
            <p className="text-xs text-slate-400">AI-powered insights</p>
          </div>
          <div className="ml-auto flex items-center gap-1 px-2.5 py-1 bg-emerald-50 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-semibold text-emerald-600">Live</span>
          </div>
        </div>

        {/* Skill match bars */}
        <div className="relative space-y-3 mb-6">
          <SkillBar label="Technical Skills" value={92} delay="0.2s" color="from-violet-500 to-violet-600" />
          <SkillBar label="Communication" value={87} delay="0.4s" color="from-lavender-500 to-violet-500" />
          <SkillBar label="Leadership" value={74} delay="0.6s" color="from-lavender-400 to-lavender-600" />
        </div>

        {/* Stats row */}
        <div className="relative grid grid-cols-3 gap-3 mb-6">
          <StatCard icon={Target} value="94%" label="Match" />
          <StatCard icon={TrendingUp} value="12" label="Opportunities" />
          <StatCard icon={Star} value="4.8" label="Profile Score" />
        </div>

        {/* Recommended role card */}
        <div className="relative bg-gradient-to-r from-violet-50 to-lavender-50 rounded-2xl p-4 border border-lavender-100/80">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-white shadow-soft flex items-center justify-center shrink-0 mt-0.5">
              <Briefcase className="w-4 h-4 text-violet-600" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <p className="text-sm font-semibold text-slate-800 truncate">Senior Product Designer</p>
                <span className="shrink-0 px-2 py-0.5 rounded-full bg-violet-100 text-[10px] font-bold text-violet-700">TOP MATCH</span>
              </div>
              <p className="text-xs text-slate-500 mb-2">Tech Corp • Remote • ₹18-24 LPA</p>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 text-emerald-600">
                  <CheckCircle2 className="w-3 h-3" />
                  <span className="text-[10px] font-medium">Skills aligned</span>
                </div>
                <div className="flex items-center gap-1 text-violet-600">
                  <BarChart3 className="w-3 h-3" />
                  <span className="text-[10px] font-medium">94% match</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating badge — top right */}
      <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 animate-float">
        <div className="bg-white rounded-2xl shadow-card border border-lavender-100 px-4 py-2.5 flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
            <CheckCircle2 className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-[10px] text-slate-400 leading-none">AI Match</p>
            <p className="text-sm font-bold text-slate-800 leading-tight">94%</p>
          </div>
        </div>
      </div>

      {/* Floating badge — bottom left */}
      <div className="absolute -bottom-3 -left-3 sm:-bottom-4 sm:-left-4 animate-float" style={{ animationDelay: '1.5s' }}>
        <div className="bg-white rounded-2xl shadow-card border border-lavender-100 px-4 py-2.5 flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-lavender-500 flex items-center justify-center">
            <TrendingUp className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-[10px] text-slate-400 leading-none">Growth</p>
            <p className="text-sm font-bold text-slate-800 leading-tight">+27%</p>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Sub-components ── */

function SkillBar({ label, value, delay, color }) {
  return (
    <div className="animate-fade-in-up" style={{ animationDelay: delay }}>
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs font-medium text-slate-600">{label}</span>
        <span className="text-xs font-bold text-violet-600">{value}%</span>
      </div>
      <div className="h-2 bg-lavender-100 rounded-full overflow-hidden">
        <div
          className={`h-full bg-gradient-to-r ${color} rounded-full transition-all duration-1000 ease-out`}
          style={{ width: `${value}%`, animationDelay: delay }}
        />
      </div>
    </div>
  )
}

function StatCard({ icon: Icon, value, label }) {
  return (
    <div className="bg-white rounded-xl border border-lavender-100/80 p-3 text-center shadow-soft hover:shadow-card transition-shadow duration-300">
      <Icon className="w-4 h-4 text-violet-500 mx-auto mb-1.5" />
      <p className="text-base font-bold text-slate-800 leading-none">{value}</p>
      <p className="text-[10px] text-slate-400 mt-0.5">{label}</p>
    </div>
  )
}
