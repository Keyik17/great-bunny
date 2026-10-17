import { useLocale } from '~/i18n/locale'
import styles from './StubPage.module.css'

type Props = {
  eyebrow: string
  title: string
  body: string
}

export function StubPage({ eyebrow, title, body }: Props) {
  const locale = useLocale()
  const placeholder =
    locale === 'es' ? 'Página en construcción' : 'Page placeholder · build pending'
  return (
    <main id="main" className={styles.main}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.body}>{body}</p>
        <p className={styles.placeholder}>{placeholder}</p>
      </div>
    </main>
  )
}
