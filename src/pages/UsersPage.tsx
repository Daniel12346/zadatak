import { useState, useRef, useEffect } from 'react'
import { useUsersStore } from '../stores/usersStore'
import type { User, UserFormData } from '../types'
import { emptyUserForm } from '../types'
import { UserRow, SkeletonRow } from '../components/UserRow'
import { UserFormModal } from '../components/UserFormModal'
import styles from './UsersPage.module.css'

export function UsersPage() {
  const { users, addUser, updateUser, deleteUser } = useUsersStore()
  const [modalOpen, setModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState<UserFormData>(emptyUserForm)
  const [saveError, setSaveError] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const originalUser = useRef<User | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600)
    return () => clearTimeout(timer)
  }, [])

  const openAdd = () => {
    setEditingId(null)
    setForm(emptyUserForm)
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
      <div className={styles.bgPattern} aria-hidden="true" />
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
                <UserRow
                  key={user.id}
                  user={user}
                  index={index}
                  onEdit={openEdit}
                  onDelete={deleteUser}
                />
              ))
            )}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <UserFormModal
          form={form}
          setForm={setForm}
          editingId={editingId}
          saveError={saveError}
          setSaveError={setSaveError}
          onSave={handleSave}
          onClose={closeModal}
        />
      )}
    </div>
  )
}
