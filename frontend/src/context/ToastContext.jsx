/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useMemo, useState } from 'react'

const ToastContext = createContext(null)

export const ToastProvider = ({ children }) => {
  const [messages, setMessages] = useState([])

  const showToast = (message, type = 'default') => {
    const id = Date.now()
    setMessages((prev) => [...prev, { id, message, type }])
    window.setTimeout(() => {
      setMessages((prev) => prev.filter((toast) => toast.id !== id))
    }, 3200)
  }

  const value = useMemo(() => ({ messages, showToast }), [messages])

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
}

export const useToast = () => useContext(ToastContext)
