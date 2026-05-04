import { Button } from './button'
import { Dialog } from './dialog'

export function ConfirmDialog({ open, title, description, confirmText = 'Confirm', confirmVariant = 'destructive', onClose, onConfirm }) {
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
          <Button
            variant={confirmVariant}
            onClick={async () => {
              await onConfirm?.()
              onClose?.()
            }}
          >
            {confirmText}
          </Button>
        </div>
      }
    >
      {description && <p className="text-sm text-zinc-600 dark:text-zinc-400">{description}</p>}
    </Dialog>
  )
}
