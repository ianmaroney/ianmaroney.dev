import { memo, Fragment } from 'react'
import parse, { domToReact } from 'html-react-parser'

import { isLocalURL, trimURL } from '@/util'

import Link from 'next/link'

/**
 * Manipulate a DOM node with applicable, optional replacement React components.
 * @param {object} node The node to manipulate.
 * @return {node}
 */
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
      <Link key={node.key || `${node.attribs.href}`} href={href} prefetch={false}><a {...passedProps}>{domToReact(node.children, { replace })}</a></Link>
    )
  }
}

/**
 * Parse, modify, and render as React components, a string that may contain HTML.
 * @param {string} content String to convert to React coponents.
 * @param {string} tag HTML element to wrap the React component with, <Fragment /> otherwise.
 * @param {object} tagAttr An object of attributes to be passed along to the wrapping Component.
 * @return {node}
 */
const HTMLRender = ({ content, tag, tagAttr = {} }) => {
  if (content) {
    const Tag = tag || Fragment
    const parsedContent = parse(content, { replace })

    return <Tag {...tagAttr}>{parsedContent}</Tag>
  }
  return null
}

export default memo(HTMLRender)
