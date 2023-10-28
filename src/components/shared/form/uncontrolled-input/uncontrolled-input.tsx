import { EFontSize, EFontWeight } from '@/constants'
import React, { forwardRef, InputHTMLAttributes, memo, useState } from 'react'

import styled from 'styled-components'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  classes?: any
  icon?: JSX.Element
  invalid?: boolean
  filter?: RegExp | undefined
  label?: string
  customStyles?: string
}

const UncontrolledInput = forwardRef<HTMLInputElement, Props>(
  ({ icon: Icon = undefined, filter = undefined, label, customStyles = '', ...otherProps }, ref) => {
    const [value, setValue] = useState<any>('')

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value)
    }

    return (
      <StyledRoot>
        <StyledLabel>
          {label} {Icon}
        </StyledLabel>
        <StyledInput value={value} {...otherProps} onChange={onChange} ref={ref} customStyles={customStyles} />
      </StyledRoot>
    )
  }
)

UncontrolledInput.displayName = 'MyInput'

export default memo(UncontrolledInput)

const StyledRoot = styled.div`
  margin-bottom: 2rem;
`

const StyledLabel = styled.label`
  display: flex;
  gap: 1rem;
  font-size: ${EFontSize.Font4};
  text-transform: capitalize;
  font-weight: ${EFontWeight.FontWeight500};
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.textColor};
  align-items: center;
`

const StyledInput = styled('input')<{
  customStyles?: string
}>`
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.borderColor1};
  border-radius: 0.5rem;
  font-size: 1.3rem;
  width: 100%;
  color: ${({ theme }) => theme.textColor};

  ${({ customStyles }) => customStyles}
`
