import type { ElementType, HTMLAttributes, ReactNode } from 'react'
import styles from './Container.module.css'

type Props = {
  as?: ElementType
  children: ReactNode
  className?: string
} & HTMLAttributes<HTMLElement>

export function Container({ as: Tag = 'div', children, className, ...rest }: Props) {
  return (
    <Tag className={`${styles.container} ${className ?? ''}`} {...rest}>
      {children}
    </Tag>
  )
}
