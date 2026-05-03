/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useMemo } from 'react'
import { toast } from 'sonner'

const ToastContext = createContext(null)

export const ToastProvider = ({ children }) => {
  const showToast = (message, type = 'default') => {
    if (type === 'success') return toast.success(message)
    if (type === 'error') return toast.error(message)
    return toast(message)
  }

  const value = useMemo(() => ({ showToast }), [])

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
}

export const useToast = () => useContext(ToastContext)
