import { useAuth } from '../hooks/useAuth'
import styles from './Navbar.module.css'

interface NavbarProps {
  title: string
  onMenuClick: () => void
}

export function Navbar({ title, onMenuClick }: NavbarProps) {
  const { user } = useAuth()

  return (
    <header className={styles.navbar}>
      <div className={styles.left}>
        <button className={styles.menuBtn} onClick={onMenuClick} aria-label="Toggle menu">
          ☰
        </button>
        <h1 className={styles.pageTitle}>{title}</h1>
      </div>
      <div className={styles.right}>
        <div className={styles.userInfo}>
          <span className={styles.avatar}>
            {user?.name?.charAt(0) ?? 'A'}
          </span>
          <span className={styles.userName}>{user?.name ?? 'Admin'}</span>
        </div>
      </div>
    </header>
  )
}
