import React from 'react'

const baseUrl = 'http://localhost:8050'

export default function useCheckout() {
  const checkout = React.useCallback((cartId: string, venueId: string) => {
    window.location.href = `${baseUrl}/checkout/${venueId}/${cartId}`
  }, [])

  return {
    checkout,
  }
}
