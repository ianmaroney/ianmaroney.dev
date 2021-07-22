import { useEffect, useState } from 'react'

/**
 * A React hook to watch keyboard interaction and return keycode values.
 * @return {string}
 */
export const useInputEvent = () => {
  const [key, setKey] = useState(null)

  useEffect(() => {
    const keyDownHandler = ({ code }) => setKey(code)
    const keyUpHandler = () => setKey(null)

    global.addEventListener('keydown', keyDownHandler)
    global.addEventListener('keyup', keyUpHandler)

    return () => {
      global.removeEventListener('keydown', keyDownHandler)
      global.removeEventListener('keyup', keyUpHandler)
    }
  }, [])

  return key
}
