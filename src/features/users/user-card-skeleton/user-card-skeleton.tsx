import { StyledFlex } from '@/components'
import React from 'react'
import Skeleton from 'react-loading-skeleton'

type Props = {
  numberOfSkeletons: number
}

const UserCardSkeleton = ({ numberOfSkeletons }: Props) => {
  return (
    <div>
      {Array(numberOfSkeletons)
        .fill(0)
        .map((_, index) => (
          <StyledFlex justify='space-between' key={`user-card-skeleton-${index}`}>
            <StyledFlex gap={1.8}>
              <Skeleton width='100px' height={30} />
              <Skeleton width='250px' height={30} />
            </StyledFlex>
            <Skeleton height={30} width='400px' />
          </StyledFlex>
        ))}
    </div>
  )
}

export default UserCardSkeleton
