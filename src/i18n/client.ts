'use client';
import 'client-only';
import i18next, { type i18n } from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import { initReactI18next } from 'react-i18next';
import { i18nSharedOptions } from './shared-options';

const cache = new Map<string, i18n>();

export function getI18n(lng: string) {
  if (cache.has(lng)) {
    return cache.get(lng)!;
  }

  const instance = i18next.createInstance({
    initImmediate: true,
  });

  instance
    .use(initReactI18next)
    .use(
      resourcesToBackend(
        (language: string, namespace: string) =>
          import(`./locales/${language}/${namespace}.json`),
      ),
    );

  instance.init({
    ...i18nSharedOptions,
    returnNull: false,
    lng,
  });

  cache.set(lng, instance);

  return instance;
}
