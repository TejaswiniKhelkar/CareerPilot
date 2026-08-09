import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import Sidebar from './Sidebar'
import { ToastProvider } from '../ui'
import { AuthProvider, useAuth } from '../../context'

export default function AppLayout() {
  return (
    <AuthProvider>
      <ToastProvider>
        <div className="min-h-screen flex flex-col bg-mesh">
          <Navbar />

          {/* Main content area — padded below the fixed navbar */}
          <main className="flex-1 pt-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="lg:flex lg:items-start lg:gap-6">
                <Sidebar />
                <div className="flex-1">
                  <Outlet />
                </div>
              </div>
            </div>
          </main>

          <Footer />
        </div>
      </ToastProvider>
    </AuthProvider>
  )
}
