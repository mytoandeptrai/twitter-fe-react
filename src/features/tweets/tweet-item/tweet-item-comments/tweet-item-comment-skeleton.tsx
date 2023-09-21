import { StyledFlex } from '@/components'
import React from 'react'
import Skeleton from 'react-loading-skeleton'

type Props = {
  numberOfSkeleton: number
}

const TweetItemCommentSkeleton = ({ numberOfSkeleton }: Props) => {
  return (
    <React.Fragment>
      {Array(numberOfSkeleton)
        .fill(0)
        .map((item, index) => (
          <StyledFlex
            key={`tweet-item-comment-skeleton-${index}`}
            gap={1}
            style={{
              marginBottom: '1rem'
            }}
          >
            <Skeleton width='5rem' height='3rem' />
            <Skeleton width='35rem' height='5rem' />
          </StyledFlex>
        ))}
    </React.Fragment>
  )
}

export default TweetItemCommentSkeleton
