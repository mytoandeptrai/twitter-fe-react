import { SmallAvatar, StyledFlex } from '@/components'
import { EBoxShadow, EFontSize, EProfileType } from '@/constants'
import { ROUTES_PATH } from '@/routes'
import { IUser } from '@/types'
import React, { CSSProperties, memo } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

type Props = {
  data: IUser
  style?: CSSProperties
  renderValue?: (user: IUser) => React.ReactNode
}

const UserCard = ({ data, style, renderValue }: Props) => {
  const { t } = useTranslation()

  const followersCount = data?.followers ? data?.followers?.length : 0

  const renderUserInfo = () => {
    return (
      <Link to={`${ROUTES_PATH.profile}/${data._id}?screen=${EProfileType.Home}`}>
        <StyledUserName>{data.name}</StyledUserName>
        <StyledUserFollowers>
          {followersCount} {`${t('follower')}${followersCount > 1 ? 's' : ''}`}
        </StyledUserFollowers>
      </Link>
    )
  }

  const renderUserWithFollow = () => {
    if (renderValue && typeof renderValue === 'function') {
      return (
        <StyledFlex gap={1.8} align='flex-start' justify='space-between'>
          <StyledFlex gap={1.8}>
            <SmallAvatar user={data} />
            {renderUserInfo()}
          </StyledFlex>
          {renderValue(data)}
        </StyledFlex>
      )
    }

    return (
      <StyledFlex gap={1.8}>
        <SmallAvatar user={data} />
        {renderUserInfo()}
      </StyledFlex>
    )
  }

  return (
    <StyledRoot style={style}>
      {renderUserWithFollow()}
      <StyledUserBio>{data?.bio}</StyledUserBio>
    </StyledRoot>
  )
}

export default memo(UserCard)

const StyledRoot = styled('article')<{
  style: CSSProperties | undefined
}>`
  background: ${({ theme }) => theme.backgroundColor1};
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;
  box-shadow: ${EBoxShadow.BoxShadow1};
  margin-bottom: 1rem;
  border-radius: 0.8rem;
  min-width: 50rem;
  max-width: 95%;
  height: 17.5rem !important;
  margin: 1rem;

  ${({ style }) => ({ ...(style ?? {}) })}
`

const StyledUserName = styled.p`
  font-size: ${EFontSize.Font7};
`

const StyledUserFollowers = styled.p`
  font-size: ${EFontSize.Font3};
  color: ${({ theme }) => theme.textColor6};
`

const StyledUserBio = styled.p`
  font-size: ${EFontSize.Font5};
  color: ${({ theme }) => theme.textColor6};
`
