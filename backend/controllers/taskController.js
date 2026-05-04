import Task from '../models/Task.js'
import Project from '../models/Project.js'
import Activity from '../models/Activity.js'

export const createTask = async (req, res, next) => {
  try {
    const { title, description, projectId, assignedTo, status = 'todo', dueDate, priority = 'medium' } = req.body
    if (!title || !projectId || !assignedTo || !dueDate) {
      return res.status(400).json({ message: 'Title, project, assignee, and due date are required' })
    }

    const project = await Project.findById(projectId)
    if (!project) {
      return res.status(404).json({ message: 'Project not found' })
    }

    if (!project.members.some((member) => member.equals(req.user.id))) {
      return res.status(403).json({ message: 'Not authorized to create tasks for this project' })
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
      priority,
    })

    const populated = await Task.findById(task._id)
      .populate('projectId', 'name')
      .populate('assignedTo', 'name email')

    await Activity.create({
      action: 'TASK_CREATED',
      userId: req.user.id,
      projectId,
      taskId: task._id,
      message: `Task “${task.title}” was created.`,
    })

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
      .populate('comments.userId', 'name email role')
      .sort({ dueDate: 1, createdAt: -1 })

    res.json(tasks)
  } catch (error) {
    next(error)
  }
}

export const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params
    const { status, priority, title, description, dueDate, assignedTo } = req.body
    const hasAnyPatch = [status, priority, title, description, dueDate, assignedTo].some((v) => v !== undefined)
    if (!hasAnyPatch) return res.status(400).json({ message: 'Nothing to update' })

    const task = await Task.findById(id)
    if (!task) {
      return res.status(404).json({ message: 'Task not found' })
    }

    const project = await Project.findById(task.projectId).select('members')
    if (!project || !project.members.some((member) => member.equals(req.user.id))) {
      return res.status(403).json({ message: 'Not authorized to access this task' })
    }

    const isAssignee = task.assignedTo.equals(req.user.id)
    if (req.user.role !== 'admin' && !isAssignee) {
      return res.status(403).json({ message: 'Not authorized to update this task' })
    }

    const prevStatus = task.status

    if (status !== undefined) task.status = status
    if (priority !== undefined) task.priority = priority

    if (req.user.role === 'admin') {
      if (title !== undefined) task.title = String(title).trim()
      if (description !== undefined) task.description = String(description).trim()
      if (dueDate !== undefined) task.dueDate = dueDate
      if (assignedTo !== undefined) {
        const assigneeIsMember = project.members.some((member) => member.equals(assignedTo))
        if (!assigneeIsMember) {
          return res.status(400).json({ message: 'Assignee must belong to the project' })
        }
        task.assignedTo = assignedTo
      }
    }

    await task.save()

    const updated = await Task.findById(id)
      .populate('projectId', 'name')
      .populate('assignedTo', 'name email')

    const becameCompleted = status === 'done' && prevStatus !== 'done'
    await Activity.create({
      action: becameCompleted ? 'TASK_COMPLETED' : 'TASK_UPDATED',
      userId: req.user.id,
      projectId: task.projectId,
      taskId: task._id,
      message: becameCompleted ? `Task “${task.title}” was completed.` : `Task “${task.title}” was updated.`,
    })

    res.json(updated)
  } catch (error) {
    next(error)
  }
}

export const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params

    const task = await Task.findById(id)
    if (!task) return res.status(404).json({ message: 'Task not found' })

    const project = await Project.findById(task.projectId).select('members')
    if (!project || !project.members.some((member) => member.equals(req.user.id))) {
      return res.status(403).json({ message: 'Not authorized to access this task' })
    }

    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to delete this task' })
    }

    await Task.deleteOne({ _id: task._id })

    await Activity.create({
      action: 'TASK_DELETED',
      userId: req.user.id,
      projectId: task.projectId,
      taskId: task._id,
      message: `Task â€œ${task.title}â€ was deleted.`,
    })

    res.status(204).send()
  } catch (error) {
    next(error)
  }
}

export const addTaskComment = async (req, res, next) => {
  try {
    const { id } = req.params
    const { text } = req.body
    if (!text || !String(text).trim()) {
      return res.status(400).json({ message: 'Comment text is required' })
    }

    const task = await Task.findById(id)
    if (!task) return res.status(404).json({ message: 'Task not found' })

    const project = await Project.findById(task.projectId).select('members')
    if (!project || !project.members.some((member) => member.equals(req.user.id))) {
      return res.status(403).json({ message: 'Not authorized to access this task' })
    }

    task.comments.push({ userId: req.user.id, text: String(text).trim() })
    await task.save()

    const updated = await Task.findById(id)
      .populate('projectId', 'name')
      .populate('assignedTo', 'name email')
      .populate('comments.userId', 'name email role')

    await Activity.create({
      action: 'TASK_UPDATED',
      userId: req.user.id,
      projectId: task.projectId,
      taskId: task._id,
      message: `Comment added to “${task.title}”.`,
    })

    res.status(201).json(updated)
  } catch (error) {
    next(error)
  }
}
