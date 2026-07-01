import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // opengraph-image/twitter-image are extensionless metadata routes at the app
  // root (outside [locale]) — the locale middleware must not rewrite them.
  matcher: '/((?!api|trpc|_next|_vercel|opengraph-image|twitter-image|.*\\..*).*)'
};
