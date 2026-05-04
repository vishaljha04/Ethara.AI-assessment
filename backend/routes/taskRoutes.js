import express from 'express'
import { authMiddleware } from '../middleware/authMiddleware.js'
import { requireRole } from '../middleware/roleMiddleware.js'
import { createTask, getTasks, updateTask, addTaskComment, deleteTask } from '../controllers/taskController.js'

const router = express.Router()

router.use(authMiddleware)
router.post('/', requireRole('admin'), createTask)
router.get('/', getTasks)
router.put('/:id', updateTask)
router.delete('/:id', requireRole('admin'), deleteTask)
router.post('/:id/comments', addTaskComment)

export default router
