import { isPlatformBrowser } from "@angular/common";

export function getBrowserLocale(platformId: object, defaultLocale = 'en-US') {
  if (isPlatformBrowser(platformId)) return navigator.language;
  return defaultLocale; // Fallback locale for SSR
}
