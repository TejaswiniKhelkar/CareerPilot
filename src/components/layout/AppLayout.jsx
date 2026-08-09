import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import { ToastProvider } from '../ui'

export default function AppLayout() {
  return (
    <ToastProvider>
      <div className="min-h-screen flex flex-col bg-mesh">
        <Navbar />

        {/* Main content area — padded below the fixed navbar */}
        <main className="flex-1 pt-24">
          <Outlet />
        </main>

        <Footer />
      </div>
    </ToastProvider>
  )
}
