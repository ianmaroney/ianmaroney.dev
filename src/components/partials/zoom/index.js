import { memo, useState, useRef, useCallback, cloneElement } from 'react'

import Zoomed from './zoomed'

import styles from './index.module.scss'

const Zoom = ({
  children,
  wrapper = 'div',
  wrapperStyle,
  wrapperClass,
  openText = 'Zoom image',
  closeText = 'Unzoom image',
  transitionDuration = 250,
  scrollableEl,
  portalEl,
  zoomMargin = 0,
  overlayBgColorEnd = 'rgba(255, 255, 255, 0.95)',
  overlayBgColorStart = 'rgba(255, 255, 255, 0)',
  zoomZindex = 2147483647,
  zoomedProps = {}
}) => {
  const Wrapper = wrapper || 'div'

  const [isActive, setIsActive] = useState(false)
  const [isChildLoaded, setIsChildLoaded] = useState(false)
  const isExpanded = isActive && isChildLoaded

  const handleClickTrigger = useCallback(
    e => {
      if (!isActive) {
        e.preventDefault()
        setIsActive(true)
      }
    },
    [isActive]
  )

  const handleChildLoad = useCallback(() => {
    setIsChildLoaded(true)
  }, [])

  const handleChildUnload = useCallback(() => {
    setIsActive(false)
    setIsChildLoaded(false)

    if (btnRef.current) {
      btnRef.current.focus({ preventScroll: true })
    }
  }, [])

  const wrapRef = useRef(null)
  const btnRef = useRef(null)

  const clonedChildren = cloneElement(children, Object.assign({}, children.props, zoomedProps))

  console.log('children', children)
  console.log('clonedChildren', clonedChildren)

  const status = isExpanded ? 'expanded' : 'default'
  if (children && Wrapper) {
    return (
      <Wrapper
        className={`${styles.zoom} ${status}${wrapperClass ? ` ${wrapperClass}` : ''}`}
        ref={wrapRef}
        style={wrapperStyle}
      >
        {children}
        <button
          aria-label={openText}
          onClick={handleClickTrigger}
          ref={btnRef}
        />
        {typeof window !== 'undefined' && isActive && (
          <Zoomed
            closeText={closeText}
            onLoad={handleChildLoad}
            onUnload={handleChildUnload}
            overlayBgColorEnd={overlayBgColorEnd}
            overlayBgColorStart={overlayBgColorStart}
            parentRef={wrapRef}
            portalEl={portalEl}
            scrollableEl={scrollableEl}
            transitionDuration={transitionDuration}
            zoomMargin={zoomMargin}
            zoomZindex={zoomZindex}
          >
            {clonedChildren}
          </Zoomed>
        )}
      </Wrapper>
    )
  }
  return null
}

export default memo(Zoom)
