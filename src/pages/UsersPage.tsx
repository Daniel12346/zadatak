import { useState, useRef, useEffect } from 'react'
import { useUsersStore } from '../stores/usersStore'
import type { User } from '../types'
import styles from './UsersPage.module.css'

interface FormData {
  name: string
  email: string
  role: string
  status: 'active' | 'inactive'
}

const emptyForm: FormData = { name: '', email: '', role: 'Viewer', status: 'active' }

function getInitials(name: string): string {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

function getAvatarColor(name: string): string {
  const colors = [
    'hsl(15, 100%, 72%)',
    'hsl(200, 100%, 65%)',
    'hsl(145, 70%, 55%)',
    'hsl(280, 70%, 65%)',
    'hsl(340, 80%, 65%)',
    'hsl(50, 90%, 55%)',
  ]
  const index = name.charCodeAt(0) % colors.length
  return colors[index]
}

function SkeletonRow() {
  return (
    <tr>
      <td data-label="Name"><div className={styles.skeleton} style={{ width: '140px', height: '16px' }} /></td>
      <td data-label="Email"><div className={styles.skeleton} style={{ width: '180px', height: '16px' }} /></td>
      <td data-label="Role"><div className={styles.skeleton} style={{ width: '70px', height: '16px' }} /></td>
      <td data-label="Status"><div className={styles.skeleton} style={{ width: '60px', height: '20px', borderRadius: '100px' }} /></td>
      <td data-label="Created"><div className={styles.skeleton} style={{ width: '80px', height: '16px' }} /></td>
      <td data-label=""><div className={styles.skeleton} style={{ width: '90px', height: '28px' }} /></td>
    </tr>
  )
}

export function UsersPage() {
  const { users, addUser, updateUser, deleteUser } = useUsersStore()
  const [modalOpen, setModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState<FormData>(emptyForm)
  const [saveError, setSaveError] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const originalUser = useRef<User | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600)
    return () => clearTimeout(timer)
  }, [])

  const openAdd = () => {
    setEditingId(null)
    setForm(emptyForm)
    setSaveError('')
    setModalOpen(true)
  }

  const openEdit = (user: User) => {
    originalUser.current = user
    setEditingId(user.id)
    setForm({ name: user.name, email: user.email, role: user.role, status: user.status })
    setSaveError('')
    setModalOpen(true)
  }

  const handleSave = () => {
    if (!form.name.trim() || !form.email.trim()) return

    if (editingId && originalUser.current && form.role !== originalUser.current.role) {
      setSaveError('Failed to update user role. Server error.')
      return
    }

    if (editingId) {
      updateUser(editingId, form)
    } else {
      addUser(form)
    }
    setModalOpen(false)
    setSaveError('')
  }

  const closeModal = () => {
    setModalOpen(false)
    setSaveError('')
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h2 className={styles.title}>Users</h2>
        <button className={styles.addBtn} onClick={openAdd}>+ Add User</button>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Created</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <>
                <SkeletonRow />
                <SkeletonRow />
                <SkeletonRow />
                <SkeletonRow />
                <SkeletonRow />
              </>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan={6} className={styles.empty}>No users found.</td>
              </tr>
            ) : (
              users.map((user, index) => (
                <tr 
                  key={user.id} 
                  className={styles.tableRow}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <td data-label="Name">
                    <div className={styles.userCell}>
                      <div 
                        className={styles.avatar}
                        style={{ background: getAvatarColor(user.name) }}
                      >
                        {getInitials(user.name)}
                      </div>
                      <span style={{ fontWeight: 500, color: 'var(--text-h)' }}>{user.name}</span>
                    </div>
                  </td>
                  <td data-label="Email">{user.email}</td>
                  <td data-label="Role">{user.role}</td>
                  <td data-label="Status">
                    <span className={`${styles.badge} ${user.status === 'active' ? styles.badgeActive : styles.badgeInactive}`}>
                      {user.status === 'active' && <span className={styles.pulse} />}
                      {user.status}
                    </span>
                  </td>
                  <td data-label="Created" style={{ color: 'var(--text-muted)' }}>{user.createdAt}</td>
                  <td data-label="">
                    <div className={styles.actions}>
                      <button className={styles.iconBtn} onClick={() => openEdit(user)}>Edit</button>
                      <button className={`${styles.iconBtn} ${styles.iconBtnDanger}`} onClick={() => deleteUser(user.id)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <div className={styles.overlay} onClick={closeModal}>
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
              <button className={styles.cancelBtn} onClick={closeModal}>Cancel</button>
              <button className={styles.saveBtn} onClick={handleSave}>
                {editingId ? 'Save' : 'Add'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
