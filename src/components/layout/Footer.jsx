import React from 'react'
import { Link } from 'react-router-dom'
import { Sparkles, Heart, ExternalLink } from 'lucide-react'

/* lucide-react icon components for social links */
const GithubIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
)

const TwitterIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
)

const LinkedinIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
)

const footerLinks = {
  Product: [
    { label: 'Features', path: '/features' },
    { label: 'Pricing', path: '/pricing' },
    { label: 'Changelog', path: '/changelog' },
  ],
  Company: [
    { label: 'About', path: '/about' },
    { label: 'Blog', path: '/blog' },
    { label: 'Careers', path: '/careers' },
  ],
  Support: [
    { label: 'Help Center', path: '/help' },
    { label: 'Contact', path: '/contact' },
    { label: 'Privacy', path: '/privacy' },
  ],
}

const socialLinks = [
  { icon: GithubIcon, href: 'https://github.com/', label: 'GitHub' },
  { icon: TwitterIcon, href: 'https://twitter.com/', label: 'Twitter' },
  { icon: LinkedinIcon, href: 'https://www.linkedin.com/', label: 'LinkedIn' },
]

export default function Footer() {
  return (
    <footer className="relative mt-auto">
      {/* Decorative top border */}
      <div className="h-px bg-gradient-to-r from-transparent via-lavender-300 to-transparent" />

      <div className="bg-gradient-to-b from-lavender-50/80 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12">
            {/* Brand Column */}
            <div className="col-span-2">
              <Link to="/" className="inline-flex items-center gap-2.5 group mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-lavender-500 flex items-center justify-center shadow-soft">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <span className="text-lg font-heading font-bold text-gradient">
                  CareerPilot
                </span>
              </Link>
              <p className="text-sm text-slate-500 max-w-xs leading-relaxed mt-3">
                Your AI-powered career companion. Navigate your professional
                journey with confidence and clarity.
              </p>
              {/* Social Icons */}
              <div className="flex items-center gap-3 mt-5">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-9 h-9 rounded-xl bg-white border border-lavender-100 flex items-center justify-center text-slate-400 hover:text-violet-600 hover:border-violet-300 hover:shadow-soft transition-all duration-200"
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Link Columns */}
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h4 className="text-sm font-semibold text-slate-800 mb-4">{title}</h4>
                <ul className="space-y-2.5">
                  {links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.path}
                        className="text-sm text-slate-500 hover:text-violet-600 transition-colors duration-200"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-6 border-t border-lavender-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-400">
              © {new Date().getFullYear()} CareerPilot. All rights reserved.
            </p>
            <p className="text-xs text-slate-400 flex items-center gap-1">
              Built with <Heart className="w-3 h-3 text-rose-400 fill-rose-400" /> and AI
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
