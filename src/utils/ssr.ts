'server-only'

import { cookies } from 'next/headers'

export const getAuthToken = () => {
  return cookies().get(process.env.NEXT_PUBLIC_AUTH_COOKIE!)?.value ?? undefined
}
