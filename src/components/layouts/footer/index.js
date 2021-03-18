import styles from './index.module.scss'

const Footer = (props) => {
  return (
    <footer className={styles.footer} role='contentinfo'>
      <p>✌️</p><p className='soft'>&copy;{new Date().getFullYear()} Ian Maroney</p>
    </footer>
  )
}

export default Footer
