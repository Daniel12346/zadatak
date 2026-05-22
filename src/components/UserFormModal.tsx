import type { UserFormData } from '../types'
import styles from './UserFormModal.module.css'

interface UserFormModalProps {
  form: UserFormData
  setForm: (form: UserFormData) => void
  editingId: string | null
  saveError: string
  setSaveError: (error: string) => void
  onSave: () => void
  onClose: () => void
}

export function UserFormModal({ form, setForm, editingId, saveError, setSaveError, onSave, onClose }: UserFormModalProps) {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h3 className={styles.modalTitle}>{editingId ? 'Edit User' : 'Add User'}</h3>

        <div className={styles.field}>
          <label className={styles.label}>Name</label>
          <input className={styles.input} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Email</label>
          <input className={styles.input} type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Role</label>
          <select className={styles.select} value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
            <option>Admin</option>
            <option>Editor</option>
            <option>Viewer</option>
          </select>
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Status</label>
          <select className={styles.select} value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as 'active' | 'inactive' })}>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        {saveError && (
          <div className={styles.error}>
            <span>{saveError}</span>
            <button className={styles.errorClose} onClick={() => setSaveError('')}>×</button>
          </div>
        )}

        <div className={styles.modalActions}>
          <button className={styles.cancelBtn} onClick={onClose}>Cancel</button>
          <button className={styles.saveBtn} onClick={onSave}>
            {editingId ? 'Save' : 'Add'}
          </button>
        </div>
      </div>
    </div>
  )
}
