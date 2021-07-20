/* globals describe, expect, it */

import { stringToSlug, nl2br, trimURL, validExtension, hasBasePath, isLocalURL } from '@/util'

describe('Util functions', () => {
  it('strToSlug', () => {
    expect(stringToSlug('Ian Maroney')).toEqual('ian-maroney')
    expect(stringToSlug('Ian Maroney', '_')).toEqual('ian_maroney')
    expect(stringToSlug('Ián Maroney')).toEqual('ian-maroney')
    expect(stringToSlug('Ian:Maroney')).toEqual('ian-maroney')
    expect(stringToSlug(undefined)).toEqual(undefined)
  })

  it('nl2br', () => {
    const value = 'Line 1\nLine 2\n\nLine 4'
    expect(nl2br('')).toEqual('')
    expect(nl2br()).toEqual('')
    expect(nl2br('Ian Maroney')).toEqual('Ian Maroney')
    expect(nl2br(value)).toEqual('Line 1<br />\nLine 2<br />\n<br />\nLine 4')
  })

  it('trimURL', () => {
    expect(trimURL({ test: 'test' })).toEqual({ test: 'test' })
    expect(trimURL('http://localhost:3000/works')).toEqual('/works')
    expect(trimURL('http://localhost:3000/works/')).toEqual('/works')
    expect(trimURL('test http://localhost:3000/works')).toEqual('test http://localhost:3000/works')
    expect(trimURL('^http://localhost:3000/works')).toEqual('^http://localhost:3000/works')
    expect(trimURL('http://localhost:3000/works test')).toEqual('/works test')
    expect(trimURL('https://policies.google.com/privacy?hl=en&fg=1')).toEqual('https://policies.google.com/privacy?hl=en&fg=1')
  })

  it('validExtension', () => {
    expect(validExtension('/test')).toEqual(true)
    expect(validExtension('/test.html')).toEqual(true)
    expect(validExtension('/test.jpg')).toEqual(false)
  })

  it('hasBasePath', () => {
    const basePath = '/basepath'
    expect(hasBasePath('/basepath', basePath)).toEqual(true)
    expect(hasBasePath('/basepath/test', basePath)).toEqual(true)
    expect(hasBasePath('/basepath/test.html', basePath)).toEqual(true)
    expect(hasBasePath('/basepath/test.jpg', basePath)).toEqual(true)

    expect(hasBasePath('/test', basePath)).toEqual(false)
    expect(hasBasePath('/test.html', basePath)).toEqual(false)
    expect(hasBasePath('/test.jpg', basePath)).toEqual(false)
  })

  it('isLocalURL: catch', () => {
    global.window = Object.create(window)
    const url = 'http://localhost:3000/test/testing'
    Object.defineProperty(window, 'location', {
      value: {
        host: 'localhost',
        href: url,
        origin: 'http://localhost:3000',
        pathname: '/test/testing'
      }
    })

    expect(isLocalURL('http://localhost:3000/testing/123')).toEqual(false)
    expect(isLocalURL('http://localhost:3000/testing/123.html')).toEqual(false)
    expect(isLocalURL('http://localhost:3000/testing/123.jpg')).toEqual(false)
  })

  it('isLocalURL', () => {
    delete window.location
    const url = 'http://localhost:3000/test/testing'
    Object.defineProperty(window, 'location', {
      value: {
        host: 'localhost',
        hostname: 'localhost',
        href: url,
        origin: 'http://localhost:3000',
        port: 3000,
        protocol: 'http:',
        pathname: '/test/testing'
      }
    })

    expect(isLocalURL('http://localhost:3000/testing/123')).toEqual(true)
    expect(isLocalURL('http://localhost:3000/testing/123.html')).toEqual(true)
    expect(isLocalURL('http://localhost:3000/testing/123.jpg')).toEqual(false)
  })
})
