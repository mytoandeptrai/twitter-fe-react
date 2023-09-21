import { InfinityVirtualList, StyledShake, StyledSpin } from '@/components'
import { EBoxShadow, EFontSize, EFontWeight, EInteractionButton } from '@/constants'
import { switchRenderAuthenticatedComponent } from '@/hoc'
import { ITweet } from '@/types'
import React, { Suspense, memo, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { FiRefreshCw } from 'react-icons/fi'
import styled, { css } from 'styled-components'
import { useTweetItemInteraction } from './hooks'
import { UserCard } from '@/features/users'
import { CreateCommentForm } from '@/features/comments'

const DEFAULT_USER_VISUAL = 400

const CommonModal = React.lazy(() => import('@/components/ui/modal/common-modal/common-modal'))

type Props = {
  tweet: ITweet
}

const TweetItemInteraction = ({ tweet }: Props) => {
  const { t } = useTranslation()
  const { userListData, userListModalRef, modalUserListHeader, tweetSummaryOptions, tweetGroupButtonOptions } =
    useTweetItemInteraction(tweet)

  const userList = useMemo(() => {
    return (
      <React.Fragment>
        <InfinityVirtualList
          Item={UserCard}
          hasNextPage={false}
          isNextPageLoading={false}
          loadNextPage={() => {
            return
          }}
          items={userListData}
          height={DEFAULT_USER_VISUAL}
        />
      </React.Fragment>
    )
  }, [userListData])

  const renderTweetSummary = () => {
    return (
      <StyledSummary>
        {tweetSummaryOptions.map((option) => {
          const onClick = () => {
            if (option.count === 0) {
              return
            }

            return option.onClick()
          }

          return (
            <StyledSummaryItem key={option.id} onClick={onClick}>
              {option.count} {t(option.text)}
            </StyledSummaryItem>
          )
        })}
      </StyledSummary>
    )
  }

  const renderTweetGroupButton = () => {
    return (
      <StyledInteractionButtonGroup>
        {tweetGroupButtonOptions.map((option) => (
          <StyledInteractionButton
            key={option.id}
            onClick={option.onClick}
            liked={option.liked}
            retweeted={option.retweeted}
            saved={option.saved}
            interactionType={option.interactionType}
          >
            {option.icon}
            <span>{t(option.text)}</span>
          </StyledInteractionButton>
        ))}
      </StyledInteractionButtonGroup>
    )
  }

  return (
    <React.Fragment>
      <Suspense fallback={<div>...Loading...</div>}>
        <CommonModal header={modalUserListHeader} body={userList} ref={userListModalRef} />
      </Suspense>
      <StyledRoot>
        {renderTweetSummary()}
        {renderTweetGroupButton()}
      </StyledRoot>
      <CreateCommentForm tweet={tweet} />
    </React.Fragment>
  )
}

export default switchRenderAuthenticatedComponent(memo(TweetItemInteraction))

const StyledRoot = styled.div``

const StyledSummary = styled.div`
  display: flex;
  gap: 1.6rem;
  align-items: center;
  justify-content: center;
  margin: 0.8rem 0;

  @media (max-width: 576px) {
    justify-content: space-between;
    flex-wrap: wrap;
  }
`
const StyledSummaryItem = styled.button`
  color: ${({ theme }) => theme.textColor7};
  font-size: ${EFontSize.Font3};
  font-weight: ${EFontWeight.FontWeight500};
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`
const StyledInteractionButtonGroup = styled.div`
  border-top: ${EBoxShadow.BoxShadow1};
  border-bottom: 1px solid ${({ theme }) => theme.backgroundColor4};
  padding: 0.4rem 0;
  display: flex;
  justify-content: space-between;
`

const StyledInteractionButton = styled.button<{
  customStyle?: string
  liked?: boolean
  saved?: boolean
  retweeted?: boolean
  interactionType?: EInteractionButton
}>`
  cursor: pointer;
  padding: 1.1rem 4rem;
  border-radius: 0.8rem;
  display: flex;
  gap: 1.2rem;
  align-items: center;
  font-weight: ${EFontWeight.FontWeight500};

  color: ${(props) => {
    if (props.liked) {
      return props.theme.textColor8
    }
    if (props.saved) {
      return props.theme.textColor2
    }
    if (props.retweeted) {
      return props.theme.textColor5
    }
  }};

  ${({ interactionType }) =>
    interactionType === EInteractionButton.Share &&
    css`
      &:hover {
        svg {
          animation: ${StyledSpin} 1s linear infinite;
        }
      }
    `}

  ${({ interactionType }) =>
    (interactionType === EInteractionButton.Like ||
      interactionType === EInteractionButton.Save ||
      interactionType === EInteractionButton.Comment) &&
    css`
      &:hover {
        svg {
          animation: ${StyledShake} 1s linear infinite;
        }
      }
    `}
    
  
  &:hover {
    background-color: ${({ theme }) => theme.backgroundColor4};
  }

  @media (max-width: 576px) {
    padding: 1rem;
    span {
      display: none;
    }
  }
`

export const AnimatedShareIcon = styled(FiRefreshCw)`
  &:hover {
    animation: ${StyledSpin} 1s linear infinite;
  }
`
