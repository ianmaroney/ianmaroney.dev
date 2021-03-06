import { Fragment } from 'react'
import parse from 'html-react-parser'
import xss from 'xss'

import { getDefaultWhiteList } from '@/util'

const HTMLRender = ({ content, tag, tagAttr = {} }) => {
  if (content) {
    const options = { whiteList: getDefaultWhiteList }
    const sanitizedContent = xss(content, options)

    const Tag = tag || Fragment
    return <Tag {...tagAttr}>{parse(sanitizedContent)}</Tag>
  }
  return null
}

export default HTMLRender
