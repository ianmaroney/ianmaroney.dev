/* globals describe, expect, it */

import { stringToSlug, nl2br } from '@/util'

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
})
