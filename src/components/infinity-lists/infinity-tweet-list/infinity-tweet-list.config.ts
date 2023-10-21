import { ETweetQuery } from '@/constants'
import { TFunction } from 'i18next'

const DEFAULT_TWEET_LIMIT = 5

const generateMessageBasedOnQueryArray = (queryKey: string, t: TFunction): string => {
  const convertQueryKey = queryKey.split(',')
  let message = ''

  switch (convertQueryKey[0]) {
    case ETweetQuery.GetTweetByUser:
      message = t('pages.tweet.not-tweet-user-id-found')
      break
    case ETweetQuery.GetLikedTweetByUser:
      message = t('pages.tweet.not-liked-tweet-user-id-found')
      break
    case ETweetQuery.GetTweetMediaByUser:
      message = t('pages.tweet.not-media-user-id-found')
      break
    default:
      message = ''
      break
  }

  return message
}

const generateEmptyMessage = (queryKey: string, t: TFunction): string => {
  let message = ''
  switch (queryKey) {
    case ETweetQuery.GetLatestTweets:
      message = t('pages.tweet.not-latest-found')
      break
    case ETweetQuery.GetPopularTweets:
      message = t('pages.tweet.not-popular-found')
      break
    case ETweetQuery.GetBookmarkTweets:
      message = t('pages.tweet.not-bookmark-found')
      break
    default:
      message = ''
      break
  }

  return message
}

const generateMessage = (queryKey: string, t: TFunction): string => {
  const message = queryKey.includes(',')
    ? generateMessageBasedOnQueryArray(queryKey, t)
    : generateEmptyMessage(queryKey, t)

  return message
}

export { DEFAULT_TWEET_LIMIT, generateMessage }
