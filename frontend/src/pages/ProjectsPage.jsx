import { useState } from 'react'
import { Button } from '../components/ui/button'
import { Card } from '../components/ui/card'
import { ProjectModal } from '../components/project/ProjectModal'
import { ProjectTable } from '../components/project/ProjectTable'
import { useApp } from '../context/AppContext'
import { useAuth } from '../context/AuthContext'

export function ProjectsPage() {
  const { projects, loading, createProject, addMember } = useApp()
  const { user } = useAuth()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Projects</p>
          <h1 className="text-3xl font-semibold text-slate-900">Your project portfolio</h1>
          <p className="mt-2 text-sm text-slate-600">Manage team workspaces and member access from one place.</p>
        </div>
        {user?.role === 'admin' && (
          <Button onClick={() => setIsOpen(true)}>New project</Button>
        )}
      </div>

      <Card>
        <ProjectTable projects={projects} onAddMember={addMember} loading={loading} isAdmin={user?.role === 'admin'} />
      </Card>

      <ProjectModal open={isOpen} onClose={() => setIsOpen(false)} onCreate={createProject} />
    </div>
  )
}
