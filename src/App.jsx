import React from 'react'
import { RouterProvider } from 'react-router-dom'
import router from './router'
import { LanguageProvider } from './i18n'
import { AuthProvider } from './context'

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </LanguageProvider>
  )
}
