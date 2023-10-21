import { StyledFlex } from '@/components'
import { EBoxShadow } from '@/constants'
import React from 'react'
import Skeleton from 'react-loading-skeleton'
import styled from 'styled-components'

const UserOverViewSkeleton = () => {
  return (
    <React.Fragment>
      <StyleBackgroundSkeleton>
        <Skeleton height={'35rem'} width={'1140px'} />
      </StyleBackgroundSkeleton>
      <StyledMain>
        <Skeleton height={'15rem'} width={'15rem'} />
        <StyledContent>
          <StyledFlex gap={2.5} justify='space-between'>
            <div>
              <Skeleton height={'3.6rem'} width={'50rem'} />
              <Skeleton height={'3.6rem'} width={'20rem'} />
              <Skeleton height={'3.6rem'} width={'30rem'} />
              <Skeleton height={'3.6rem'} width={'20rem'} />
            </div>
            <Skeleton height={'100%'} width={'20rem'} />
          </StyledFlex>
        </StyledContent>
      </StyledMain>
    </React.Fragment>
  )
}

export default UserOverViewSkeleton

const StyleBackgroundSkeleton = styled.div`
  max-width: 1140px;
  margin: 0 auto;
`

const StyledMain = styled.div`
  max-width: 1140px;
  margin: 0 auto;
  transform: translateY(-50%);
  display: flex;
  gap: 2.5rem;
  min-height: 18rem;
  padding: 2rem 2.5rem 3.5rem 2.5rem;
  box-shadow: ${EBoxShadow.BoxShadow1};
  background: ${({ theme }) => theme.backgroundColor1};
  border-radius: 12px;
  position: relative;
  z-index: 1;

  @media (max-width: 1024px) {
    transform: translateY(0);
    flex-direction: column;
  }

  @media (max-width: 567px) {
    margin: 0 1.5rem;
    align-items: center;
  }
`

const StyledContent = styled.div`
  flex: 1;
`
