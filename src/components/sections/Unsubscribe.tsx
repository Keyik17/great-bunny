import { Button } from '~/components/shared/Button'
import { Container } from '~/components/shared/Container'
import { SectionShell } from '~/components/shared/SectionShell'
import { useLocale } from '~/i18n/locale'
import styles from './QuoteSent.module.css'
import { UNSUBSCRIBE_COPY as COPY } from '~/content/copy'


export function Unsubscribe({ hasEmail }: { hasEmail: boolean }) {
  const locale = useLocale()
  const t = COPY[locale]
  return (
    <SectionShell id="unsubscribe" labelledBy="unsubscribe-title" surface="bg">
      <Container>
        <div className={styles.wrap}>
          <p className={styles.eyebrow}>{t.eyebrow}</p>
          <h1 className={styles.title} id="unsubscribe-title">
            {hasEmail ? t.title : t.titleNoEmail}
          </h1>
          <p className={styles.body}>{hasEmail ? t.body : t.bodyNoEmail}</p>
          <div className={styles.actions}>
            <Button
              href={locale === 'es' ? '/es' : '/'}
              variant="primary"
              size="lg"
              className={styles.action}
            >
              {t.home}
            </Button>
          </div>
        </div>
      </Container>
    </SectionShell>
  )
}
