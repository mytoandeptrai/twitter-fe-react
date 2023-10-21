import { IUser } from '@/types'
import React from 'react'
import { useUserOverView } from './hook'
import { UserOverViewSkeleton } from '../user-overview-skeleton'
import styled from 'styled-components'
import { DEFAULT_BACKGROUND_URL, EBoxShadow, EFontSize, EFontWeight } from '@/constants'
import { StyledFlex } from '@/components'
import { FaBirthdayCake } from 'react-icons/fa'
import { UserOverViewStatistics } from '../user-overview-statistics'
import { UserOverViewActions } from '../user-overview-actions'
import { useTranslation } from 'react-i18next'
import ImageWithUpload from '@/components/shared/image/image-with-upload/image-with-upload'

type Props = {
  user: IUser
  isLoading: boolean
}

const UserOverview = ({ user, isLoading }: Props) => {
  const { t } = useTranslation()
  const { currentUser, isMe, onUpdateAvatar } = useUserOverView(user)

  const renderUserOverviewSkeleton = () => {
    if (isLoading) {
      return (
        <StyledUserOverview>
          <UserOverViewSkeleton />
        </StyledUserOverview>
      )
    }

    return null
  }

  const renderUserOverviewInfo = () => {
    return (
      <StyledInfoWrapper>
        <StyledFlex gap={2.5}>
          <StyledName>{user?.name}</StyledName>
          <UserOverViewStatistics user={user} />
        </StyledFlex>
        <StyledInfoContent>
          <StyledUsername>@{user?.username}</StyledUsername>
          <StyledBio>{user?.bio}</StyledBio>
          <StyledBirthday>
            <FaBirthdayCake /> {user?.birthday && new Date(user.birthday).toLocaleDateString()}
          </StyledBirthday>
        </StyledInfoContent>
      </StyledInfoWrapper>
    )
  }

  const renderUserOverviewActions = () => {
    if (currentUser?._id) {
      return <UserOverViewActions userId={currentUser._id} />
    }

    return null
  }

  const renderUserOverviewUpload = () => {
    return (
      <ImageWithUpload
        src={user?.avatar}
        label={t('pages.profile.text.updateYourAvatar')}
        updatable={isMe}
        id={`update-user-avatar-${user?._id}`}
        wrapperCustomStyles='margin-top: -7.5rem;'
        onOk={onUpdateAvatar}
      />
    )
  }

  const renderUserOverviewMain = () => {
    return (
      <React.Fragment>
        <StyledCoverPhoto img={user?.coverPhoto || DEFAULT_BACKGROUND_URL} />
        <StyledMain>
          {renderUserOverviewUpload()}
          {renderUserOverviewInfo()}
          {renderUserOverviewActions()}
        </StyledMain>
      </React.Fragment>
    )
  }

  return (
    <div>
      {renderUserOverviewSkeleton()}
      {renderUserOverviewMain()}
    </div>
  )
}

export default UserOverview

const StyledCoverPhoto = styled.div<{
  img: string
}>`
  background-image: url(${(props) => props.img});
  background-size: cover;
  background-position: center center;
  height: 35rem;
`

const StyledMain = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  background: ${({ theme }) => theme.backgroundColor1};
  padding: 2rem 2.5rem 3.5rem 2.5rem;
  box-shadow: ${EBoxShadow.BoxShadow1};
  border-radius: 12px;
  display: flex;
  gap: 2.5rem;
  min-height: 18rem;
  margin-top: -5%;
  margin-bottom: 5rem;
  position: relative;

  @media (max-width: 1024px) {
    transform: translateY(0);
    flex-direction: column;
  }

  @media (max-width: 567px) {
    margin: 0 1.5rem;
    align-items: center;
  }
`

const StyledInfoWrapper = styled.div`
  max-width: 50%;
  @media (max-width: 1024px) {
    max-width: 100%;
  }
`

const StyledInfoContent = styled.div``

const StyledName = styled.h2`
  font-weight: ${EFontWeight.FontWeight600};
  font-size: 2.4rem;
  line-height: 3.6rem;
  color: ${(props) => props.theme.textColor9};
  letter-spacing: 0.5px;
`

const StyledUsername = styled.p`
  color: ${(props) => props.theme.backgroundColor2};
  font-size: ${EFontSize.Font3};
  font-weight: ${EFontWeight.FontWeight500};
  margin-bottom: 1rem;
`

const StyledBio = styled.p`
  color: var(--gray-1);
  font-weight: ${EFontWeight.FontWeight500};
  font-size: ${EFontSize.Font6};
  line-height: 2.5rem;
`

const StyledBirthday = styled.p`
  font-size: ${EFontSize.Font3};
  color: ${(props) => props.theme.backgroundColor2};
`

const StyledUserOverview = styled.div`
  margin-top: 2rem;
`
