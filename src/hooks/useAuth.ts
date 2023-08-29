import React from 'react'

export default function useAuth() {
  const [loggedIn, setLoggedIn] = React.useState(false)

  return { loggedIn }
}
