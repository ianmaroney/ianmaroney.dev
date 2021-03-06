import { useState } from 'react'

import Link from 'next/link'

import Nav from '@/partials/nav'

import styles from './index.module.scss'

const Header = ({ menus }) => {
  const [navigating, setNavigating] = useState(false)

  return (
    <header className={`${styles.header}${navigating ? ' navigating' : ''}`}>
      <Link href='/' className={styles.brand}>
        <a onClick={() => setNavigating(false)}>I<span className='sr-only'>an </span>M<span className='sr-only'>aroney</span></a>
      </Link>

      <button className={styles.toggle} onClick={() => setNavigating(!navigating)}>
        <span className='sr-only'>Menu</span>
        <span className='bar b1' />
        <span className='bar b2' />
      </button>

      <Nav navItems={menus.main || []} setNavigating={setNavigating} />
    </header>
  )
}

export default Header
