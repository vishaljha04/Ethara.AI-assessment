import { MoreVertical, Users, CheckCircle2, Pencil, Trash2 } from 'lucide-react'
import { Button } from '../ui/button'
import { Avatar } from '../ui/avatar'
import { ActionMenu } from '../ui/action-menu'

export function ProjectCard({ project, taskCount = 0, onAddMember, onRename, onDelete, isAdmin }) {
  return (
    <div className="group rounded-lg border border-zinc-200 bg-white p-6 transition hover:border-zinc-300 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">{project.name}</h3>
          {project.description && <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2">{project.description}</p>}
        </div>
        {isAdmin && (
          <div className="opacity-0 transition group-hover:opacity-100">
            <ActionMenu
              trigger={({ setOpen, open, menuId }) => (
                <Button
                  variant="ghost"
                  size="sm"
                  aria-haspopup="menu"
                  aria-expanded={open}
                  aria-controls={menuId}
                  onClick={() => setOpen(!open)}
                >
                  <MoreVertical size={16} />
                </Button>
              )}
              items={[
                { label: 'Rename', icon: <Pencil size={16} />, onSelect: () => onRename?.(project) },
                { label: 'Delete', icon: <Trash2 size={16} />, destructive: true, onSelect: () => onDelete?.(project) },
              ]}
            />
          </div>
        )}
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
          <Users size={16} />
          <span>{project.members?.length || 0} members</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
          <CheckCircle2 size={16} />
          <span>{taskCount} tasks</span>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {project.members?.slice(0, 3).map((member) => (
          <div key={member._id} className="flex items-center gap-2 rounded-full bg-zinc-100 px-3 py-1 text-xs dark:bg-zinc-800">
            <Avatar name={member.name} size="sm" className="h-6 w-6 text-[10px]" />
            {member.name}
          </div>
        ))}
        {project.members?.length > 3 && <div className="flex items-center rounded-full bg-zinc-100 px-3 py-1 text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">+{project.members.length - 3}</div>}
      </div>

      {isAdmin && (
        <Button onClick={() => onAddMember(project._id)} className="mt-6 w-full" variant="outline">
          Add member
        </Button>
      )}
    </div>
  )
}
