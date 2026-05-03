import { Navigate, Route, Routes, Outlet } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import { useToast } from './context/ToastContext'
import { Sidebar } from './components/layout/Sidebar'
import { Topbar } from './components/layout/Topbar'
import { ProtectedRoute } from './components/layout/ProtectedRoute'
import { AuthPage } from './pages/AuthPage'
import { DashboardPage } from './pages/DashboardPage'
import { ProjectsPage } from './pages/ProjectsPage'
import { TasksPage } from './pages/TasksPage'
import { ToastContainer } from './components/ui/toast'

function Layout() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="lg:grid lg:grid-cols-[280px_1fr]">
        <Sidebar />
        <main className="min-h-screen bg-slate-50">
          <Topbar />
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
  const { messages } = useToast()

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
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
      <ToastContainer messages={messages} />
    </div>
  )
}

export default App
