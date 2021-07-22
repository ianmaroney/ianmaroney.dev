import Link from 'next/link'

import styles from './index.module.scss'

/**
 * Nav items within the site-wide `<nav />` element.
 * @param {array} navItems An array of nav item objects.
 * @param {func} handleClick An onClick event to be assigned to each nav item.
 * @return {node}
 */
const NavItem = ({ navItem, handleClick }) => {
  if (navItem && navItem.title && navItem.url) {
    return (
      <li>
        <Link href={navItem.url} prefetch={false}>
          <a onClick={handleClick}>{navItem.title}</a>
        </Link>
      </li>
    )
  }
  return null
}

/**
 * The site-wide `<nav />` element.
 * @param {array} navItems An array of nav item objects.
 * @param {func} handleClick An onClick event to be assigned to each nav item.
 * @return {node}
 */
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
