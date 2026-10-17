import * as RadixAccordion from '@radix-ui/react-accordion'
import { Plus } from '@phosphor-icons/react'
import type { ReactNode } from 'react'
import styles from './Accordion.module.css'

type Item = {
  id: string
  question: ReactNode
  answer: ReactNode
}

type Props = {
  items: Item[]
  /** Allow multiple items open at once. Default false (single). */
  multiple?: boolean
  /** Item id(s) to start opened. */
  defaultOpen?: string | string[]
  className?: string
}

/**
 * Radix-backed accordion with editorial styling, generous padding,
 * hairline divider rows, animated plus icon. Single mode by default
 * (only one item open at a time) per common pattern.
 */
export function Accordion({
  items,
  multiple = false,
  defaultOpen,
  className,
}: Props) {
  if (multiple) {
    return (
      <RadixAccordion.Root
        type="multiple"
        defaultValue={Array.isArray(defaultOpen) ? defaultOpen : defaultOpen ? [defaultOpen] : []}
        className={`${styles.root} ${className ?? ''}`}
      >
        {items.map((item) => (
          <AccordionItem key={item.id} item={item} />
        ))}
      </RadixAccordion.Root>
    )
  }

  return (
    <RadixAccordion.Root
      type="single"
      collapsible
      defaultValue={typeof defaultOpen === 'string' ? defaultOpen : undefined}
      className={`${styles.root} ${className ?? ''}`}
    >
      {items.map((item) => (
        <AccordionItem key={item.id} item={item} />
      ))}
    </RadixAccordion.Root>
  )
}

function AccordionItem({ item }: { item: Item }) {
  return (
    <RadixAccordion.Item value={item.id} className={styles.item}>
      <RadixAccordion.Header className={styles.header}>
        <RadixAccordion.Trigger className={styles.trigger}>
          <span className={styles.question}>{item.question}</span>
          <Plus
            size={20}
            weight="regular"
            className={styles.icon}
            aria-hidden="true"
          />
        </RadixAccordion.Trigger>
      </RadixAccordion.Header>
      <RadixAccordion.Content className={styles.content}>
        <div className={styles.answer}>{item.answer}</div>
      </RadixAccordion.Content>
    </RadixAccordion.Item>
  )
}
