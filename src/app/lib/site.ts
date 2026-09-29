import { siteUrl } from '../data/pages.json';
export const BASE_URL =
  (import.meta.env.BASE_URL || '/').replace(/\/*$/, '/');

export const SITE_URL =
  (
    import.meta.env.VITE_SITE_URL ||
    siteUrl
  ).replace(/\/+$/, '');

export function withBase(path = '') {
  const base = BASE_URL;

  if (!path) {
    return base;
  }

  if (path.startsWith('#')) {
    return `${base}${path}`;
  }

  return `${base}${path.replace(/^\/+/, '')}`;
}

export function canonicalUrl(path = '/') {
  if (path === '/') {
    return `${SITE_URL}/`;
  }

  const clean =
    path.replace(/^\/+|\/+$/g, '');

  return `${SITE_URL}/${clean}/`;
}

export function getRoutePath() {
  if (typeof window === 'undefined') {
    return '/';
  }

  let pathname =
    window.location.pathname;

  const base = BASE_URL;

  if (
    base !== '/' &&
    (pathname === base.slice(0, -1) || pathname.startsWith(base))
  ) {
    pathname =
      `/${pathname.slice(base.length)}`;
  }

  pathname =
    pathname.replace(/\/+/g, '/');

  if (
    pathname.length > 1 &&
    !pathname.endsWith('/')
  ) {
    pathname += '/';
  }

  return pathname || '/';
}
