import { EFontSize } from '@/constants'
import { useOnClickOutside } from '@/hooks'
import { safeCallFn } from '@/utils'
import React, { useCallback, useMemo, useRef, useState } from 'react'
import { styled } from 'styled-components'
import { Dropdown } from '../drop-down'

type TOptions<T> = {
  id: string | number
  value: T
  label: string
  icon?: React.ReactNode
}

type Props<T> = {
  defaultValue?: T
  onChange: (input: T) => void
  options: TOptions<T>[]
  renderValue?: (value: T) => React.ReactNode
  text?: string
}

const BaseSelector = <T,>({ defaultValue, options, text, renderValue, onChange: onChangeProp }: Props<T>) => {
  const [visibleDropdown, setVisibleDropdown] = useState<boolean>(false)
  const [value, setValue] = useState(defaultValue)
  const dropdownRef = useRef() as React.RefObject<HTMLDivElement>

  const toggleDropdown = () => setVisibleDropdown((isVisible) => !isVisible)

  const onChangeValue = useCallback(
    (newValue: T) => {
      safeCallFn(onChangeProp, newValue)
      setValue(newValue)
      setVisibleDropdown(false)
    },
    [onChangeProp]
  )

  useOnClickOutside(dropdownRef, () => setVisibleDropdown(false))

  const selections = useMemo(() => {
    return options.map((option) => {
      return (
        <SelectedItemSelectionItem onClick={() => onChangeValue(option.value)} key={option.id}>
          {option?.icon}
          <span>{option?.label}</span>
        </SelectedItemSelectionItem>
      )
    })
  }, [onChangeValue, options])

  const selectedItem = useMemo(() => {
    const currentValue = options.find((option) => option.value === value)
    if (renderValue && typeof renderValue === 'function' && value !== undefined) {
      return renderValue(value)
    }

    if (!currentValue) {
      return (
        <React.Fragment>
          <StyledSelectedItemText>{text}</StyledSelectedItemText>
        </React.Fragment>
      )
    }

    return (
      <React.Fragment>
        <StyledSelectedItemIcon>{currentValue?.icon}</StyledSelectedItemIcon>
        <StyledSelectedItemText>{currentValue?.label}</StyledSelectedItemText>
      </React.Fragment>
    )
  }, [options, renderValue, text, value])

  return (
    <Wrapper ref={dropdownRef}>
      <StyledSelectedItem onClick={toggleDropdown}>{selectedItem}</StyledSelectedItem>
      <Dropdown isVisible={visibleDropdown} items={selections} />
    </Wrapper>
  )
}

export default BaseSelector

export const Wrapper = styled.div`
  position: relative;
  z-index: 2;
  border: 1px solid;
  border-radius: 0.5rem;
`

export const StyledSelectedItem = styled.div`
  font-size: ${EFontSize.Font3};
  font-weight: 500;
  display: flex;
  gap: 0.8rem;
  align-items: center;
  cursor: pointer;
  padding: 1rem;
  border: var(--border-1);

  svg {
    --size: 1.6rem;
    width: var(--size);
    height: var(--size);
  }
`

export const StyledSelectedItemText = styled.p``

export const StyledSelectedItemIcon = styled.div``

export const SelectedItemDropdown = styled.div``

export const SelectedItemSelectionItem = styled.div`
  font-size: ${EFontSize.Font3};
  display: flex;
  gap: 1rem;
  align-items: center;

  svg {
    --size: 1.6rem;
    width: var(--size);
    height: var(--size);
  }
`
