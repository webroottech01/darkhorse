import React from 'react'

const baseUrl = 'http://localhost:8050'

export default function useCheckout() {
  const checkout = React.useCallback((checkoutUrl: string) => {
    window.location.href = checkoutUrl
  }, [])

  return {
    checkout,
  }
}
