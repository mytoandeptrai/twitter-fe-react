import { ETweetQuery } from '@/constants'
import { TFunction } from 'i18next'

const DEFAULT_TWEET_LIMIT = 5

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

export { DEFAULT_TWEET_LIMIT, generateEmptyMessage }
