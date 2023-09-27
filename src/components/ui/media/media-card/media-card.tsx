import { IMediaWithTweetId } from '@/types'
import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { MediaViewer } from '../media-viewer'

type Props = {
  tweet: IMediaWithTweetId
}

const MediaCard = ({ tweet }: Props) => {
  const url = `/tweet/${tweet.tweetId}`
  return (
    <StyledWrapper to={url}>
      <StyledMediaWrapper>
        <MediaViewer data={tweet} />
      </StyledMediaWrapper>
    </StyledWrapper>
  )
}

export default React.memo(MediaCard)

export const StyledWrapper = styled(Link)`
  position: relative;
  overflow: hidden;
  cursor: pointer;
`

export const StyledMediaWrapper = styled.div`
  width: 100%;
  overflow: hidden;
  margin-bottom: 2rem;
`
