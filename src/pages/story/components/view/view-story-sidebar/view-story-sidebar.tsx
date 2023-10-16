import { useUserService } from '@/services'
import { IStory, IStoryGroup, IUser } from '@/types'
import React, { memo } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { findTheLargestStoryCreatedAt, isViewStoryHandler } from './view-story-sidebar.config'
import { calcDiffTimeString } from '@/utils'

type Props = {
  storyOwners: IUser[]
  storyGroups: IStoryGroup
  activeStory: IStory | null
  onViewUserStories: (userId: string) => void
}

const ViewStorySidebar = ({ storyGroups, storyOwners, activeStory, onViewUserStories }: Props) => {
  const { t } = useTranslation()
  const { getCurrentUser } = useUserService()
  const currentUser = getCurrentUser()

  const renderOwnerList = () => {
    if (!!storyOwners.length) {
      return (
        <React.Fragment>
          {storyOwners?.map((storyOwner: IUser) => {
            const userStories = storyGroups?.[storyOwner._id]
            const activeStoryCard = storyOwner._id === activeStory?.owner?._id
            const activeStoryImage = isViewStoryHandler(userStories, currentUser?._id)
            const newestCreatedStoryTime = findTheLargestStoryCreatedAt(userStories)
            const storyTimeText = calcDiffTimeString(newestCreatedStoryTime)
            return (
              <StyledStoryCard
                key={`user-story-card-list-${storyOwner._id}`}
                active={activeStoryCard}
                onClick={() => onViewUserStories(storyOwner._id)}
              >
                <StyledStoryUserAvatar
                  src={storyOwner?.avatar}
                  loading='lazy'
                  alt='owner-avatar'
                  active={activeStoryImage}
                />
                <StyledStoryUserInfoWrapper>
                  <StyledStoryUserName>{storyOwner.name}</StyledStoryUserName>
                  <StyledStoryUserTime>{storyTimeText}</StyledStoryUserTime>
                </StyledStoryUserInfoWrapper>
              </StyledStoryCard>
            )
          })}
        </React.Fragment>
      )
    }

    return null
  }

  return (
    <StyledRoot>
      <StyledHeading>{t('pages.story.text.view-story')}</StyledHeading>
      {renderOwnerList()}
    </StyledRoot>
  )
}

export default memo(ViewStorySidebar)

const StyledRoot = styled.div`
  width: 100%;
  height: calc(100vh - 120px);
  background: #333333;
  padding: 1.5rem;
  color: #fff;
`

const StyledHeading = styled.h3`
  font-size: 1.2rem;
  font-weight: 500;
  padding-bottom: 1rem;
`

const StyledStoryCard = styled('div')<{ active: boolean }>`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  gap: 2rem;
  cursor: pointer;
  padding: 1rem;
  border-radius: 1rem;
  transition: all 0.2s;

  ${({ active }) =>
    active &&
    `
    background: #4f4f4f;
    &:hover {
      background: #4f4f4f;
    }
  `}
`

const StyledStoryUserAvatar = styled('img')<{ active: boolean }>`
  --size: 5rem;
  width: var(--size);
  height: var(--size);
  object-fit: cover;
  border-radius: 50%;
  border: 4px solid rgba(256, 256, 256, 0.5);

  ${({ active }) =>
    active &&
    `
    border: 4px solid rgb(0 137 255 / 50%);
  `}
`

const StyledStoryUserInfoWrapper = styled.figcaption``

const StyledStoryUserName = styled.p`
  font-size: 1.2rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
`
const StyledStoryUserTime = styled.p`
  font-size: 1.1rem;
  font-weight: 400;
`
