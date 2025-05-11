import { defaultLocale, defaultNamespace, locales } from './config';

export const i18nSharedOptions = {
  // debug: true,
  supportedLngs: locales,
  fallbackLng: defaultLocale,
  lng: defaultLocale,
  fallbackNS: defaultNamespace,
  defaultNS: defaultNamespace,
  ns: defaultNamespace,
  plural: true,
};
