import React from 'react'
import { EBoxShadow } from '@/constants'
import { genericMemoComponent } from '@/hoc'
import { IOptionSidebar } from '@/types'
import _isEqual from 'lodash/isEqual'
import styled from 'styled-components'

type Props<T> = {
  onChange: (value: T) => void
  options: IOptionSidebar<T>[]
  defaultValue: T
}

const LeftSelectableSideBar = <T,>({ options, defaultValue, onChange: propsOnChange }: Props<T>) => {
  const renderOptionList = () => {
    if (!!options.length) {
      return (
        <StyledList>
          {options.map(({ id, name, icon, value }: IOptionSidebar<T>) => {
            const isActive = _isEqual(value, defaultValue)

            return (
              <StyledListItem key={id} active={isActive} onClick={() => propsOnChange(value)}>
                {icon && icon}
                <span>{name}</span>
              </StyledListItem>
            )
          })}
        </StyledList>
      )
    }

    return null
  }

  return <StyledRoot>{renderOptionList()}</StyledRoot>
}

export default genericMemoComponent(LeftSelectableSideBar)

const StyledRoot = styled.div`
  background: ${({ theme }) => theme.backgroundColor1};
  box-shadow: ${EBoxShadow.BoxShadow1};
  border-radius: 8px;
  padding: 2rem 2rem 2rem 0;
  position: sticky;
  top: 10rem;

  @media (max-width: 1024px) {
    width: 100%;
    padding: 0;
  }
`

const StyledList = styled.div`
  display: block;
  @media (max-width: 1024px) {
    display: flex;
    justify-content: center;
  }
`

const StyledListItem = styled('button')<{ active: boolean }>`
  padding: 1rem 2rem;
  position: relative;
  display: block;
  cursor: pointer;
  width: 100%;
  text-align: left;

  ${(props) =>
    props.active &&
    `
        &::before{
            content: ' ';
            position: absolute;
            left: 0;
            top: 0;
            width: 3px;
            background: ${props.theme.backgroundColor2};
            height: 100%;
            border-radius: 0px 8px 8px 0px;
        }
        
        @media (max-width: 1024px) {
            background: ${props.theme.backgroundColor2};
        }
        
        a {
          @media (max-width: 1024px) {
            color: ${props.theme.textColor4} !important;
          }
        }
    `}

  @media (max-width: 1024px) {
    margin-bottom: 0;
    display: flex;
    align-items: center;
  }

  span {
    font-weight: 600;
    font-size: 1.4rem;
    color: ${(props) => (props.active ? `${props.theme.backgroundColor2}` : `${props.theme.textColor6}`)};
  }
`
