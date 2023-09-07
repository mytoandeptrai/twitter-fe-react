import { EFontSize, EFontWeight } from '@/constants'
import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

type Props = {
  to: string
  icon: React.ReactNode
  text: string
}

const IconLink = ({ to, icon, text }: Props) => {
  return (
    <React.Fragment>
      <StyledIconWrapper to={to}>
        {icon} {text}
      </StyledIconWrapper>
    </React.Fragment>
  )
}

export default IconLink

const StyledIconWrapper = styled(Link)`
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  font-size: ${EFontSize.Font5};
  gap: 1rem;
  font-weight: ${EFontWeight.FontWeight500};
  color: ${({ theme }) => theme.textColor2};
`
