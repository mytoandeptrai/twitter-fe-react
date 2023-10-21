import { EBoxShadow, EProfileScreen } from '@/constants'
import { genericMemoComponent } from '@/hoc'
import { ISelectableSideBar } from '@/types'
import { TFunction } from 'i18next'
import _ from 'lodash'
import React, { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { styled } from 'styled-components'
import { v4 as uuid } from 'uuid'

type Props<T> = {
  onChange: (value: T) => void
  defaultValue: T
}

const generateOptions = (t: TFunction): ISelectableSideBar<EProfileScreen>[] => {
  return [
    {
      value: EProfileScreen.Home,
      name: t('pages.profile.text.profile'),
      id: uuid()
    },
    {
      value: EProfileScreen.Medias,
      name: t('pages.profile.text.media'),
      id: uuid()
    },
    {
      value: EProfileScreen.Liked,
      name: t('pages.profile.text.liked-tweets'),
      id: uuid()
    }
  ]
}

const ProfileSidebar = <T,>({ defaultValue, onChange }: Props<T>) => {
  const { t } = useTranslation()
  const [selected, setSelected] = useState(defaultValue)

  const options = useMemo(() => {
    return generateOptions(t)
  }, [t])

  const onClick = (value: T) => {
    setSelected(value)
    onChange(value)
  }

  return (
    <StyledRoot>
      <StyledList>
        {options.map(({ id, name, icon, value }) => {
          const isActive = _.isEqual(value, selected)

          return (
            <StyledListItem key={id} active={isActive} onClick={() => onClick(value as T)}>
              {icon}
              <span>{name}</span>
            </StyledListItem>
          )
        })}
      </StyledList>
    </StyledRoot>
  )
}

export default genericMemoComponent(ProfileSidebar)

const StyledRoot = styled.div`
  background: ${({ theme }) => theme.backgroundColor1};
  box-shadow: ${EBoxShadow.BoxShadow1};
  border-radius: 8px;
  padding: 2rem;
  padding-left: 0;
  position: sticky;
  top: 10rem;

  @media (max-width: 1024px) {
    width: 100%;
    padding: 0;
  }
`

const StyledList = styled.div`
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
        
        span {
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
