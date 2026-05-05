import { base } from '$app/paths';

const ABSOLUTE_URL_PATTERN = /^[a-zA-Z][a-zA-Z\d+\-.]*:/;

/**
 * Prepend the configured SvelteKit base path to app-relative paths.
 * Leaves absolute URLs and hash links untouched.
 * @param {string} path
 * @returns {string}
 */
export function withBasePath(path = '') {
  if (!path) return base || '';
  if (path.startsWith('#') || ABSOLUTE_URL_PATTERN.test(path)) return path;

  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  if (!base) return normalizedPath;
  if (normalizedPath === '/' || normalizedPath === base) return base || '/';
  if (normalizedPath.startsWith(`${base}/`)) return normalizedPath;

  return `${base}${normalizedPath}`;
}

/**
 * Normalize the current pathname to app-relative paths for nav checks.
 * @param {string} pathname
 * @returns {string}
 */
export function normalizePathname(pathname = '/') {
  const normalized = pathname.replace(/\/+$/, '') || '/';

  if (!base) return normalized;
  if (normalized === base) return '/';
  if (normalized.startsWith(`${base}/`)) {
    return normalized.slice(base.length) || '/';
  }

  return normalized;
}
