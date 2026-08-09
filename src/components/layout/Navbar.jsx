import React, { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X, Sparkles, ChevronDown, Globe } from 'lucide-react'
import { Button, useToast } from '../ui'
import { useAuth } from '../../context'
import { useLanguage } from '../../i18n'

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const langRef = useRef(null)
  const toast = useToast()
  const { user, signOut } = useAuth()
  const { locale, setLocale, t, languages } = useLanguage()
  const selectedLang = languages.find((lang) => lang.code === locale) || languages[0]

  const navLinks = [
    { label: t('nav.home'), path: '/' },
    { label: t('nav.features'), path: '/features' },
    { label: t('nav.about'), path: '/about' },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  // Close language dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) {
        setLangOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLangSelect = (lang) => {
    setLocale(lang.code)
    setLangOpen(false)
  }

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-50
        transition-all duration-300 ease-out
        ${scrolled
          ? 'glass-strong shadow-soft py-3'
          : 'bg-transparent py-5'
        }
      `}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2.5 group"
        >
          <div className="relative">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-lavender-500 flex items-center justify-center shadow-soft group-hover:shadow-glow transition-shadow duration-300">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div className="absolute -inset-1 rounded-xl bg-gradient-to-br from-violet-600 to-lavender-500 opacity-0 group-hover:opacity-20 blur-md transition-opacity duration-300" />
          </div>
          <span className="text-xl font-heading font-bold text-gradient">
            CareerPilot
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`
                  px-4 py-2 rounded-xl text-sm font-medium
                  transition-all duration-200
                  ${isActive
                    ? 'bg-lavender-100 text-violet-700'
                    : 'text-slate-600 hover:text-violet-700 hover:bg-lavender-50'
                  }
                `}
              >
                {link.label}
              </Link>
            )
          })}
        </div>

        {/* Desktop: Language Selector + CTA */}
          <div className="hidden md:flex items-center gap-3">
          {/* Language Selector */}
          <div className="relative" ref={langRef}>
            <button
              id="language-selector"
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium text-slate-600 hover:text-violet-700 hover:bg-lavender-50 transition-all duration-200 cursor-pointer"
            >
              <Globe className="w-4 h-4" />
              <span className="hidden lg:inline">{selectedLang.label}</span>
              <span className="lg:hidden">{selectedLang.flag}</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${langOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown */}
            <div
              className={`
                absolute right-0 top-full mt-2 w-44
                bg-white rounded-xl shadow-elevated border border-lavender-100
                transition-all duration-200 origin-top-right
                ${langOpen
                  ? 'opacity-100 scale-100 pointer-events-auto'
                  : 'opacity-0 scale-95 pointer-events-none'
                }
              `}
            >
              <div className="p-1.5">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLangSelect(lang)}
                    className={`
                      w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm cursor-pointer
                      transition-all duration-150
                      ${selectedLang.code === lang.code
                        ? 'bg-lavender-100 text-violet-700 font-medium'
                        : 'text-slate-600 hover:bg-lavender-50 hover:text-violet-700'
                      }
                    `}
                  >
                    <span className="text-base">{lang.flag}</span>
                    <span>{lang.label}</span>
                    {selectedLang.code === lang.code && (
                      <span className="ml-auto w-1.5 h-1.5 rounded-full bg-violet-500" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {!user ? (
            <>
              <Button variant="ghost" size="sm" onClick={() => navigate('/signin')}>{t('buttons.signIn')}</Button>
              <Button variant="primary" size="sm" onClick={() => navigate('/signup')}>{t('buttons.getStarted')}</Button>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard')}>{t('sidebar.dashboard')}</Button>
              <button
                onClick={() => { signOut(); toast.info(t('messages.signedOut')); navigate('/') }}
                className="px-3 py-2 rounded-xl text-sm font-medium text-slate-600 hover:text-violet-700 hover:bg-lavender-50 transition-all duration-200"
              >
                {t('buttons.signOut')}
              </button>
            </div>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          id="mobile-menu-toggle"
          className="md:hidden p-2 rounded-xl text-slate-600 hover:bg-lavender-50 transition-colors cursor-pointer"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`
          md:hidden
          overflow-hidden
          transition-all duration-300 ease-out
          ${mobileOpen ? 'max-h-[28rem] opacity-100' : 'max-h-0 opacity-0'}
        `}
      >
        <div className="px-4 pt-2 pb-5 space-y-1 glass-strong mx-4 mt-2 rounded-2xl shadow-card">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`
                  block px-4 py-2.5 rounded-xl text-sm font-medium
                  transition-all duration-200
                  ${isActive
                    ? 'bg-lavender-100 text-violet-700'
                    : 'text-slate-600 hover:text-violet-700 hover:bg-lavender-50'
                  }
                `}
              >
                {link.label}
              </Link>
            )
          })}

          {/* Mobile Language Selector */}
          <div className="pt-2 border-t border-lavender-100">
            <p className="px-4 py-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">{t('settings.language')}</p>
            <div className="flex gap-1.5 px-3">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLangSelect(lang)}
                  className={`
                    flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer
                    transition-all duration-150
                    ${selectedLang.code === lang.code
                      ? 'bg-lavender-100 text-violet-700'
                      : 'text-slate-500 hover:bg-lavender-50'
                    }
                  `}
                >
                  <span>{lang.flag}</span>
                  <span>{lang.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-lavender-100 flex flex-col gap-2">
            {!user ? (
              <>
                <Button variant="ghost" size="sm" className="w-full" onClick={() => navigate('/signin')}>{t('buttons.signIn')}</Button>
                <Button variant="primary" size="sm" className="w-full" onClick={() => navigate('/signup')}>{t('buttons.getStarted')}</Button>
              </>
            ) : (
              <>
                <Button variant="ghost" size="sm" className="w-full" onClick={() => navigate('/dashboard')}>{t('sidebar.dashboard')}</Button>
                <Button variant="primary" size="sm" className="w-full" onClick={() => { signOut(); toast.info(t('messages.signedOut')); navigate('/') }}>{t('buttons.signOut')}</Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
