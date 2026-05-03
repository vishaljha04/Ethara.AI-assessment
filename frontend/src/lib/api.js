import axios from 'axios'

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add token from localStorage
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('tm_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

API.setAuthToken = (token) => {
  if (token) {
    localStorage.setItem('tm_token', token)
    API.defaults.headers.common.Authorization = `Bearer ${token}`
  } else {
    localStorage.removeItem('tm_token')
    delete API.defaults.headers.common.Authorization
  }
}

export default API
