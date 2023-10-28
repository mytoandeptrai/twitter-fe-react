import { PageMetaData } from '@/components'
import { ETweetQuery, SHORT_EXP_TIME } from '@/constants'
import { TweetItem } from '@/features'
import { LayoutWithHeader } from '@/layouts'
import { useTweetService } from '@/services'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'

const MAX_LENGTH_TWEET_META_TITLE = 50

const TweetDetail = () => {
  const { t } = useTranslation()
  const { getTweet } = useTweetService()
  const { tweetId } = useParams()

  const { data, isLoading } = useQuery([ETweetQuery.GetTweet, tweetId], getTweet, {
    staleTime: SHORT_EXP_TIME
  })

  const renderTweetDetail = () => {
    if (data) {
      return (
        <LayoutWithHeader>
          <Wrapper>
            <TweetItem tweet={data} isLoading={isLoading} />
          </Wrapper>
        </LayoutWithHeader>
      )
    }

    return null
  }

  if (!isLoading && !data) {
    return (
      <React.Fragment>
        <PageMetaData title={t('pages.tweet.not-found')} />
        <TweetNotFound>This tweet has been deleted or does not exist</TweetNotFound>
      </React.Fragment>
    )
  }

  return (
    <React.Fragment>
      <PageMetaData
        title={data?.content?.slice(0, MAX_LENGTH_TWEET_META_TITLE) || ''}
        description={data?.content || ''}
        image={data?.media?.[0] || ''}
      />
      {renderTweetDetail()}
    </React.Fragment>
  )
}

export default TweetDetail

const Wrapper = styled.div`
  max-width: 70rem;
  width: 100%;
  margin: 0 auto;
  margin-top: 2rem;
`

const TweetNotFound = styled.div`
  display: flex;
  align-items: center;
  height: 100vh;
  justify-content: center;
  font-size: 2rem;
  font-weight: 500;
  color: #eb5757;
`
