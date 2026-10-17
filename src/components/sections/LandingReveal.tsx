import { motion, useReducedMotion } from 'framer-motion'
import { useLayoutEffect, useRef, useState, type ReactNode } from 'react'

// Items revealed together (cards in a grid, rows in a list) arrive one after
// another: each waits a little longer than the reveal before it.
function siblingIndex(el: HTMLElement | null) {
  let i = 0
  let prev = el?.previousElementSibling
  while (prev && i < 6) {
    if ((prev as HTMLElement).dataset?.reveal !== undefined) i++
    else break
    prev = prev.previousElementSibling
  }
  return i
}

export function LandingReveal({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  const reduceMotion = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const [delay, setDelay] = useState(0)

  useLayoutEffect(() => {
    setDelay(siblingIndex(ref.current) * 0.08)
  }, [])

  if (reduceMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      ref={ref}
      data-reveal=""
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}
