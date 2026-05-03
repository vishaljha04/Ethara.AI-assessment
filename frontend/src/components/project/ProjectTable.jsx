import { useState } from 'react'
import { Button } from '../ui/button'
import { Card } from '../ui/card'
import { AddMemberModal } from './AddMemberModal'

export function ProjectTable({ projects, onAddMember, loading, isAdmin }) {
  const [selectedProject, setSelectedProject] = useState(null)

  const handleAddMember = (projectId, email) => {
    onAddMember(projectId, email)
    setSelectedProject(null)
  }

  if (loading) {
    return <div className="rounded-3xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-900">Loading projects…</div>
  }

  if (!projects.length) {
    return <div className="rounded-3xl border border-zinc-200 bg-white p-8 text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">No projects yet. Create one to get started.</div>
  }

  return (
    <div className="space-y-6">
      {projects.map((project) => (
        <Card key={project._id} className="p-6 dark:bg-zinc-900 dark:border-zinc-800">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">{project.name}</h3>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Created by {project.createdBy?.name}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.members.map((member) => (
                <span key={member._id} className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                  {member.name}
                </span>
              ))}
            </div>
          </div>

          {isAdmin && (
            <div className="mt-4">
              <Button onClick={() => setSelectedProject(project._id)}>
                Add member
              </Button>
            </div>
          )}
        </Card>
      ))}

      <AddMemberModal
        open={Boolean(selectedProject)}
        onClose={() => setSelectedProject(null)}
        onAdd={handleAddMember}
        projectId={selectedProject}
      />
    </div>
  )
}
