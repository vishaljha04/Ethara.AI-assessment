import { useEffect, useState } from 'react'
import { Button } from './button'
import { Dialog } from './dialog'
import { Input } from './input'

export function PromptDialog({
  open,
  title,
  label = 'Name',
  initialValue = '',
  placeholder,
  submitText = 'Save',
  onClose,
  onSubmit,
}) {
  const [value, setValue] = useState(initialValue)
  const [error, setError] = useState('')

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (!open) return
    setValue(initialValue || '')
    setError('')
  }, [open, initialValue])
  /* eslint-enable react-hooks/set-state-in-effect */

  const submit = async () => {
    const trimmed = String(value || '').trim()
    if (!trimmed) {
      setError('Required')
      return
    }
    await onSubmit?.(trimmed)
    onClose?.()
  }

  return (
    <Dialog
      open={open}
      title={title}
      onClose={onClose}
      footer={
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={submit}>{submitText}</Button>
        </div>
      }
    >
      <Input
        label={label}
        value={value}
        placeholder={placeholder}
        error={error}
        onChange={(e) => {
          setValue(e.target.value)
          if (error) setError('')
        }}
        onKeyDown={(e) => e.key === 'Enter' && submit()}
      />
    </Dialog>
  )
}
