import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import cron from 'node-cron'
import authRoutes from './routes/authRoutes.js'
import projectRoutes from './routes/projectRoutes.js'
import taskRoutes from './routes/taskRoutes.js'
import userRoutes from './routes/userRoutes.js'
import activityRoutes from './routes/activityRoutes.js'
import { errorHandler } from './middleware/errorHandler.js'

dotenv.config()
connectDB()

const app = express()

const defaultAllowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://task-manager-sigma-nine-18.vercel.app',
]

const allowedOrigins = (process.env.CORS_ORIGINS
  ? process.env.CORS_ORIGINS.split(',').map((o) => o.trim()).filter(Boolean)
  : defaultAllowedOrigins
).map((o) => o.replace(/\/+$/, ''))

app.use(
  cors({
    origin(origin, callback) {
      if (!origin) return callback(null, true) // allow non-browser clients
      const normalized = origin.replace(/\/+$/, '')
      if (allowedOrigins.includes(normalized)) return callback(null, true)
      return callback(new Error(`CORS blocked for origin: ${origin}`))
    },
    credentials: true,
  })
)
app.use(express.json())

app.get('/', (req, res) => {
  res.json({ message: 'Team Task Manager API is running' })
})

app.get('/health', (req, res) => {
  res.status(200).json({ ok: true })
})

app.use('/api/auth', authRoutes)
app.use('/api/projects', projectRoutes)
app.use('/api/tasks', taskRoutes)
app.use('/api/users', userRoutes)
app.use('/api/activities', activityRoutes)
app.use(errorHandler)

const PORT = process.env.PORT || 5000
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})


// ---------------- CRON SELF PING ----------------

const getBaseUrl = () => {
  const url =
    process.env.RENDER_EXTERNAL_URL ||
    process.env.RENDER_SERVICE_URL ||
    process.env.APP_URL ||
    process.env.SELF_URL

  if (!url) return `http://localhost:${PORT}`

  return url.startsWith('http') ? url.replace(/\/+$/, '') : `https://${url.replace(/\/+$/, '')}`
}

const SELF_PING_URL = `${getBaseUrl()}/health`

if ((process.env.SELF_PING_ENABLED || 'true') === 'true') {
  // runs every 14 minutes
  cron.schedule('*/14 * * * *', async () => {
    try {
      const res = await fetch(SELF_PING_URL)
      if (!res.ok) throw new Error(`Status: ${res.status}`)
      console.log('[CRON] ping success')
    } catch (err) {
      console.warn('[CRON] ping failed:', err.message)
    }
  })
}