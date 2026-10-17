import { CheckCircle } from '@phosphor-icons/react'
import { Button } from '~/components/shared/Button'
import { Container } from '~/components/shared/Container'
import { SectionShell } from '~/components/shared/SectionShell'
import { useLocale } from '~/i18n/locale'
import styles from './QuoteSent.module.css'
import { QUOTE_SENT_COPY as COPY } from '~/content/copy'


export function QuoteSent() {
  const locale = useLocale()
  const t = COPY[locale]

  return (
    <SectionShell id="quote-sent" labelledBy="quote-sent-title" surface="bg">
      <Container>
        <div className={styles.wrap}>
          <span className={styles.icon} aria-hidden="true">
            <CheckCircle size={52} weight="fill" />
          </span>
          <p className={styles.eyebrow}>{t.eyebrow}</p>
          <h1 className={styles.title} id="quote-sent-title">
            {t.title}
          </h1>
          <p className={styles.body}>{t.body}</p>

          <div className={styles.actions}>
            <Button href={locale === 'es' ? '/es' : '/'} variant="primary" size="lg" className={styles.action}>
              {t.home}
            </Button>
          </div>
        </div>
      </Container>
    </SectionShell>
  )
}
