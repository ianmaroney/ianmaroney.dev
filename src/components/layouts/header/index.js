import { useState } from 'react'

import Link from 'next/link'

import Nav from '@/partials/nav'

import styles from './index.module.scss'

/**
 * The logotype within the site-wide `<header />` element.
 * @param {func} handleClick An onClick event for the logotype on the <header />.
 * @return {node}
 */
const Logo = ({ handleClick }) => {
  return (
    <Link href='/' className={styles.brand} prefetch={false}>
      <a onClick={handleClick}>
        I<span className='sr-only'>an </span>M<span className='sr-only'>aroney</span>
      </a>
    </Link>
  )
}

/**
 * The site-wide `<header />` element.
 * @param {object} menus Menus data.
 * @return {node}
 */
const Header = ({ menus }) => {
  const navItems = menus && menus.main ? menus.main : []
  const [navigating, setNavigating] = useState(false)
  const [transition, setTransition] = useState(false)

  const handleClick = () => setNavigating(false)

  return (
    <header className={`${styles.header}${navigating ? ' navigating' : ''}${transition ? ' t' : ''}`} role='banner'>
      <Logo handleClick={handleClick} />

      <button className={styles.toggle} onClick={() => setNavigating(!navigating)} onMouseEnter={() => setTransition(true)} onFocus={() => setTransition(true)}>
        <span className='sr-only'>{navigating ? 'Hide' : 'Show'} Menu</span>
        <span className='bar b1' />
        <span className='bar b2' />
      </button>

      <Nav navItems={navItems} handleClick={handleClick} />
    </header>
  )
}

export default Header
