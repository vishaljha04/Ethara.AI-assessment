import { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { Dialog } from '../ui/dialog'
import { Input } from '../ui/input'
import API from '../../lib/api'

export function AddMemberModal({ open, onClose, onAdd, projectId }) {
  const [users, setUsers] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)

  const fetchUsers = async () => {
    setLoading(true)
    try {
      const response = await api.get('/users')
      setUsers(response.data)
    } catch (err) {
      console.error('Failed to fetch users:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (open) {
      fetchUsers()
    }
  }, [open])

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase())
  )

  const handleAdd = (userId) => {
    onAdd(projectId, users.find(u => u._id === userId).email)
  }

  return (
    <Dialog
      open={open}
      title="Add project member"
      onClose={onClose}
      footer={
        <div className="flex justify-end">
          <Button variant="secondary" onClick={onClose}>Close</Button>
        </div>
      }
    >
      <div className="space-y-4">
        <Input
          label="Search users"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or email..."
        />
        <div className="max-h-64 overflow-y-auto space-y-2">
          {loading ? (
            <div className="text-center py-4">Loading users...</div>
          ) : (
            filteredUsers.map((user) => (
              <div key={user._id} className="flex items-center justify-between p-3 rounded-lg border border-slate-200 dark:border-slate-700">
                <div>
                  <p className="font-medium text-slate-900 dark:text-slate-100">{user.name}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{user.email} • {user.role}</p>
                </div>
                <Button size="sm" onClick={() => handleAdd(user._id)}>
                  Add
                </Button>
              </div>
            ))
          )}
        </div>
      </div>
    </Dialog>
  )
}