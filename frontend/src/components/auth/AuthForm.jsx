import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../../lib/api'
import { useAuth } from '../../context/AuthContext'
import { useToast } from '../../context/ToastContext'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Select } from '../ui/select'
import { LogIn, UserPlus } from 'lucide-react'

export function AuthForm({ initialMode = 'login' }) {
  const [mode, setMode] = useState(initialMode)
  const [values, setValues] = useState({ name: '', email: '', password: '', role: 'member' })
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const toast = useToast()
  const navigate = useNavigate()

  const handleChange = (event) => {
    const { name, value } = event.target
    setValues((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    try {
      const endpoint = mode === 'login' ? '/auth/login' : '/auth/signup'
      const payload = mode === 'login'
        ? { email: values.email, password: values.password }
        : values
      const response = await API.post(endpoint, payload)
      login(response.data)
      toast.showToast(`Welcome ${response.data.user.name}`, 'success')
      navigate('/')
    } catch (error) {
      toast.showToast(error.response?.data?.message || 'Authentication failed', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto w-full max-w-md rounded-lg border border-zinc-200 bg-white p-8 shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
      <div className="mb-8 text-center">
        <div className="text-xs font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">Team Task</div>
        <h1 className="mt-2 text-3xl font-bold text-zinc-900 dark:text-zinc-100">Manager</h1>
        <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">{mode === 'login' ? 'Welcome back to your workspace' : 'Join your team workspace'}</p>
      </div>

      {/* Mode Toggle */}
      <div className="mb-6 flex gap-2 rounded-lg bg-zinc-100 p-1 dark:bg-zinc-800">
        <button
          type="button"
          onClick={() => setMode('login')}
          className={`flex-1 rounded-lg py-2 px-3 text-sm font-semibold transition ${mode === 'login' ? 'bg-white text-zinc-900 shadow-sm dark:bg-zinc-900 dark:text-zinc-100' : 'text-zinc-600 dark:text-zinc-400'}`}
        >
          <LogIn size={16} className="inline mr-2" />
          Login
        </button>
        <button
          type="button"
          onClick={() => setMode('signup')}
          className={`flex-1 rounded-lg py-2 px-3 text-sm font-semibold transition ${mode === 'signup' ? 'bg-white text-zinc-900 shadow-sm dark:bg-zinc-900 dark:text-zinc-100' : 'text-zinc-600 dark:text-zinc-400'}`}
        >
          <UserPlus size={16} className="inline mr-2" />
          Sign up
        </button>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        {mode === 'signup' && (
          <Input 
            label="Full name" 
            name="name" 
            value={values.name} 
            onChange={handleChange} 
            placeholder="John Doe"
            required 
          />
        )}
        <Input 
          label="Email address" 
          name="email" 
          type="email" 
          value={values.email} 
          onChange={handleChange} 
          placeholder="you@example.com"
          required 
        />
        <Input 
          label="Password" 
          name="password" 
          type="password" 
          value={values.password} 
          onChange={handleChange} 
          placeholder="••••••••"
          required 
        />
        {mode === 'signup' && (
          <Select
            label="Role"
            name="role"
            value={values.role}
            onChange={handleChange}
            options={[
              { value: 'member', label: 'Team Member' },
              { value: 'admin', label: 'Administrator' }
            ]}
          />
        )}

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Working…' : mode === 'login' ? 'Sign in' : 'Create account'}
        </Button>
      </form>

      <p className="mt-4 text-center text-sm text-zinc-600 dark:text-zinc-400">
        {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
        <button
          type="button"
          onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
          className="font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
        >
          {mode === 'login' ? 'Sign up' : 'Sign in'}
        </button>
      </p>
    </div>
  )
}
