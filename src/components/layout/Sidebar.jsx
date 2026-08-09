import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Home, User, FileText, Briefcase, Bookmark, Map, Settings, LogOut } from 'lucide-react'
import { useAuth } from '../../context'
import { useLanguage } from '../../i18n'

export default function Sidebar() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const { user, signOut } = useAuth()
  const { t } = useLanguage()

  const items = [
    { label: t('sidebar.dashboard'), path: '/dashboard', icon: Home },
    { label: t('sidebar.profile'), path: '/profile', icon: User },
    { label: t('sidebar.analysis'), path: '/analysis-results', icon: FileText },
    { label: t('sidebar.opportunities'), path: '/opportunities', icon: Briefcase },
    { label: t('sidebar.saved'), path: '/saved', icon: Bookmark },
    { label: t('sidebar.roadmap'), path: '/career-roadmap', icon: Map },
    { label: t('sidebar.settings'), path: '/settings', icon: Settings },
  ]

  return (
    <aside className="hidden lg:block w-64 pr-6">
      <div className="fixed top-20 left-0 h-[calc(100vh-5rem)] w-64 overflow-auto px-4">
        <div className="bg-white rounded-2xl border border-lavender-100 shadow-card p-4 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-600 to-lavender-500 flex items-center justify-center text-white shadow-soft">
              <User className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Signed in as</p>
              <p className="text-sm font-semibold text-slate-900">{user?.name || user?.email || 'Guest'}</p>
            </div>
          </div>

          <nav className="mt-2 flex flex-col gap-1">
            {items.map((it) => (
              <NavLink
                key={it.path}
                to={it.path}
                className={({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive ? 'bg-lavender-50 text-violet-700' : 'text-slate-600 hover:bg-lavender-50 hover:text-violet-700'}`}
              >
                <it.icon className="w-4 h-4" />
                <span>{it.label}</span>
              </NavLink>
            ))}
          </nav>

          <div className="pt-3 border-t border-lavender-100">
            <button
              onClick={() => { signOut(); navigate('/') }}
              className="w-full inline-flex items-center gap-2 justify-center px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-lavender-50"
            >
              <LogOut className="w-4 h-4" />
              {t('sidebar.logout')}
            </button>
          </div>
        </div>
      </div>
    </aside>
  )
}
