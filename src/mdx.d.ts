/// <reference types="vite/client" />

/**
 * MDX module typing. `@types/mdx` covers the default (component) export; we add
 * the named `frontmatter` export injected by remark-mdx-frontmatter so article
 * metadata is typed wherever an `.mdx` file is imported.
 */
declare module '*.mdx' {
  import type { ComponentType } from 'react'

  export const frontmatter: {
    title: string
    category: string
    date: string
    publishedAt: string
    image: string
    excerpt: string
    services: string[]
    author?: string
    readingTime?: string
  }

  const MDXComponent: ComponentType<{ components?: Record<string, ComponentType> }>
  export default MDXComponent
}
