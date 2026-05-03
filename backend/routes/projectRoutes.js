import express from 'express'
import { authMiddleware } from '../middleware/authMiddleware.js'
import { requireRole } from '../middleware/roleMiddleware.js'
import { createProject, getProjects, addProjectMember } from '../controllers/projectController.js'

const router = express.Router()

router.use(authMiddleware)
router.post('/', requireRole('admin'), createProject)
router.get('/', getProjects)
router.post('/add-member', requireRole('admin'), addProjectMember)

export default router
