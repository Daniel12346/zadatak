import type { User } from '../types'
import styles from './UserRow.module.css'

interface UserRowProps {
  user: User
  index: number
  onEdit: (user: User) => void
  onDelete: (id: string) => void
}

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

export function SkeletonRow() {
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

export function UserRow({ user, index, onEdit, onDelete }: UserRowProps) {
  return (
    <tr 
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
          <button className={styles.iconBtn} onClick={() => onEdit(user)}>Edit</button>
          <button className={`${styles.iconBtn} ${styles.iconBtnDanger}`} onClick={() => onDelete(user.id)}>Delete</button>
        </div>
      </td>
    </tr>
  )
}
