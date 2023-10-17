import { StyledFlex } from '@/components'
import React from 'react'
import Skeleton from 'react-loading-skeleton'

type Props = {
  numberOfSkeletons: number
}

const NotificationSkeleton = ({ numberOfSkeletons }: Props) => {
  return (
    <React.Fragment>
      {Array(numberOfSkeletons)
        .fill(0)
        .map((item, index) => (
          <StyledFlex
            key={index}
            gap={1}
            style={{
              marginBottom: '1rem'
            }}
          >
            <Skeleton width={50} height={'100%'} />
            <div
              style={{
                flex: 1
              }}
            >
              <Skeleton height={20} width={'100%'}></Skeleton>
              <Skeleton height={20} width={'100%'}></Skeleton>
            </div>
          </StyledFlex>
        ))}
    </React.Fragment>
  )
}

export default NotificationSkeleton
