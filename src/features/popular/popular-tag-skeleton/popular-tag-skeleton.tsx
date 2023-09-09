import React from 'react'
import Skeleton from 'react-loading-skeleton'
import styled from 'styled-components'

type Props = {
  height?: number
  width?: number
  numberOfTags?: number
}

const PopularTagSkeleton = ({ height = 30, width = 100, numberOfTags = 1 }: Props) => {
  return (
    <React.Fragment>
      {Array(numberOfTags)
        .fill(0)
        .map((_, index) => (
          <StyledRootSkeleton key={`tag-item-skeleton-${index}`}>
            <Skeleton height={height} width={width} />
          </StyledRootSkeleton>
        ))}
    </React.Fragment>
  )
}

export default PopularTagSkeleton

const StyledRootSkeleton = styled.div`
  margin-bottom: 1rem;
`
