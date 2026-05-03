import { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { Dialog } from '../ui/dialog'
import { Input } from '../ui/input'
import API from '../../lib/api'

export function AddMemberModal({ open, onClose, onAdd, projectId, existingMembers = [] }) {
  const [users, setUsers] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchUsers = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await API.get('/users')
      setUsers(response.data)
    } catch (err) {
      console.error('Failed to fetch users:', err)
      setError('Failed to load users. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (open) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      fetchUsers()
      setSearch('') // Reset search when modal opens
    }
  }, [open])

  // Filter out users who are already members with null checks
  const filteredUsers = users.filter(user => {
    // Ensure user has required properties
    if (!user || !user._id) return false
    
    const userName = user.name || ''
    const userEmail = user.email || ''
    const searchLower = search.toLowerCase()
    
    const matchesSearch = 
      userName.toLowerCase().includes(searchLower) ||
      userEmail.toLowerCase().includes(searchLower)
    
    const isExistingMember = existingMembers.some(
      member => member?._id === user._id || member?.email === user.email
    )
    
    return matchesSearch && !isExistingMember
  })

  const handleAdd = async (userId) => {
    const selectedUser = users.find((u) => u._id === userId)
    if (!selectedUser) return
    
    try {
      await onAdd(projectId, selectedUser.email)
      // Optionally close modal after successful add
      // onClose()
    } catch (err) {
      console.error('Failed to add member:', err)
      setError('Failed to add member. Please try again.')
    }
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

        {error && (
          <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm dark:bg-red-900/20 dark:border-red-800 dark:text-red-400">
            {error}
          </div>
        )}

        <div className="max-h-64 overflow-y-auto space-y-2">
          {loading ? (
            <div className="text-center py-8 text-zinc-500 dark:text-zinc-400">
              Loading users...
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="text-center py-8 text-zinc-500 dark:text-zinc-400">
              {search ? 'No users found matching your search.' : 'No available users to add.'}
            </div>
          ) : (
            filteredUsers.map((user) => (
              <div 
                key={user._id} 
                className="flex items-center justify-between p-3 rounded-lg border border-zinc-200 hover:bg-gray-50 dark:border-zinc-800 dark:hover:bg-zinc-900 transition"
              >
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-zinc-900 dark:text-zinc-100 truncate">
                    {user.name || 'Unknown User'}
                  </p>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 truncate">
                    {user.email || 'No email'} • <span className="capitalize">{user.role || 'member'}</span>
                  </p>
                </div>
                <Button size="sm" onClick={() => handleAdd(user._id)} className="ml-3">
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
