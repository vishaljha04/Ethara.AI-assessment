import express from 'express'
import { authMiddleware } from '../middleware/authMiddleware.js'
import { requireRole } from '../middleware/roleMiddleware.js'
import { getUsers } from '../controllers/userController.js'

const router = express.Router()

router.use(authMiddleware)
router.get('/', requireRole('admin'), getUsers)

export default router