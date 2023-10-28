import React, { ChangeEvent, forwardRef, InputHTMLAttributes, memo } from 'react'

import styled from 'styled-components'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  classes?: any
  value?: string | number
  icon?: string
  invalid?: boolean
  filter?: RegExp | undefined
  label?: string
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  customStyles?: string
}

const ControlledInput = forwardRef<HTMLInputElement, Props>(
  ({ icon = undefined, filter = undefined, label, onChange, customStyles = '', ...otherProps }, ref) => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      if (!filter || (event?.target?.value && filter.test(event.target.value))) {
        onChange && onChange(event)
      }
    }

    return (
      <StyledRoot>
        <label>{label}</label>
        <div>
          {icon && <div>{icon}</div>}
          <StyledInput {...otherProps} onChange={handleChange} ref={ref} customStyles={customStyles} />
        </div>
      </StyledRoot>
    )
  }
)

ControlledInput.displayName = 'MyInput'

export default memo(ControlledInput)

const StyledRoot = styled.div`
  width: 100%;
`

const StyledInput = styled('input')<{
  customStyles?: string
}>`
  padding: 1rem;
  border: 1px solid var(--gray-4);
  border-radius: 0.5rem;
  font-size: 1.3rem;
  outline: none;
  width: 100%;
  background: transparent;

  &:disabled {
    cursor: not-allowed;
  }

  ${({ customStyles }) => customStyles}
`
