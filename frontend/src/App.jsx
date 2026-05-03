import { Navigate, Route, Routes, Outlet } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import { MobileSidebar, Sidebar } from './components/layout/Sidebar'
import { Topbar } from './components/layout/Topbar'
import { ProtectedRoute } from './components/layout/ProtectedRoute'
import { AuthPage } from './pages/AuthPage'
import { DashboardPage } from './pages/DashboardPage'
import { ProjectsPage } from './pages/ProjectsPage'
import { TasksPage } from './pages/TasksPage'
import { Toaster } from 'sonner'
import { useState } from 'react'

function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <div className="lg:grid lg:grid-cols-[280px_1fr]">
        <Sidebar />
        <MobileSidebar mobileOpen={sidebarOpen} onMobileClose={() => setSidebarOpen(false)} />
        <main className="min-h-screen bg-gray-50 dark:bg-zinc-950">
          <Topbar onMenuClick={() => setSidebarOpen(true)} />
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

function App() {
  const { isAuthenticated } = useAuth()

  return (
    <div className="min-h-screen bg-gray-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <Routes>
        <Route path="/login" element={<AuthPage />} />
        <Route path="/signup" element={<AuthPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardPage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="tasks" element={<TasksPage />} />
        </Route>
        <Route path="*" element={<Navigate to={isAuthenticated ? '/' : '/login'} replace />} />
      </Routes>
      <Toaster
        position="bottom-right"
        richColors
        closeButton
        theme="system"
        toastOptions={{
          className:
            'border border-zinc-200 bg-white text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100',
        }}
      />
    </div>
  )
}

export default App
