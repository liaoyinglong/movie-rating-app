import { CookieIds } from '@/constants/cookie-ids';
import i18next, { type i18n, type Namespace } from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import { cookies } from 'next/headers';
import { cache } from 'react';
import 'server-only';
import { defaultLocale, Locale } from './config';
import { i18nSharedOptions } from './shared-options';

const i18nCacheMap = new Map<string, i18n>();

function getI18n(lng: string) {
  if (i18nCacheMap.has(lng)) {
    return i18nCacheMap.get(lng)!;
  }

  const instance = i18next.createInstance({
    initImmediate: true,
  });

  instance.use(
    resourcesToBackend((language: string, namespace: string) => {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      return require(`./locales/${language}/${namespace}.json`);
    }),
  );

  instance.init(
    Object.assign(
      {},
      i18nSharedOptions,
      {
        returnNull: false,
        lng,
      },
      process.env.VITEST ? { fallbackLng: lng } : {},
    ),
  );

  i18nCacheMap.set(lng, instance);

  return instance;
}

export const getServerI18n = cache(async (ns?: Namespace) => {
  let locale: string;

  if (process.env.VITEST) {
    locale = Locale.zhCN;
  } else {
    const cookieStore = await cookies();
    locale = cookieStore.get(CookieIds.Locale)?.value ?? defaultLocale;
  }

  const i18nInstance = getI18n(locale);

  if (ns) {
    await i18nInstance.loadNamespaces(ns);
  }

  return { ...i18nInstance, locale };
});
