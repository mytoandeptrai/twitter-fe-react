import { useInfinityList } from '@/hooks'
import { ITweet } from '@/types'
import React from 'react'
import { DEFAULT_TWEET_LIMIT, generateEmptyMessage } from './infinity-tweet-list.config'
import { useInfinityTweet } from './useInfinityTweet'
import { TweetItem, TweetItemSkeleton } from '@/features'
import { EFontWeight } from '@/constants'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import InfiniteScroll from 'react-infinite-scroll-component'

type Props = {
  queryKey: string
}

const InfinityTweetList = ({ queryKey }: Props) => {
  const { t } = useTranslation()
  const { queryFunction } = useInfinityTweet(queryKey)

  const {
    data: tweetData,
    isLoading,
    hasMore,
    fetchNextPage
  } = useInfinityList<ITweet>({
    queryFunction,
    queryKey: queryKey.includes(',') ? queryKey.split(',') : queryKey,
    queryConfig: {
      limit: DEFAULT_TWEET_LIMIT
    }
  })

  if (isLoading) {
    return (
      <React.Fragment>
        <TweetItemSkeleton />
      </React.Fragment>
    )
  }

  if (tweetData.length === 0) {
    return <StyledEmptyTweetList>{generateEmptyMessage(queryKey, t)}</StyledEmptyTweetList>
  }

  return (
    <React.Fragment>
      <InfiniteScroll
        next={fetchNextPage}
        hasMore={hasMore}
        dataLength={tweetData.length}
        loader={<TweetItemSkeleton />}
      >
        {tweetData?.map((tweet: ITweet) => <TweetItem tweet={tweet} key={`infinity-tweet-list-${tweet._id}`} />)}
      </InfiniteScroll>
    </React.Fragment>
  )
}

export default InfinityTweetList

const StyledEmptyTweetList = styled.h3`
  text-align: center;
  font-weight: ${EFontWeight.FontWeight600};
  margin-top: 5rem;
  font-size: 1.7rem;
`
