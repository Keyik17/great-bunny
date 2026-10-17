import {
  ErrorComponent,
  Link,
  rootRouteId,
  useMatch,
  useRouter,
} from '@tanstack/react-router'
import type { ErrorComponentProps } from '@tanstack/react-router'
import styles from './DefaultCatchBoundary.module.css'

export function DefaultCatchBoundary({ error }: ErrorComponentProps) {
  const router = useRouter()
  const isRoot = useMatch({
    strict: false,
    select: (state) => state.id === rootRouteId,
  })

  // Log only in development; stay silent in production.
  if (import.meta.env.DEV) {
    console.error('DefaultCatchBoundary Error:', error)
  }

  return (
    <main id="main" className={styles.main}>
      <div className={styles.inner}>
        <h1 className={styles.title}>Something went wrong.</h1>
        <p className={styles.body}>
          We hit an error loading this page. Try again, or head back home.
        </p>
        <details className={styles.details}>
          <summary>Technical details</summary>
          <ErrorComponent error={error} />
        </details>
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.primary}
            onClick={() => router.invalidate()}
          >
            Try again
          </button>
          {isRoot ? (
            <Link to="/" className={styles.secondary}>
              Home
            </Link>
          ) : (
            <Link
              to="/"
              className={styles.secondary}
              onClick={(e) => {
                e.preventDefault()
                window.history.back()
              }}
            >
              Go back
            </Link>
          )}
        </div>
      </div>
    </main>
  )
}
