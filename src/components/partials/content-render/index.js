import { cloneElement, useMemo, Fragment } from 'react'
import parse from 'html-react-parser'
import xss from 'xss'

import { getDefaultWhiteList, isLocalURL } from '@/util'

import Link from 'next/link'

const manipulateNodes = (nodes) => {
  if (!nodes.length) return nodes

  const manipulatedNodes = []

  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i]

    if (typeof node === 'string') {
      const trimmedNode = node.trim()

      if (trimmedNode.length) {
        const modifiedNode = parse(node)

        manipulatedNodes.push(modifiedNode)
      }
    } else if (typeof node === 'object' && node.props && node.props.children) {
      if (node.type && node.type === 'a' && node.props.href && isLocalURL(node.props.href)) {
        const passedProps = Object.assign({}, node.props)
        delete passedProps.href

        manipulatedNodes.push(<Link key={node.key ? node.key : `${node.props.href}-${i}`} href={node.props.href}><a {...passedProps} data-next='link'>{node.props.children}</a></Link>)
      } else if (node.type && node.type === 'a') {
        manipulatedNodes.push(node)
      } else {
        const clonedNode = cloneElement(node, {
          children: manipulateNodes([].concat(node.props.children)),
          key: node.key ? node.key : `${node.type}-${i}`
        })

        manipulatedNodes.push(clonedNode)
      }
    }
  }
  return manipulatedNodes
}

const ContentRender = ({ content, tag, tagAttr = {} }) => {
  if (content) {
    const options = { whiteList: getDefaultWhiteList }
    const sanitizedContent = xss(content, options)

    let parsedContent = parse(sanitizedContent)
    parsedContent = Array.isArray(parsedContent) ? parsedContent : [parsedContent]

    const modifiedNodes = useMemo(() => manipulateNodes(parsedContent), [content])

    const Tag = tag || Fragment
    return <Tag {...tagAttr}>{modifiedNodes}</Tag>
  }
  return null
}

export default ContentRender
