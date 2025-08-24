// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// UPRAV podľa seba:
const ALLOWED = [
  'mojadomena.sk',
  'www.aipower.site',
  'https://aipower.site/',
  '*.partner.sk',
  'localhost',       // dev
  'localhost:3000',  // dev
]

function hostMatchesAllowed(hostname: string | null) {
  if (!hostname) return false
  // presná zhoda
  if (ALLOWED.includes(hostname)) return true
  // podpora *.domain.tld zápisov
  return ALLOWED.some((rule) => {
    if (!rule.startsWith('*.')) return false
    const base = rule.slice(2) // 'partner.sk'
    return hostname === base || hostname.endsWith('.' + base)
  })
}

function buildFrameAncestorsValue() {
  const sources = ALLOWED
    .map((h) => (h.startsWith('*.') ? `https://*.${h.slice(2)}` : `https://${h}`))
    .join(' ')
  // 'self' povolí tvoju vlastnú doménu (aipoweragency.vercel.app)
  return `frame-ancestors 'self' ${sources}`.trim()
}

export function middleware(req: NextRequest) {
  const res = NextResponse.next()

  // 1) Vždy nastav CSP: frame-ancestors (pevná ochrana proti iframe mimo whitelistu)
  res.headers.set('Content-Security-Policy', buildFrameAncestorsValue())

  // 2) Voliteľné: rýchla kontrola podľa Referer (ak je dostupný)
  //    (Upoz.: Útočník vie Referer skryť, preto hl. ochrana je CSP vyššie.)
  const referer = req.headers.get('referer')
  let refererHost: string | null = null
  try {
    if (referer) refererHost = new URL(referer).hostname
  } catch {}

  const sameOrigin = refererHost === req.nextUrl.hostname
  const directVisit = !refererHost // otvorené priamo do tabu (nie cez iframe)
  const allowed = hostMatchesAllowed(refererHost)

  if (!sameOrigin && !directVisit && !allowed) {
    return new NextResponse('Embedding not allowed for this domain.', {
      status: 403,
      headers: {
        'Content-Type': 'text/plain',
        // necháme aj CSP v 403 odpovedi:
        'Content-Security-Policy': buildFrameAncestorsValue(),
      },
    })
  }

  return res
}

// (voliteľné) vylúč niektoré asset cesty z middleware
export const config = {
  matcher: [
    // aplikuj takmer na všetko okrem statík
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)',
  ],
}
