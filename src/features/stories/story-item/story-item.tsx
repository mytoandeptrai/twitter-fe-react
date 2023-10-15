import { ROUTES_PATH } from '@/routes'
import { IStory } from '@/types'
import React, { useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { StoryViewer } from '../story-viewer'

type Props = {
  data: IStory
  userId?: string
  isSmall?: boolean
}

const StoryItem = ({ data, userId, isSmall }: Props) => {
  const navigate = useNavigate()

  const ownerInfo = useMemo(() => {
    const ownerName = data?.owner.name ?? ''
    const ownerAvatar = data?.owner.avatar ?? ''

    return {
      ownerName,
      ownerAvatar
    }
  }, [data?.owner])

  const onNavigateToView = useCallback(() => {
    const route = `${ROUTES_PATH.story.view}/${userId}`
    navigate(route)
  }, [navigate, userId])

  const renderAvatar = () => {
    if (ownerInfo.ownerAvatar) {
      return (
        <StyledOwnerInfoWrapper>
          <StyledOwnerImage loading='lazy' alt='owner avatar' src={ownerInfo?.ownerAvatar} />
        </StyledOwnerInfoWrapper>
      )
    }

    return null
  }

  return (
    <StyledRoot onClick={onNavigateToView}>
      <StoryViewer story={data} />
      {renderAvatar()}
    </StyledRoot>
  )
}

export default StoryItem

const StyledRoot = styled.article`
  width: 100%;
  height: 100%;
  position: relative;
  cursor: pointer;
`

const StyledOwnerInfoWrapper = styled.figure``

const StyledOwnerImage = styled.img`
  --size: 3rem;
  width: var(--size);
  height: var(--size);
  position: absolute;
  top: 1rem;
  left: 1rem;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid rgba(256, 256, 256, 0.5);
`
