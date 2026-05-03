import express from 'express'
import { authMiddleware } from '../middleware/authMiddleware.js'
import { getActivities } from '../controllers/activityController.js'

const router = express.Router()

router.use(authMiddleware)
router.get('/', getActivities)

export default router

