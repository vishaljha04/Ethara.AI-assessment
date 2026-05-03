import { useState } from 'react'
import { Button } from '../components/ui/button'
import { ProjectCard } from '../components/project/ProjectCard'
import { ProjectModal } from '../components/project/ProjectModal'
import { AddMemberModal } from '../components/project/AddMemberModal'
import { EmptyState } from '../components/ui/empty-state'
import { SkeletonCard } from '../components/ui/skeleton'
import { useApp } from '../context/AppContext'
import { useAuth } from '../context/AuthContext'
import { FolderPlus } from 'lucide-react'

export function ProjectsPage() {
  const { projects, tasks, loading, createProject, addMember } = useApp()
  const { user } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const [memberProjectId, setMemberProjectId] = useState(null)

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">Projects</h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">Manage your team workspaces and collaboration areas</p>
        </div>
        {user?.role === 'admin' && (
          <Button onClick={() => setIsOpen(true)}>
            <FolderPlus size={16} className="mr-2" />
            New project
          </Button>
        )}
      </div>

      {/* Projects Grid */}
      {loading ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : projects.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard
              key={project._id}
              project={project}
              taskCount={tasks.filter((t) => t.projectId?._id === project._id).length}
              onAddMember={(projectId) => setMemberProjectId(projectId)}
              isAdmin={user?.role === 'admin'}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={FolderPlus}
          title="No projects yet"
          description="Create your first project to start collaborating with your team"
          action={user?.role === 'admin' && <Button onClick={() => setIsOpen(true)}>Create project</Button>}
        />
      )}

      <ProjectModal open={isOpen} onClose={() => setIsOpen(false)} onCreate={createProject} />
      <AddMemberModal
        open={Boolean(memberProjectId)}
        onClose={() => setMemberProjectId(null)}
        onAdd={addMember}
        projectId={memberProjectId}
      />
    </div>
  )
}
