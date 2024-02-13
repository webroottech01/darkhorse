'server-only'

import { cookies } from 'next/headers'

console.log(
  'process.env.NEXT_PUBLIC_AUTH_COOKIE',
  process.env.NEXT_PUBLIC_AUTH_COOKIE
)

export const getAuthToken = () => {
  return cookies().get(process.env.NEXT_PUBLIC_AUTH_COOKIE!)?.value ?? undefined
}
