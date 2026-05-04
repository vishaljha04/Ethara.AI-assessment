import mongoose from 'mongoose'

const activitySchema = new mongoose.Schema(
  {
    action: {
      type: String,
      enum: ['TASK_CREATED', 'TASK_UPDATED', 'TASK_COMPLETED', 'TASK_DELETED', 'MEMBER_ADDED', 'PROJECT_UPDATED', 'PROJECT_DELETED'],
      required: true,
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
    taskId: { type: mongoose.Schema.Types.ObjectId, ref: 'Task' },
    message: { type: String, required: true, trim: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
)

activitySchema.index({ projectId: 1, createdAt: -1 })
activitySchema.index({ userId: 1, createdAt: -1 })

export default mongoose.model('Activity', activitySchema)
