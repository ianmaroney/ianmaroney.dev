import { memo } from 'react'

import styles from './index.module.scss'

const Footer = memo((props) => {
  return (
    <footer className={styles.footer}>
      <p>✌️</p><p className='soft'>&copy;{new Date().getFullYear()} Ian Maroney</p>
    </footer>
  )
})

export default Footer
