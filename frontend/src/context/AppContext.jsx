/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react'
import API from '../lib/api'
import { useAuth } from './AuthContext'
import { useToast } from './ToastContext'

const AppContext = createContext(null)

export const AppProvider = ({ children }) => {
  const { isAuthenticated } = useAuth()
  const toast = useToast()
  const [projects, setProjects] = useState([])
  const [tasks, setTasks] = useState([])
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchActivities = useCallback(async () => {
    if (!isAuthenticated) return
    try {
      const response = await API.get('/activities', { params: { limit: 20 } })
      setActivities(response.data)
    } catch {
      // keep quiet; dashboard still works without activity feed
    }
  }, [isAuthenticated])

  const fetchData = useCallback(async () => {
    if (!isAuthenticated) return
    setLoading(true)
    try {
      const [projectRes, taskRes] = await Promise.all([API.get('/projects'), API.get('/tasks')])
      setProjects(projectRes.data)
      setTasks(taskRes.data)
      fetchActivities()
    } catch {
      toast.showToast('Unable to load dashboard data', 'error')
    } finally {
      setLoading(false)
    }
  }, [isAuthenticated, toast, fetchActivities])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchData()
  }, [fetchData])

  const createProject = async ({ name, description }) => {
    const response = await API.post('/projects', { name, description })
    setProjects((prev) => [response.data, ...prev])
    toast.showToast('Project created successfully', 'success')
  }

  const updateProject = async (projectId, patch) => {
    const response = await API.put(`/projects/${projectId}`, patch)
    setProjects((prev) => prev.map((project) => (project._id === projectId ? response.data : project)))
    toast.showToast('Project updated', 'success')
    fetchActivities()
  }

  const deleteProject = async (projectId) => {
    await API.delete(`/projects/${projectId}`)
    setProjects((prev) => prev.filter((project) => project._id !== projectId))
    setTasks((prev) => prev.filter((task) => task.projectId?._id !== projectId))
    toast.showToast('Project deleted', 'success')
    fetchActivities()
  }

  const addMember = async (projectId, email) => {
    const response = await API.post('/projects/add-member', { projectId, email })
    setProjects((prev) => prev.map((project) => (project._id === projectId ? response.data : project)))
    toast.showToast('Member added to project', 'success')
  }

  const createTask = async (taskData) => {
    const response = await API.post('/tasks', taskData)
    setTasks((prev) => [response.data, ...prev])
    fetchActivities()
    toast.showToast('Task created successfully', 'success')
  }

  const updateTask = async (taskId, patch) => {
    const response = await API.put(`/tasks/${taskId}`, patch)
    setTasks((prev) => prev.map((task) => (task._id === taskId ? response.data : task)))
    fetchActivities()
    toast.showToast('Task updated', 'success')
  }

  const updateTaskStatus = async (taskId, status) => updateTask(taskId, { status })
  const updateTaskPriority = async (taskId, priority) => updateTask(taskId, { priority })

  const addTaskComment = async (taskId, text) => {
    const response = await API.post(`/tasks/${taskId}/comments`, { text })
    setTasks((prev) => prev.map((task) => (task._id === taskId ? response.data : task)))
    fetchActivities()
    toast.showToast('Comment added', 'success')
  }

  const deleteTask = async (taskId) => {
    await API.delete(`/tasks/${taskId}`)
    setTasks((prev) => prev.filter((task) => task._id !== taskId))
    fetchActivities()
    toast.showToast('Task deleted', 'success')
  }

  const stats = useMemo(() => {
    const total = tasks.length
    const completed = tasks.filter((task) => task.status === 'done').length
    const todo = tasks.filter((task) => task.status === 'todo').length
    const inProgress = tasks.filter((task) => task.status === 'in-progress').length
    const overdue = tasks.filter((task) => task.status !== 'done' && new Date(task.dueDate) < new Date()).length
    const completionPct = total ? Math.round((completed / total) * 100) : 0
    return { total, completed, todo, inProgress, overdue, completionPct }
  }, [tasks])

  return (
    <AppContext.Provider
      value={{
        projects,
        tasks,
        activities,
        loading,
        stats,
        fetchData,
        fetchActivities,
        createProject,
        updateProject,
        deleteProject,
        addMember,
        createTask,
        updateTask,
        updateTaskStatus,
        updateTaskPriority,
        addTaskComment,
        deleteTask,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => useContext(AppContext)
