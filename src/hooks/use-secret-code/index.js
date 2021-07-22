import { useEffect, useState } from 'react'
import { useInputEvent } from '@/hooks/use-input'

/**
 * Monitor keyboard input for the entry of a "secret" code and return success state.
 * @param {array} secretCode An array of keycodes to watch for.
 * @return {bool}.
 */
const useSecretCode = (secretCode) => {
  const [count, setCount] = useState(0)
  const [success, setSuccess] = useState(false)
  const key = useInputEvent()

  useEffect(() => {
    if (key === null) return
    if (key !== secretCode[count]) {
      setCount(0)
      return
    }

    setCount((state) => state + 1)
    if (count + 1 === secretCode.length) {
      setSuccess(true)
    }
  }, [key])

  return success
}

export default useSecretCode
