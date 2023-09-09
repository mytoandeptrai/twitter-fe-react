import { EBoxShadow } from '@/constants'
import { ITweet } from '@/types'
import React, { CSSProperties } from 'react'
import styled from 'styled-components'
import { TweetItemSkeleton } from './tweet-item-skeleton'
import { TweetItemHeader } from './tweet-item-header'
import { TweetItemContent } from './tweet-item-content'
import { TweetItemInteraction } from './tweet-item-interaction'

type Props = {
  tweet: ITweet
  isLoading?: boolean
  style?: CSSProperties
}

const TweetItem = ({ tweet, isLoading = false, style }: Props) => {
  if (isLoading) {
    return <TweetItemSkeleton />
  }

  return (
    <StyledRoot>
      <TweetItemHeader tweet={tweet} />
      <div>
        <TweetItemContent tweet={tweet} />
        <TweetItemInteraction tweet={tweet} />
      </div>
    </StyledRoot>
  )
}

export default TweetItem

const StyledRoot = styled.article`
  background: ${({ theme }) => theme.backgroundColor1};
  box-shadow: ${EBoxShadow.BoxShadow1};
  border-radius: 0.5rem;
  padding: 2rem;
  margin: 0 auto;
  margin-bottom: 3.5rem;
  max-width: 100%;
`
