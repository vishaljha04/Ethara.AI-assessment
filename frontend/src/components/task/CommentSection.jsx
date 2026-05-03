import { useMemo, useState } from 'react'
import { Button } from '../ui/button'
import { Avatar } from '../ui/avatar'

const formatDate = (dateString) => {
  const d = new Date(dateString)
  if (Number.isNaN(d.getTime())) return ''
  return d.toLocaleString()
}

export function CommentSection({ task, currentUser, onAddComment }) {
  const [text, setText] = useState('')
  const comments = useMemo(() => task?.comments || [], [task])

  const handleSend = async () => {
    const trimmed = text.trim()
    if (!trimmed) return
    await onAddComment(trimmed)
    setText('')
  }

  return (
    <div className="space-y-4">
      <div className="flex items-start gap-3">
        <Avatar name={currentUser?.name} size="sm" className="mt-1" />
        <div className="flex-1 space-y-2">
          <textarea
            className="min-h-20 w-full resize-none rounded-lg border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 dark:focus:ring-blue-900"
            placeholder="Write a comment…"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div className="flex justify-end">
            <Button onClick={handleSend} disabled={!text.trim()}>
              Send
            </Button>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {comments.length === 0 ? (
          <div className="text-sm text-zinc-500 dark:text-zinc-400">No comments yet.</div>
        ) : (
          comments
            .slice()
            .reverse()
            .map((c, idx) => (
              <div key={c._id || idx} className="flex items-start gap-3">
                <Avatar name={c.userId?.name} size="sm" className="mt-0.5" />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline gap-2">
                    <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{c.userId?.name || 'Unknown'}</div>
                    <div className="text-xs text-zinc-500 dark:text-zinc-400">{formatDate(c.createdAt)}</div>
                  </div>
                  <div className="mt-1 rounded-lg border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-800 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200">
                    {c.text}
                  </div>
                </div>
              </div>
            ))
        )}
      </div>
    </div>
  )
}

