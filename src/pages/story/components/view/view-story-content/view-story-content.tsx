import { StoryActionSelector } from '@/components'
import { StoryViewer } from '@/features'
import { IStory, IStoryUserMetadata, IUser } from '@/types'
import clsx from 'clsx'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { AiFillLeftCircle, AiFillRightCircle } from 'react-icons/ai'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { useViewStoryContent } from './hook'
import classes from './view-story-content.module.css'

type Props = {
  currentStory: IStory[]
  activeStoryIdx: number
  storyOwners: IUser[]
  activeStory: IStory | null
  userStoryMetadata: IStoryUserMetadata | null
  onViewUserStories: (userId: string) => void
  onChangeActiveStoryIdx: (newActiveId: number) => void
}

const ViewStoryContent = (props: Props) => {
  const { t } = useTranslation()
  const { userId = '' } = useParams()
  const {
    activeStory,
    currentStory,
    activeStoryIdx,
    storyOwners,
    isBothCurrentUserAndOwner,
    itemsRef,
    hasArrowButtonGroup,
    userStoryMetadata,

    onRightArrowClick,
    onLeftArrowClick,
    onDeleteStory
  } = useViewStoryContent(props)

  const renderStoryHeading = () => {
    if (!userId) {
      return <StyledHeading>{t('pages.story.text.chooseYourStoryToView')} </StyledHeading>
    }

    return null
  }

  const renderStoryDropdown = () => {
    if (isBothCurrentUserAndOwner) {
      return (
        <StyledStoryActions>
          <StoryActionSelector
            onChange={() => onDeleteStory(activeStory?._id)}
            renderValue={() => {
              return null
            }}
          />
        </StyledStoryActions>
      )
    }

    return null
  }

  const renderStoryArrowButton = () => {
    const { hasNextButton, hasPreviousButton } = hasArrowButtonGroup
    return (
      <React.Fragment>
        {hasPreviousButton && (
          <StyledStoryArrowLeft onClick={() => onLeftArrowClick(activeStoryIdx, userStoryMetadata)}>
            <AiFillLeftCircle />
          </StyledStoryArrowLeft>
        )}
        {hasNextButton && (
          <StyledStoryArrowRight onClick={() => onRightArrowClick(activeStoryIdx, userStoryMetadata, currentStory)}>
            <AiFillRightCircle />
          </StyledStoryArrowRight>
        )}
      </React.Fragment>
    )
  }

  const renderStoryProgress = () => {
    return (
      <div className={classes.progresses}>
        {[...Array(currentStory.length)].map((_, idx: number) => {
          return (
            <div
              className={clsx(classes.progress, {
                [classes.active]: idx === activeStoryIdx
              })}
              ref={(el) => (itemsRef.current[idx] = el)}
              key={`progress-bar-${userId}-${idx}`}
            />
          )
        })}
      </div>
    )
  }

  const renderStoryContent = () => {
    const hasStoryOwners = !!storyOwners.length
    const hasCurrentStory = !!currentStory

    if (hasCurrentStory && hasStoryOwners) {
      return (
        <React.Fragment>
          {renderStoryDropdown()}
          {renderStoryProgress()}
          {activeStory && <StoryViewer story={activeStory} isSmall={true} />}
          {renderStoryArrowButton()}
        </React.Fragment>
      )
    }

    return null
  }

  return (
    <StyledRoot>
      <StyledMain className={classes.customMain}>
        {renderStoryHeading()}
        {renderStoryContent()}
      </StyledMain>
    </StyledRoot>
  )
}

export default ViewStoryContent

const StyledRoot = styled.main`
  width: 100%;
  height: calc(100vh - 120px);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
`

const StyledMain = styled.div`
  background: #333333;
  padding: 1.5rem;
  width: 50rem;
  height: 45rem;
  position: relative;
  border-radius: 5px;
`

const StyledHeading = styled.p`
  font-size: 1.2rem;
  font-weight: 500;
  padding-bottom: 1rem;
`

const StyledStoryActions = styled.div`
  position: absolute;
  top: 1.5rem;
  right: 0.5rem;
  z-index: 1;
  color: #2f80ed;
`

const StyledStoryArrowLeft = styled.button`
  position: absolute;
  top: 50%;
  left: -3rem;
  svg {
    fill: #fff;
    --size: 4rem;
    width: var(--size);
    height: var(--size);
  }
`

const StyledStoryArrowRight = styled.button`
  position: absolute;
  top: 50%;
  right: -3rem;
  svg {
    fill: #fff;
    --size: 4rem;
    width: var(--size);
    height: var(--size);
  }
`
