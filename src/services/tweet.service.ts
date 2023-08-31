import { axiosClient } from '@/apis'
import { EEndpoints, ETweetQuery } from '@/constants'
import { TweetModel } from '@/models'
import { ICreateTweetDTO, ITweet, IUpdateTweetDTO } from '@/types'
import { QueryFunctionContext, useMutation } from '@tanstack/react-query'
import { EventBusName, onPushEventBusHandler } from './event-bus.service'
import { getList } from '@/utils/query'

export const useTweetService = () => {
  const getLatestTweets = async (limit: number) => {
    return ({ pageParam }: QueryFunctionContext) => {
      console.log('🚀 ~ file: tweet.service.ts:12 ~ return ~ pageParam:', pageParam, { limit })
      const url = `${EEndpoints.Tweet}/latest`
      const response = getList<ITweet>(url, pageParam, limit)
      return response
    }
  }

  const getPopularTweets = async (limit: number) => {
    return ({ pageParam }: QueryFunctionContext) => {
      const url = `${EEndpoints.Tweet}/popular`
      const response = getList<ITweet>(url, pageParam, { limit })
      return response
    }
  }

  const getSavedTweets = async (limit: number) => {
    return ({ pageParam }: QueryFunctionContext) => {
      const url = `${EEndpoints.Tweet}/user/saved`
      const response = getList<ITweet>(url, pageParam, { limit })
      return response
    }
  }

  const createTweet = async (newTweet: ICreateTweetDTO): Promise<ITweet | undefined> => {
    try {
      const url = `${EEndpoints.Tweet}`
      const response = await axiosClient.post(url, newTweet)
      const tweet = new TweetModel(response?.data).getData()
      return tweet
    } catch (error) {
      onPushEventBusHandler({
        type: EventBusName.Error,
        payload: 'tweet.create.error'
      })
    }
  }

  const updateTweet = async ({ tweetId, updatedTweet }: IUpdateTweetDTO): Promise<ITweet | undefined> => {
    if (!tweetId) {
      onPushEventBusHandler({
        type: EventBusName.Error,
        payload: 'tweet.update.invalidTweetId'
      })

      return
    }
    try {
      const url = `${EEndpoints.Tweet}/${tweetId}`
      const response = await axiosClient.patch(url, updatedTweet)
      const tweet = new TweetModel(response?.data).getData()
      return tweet
    } catch (error) {
      onPushEventBusHandler({
        type: EventBusName.Error,
        payload: 'tweet.update.error'
      })
    }
  }

  const createTweetMutation = useMutation([ETweetQuery.CreateTweet], createTweet)
  const updateTweetMutation = useMutation([ETweetQuery.UpdateTweet], updateTweet)

  return {
    createTweetMutation,
    updateTweetMutation,
    getLatestTweets,
    getPopularTweets,
    getSavedTweets
  }
}
