import Activity from '../models/Activity.js'
import Project from '../models/Project.js'

export const getActivities = async (req, res, next) => {
  try {
    const limit = Math.min(parseInt(req.query.limit || '20', 10) || 20, 100)
    const projectId = req.query.projectId

    let query = {}

    if (projectId) {
      const project = await Project.findById(projectId).select('members')
      if (!project) return res.status(404).json({ message: 'Project not found' })
      if (!project.members.some((m) => m.equals(req.user.id))) {
        return res.status(403).json({ message: 'Not authorized to view this project activity' })
      }
      query.projectId = projectId
    } else {
      const projectIds = await Project.find({ members: req.user.id }).distinct('_id')
      query.projectId = { $in: projectIds }
    }

    const activities = await Activity.find(query)
      .populate('userId', 'name email role')
      .populate('projectId', 'name')
      .populate('taskId', 'title')
      .sort({ createdAt: -1 })
      .limit(limit)

    res.json(activities)
  } catch (error) {
    next(error)
  }
}

