import { useState } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'

export function ProjectTable({ projects, onAddMember, loading, isAdmin }) {
  const [memberEmail, setMemberEmail] = useState('')
  const [projectId, setProjectId] = useState('')

  const handleAdd = (projectIdToSend) => {
    if (!memberEmail.trim()) return
    onAddMember(projectIdToSend, memberEmail)
    setMemberEmail('')
  }

  if (loading) {
    return <div className="rounded-3xl border border-slate-200 bg-white p-8">Loading projects…</div>
  }

  if (!projects.length) {
    return <div className="rounded-3xl border border-slate-200 bg-white p-8 text-slate-600">No projects yet. Create one to get started.</div>
  }

  return (
    <div className="space-y-6">
      {projects.map((project) => (
        <div key={project._id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">{project.name}</h3>
              <p className="mt-1 text-sm text-slate-600">Created by {project.createdBy?.name}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.members.map((member) => (
                <span key={member._id} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                  {member.name}
                </span>
              ))}
            </div>
          </div>

          {isAdmin ? (
            <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto]">
              <Input
                label="Add member by email"
                name="email"
                type="email"
                value={projectId === project._id ? memberEmail : ''}
                onChange={(event) => {
                  setProjectId(project._id)
                  setMemberEmail(event.target.value)
                }}
              />
              <Button type="button" onClick={() => handleAdd(project._id)} className="self-end">
                Add member
              </Button>
            </div>
          ) : (
            <div className="mt-4 rounded-3xl bg-slate-50 p-4 text-sm text-slate-600">Project members only view</div>
          )}
        </div>
      ))}
    </div>
  )
}
