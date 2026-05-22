import { NavLink } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import styles from './Sidebar.module.css'

interface SidebarProps {
  open: boolean
  onClose: () => void
}

const links = [
  { to: '/dashboard', label: 'Overview', icon: '01' },
  { to: '/users', label: 'Directory', icon: '02' },
]

export function Sidebar({ open, onClose }: SidebarProps) {
  const { logout } = useAuth()

  return (
    <>
      {open && <div className={styles.overlay} onClick={onClose} />}
      <aside className={`${styles.sidebar} ${open ? styles.sidebarOpen : ''}`}>
        <div className={styles.brand}>
          <div className={styles.brandIcon}>A</div>
          <span className={styles.brandText}>Admin</span>
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
            Log out
          </button>
        </nav>
      </aside>
    </>
  )
}
