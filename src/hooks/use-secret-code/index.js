import { useEffect, useState } from 'react'
import { useInputEvent } from '@/hooks/use-input'

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
