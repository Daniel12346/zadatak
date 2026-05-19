import { NavLink } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import styles from './Sidebar.module.css'

interface SidebarProps {
  open: boolean
  onClose: () => void
}

const links = [
  { to: '/dashboard', label: 'Dashboard', icon: '◆' },
  { to: '/users', label: 'Users', icon: '●' },
  { to: '/settings', label: 'Settings', icon: '⚙' },
]

export function Sidebar({ open, onClose }: SidebarProps) {
  const { logout } = useAuth()

  return (
    <>
      {open && <div className={styles.overlay} onClick={onClose} />}
      <aside className={`${styles.sidebar} ${open ? styles.sidebarOpen : ''}`}>
        <div className={styles.brand}>
          <span className={styles.brandIcon}>A</span>
          Admin
        </div>

        <nav className={styles.nav}>
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/dashboard'}
              className={({ isActive }) =>
                `${styles.link} ${isActive ? styles.linkActive : ''}`
              }
              onClick={onClose}
            >
              <span className={styles.linkIcon}>{link.icon}</span>
              {link.label}
            </NavLink>
          ))}
          <div className={styles.spacer} />
          <button className={styles.logout} onClick={logout}>
            <span className={styles.linkIcon}>→</span>
            Sign out
          </button>
        </nav>
      </aside>
    </>
  )
}
