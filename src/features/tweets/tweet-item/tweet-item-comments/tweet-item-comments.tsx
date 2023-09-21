import { ECommentQuery } from '@/constants'
import { useInfinityList } from '@/hooks'
import { useCommentService } from '@/services'
import { IComment } from '@/types'
import React from 'react'
import TweetItemCommentSkeleton from './tweet-item-comment-skeleton'
import styled from 'styled-components'
import { CommonButton } from '@/components'
import { useTranslation } from 'react-i18next'
import { CommentItem } from '@/features/comments'

type Props = {
  tweetId: string
}

const DEFAULT_COMMENT_LIST_SIZE = 5

const TweetItemComments = ({ tweetId }: Props) => {
  const { getTweetComments } = useCommentService()
  const { t } = useTranslation()

  const {
    data: commentsData,
    hasMore,
    isLoading,
    fetchNextPage
  } = useInfinityList<IComment>({
    queryFunction: getTweetComments(DEFAULT_COMMENT_LIST_SIZE),
    queryKey: [ECommentQuery.GetTweetComments, tweetId],
    queryConfig: { limit: DEFAULT_COMMENT_LIST_SIZE }
  })

  if (isLoading) {
    return (
      <StyledRoot>
        <TweetItemCommentSkeleton numberOfSkeleton={5} />
      </StyledRoot>
    )
  }

  return (
    <StyledRoot>
      {commentsData?.map((comment: IComment) => <CommentItem comment={comment} key={`comment-${comment._id}`} />)}
      {hasMore && <CommonButton onClick={() => fetchNextPage()}>{t('common.button.loadMore')}</CommonButton>}
    </StyledRoot>
  )
}

export default TweetItemComments

const StyledRoot = styled.div`
  margin-top: 1rem;
`
