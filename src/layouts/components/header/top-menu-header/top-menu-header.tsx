import { useUserService } from '@/services'
import React, { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router-dom'
import { generateMenuLinks } from './top-menu-header.config'
import { styled } from 'styled-components'

const TopMenuHeader = () => {
  const { t } = useTranslation()
  const location = useLocation()
  const { getCurrentUser } = useUserService()
  const currentUser = getCurrentUser()

  const menuLinks = useMemo(() => {
    return generateMenuLinks(t, currentUser)
  }, [t, currentUser])

  const activeItemLink = useCallback((locationPathName: string, itemPathName: string): string => {
    const isSameLink = locationPathName === itemPathName
    return String(isSameLink)
  }, [])

  return (
    <StyledRoot visible={'true'}>
      <StyledList>
        {menuLinks?.map((item) => {
          return (
            <StyledItem key={item.id} active={activeItemLink(location.pathname, item.path)}>
              <Link to={item.path}>{item.name}</Link>
            </StyledItem>
          )
        })}
      </StyledList>
    </StyledRoot>
  )
}

export default TopMenuHeader

const StyledRoot = styled('div')<{
  visible: string
}>`
  display: flex;
  gap: 6rem;

  @media (max-width: 769px) {
    position: fixed;
    top: 0;
    left: 0;
    max-width: 300px;
    background: #fff;
    width: 200px;
    height: 100vh;
    z-index: 1;
    display: block;
    padding-top: 3rem;
    ${({ visible }) => visible === 'false' && `display: none`}
  }

  ${({ visible }) => visible === 'false' && `display: none`}
`
const StyledList = styled.div`
  display: flex;
  align-items: center;
  gap: 4.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`

const StyledItem = styled('li')<{ active: string }>`
  position: relative;
  padding: 1.5rem;

  & a {
    color: ${({ active, theme }) => (active === 'true' ? theme.backgroundColor2 : 'var(--gray-1)')};
    font-size: 1.4rem;
    font-weight: ${({ active }) => (active === 'true' ? '600' : '500')};
  }

  ${({ active, theme }) =>
    active === 'true' &&
    `
    &::after {
      content: ' ';
      position: absolute;
      left: 0;
      bottom: 0;
      height: 3px;
      background: ${theme.backgroundColor2};
      width: 100%;
      border-radius: 8px 8px 0 0;
    }
  `}
`
