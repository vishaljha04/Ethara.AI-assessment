import { useState } from 'react'
import { Button } from '../ui/button'
import { Dialog } from '../ui/dialog'
import { Input } from '../ui/input'

export function ProjectModal({ open, onClose, onCreate }) {
  const [name, setName] = useState('')
  const handleSubmit = (event) => {
    event.preventDefault()
    onCreate(name)
    setName('')
    onClose()
  }

  return (
    <Dialog
      open={open}
      title="Create new project"
      onClose={onClose}
      footer={
        <div className="flex justify-end gap-3">
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Create project</Button>
        </div>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input label="Project name" value={name} onChange={(event) => setName(event.target.value)} required />
      </form>
    </Dialog>
  )
}
