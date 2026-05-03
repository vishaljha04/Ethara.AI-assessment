import Project from '../models/Project.js'
import User from '../models/User.js'

export const createProject = async (req, res, next) => {
  try {
    const { name } = req.body
    if (!name) {
      return res.status(400).json({ message: 'Project name is required' })
    }

    const project = await Project.create({
      name,
      createdBy: req.user.id,
      members: [req.user.id],
    })

    const populated = await Project.findById(project._id).populate('members', 'name email role').populate('createdBy', 'name email')
    res.status(201).json(populated)
  } catch (error) {
    next(error)
  }
}

export const getProjects = async (req, res, next) => {
  try {
    const projects = await Project.find({
      $or: [
        { createdBy: req.user.id },
        { members: req.user.id },
      ],
    })
      .populate('members', 'name email role')
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 })

    res.json(projects)
  } catch (error) {
    next(error)
  }
}

export const addProjectMember = async (req, res, next) => {
  try {
    const { projectId, email } = req.body
    if (!projectId || !email) {
      return res.status(400).json({ message: 'Project ID and email are required' })
    }

    const project = await Project.findById(projectId)
    if (!project) {
      return res.status(404).json({ message: 'Project not found' })
    }

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(404).json({ message: 'Member not found' })
    }

    const alreadyMember = project.members.some((member) => member.equals(user._id))
    if (alreadyMember) {
      return res.status(400).json({ message: 'User is already a member of this project' })
    }

    project.members.push(user._id)
    await project.save()

    const updated = await Project.findById(projectId).populate('members', 'name email role')
    res.json(updated)
  } catch (error) {
    next(error)
  }
}
