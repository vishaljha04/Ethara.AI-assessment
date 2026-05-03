import { useState } from 'react'
import { Button } from '../ui/button'
import { Dialog } from '../ui/dialog'
import { Input } from '../ui/input'

export function ProjectModal({ open, onClose, onCreate }) {
  const [values, setValues] = useState({ name: '', description: '' })

  const handleSubmit = (event) => {
    event.preventDefault()
    onCreate(values)
    setValues({ name: '', description: '' })
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
        <Input 
          label="Project name" 
          value={values.name} 
          onChange={(e) => setValues({ ...values, name: e.target.value })} 
          placeholder="Enter project name"
          required 
        />
        <Input 
          label="Description" 
          value={values.description} 
          onChange={(e) => setValues({ ...values, description: e.target.value })} 
          placeholder="Describe your project"
        />
      </form>
    </Dialog>
  )
}
