/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from 'react'
import API from '../lib/api'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const storedToken = localStorage.getItem('tm_token')
  const storedUser = JSON.parse(localStorage.getItem('tm_user') || 'null')
  const [token, setToken] = useState(storedToken)
  const [user, setUser] = useState(storedUser)

  useEffect(() => {
    API.setAuthToken(token)
    if (token) {
      localStorage.setItem('tm_token', token)
    } else {
      localStorage.removeItem('tm_token')
    }
  }, [token])

  useEffect(() => {
    if (user) {
      localStorage.setItem('tm_user', JSON.stringify(user))
    } else {
      localStorage.removeItem('tm_user')
    }
  }, [user])

  const login = ({ token: accessToken, user: userData }) => {
    setToken(accessToken)
    setUser(userData)
  }

  const logout = () => {
    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ token, user, login, logout, isAuthenticated: Boolean(token) }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
