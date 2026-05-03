import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { AuthForm } from '../components/auth/AuthForm'

export function AuthPage() {
  const { isAuthenticated } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const isSignup = location.pathname.includes('signup')

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true })
    }
  }, [isAuthenticated, navigate])

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:px-8 dark:bg-zinc-950">
      <div className="mx-auto max-w-2xl">
        <AuthForm initialMode={isSignup ? 'signup' : 'login'} />
      </div>
    </div>
  )
}
