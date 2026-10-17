import { Link } from '@tanstack/react-router'
import { forwardRef } from 'react'
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from 'react'
import styles from './Button.module.css'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

type CommonProps = {
  variant?: Variant
  size?: Size
  children: ReactNode
  className?: string
  loading?: boolean
}

type ButtonAsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'className'> & {
    href?: undefined
  }

type ButtonAsLink = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'children' | 'className' | 'href'> & {
    href: string
    /** External links bypass the router. Internal hrefs use TanStack Link. */
    external?: boolean
  }

export type ButtonProps = ButtonAsButton | ButtonAsLink

function classNames(...parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(' ')
}

/**
 * Polymorphic button.
 * - `href` present → renders an <a> (external) or TanStack <Link> (internal).
 * - no `href`      → renders a <button>.
 *
 * Outline on the secondary variant is drawn OUTSIDE the box via box-shadow so the
 * primary and secondary buttons have identical content-area dimensions
 * (per skill: "draw the border OUTSIDE the box").
 */
export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  function Button(props, ref) {
    const variant = props.variant ?? 'primary'
    const size = props.size ?? 'md'

    const classes = classNames(
      styles.button,
      styles[variant],
      styles[`size_${size}`],
      props.loading && styles.loading,
      props.className,
    )

    if ('href' in props && props.href !== undefined) {
      const { href, external, variant: _v, size: _s, children, className: _c, loading: _l, ...rest } =
        props
      if (external) {
        return (
          <a
            ref={ref as React.Ref<HTMLAnchorElement>}
            className={classes}
            href={href}
            rel="noopener noreferrer"
            target="_blank"
            {...rest}
          >
            {children}
          </a>
        )
      }
      return (
        <Link
          ref={ref as React.Ref<HTMLAnchorElement>}
          to={href}
          className={classes}
          {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {children}
        </Link>
      )
    }

    const { variant: _v, size: _s, children, className: _c, loading, ...rest } = props
    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={classes}
        disabled={loading || (rest as ButtonHTMLAttributes<HTMLButtonElement>).disabled}
        {...rest}
      >
        {children}
      </button>
    )
  },
)
