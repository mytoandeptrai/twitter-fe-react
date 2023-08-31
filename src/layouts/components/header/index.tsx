import { Logo } from '@/components'
import { styled } from 'styled-components'
import { AccountMenuHeader } from './account-menu-header'
import { TopMenuHeader } from './top-menu-header'
import { memo } from 'react'

const Header = () => {
  return (
    <StyledRoot>
      <Logo />
      <TopMenuHeader />
      <AccountMenuHeader />
    </StyledRoot>
  )
}

export default memo(Header)

const StyledRoot = styled.div`
  background: #fff;
  padding: 1.5rem 7rem 0 7rem;
  display: flex;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 3;
  box-shadow:
    0 10px 20px 0 rgb(9 30 66 / 4%),
    0 20px 250px 0 rgb(9 30 66 / 4%);

  @media (max-width: 1024px) {
    padding: 1rem 1rem 0 1rem;
  }
`
