'use client'

const _window = typeof window !== 'undefined' ? window : undefined

export const debounce = (callback: (...args: any) => void, wait?: number) => {
  let timeoutId: number | undefined = undefined

  //@ts-ignore
  return (...args) => {
    //@ts-ignore
    _window?.clearTimeout(timeoutId)
    timeoutId = _window?.setTimeout(() => {
      callback.apply(null, args)
    }, wait)
  }
}
