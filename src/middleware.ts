import { defaultLocale, locales } from '@/i18n/config';
import { match as matchLocale } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import {
  NextResponse,
  type MiddlewareConfig,
  type NextRequest,
} from 'next/server';
import { CookieIds } from './constants/cookie-ids';

function getLocale(req: NextRequest): string {
  const localeFromCookie = req.cookies.get(CookieIds.Locale)?.value;
  if (localeFromCookie && locales.includes(localeFromCookie as never)) {
    return localeFromCookie;
  }

  const negotiatorHeaders: Record<string, string> = {};
  req.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();
  try {
    return matchLocale(languages, locales, defaultLocale);
  } catch {
    return defaultLocale;
  }
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const localeFromPathname = pathname.split('/')[1] as string;
  if (!locales.includes(localeFromPathname as never)) {
    // Find the correct case-sensitive locale
    const normalizedLocaleFromPathname = localeFromPathname.toLowerCase();
    const correctLocale = locales.find(
      (locale) => locale.toLowerCase() === normalizedLocaleFromPathname,
    );

    if (!correctLocale) {
      const locale = getLocale(request);
      const newUrl = new URL(request.nextUrl);
      newUrl.pathname = `/${locale}${pathname}`;
      const response = NextResponse.redirect(newUrl);
      response.cookies.set(CookieIds.Locale, locale);
      return response;
    }

    if (correctLocale !== localeFromPathname) {
      // Redirect to the correct case-sensitive locale
      const splitPathname = pathname.split('/');
      splitPathname[1] = correctLocale;
      const newPathname = splitPathname.join('/');
      const newUrl = new URL(request.nextUrl);
      newUrl.pathname = newPathname;
      const response = NextResponse.redirect(newUrl);
      response.cookies.set(CookieIds.Locale, correctLocale);
      return response;
    }
  }
  const response = NextResponse.next();
  if (!request.cookies.has(CookieIds.Locale)) {
    response.cookies.set(CookieIds.Locale, localeFromPathname);
  }

  return response;
}

export const config: MiddlewareConfig = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: ['/((?!api|trpc|_next|_vercel|.*\\..*).*)'],
};
