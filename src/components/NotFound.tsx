import { Link } from '@tanstack/react-router'
import styles from './NotFound.module.css'

export function NotFound() {
  return (
    <main id="main" className={styles.main}>
      <div className={styles.inner}>
        <p className={styles.code} aria-hidden="true">
          404
        </p>
        <h1 className={styles.title}>This page went down the drain</h1>
        <p className={styles.body}>
          The link may be old or mistyped. Everything else is still flowing.
        </p>
        <div className={styles.actions}>
          <Link to="/" className={styles.primary}>
            Return home
          </Link>
        </div>
      </div>
    </main>
  )
}
