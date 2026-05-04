import express from 'express'
import { authMiddleware } from '../middleware/authMiddleware.js'
import { requireRole } from '../middleware/roleMiddleware.js'
import { createProject, getProjects, addProjectMember, updateProject, deleteProject } from '../controllers/projectController.js'

const router = express.Router()

router.use(authMiddleware)
router.post('/', requireRole('admin'), createProject)
router.get('/', getProjects)
router.post('/add-member', requireRole('admin'), addProjectMember)
router.put('/:id', requireRole('admin'), updateProject)
router.delete('/:id', requireRole('admin'), deleteProject)

export default router
