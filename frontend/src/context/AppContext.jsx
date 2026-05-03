import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import API from '../lib/api'
import { useAuth } from './AuthContext'
import { useToast } from './ToastContext'

const AppContext = createContext(null)

export const AppProvider = ({ children }) => {
  const { isAuthenticated } = useAuth()
  const toast = useToast()
  const [projects, setProjects] = useState([])
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchData = async () => {
    if (!isAuthenticated) return
    setLoading(true)
    try {
      const [projectRes, taskRes] = await Promise.all([API.get('/projects'), API.get('/tasks')])
      setProjects(projectRes.data)
      setTasks(taskRes.data)
    } catch (error) {
      toast.showToast('Unable to load dashboard data', 'error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [isAuthenticated])

  const createProject = async (projectName) => {
    const response = await API.post('/projects', { name: projectName })
    setProjects((prev) => [response.data, ...prev])
    toast.showToast('Project created successfully', 'success')
  }

  const addMember = async (projectId, email) => {
    const response = await API.post('/projects/add-member', { projectId, email })
    setProjects((prev) => prev.map((project) => (project._id === projectId ? response.data : project)))
    toast.showToast('Member added to project', 'success')
  }

  const createTask = async (taskData) => {
    const response = await API.post('/tasks', taskData)
    setTasks((prev) => [response.data, ...prev])
    toast.showToast('Task created successfully', 'success')
  }

  const updateTaskStatus = async (taskId, status) => {
    const response = await API.put(`/tasks/${taskId}`, { status })
    setTasks((prev) => prev.map((task) => (task._id === taskId ? response.data : task)))
    toast.showToast('Task status updated', 'success')
  }

  const stats = useMemo(() => {
    const total = tasks.length
    const completed = tasks.filter((task) => task.status === 'done').length
    const pending = tasks.filter((task) => task.status === 'todo').length
    const overdue = tasks.filter((task) => task.status !== 'done' && new Date(task.dueDate) < new Date()).length
    return { total, completed, pending, overdue }
  }, [tasks])

  return (
    <AppContext.Provider value={{ projects, tasks, loading, stats, fetchData, createProject, addMember, createTask, updateTaskStatus }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => useContext(AppContext)
