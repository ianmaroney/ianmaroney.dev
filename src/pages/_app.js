import '../styles/style.scss'

import Primary from '@/templates/primary'

function MyApp ({ Component, pageProps }) {
  return (
    <Primary {...pageProps}>
      <Component {...pageProps} />
    </Primary>
  )
}

// export function reportWebVitals (metric) {
//   console.log(metric)
// }

export default MyApp
