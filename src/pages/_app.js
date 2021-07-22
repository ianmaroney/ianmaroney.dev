import '../styles/style.scss'

import Primary from '@/templates/primary'

/**
 * Custom `<App />` component.
 * @param {node} Component The page component from `/src/pages`.
 * @param {object} pageProps All props used in page Component.
 * @return {node}
 */
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
