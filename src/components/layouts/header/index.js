import { useState } from 'react'

import Link from 'next/link'

import Nav from '@/partials/nav'

import styles from './index.module.scss'

const Logo = ({ setNavigating }) => {
  return (
    <Link href='/' className={styles.brand}>
      <a onClick={e => setNavigating(false)}>I<span className='sr-only'>an </span>M<span className='sr-only'>aroney</span></a>
    </Link>
  )
}

const Header = ({ menus }) => {
  const navItems = menus && menus.main ? menus.main : []
  const [navigating, setNavigating] = useState(false)
  const [transition, setTransition] = useState(false)

  return (
      <Logo setNavigating={setNavigating} />
    <header className={`${styles.header}${navigating ? ' navigating' : ''}${transition ? ' t' : ''}`} role='banner'>

      <button className={styles.toggle} onClick={() => setNavigating(!navigating)} onMouseEnter={() => setTransition(true)} onFocus={() => setTransition(true)}>
        <span className='sr-only'>{navigating ? 'Hide' : 'Show'} Menu</span>
        <span className='bar b1' />
        <span className='bar b2' />
      </button>

      <Nav navItems={navItems} handleClick={e => setNavigating(false)} />
    </header>
  )
}

export default Header
