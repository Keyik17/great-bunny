import { createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'
import { DefaultCatchBoundary } from './components/DefaultCatchBoundary'
import { NotFound } from './components/NotFound'

export function getRouter() {
  const router = createRouter({
    routeTree,
    defaultPreload: 'intent',
    // SEO retention: the old WordPress URLs are all slash-terminated and must
    // resolve 200 at their exact paths (no redirect hop). 'preserve' serves
    // both forms; canonicals point at the slash-terminated one.
    trailingSlash: 'preserve',
    defaultErrorComponent: DefaultCatchBoundary,
    defaultNotFoundComponent: () => <NotFound />,
    scrollRestoration: true,
    // Reset scroll to the top INSTANTLY on navigation. Without this the page
    // inherits the global `scroll-behavior: smooth`, so navigating from a
    // scrolled-down position visibly animates all the way back up during the
    // transition. Hash/anchor links still scroll smoothly (that is per-click).
    scrollRestorationBehavior: 'instant',
    // Cross-fade page content on every navigation via the native View
    // Transitions API. Styled in globals.css; the navbar/footer keep stable
    // view-transition-names so only the page body animates.
    defaultViewTransition: true,
  })
  return router
}
