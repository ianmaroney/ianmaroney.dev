import { memo, useState, useRef, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import useEvent from 'react-use/lib/useEvent'
import useWindowSize from 'react-use/lib/useWindowSize'

import { pseudoParentEl, getModalOverlayStyle, getModalContentStyle } from './helpers'

import styles from './index.module.scss'

const Zoomed = ({
  children,
  closeText = 'Unzoom Image',
  onUnload,
  onLoad,
  overlayBgColorEnd = 'rgba(255, 255, 255, 0.95)',
  overlayBgColorStart = 'rgba(255, 255, 255, 0)',
  parentRef,
  portalEl = document.body,
  scrollableEl = window,
  transitionDuration = 300,
  zoomMargin = 0,
  zoomZindex = 2147483647
}) => {
  const btnRef = useRef(null)
  const [, forceUpdate] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isUnloading, setIsUnloading] = useState(false)
  const { width: innerWidth, height: innerHeight } = useWindowSize()

  // on click, begin unloading
  const handleClick = useCallback(e => {
    e.preventDefault()
    setIsUnloading(true)
  }, [])

  // on escape, begin unloading
  const handleKeyDown = useCallback(e => {
    if (e.key === 'Escape' || e.keyCode === 27) {
      e.stopPropagation()
      setIsUnloading(true)
    }
  }, [])

  const handleScroll = useCallback(() => {
    forceUpdate(n => n + 1)

    if (!isUnloading) {
      setIsUnloading(true)
    }
  }, [isUnloading])

  useEvent('keydown', handleKeyDown, document)

  useEvent('scroll', handleScroll, scrollableEl)

  useEffect(() => {
    setIsLoaded(true)
    onLoad()

    if (btnRef.current) {
      btnRef.current.focus({ preventScroll: true })
    }
  }, [onLoad])

  useEffect(() => {
    const unloadTimeout = isUnloading
      ? setTimeout(onUnload, transitionDuration)
      : null

    return () => {
      if (unloadTimeout) {
        clearTimeout(unloadTimeout)
      }
    }
  }, [isUnloading, onUnload, transitionDuration])

  const parentEl = parentRef.current || pseudoParentEl

  const { height, left, top, width } = parentEl.getBoundingClientRect()

  const overlayStyle = getModalOverlayStyle({
    isLoaded,
    isUnloading,
    overlayBgColorEnd,
    overlayBgColorStart,
    transitionDuration,
    zoomZindex
  })

  const contentStyle = getModalContentStyle({
    height,
    isLoaded,
    innerHeight,
    innerWidth,
    isUnloading,
    left,
    originalTransform: parentEl.style.transform,
    top,
    transitionDuration,
    width,
    zoomMargin
  })

  return createPortal(
    <div className={styles.zoomed} aria-modal role='dialog' style={overlayStyle}>
      <div style={contentStyle}>
        {children}
      </div>
      <button
        aria-label={closeText}
        onClick={handleClick}
        ref={btnRef}
      />
    </div>,
    portalEl
  )
}

export default memo(Zoomed)
