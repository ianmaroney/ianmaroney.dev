import Link from 'next/link'

import styles from './index.module.scss'

const Nav = ({ navItems, handleClick }) => {
  if (navItems && navItems.length) {
    return (
      <nav className={styles.nav}>
        <ul>
          {navItems.map((navItem, i) => {
            return (
              <li key={navItem.title}>
                <Link href={navItem.url}>
                  <a onClick={() => setNavigating(false)}>{navItem.title}</a>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    )
  }
  return null
}

export default Nav
