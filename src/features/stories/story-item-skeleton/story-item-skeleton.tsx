import React from 'react'
import Skeleton from 'react-loading-skeleton'
import styled from 'styled-components'

type Props = {
  numberOfSkeleton: number
}

const StoryItemSkeleton = ({ numberOfSkeleton }: Props) => {
  return (
    <React.Fragment>
      {Array(numberOfSkeleton)
        .fill(0)
        .map((_, index) => (
          <StyledRootSkeleton key={`story-item-skeleton-${index}`}>
            <Skeleton height='17rem' width='10rem' />
          </StyledRootSkeleton>
        ))}
    </React.Fragment>
  )
}

export default StoryItemSkeleton

const StyledRootSkeleton = styled.div`
  border-radius: 1rem;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;
`
