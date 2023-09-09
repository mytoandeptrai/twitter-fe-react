import { StyledFlex } from '@/components'
import React from 'react'
import Skeleton from 'react-loading-skeleton'

const NUMBER_OF_SKELETONS = 3

const TweetItemSkeleton = () => {
  const renderSkeletons = (count: number, height: string) => {
    return [...Array(count)].map((_, i) => <Skeleton key={`tweet-skeleton-comment-${i}`} height={height} />)
  }

  return (
    <div>
      <StyledFlex gap={2}>
        <Skeleton height='5rem' width='5rem' />
        <div style={{ flex: 1 }}>{renderSkeletons(2, '2rem')}</div>
      </StyledFlex>
      {renderSkeletons(1, '5rem')}
      <Skeleton height='40rem' />
      {renderSkeletons(2, '3rem')}
      {renderSkeletons(1, '5rem')}
      <div>{renderSkeletons(NUMBER_OF_SKELETONS, '3rem')}</div>
    </div>
  )
}

export default TweetItemSkeleton
