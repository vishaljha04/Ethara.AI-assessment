import Task from '../models/Task.js'
import Project from '../models/Project.js'

export const createTask = async (req, res, next) => {
  try {
    const { title, description, projectId, assignedTo, status = 'todo', dueDate } = req.body
    if (!title || !projectId || !assignedTo || !dueDate) {
      return res.status(400).json({ message: 'Title, project, assignee, and due date are required' })
    }

    const project = await Project.findById(projectId)
    if (!project) {
      return res.status(404).json({ message: 'Project not found' })
    }

    if (!project.members.some((member) => member.equals(assignedTo))) {
      return res.status(400).json({ message: 'Assignee must belong to the project' })
    }

    const task = await Task.create({
      title,
      description,
      projectId,
      assignedTo,
      status,
      dueDate,
    })

    const populated = await Task.findById(task._id)
      .populate('projectId', 'name')
      .populate('assignedTo', 'name email')

    res.status(201).json(populated)
  } catch (error) {
    next(error)
  }
}

export const getTasks = async (req, res, next) => {
  try {
    const projectMatches = await Project.find({ members: req.user.id }).select('_id')
    const projectIds = projectMatches.map((project) => project._id)

    const query = req.user.role === 'admin'
      ? { projectId: { $in: projectIds } }
      : { assignedTo: req.user.id }

    const tasks = await Task.find(query)
      .populate('projectId', 'name')
      .populate('assignedTo', 'name email')
      .sort({ dueDate: 1, createdAt: -1 })

    res.json(tasks)
  } catch (error) {
    next(error)
  }
}

export const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params
    const { status } = req.body
    if (!status) {
      return res.status(400).json({ message: 'Status is required' })
    }

    const task = await Task.findById(id)
    if (!task) {
      return res.status(404).json({ message: 'Task not found' })
    }

    const isAssignee = task.assignedTo.equals(req.user.id)
    if (req.user.role !== 'admin' && !isAssignee) {
      return res.status(403).json({ message: 'Not authorized to update this task' })
    }

    task.status = status
    await task.save()

    const updated = await Task.findById(id)
      .populate('projectId', 'name')
      .populate('assignedTo', 'name email')

    res.json(updated)
  } catch (error) {
    next(error)
  }
}
