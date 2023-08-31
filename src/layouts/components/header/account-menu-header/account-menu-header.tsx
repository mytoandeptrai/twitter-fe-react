import { BaseSelector, LoginButton, SmallAvatar, StyledFlex } from '@/components'
import { EFontSize, EFontWeight } from '@/constants'
import { switchRenderAuthenticatedComponent } from '@/hoc'
import { IUser } from '@/types'
import React, { useCallback } from 'react'
import { styled } from 'styled-components'
import { useAccountMenuHeader } from './hooks'
import { EAccountMenuHeaderOptions } from './account-menu-header.config'

const AccountMenu = () => {
  const { onChange, options, user } = useAccountMenuHeader()

  const renderValue = useCallback(() => {
    return (
      <React.Fragment>
        <SmallAvatar user={user as IUser} />
        <StyledAvatarCaption>{user?.name}</StyledAvatarCaption>
      </React.Fragment>
    )
  }, [user])

  return (
    <StyledRoot>
      <StyledFlex align='center' gap={1}>
        <BaseSelector<EAccountMenuHeaderOptions> onChange={onChange} options={options} renderValue={renderValue} />
      </StyledFlex>
    </StyledRoot>
  )
}

const AccountMenuHeader = switchRenderAuthenticatedComponent(AccountMenu, LoginButton)

export default AccountMenuHeader

const StyledRoot = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`

const StyledAvatarCaption = styled.div`
  font-size: ${EFontSize.Font3};
  font-weight: ${EFontWeight.FontWeight600};
`
