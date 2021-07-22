import { basePath } from '@/config'

/**
 * Escape a string used to create a `new RegExp`.
 * @param {string} str String to escape.
 * @return {string}
 */
RegExp.quote = (str) => {
  return str.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1')
}

const root = 'http://localhost:3000'
const quotedRoot = RegExp.quote(root)
const rootsRegex = new RegExp(`^${quotedRoot}`, 'i')

/**
 * Trim the origin from a local url-like string.
 * @param {string} url URL to verify and trim, if applicable.
 * @return {string}
 */
export const trimURL = (url) => {
  if (!url || typeof url !== 'string') return url
  return url.replace(rootsRegex, '').replace(/\/$/, '')
}

/**
 * Convert a string to a slug-like string.
 * @param {string} str The string to convert.
 * @param {string} separator The separator used to replace spaces.
 * @return {string}
 */
export const stringToSlug = (str, separator = '-') => {
  if (str) {
    str = str.replace(/^\s+|\s+$/g, '') // trim
    str = str.toLowerCase()
      .replace(/\?/g, separator)
      .replace(/&/g, separator)
      .replace(/=/g, separator)

    // remove accents, swap ñ for n, etc
    var from = 'åàáãäâèéëêìíïîòóöôùúüûñç·/_,:;'
    var to = 'aaaaaaeeeeiiiioooouuuunc------'

    for (var i = 0, l = from.length; i < l; i++) {
      str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i))
    }

    str = str
      .replace(/[^a-z0-9 -]/g, '') // remove invalid chars
      .replace(/\s+/g, separator) // collapse whitespace and replace by -
      .replace(/-+/g, separator) // collapse dashes
      .replace(/^-+/, '') // trim - from start of text
      .replace(/-+$/, '') // trim - from end of text
  }
  return str
}

/**
 * Approximate the origin property of of the current `window.location`.
 * @return {string}
 */
export function getLocationOrigin () {
  const { protocol, hostname, port } = window.location
  return `${protocol}//${hostname}${port ? `:${port}` : ''}`
}

/**
 * Determine if a url-like string starts with (or equals) the Next.js configured basePath.
 * @param {string} path The string to check.
 * @param {string} basePath The basePath string to search for at the beginning of the path string.
 * @return {string}
 */
export function hasBasePath (path, basePath) {
  return path === basePath || path.startsWith(`${basePath}/`)
}

/**
 * Determine if a path-like string ends in ".html" or no extension.
 * @param {string} path The string to check.
 * @return {string}
 */
export function validExtension (path) {
  return path.indexOf('.') < 0 || path.endsWith('.html')
}

/**
 * Determine if a url-like string appears to be local to the url-like string's origin property.
 * @param {string} path The string to check.
 * @return {string}
 */
export function isLocalURL (url) {
  if ((url.startsWith('/') && validExtension(url)) || url.startsWith('#')) return true
  try {
    // absolute urls can be local if they are on the same origin
    const locationOrigin = getLocationOrigin()
    const resolved = new URL(url, locationOrigin)
    return resolved.origin === locationOrigin && hasBasePath(resolved.pathname, basePath) && validExtension(resolved.pathname)
  } catch (_) {
    return false
  }
}

/**
 * Convert newline characters to `<br />` tags within a string.
 * @param {string} str The string to modify.
 * @return {string}
 */
export const nl2br = (str) => {
  if (typeof str === 'undefined' || str === null) return ''
  return (str + '').replace(/(\r\n|\n\r|\r|\n)/g, '<br />' + '$1')
}
