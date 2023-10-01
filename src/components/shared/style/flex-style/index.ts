import { styled } from 'styled-components'

export const StyledFlex = styled('div')<{
  gap?: number
  justify?: string
  align?: string
  direction?: string
}>`
  display: flex;
  ${({ gap }) => gap && `gap: ${gap}rem`};
  ${({ align }) => align && `align-items: ${align};`}
  ${({ justify }) => justify && `justify-content: ${justify}`};
  ${({ direction }) => direction && `flex-direction: ${direction}`};
`
