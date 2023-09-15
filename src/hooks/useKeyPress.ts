import React from 'react'

export enum Keys {
  ESCAPE = 'Escape',
}

const useKeyPress = (key: string, onKeyPress: (e: KeyboardEvent) => void) => {
  React.useEffect(() => {
    function onKeyup(e: KeyboardEvent) {
      if (e.key === key) {
        onKeyPress(e)
      }
    }

    document.addEventListener('keyup', onKeyup)

    return () => document.removeEventListener('keyup', onKeyup)
  }, [])
}

export default useKeyPress
