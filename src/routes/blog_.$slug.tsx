import { createFileRoute, Navigate } from '@tanstack/react-router'

export const Route = createFileRoute('/blog_/$slug')({
  component: ArticleRedirect,
})

function ArticleRedirect() {
  const { slug } = Route.useParams()
  if (slug === 'celebrating-youth-biz-success-at-young-americans-awards') {
    return <Navigate to="/celebrating-youth-biz-success-at-young-americans-awards" replace />
  }
  return <Navigate to="/blog" replace />
}
