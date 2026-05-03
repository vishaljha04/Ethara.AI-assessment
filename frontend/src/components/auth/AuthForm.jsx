import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../../lib/api'
import { useAuth } from '../../context/AuthContext'
import { useToast } from '../../context/ToastContext'
import { Button } from '../ui/button'
import { Input } from '../ui/input'

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
    <div className="mx-auto w-full max-w-md rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200">
      <div className="mb-8 text-center">
        <div className="text-xs uppercase tracking-[0.4em] text-slate-500">Team Task Manager</div>
        <h2 className="mt-4 text-3xl font-semibold text-slate-900">{mode === 'login' ? 'Sign in' : 'Create account'}</h2>
        <p className="mt-2 text-sm text-slate-600">Secure access for your team dashboard.</p>
      </div>

      <div className="mb-6 flex items-center justify-center gap-2">
        <button
          type="button"
          className={`rounded-full px-4 py-2 text-sm font-semibold transition ${mode === 'login' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'}`}
          onClick={() => setMode('login')}
        >
          Login
        </button>
        <button
          type="button"
          className={`rounded-full px-4 py-2 text-sm font-semibold transition ${mode === 'signup' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'}`}
          onClick={() => setMode('signup')}
        >
          Sign up
        </button>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        {mode === 'signup' && (
          <Input label="Full name" name="name" value={values.name} onChange={handleChange} required />
        )}
        <Input label="Email address" name="email" type="email" value={values.email} onChange={handleChange} required />
        <Input label="Password" name="password" type="password" value={values.password} onChange={handleChange} required />
        {mode === 'signup' && (
          <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
            Role
            <select
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
              name="role"
              value={values.role}
              onChange={handleChange}
            >
              <option value="member">Member</option>
              <option value="admin">Admin</option>
            </select>
          </label>
        )}

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Working…' : mode === 'login' ? 'Login' : 'Create account'}
        </Button>
      </form>
    </div>
  )
}
