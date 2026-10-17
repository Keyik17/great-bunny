import * as RadixAccordion from '@radix-ui/react-accordion'
import { Plus } from '@phosphor-icons/react'
import type { ReactNode } from 'react'
import styles from './LandingFaqAccordion.module.css'

type LandingFaqItem = {
  id: string
  number: string
  question: ReactNode
  answer: ReactNode
}

type LandingFaqAccordionProps = {
  items: LandingFaqItem[]
  className?: string
}

export function LandingFaqAccordion({
  items,
  className,
}: LandingFaqAccordionProps) {
  return (
    <RadixAccordion.Root
      type="single"
      collapsible
      className={`${styles.root} ${className ?? ''}`}
    >
      {items.map((item) => (
        <RadixAccordion.Item
          key={item.id}
          value={item.id}
          className={styles.item}
        >
          <span className={styles.number}>{item.number}</span>
          <div className={styles.itemContent}>
            <RadixAccordion.Header className={styles.header}>
              <RadixAccordion.Trigger className={styles.trigger}>
                <span className={styles.question}>{item.question}</span>
                <Plus
                  size="1em"
                  weight="bold"
                  className={styles.icon}
                  aria-hidden="true"
                />
              </RadixAccordion.Trigger>
            </RadixAccordion.Header>
            <RadixAccordion.Content className={styles.content}>
              <div className={styles.answer}>{item.answer}</div>
            </RadixAccordion.Content>
          </div>
        </RadixAccordion.Item>
      ))}
    </RadixAccordion.Root>
  )
}
