import { ETweetQuery } from '@/constants'
import { useTweetService } from '@/services'
import { DEFAULT_TWEET_LIMIT } from './infinity-tweet-list.config'

type IPartialTweetStrategies = Partial<Record<ETweetQuery, (limit: number) => void>>

export const useInfinityTweet = (queryKey: string) => {
  let queryFunction = null
  const { getLatestTweets, getPopularTweets, getSavedTweets, getTweetsByHashTag, getUserTweets, getUserLikedTweets } =
    useTweetService()

  const getTweetsStrategies: IPartialTweetStrategies = {
    [ETweetQuery.GetLatestTweets]: getLatestTweets,
    [ETweetQuery.GetPopularTweets]: getPopularTweets,
    [ETweetQuery.GetSavedTweets]: getSavedTweets
  }

  const getUserTweetsStrategies: IPartialTweetStrategies = {
    [ETweetQuery.GetTweetByUser]: getUserTweets,
    [ETweetQuery.GetLikedTweetByUser]: getUserLikedTweets,
    [ETweetQuery.GetTweetByHashTag]: getTweetsByHashTag
  }

  if (!queryKey.includes(',')) {
    const tweetStrategy = getTweetsStrategies[queryKey as ETweetQuery] as Function
    queryFunction = tweetStrategy(DEFAULT_TWEET_LIMIT)
  } else {
    const [key] = queryKey.split(',')
    const userTweetStrategy = getUserTweetsStrategies[key as ETweetQuery] as Function
    queryFunction = userTweetStrategy(DEFAULT_TWEET_LIMIT)
  }

  return { queryFunction }
}
