'use client'

import { useEffect, useRef } from 'react'

const useInterval = (callback: () => void, delay?: number, skip?: boolean) => {
  const savedCallback = useRef<() => void>()

  useEffect(() => {
    if (skip) return

    savedCallback.current = callback
  }, [callback, skip])

  useEffect(() => {
    if (skip) return

    function tick() {
      savedCallback.current?.()
    }

    if (delay !== null) {
      let id = setInterval(tick, delay)
      return () => clearInterval(id)
    }

    return
  }, [delay, skip])
}

export default useInterval
