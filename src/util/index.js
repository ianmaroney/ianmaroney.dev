import { basePath } from '@/config'

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
  return `${protocol}//${hostname}${port ? ':' + port : ''}`
}

export function hasBasePath (path) {
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
    return resolved.origin === locationOrigin && hasBasePath(resolved.pathname) && validExtension(resolved.pathname)
  } catch (_) {
    return false
  }
}

export const getDefaultWhiteList = {
  a: ['target', 'href', 'title', 'class'],
  abbr: ['title', 'class'],
  address: ['class'],
  area: ['shape', 'coords', 'href', 'alt', 'class'],
  article: ['class'],
  aside: ['class'],
  audio: ['autoplay', 'controls', 'loop', 'preload', 'src', 'class'],
  b: ['class'],
  bdi: ['dir', 'class'],
  bdo: ['dir', 'class'],
  big: ['class'],
  blockquote: ['cite', 'class'],
  br: ['class'],
  caption: ['class'],
  center: ['class'],
  cite: ['class'],
  code: ['class'],
  col: ['align', 'valign', 'span', 'width', 'class'],
  colgroup: ['align', 'valign', 'span', 'width', 'class'],
  dd: ['class'],
  del: ['datetime', 'class'],
  details: ['open', 'class'],
  div: ['class'],
  dl: ['class'],
  dt: ['class'],
  em: ['class'],
  font: ['color', 'size', 'face', 'class'],
  footer: ['class'],
  h1: ['class'],
  h2: ['class'],
  h3: ['class'],
  h4: ['class'],
  h5: ['class'],
  h6: ['class'],
  header: ['class'],
  hr: ['class'],
  i: ['class'],
  img: ['src', 'alt', 'title', 'width', 'height', 'class', 'srcSet'],
  ins: ['datetime', 'class'],
  li: ['class'],
  mark: ['class'],
  nav: ['class'],
  ol: ['class'],
  p: ['class'],
  pre: ['class'],
  s: ['class'],
  section: ['class'],
  small: ['class'],
  span: ['class'],
  sub: ['class'],
  sup: ['class'],
  strong: ['class'],
  table: ['width', 'border', 'align', 'valign', 'class'],
  tbody: ['align', 'valign', 'class'],
  td: ['width', 'rowspan', 'colspan', 'align', 'valign', 'class'],
  tfoot: ['align', 'valign', 'class'],
  th: ['width', 'rowspan', 'colspan', 'align', 'valign', 'class'],
  thead: ['align', 'valign', 'class'],
  tr: ['rowspan', 'align', 'valign', 'class'],
  tt: ['class'],
  u: ['class'],
  ul: ['class'],
  video: ['autoplay', 'controls', 'loop', 'preload', 'src', 'height', 'width', 'class']
}

export const nl2br = (str, isXhtml) => {
  if (typeof str === 'undefined' || str === null) return ''
  const breakTag = (isXhtml || typeof isXhtml === 'undefined') ? '<br ' + '/>' : '<br>'
  return (str + '').replace(/(\r\n|\n\r|\r|\n)/g, breakTag + '$1')
}
