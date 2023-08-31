import { keyframes } from 'styled-components'

export const StyledSpin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

export const StyledShake = keyframes`
  0% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(2px);
  }
  50% {
    transform: translateX(0px);
  }
  75%{
    transform: translateX(-2px);
  }
  100% {
    transform: translateX(0);
  }
`
