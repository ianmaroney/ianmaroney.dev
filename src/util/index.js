import { basePath } from '@/config'

RegExp.quote = (str) => {
  return str.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1')
}

const root = 'http://localhost:3000'
const quotedRoot = RegExp.quote(root)
const rootsRegex = new RegExp(`^${quotedRoot}`, 'i')

export const trimURL = (url) => {
  if (!url || typeof url !== 'string') return url
  return url.replace(rootsRegex, '').replace(/\/$/, '')
}

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

export function getLocationOrigin () {
  const { protocol, hostname, port } = window.location
  return `${protocol}//${hostname}${port ? `:${port}` : ''}`
}

export function hasBasePath (path, basePath) {
  return path === basePath || path.startsWith(`${basePath}/`)
}

export function validExtension (path) {
  return path.indexOf('.') < 0 || path.endsWith('.html')
}

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

export const nl2br = (str) => {
  if (typeof str === 'undefined' || str === null) return ''
  return (str + '').replace(/(\r\n|\n\r|\r|\n)/g, '<br />' + '$1')
}
