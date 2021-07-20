import { memo, Fragment } from 'react'
import parse, { domToReact } from 'html-react-parser'

import { isLocalURL, trimURL } from '@/util'

import Link from 'next/link'

const replace = (node) => {
  if (node.name && node.name === 'a' && node.attribs && node.attribs.href && isLocalURL(node.attribs.href)) {
    const href = trimURL(node.attribs.href)
    const passedProps = Object.assign({}, node.attribs)

    passedProps.className = passedProps.class

    delete passedProps.href
    delete passedProps.target
    delete passedProps.rel
    delete passedProps.class

    return (
      <Link key={node.key || `${node.attribs.href}`} href={href}><a {...passedProps}>{domToReact(node.children, { replace })}</a></Link>
    )
  }
}

const HTMLRender = ({ content, manipulateNodes = false, tag, tagAttr = {} }) => {
  if (content) {
    const Tag = tag || Fragment
    const parsedContent = parse(content, { replace })

    return <Tag {...tagAttr}>{parsedContent}</Tag>
  }
  return null
}

export default memo(HTMLRender)
