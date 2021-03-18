import Link from 'next/link'

import styles from './index.module.scss'

const NavItem = ({ navItem, handleClick }) => {
  if (navItem && navItem.title && navItem.url) {
    return (
      <li>
        <Link href={navItem.url}>
          <a onClick={handleClick}>{navItem.title}</a>
        </Link>
      </li>
    )
  }
  return null
}

const Nav = ({ navItems, handleClick }) => {
  if (navItems && navItems.length) {
    return (
      <nav className={styles.nav} role='navigation'>
        <ul>
          {navItems.map((navItem, i) => <NavItem key={navItem.title} navItem={navItem} handleClick={handleClick} />)}
        </ul>
      </nav>
    )
  }
  return null
}

export default Nav
