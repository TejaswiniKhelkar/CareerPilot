import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context'
import { useLanguage } from '../../i18n'
import { Button, Card, Input, useToast } from '../../components/ui'

const STORAGE_KEY = 'cp_settings'
const PROFILE_KEY = 'cp_profile'
const DATA_CLEAR_KEYS = [
  'cp_user',
  'cp_profile',
  'cp_cv_analysis_result',
  'cp_cv_analysis_status',
  'cp_saved_opps',
  'cp_recently_viewed',
  'cp_roadmap',
  'cp_settings',
]

function loadSettings() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
  } catch (e) {
    return {}
  }
}

export default function Settings() {
  const navigate = useNavigate()
  const toast = useToast()
  const auth = useAuth()
  const { locale, setLocale, t, languages } = useLanguage()

  const [settings, setSettings] = useState(() => ({
    preferredJobType: '',
    preferredLocation: '',
    careerInterests: [],
    emailUpdates: true,
    opportunityAlerts: true,
    roadmapReminders: true,
    ...loadSettings(),
  }))
  const [passwords, setPasswords] = useState({ current: '', next: '', confirm: '' })

  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem(PROFILE_KEY) || '{}')
    if (profile.preferredJobType) setSettings((prev) => ({ ...prev, preferredJobType: profile.preferredJobType }))
    if (profile.preferredLocation) setSettings((prev) => ({ ...prev, preferredLocation: profile.preferredLocation }))
    if (profile.careerInterests) setSettings((prev) => ({ ...prev, careerInterests: profile.careerInterests }))
  }, [])

  const saveSettings = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
      toast.success(t('messages.settingsSaved'))
    } catch (e) {
      toast.error('Unable to save settings.')
    }
  }

  const handleDeleteAccount = () => {
    if (!window.confirm(t('messages.deleteConfirm'))) return
    DATA_CLEAR_KEYS.forEach((key) => localStorage.removeItem(key))
    auth.signOut()
    toast.info(t('messages.accountDeleted'))
    navigate('/')
  }

  const handlePasswordSubmit = (event) => {
    event.preventDefault()
    if (!passwords.current || !passwords.next || !passwords.confirm) {
      toast.error('Please complete the password fields.')
      return
    }
    if (passwords.next !== passwords.confirm) {
      toast.error('New passwords do not match.')
      return
    }
    setPasswords({ current: '', next: '', confirm: '' })
    toast.success(t('messages.passwordChanged'))
  }

  const selectedLanguage = languages.find((lang) => lang.code === locale) || languages[0]

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-heading font-bold text-slate-900">{t('settings.title')}</h1>
          <p className="text-sm text-slate-500 mt-2">{t('settings.profileSettings')}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          {languages.map((lang) => (
            <button
              key={lang.code}
              type="button"
              onClick={() => setLocale(lang.code)}
              className={
                `inline-flex items-center gap-2 rounded-2xl border px-4 py-2 text-sm transition ${selectedLanguage.code === lang.code ? 'border-violet-500 bg-violet-50 text-violet-700' : 'border-lavender-200 bg-white text-slate-600 hover:bg-lavender-50'}`
              }
            >
              <span>{lang.flag}</span>
              <span>{lang.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">{t('settings.profileSettings')}</h2>
                <p className="text-sm text-slate-500">{t('settings.language')} · {selectedLanguage.label}</p>
              </div>
              <Button onClick={saveSettings}>{t('buttons.updateSettings')}</Button>
            </div>

            <div className="grid gap-4">
              <Input
                label={t('settings.preferredJobType')}
                value={settings.preferredJobType}
                onChange={(event) => setSettings((prev) => ({ ...prev, preferredJobType: event.target.value }))}
              />
              <Input
                label={t('settings.preferredLocation')}
                value={settings.preferredLocation}
                onChange={(event) => setSettings((prev) => ({ ...prev, preferredLocation: event.target.value }))}
              />
              <Input
                label={t('settings.careerInterests')}
                value={(settings.careerInterests || []).join(', ')}
                onChange={(event) => setSettings((prev) => ({
                  ...prev,
                  careerInterests: event.target.value
                    .split(',')
                    .map((value) => value.trim())
                    .filter(Boolean),
                }))}
              />
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">{t('settings.notifications')}</h2>
            <div className="grid gap-4">
              {['emailUpdates', 'opportunityAlerts', 'roadmapReminders'].map((field) => (
                <label key={field} className="flex items-center gap-3 rounded-2xl border border-lavender-200 bg-white px-4 py-4 cursor-pointer transition hover:border-violet-300">
                  <input
                    type="checkbox"
                    checked={Boolean(settings[field])}
                    onChange={(event) => setSettings((prev) => ({ ...prev, [field]: event.target.checked }))}
                    className="h-4 w-4 rounded border-slate-300 text-violet-600 focus:ring-violet-500"
                  />
                  <span className="text-sm text-slate-700">
                    {t(`settings.${field}`) || field}
                  </span>
                </label>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">{t('buttons.changePassword')}</h2>
            <form className="space-y-4" onSubmit={handlePasswordSubmit}>
              <Input
                label={t('settings.password')}
                type="password"
                value={passwords.current}
                onChange={(event) => setPasswords((prev) => ({ ...prev, current: event.target.value }))}
              />
              <Input
                label={t('settings.newPassword')}
                type="password"
                value={passwords.next}
                onChange={(event) => setPasswords((prev) => ({ ...prev, next: event.target.value }))}
              />
              <Input
                label={t('settings.confirmPassword')}
                type="password"
                value={passwords.confirm}
                onChange={(event) => setPasswords((prev) => ({ ...prev, confirm: event.target.value }))}
              />
              <div className="flex gap-3 flex-wrap">
                <Button type="submit">{t('buttons.changePassword')}</Button>
                <Button variant="secondary" onClick={() => setPasswords({ current: '', next: '', confirm: '' })}>{t('buttons.cancel')}</Button>
              </div>
            </form>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">{t('settings.opportunityPreferences')}</h2>
            <p className="text-sm text-slate-500">{t('settings.opportunityPreferences')}</p>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">{t('settings.deleteAccount')}</h2>
            <p className="text-sm text-slate-500 mb-6">{t('settings.deleteAccountMessage')}</p>
            <div className="flex flex-col gap-3">
              <Button variant="secondary" onClick={handleDeleteAccount}>{t('buttons.deleteAccount')}</Button>
              <Button variant="ghost" onClick={() => { auth.signOut(); navigate('/') }}>{t('settings.logout')}</Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
