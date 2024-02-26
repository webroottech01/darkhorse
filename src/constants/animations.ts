import { keyframes } from 'styled-components'

export const fadeIn = () => {
  return keyframes`
    0% { opacity: 0; }
    100% { opacity: 1; }
  `
}
