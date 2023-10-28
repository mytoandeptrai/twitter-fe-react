import { keyframes } from 'styled-components'

export const StyledBoundUpDown = keyframes`
  0% {
      -webkit-transform: translateY(0);
      transform: translateY(0);
  }
  50% {
      -webkit-transform: translateY(20px);
      transform: translateY(20px);
  }
  100% {
      -webkit-transform: translateY(0);
      transform: translateY(0);
  }
`
