import { axiosClient } from '@/apis'
import { EEndpoints, ETweetQuery } from '@/constants'
import { TweetModel } from '@/models'
import { ICreateTweetDTO, ITweet, IUpdateTweetDTO } from '@/types'
import { QueryFunctionContext, useMutation } from '@tanstack/react-query'
import { EventBusName, onPushEventBusHandler } from './event-bus.service'
import { getList } from '@/utils/query'
import { tryCatchFn } from '@/utils'

export const useTweetService = () => {
  const getLatestTweets = (limit: number) => {
    return ({ pageParam }: QueryFunctionContext) => {
      const url = `${EEndpoints.Tweet}/latest`
      const response = getList<ITweet>(url, pageParam, { limit })
      return response
    }
  }

  const getPopularTweets = (limit: number) => {
    return ({ pageParam }: QueryFunctionContext) => {
      const url = `${EEndpoints.Tweet}/popular`
      const response = getList<ITweet>(url, pageParam, { limit })
      return response
    }
  }

  const getSavedTweets = (limit: number) => {
    return ({ pageParam }: QueryFunctionContext) => {
      const url = `${EEndpoints.Tweet}/user/saved`
      const response = getList<ITweet>(url, pageParam, { limit })
      return response
    }
  }

  const getTweetsByHashTag = (limit: number) => {
    return ({ pageParam, queryKey }: QueryFunctionContext) => {
      const [, hashtag] = queryKey
      const url = `${EEndpoints.Tweet}/hashtag/${hashtag}`
      const response = getList<ITweet>(url, pageParam, { limit })
      return response
    }
  }

  const getUserTweets = (limit: number) => {
    return ({ queryKey, pageParam }: QueryFunctionContext) => {
      const [, userId] = queryKey
      const url = `${EEndpoints.Tweet}/user/${userId}`
      const response = getList<ITweet>(url, pageParam, { limit })
      return response
    }
  }

  const getUserLikedTweets = (limit: number) => {
    return ({ queryKey, pageParam }: QueryFunctionContext) => {
      const [, userId] = queryKey
      const url = `${EEndpoints.Tweet}/liked/${userId}`
      const response = getList<ITweet>(url, pageParam, { limit })
      return response
    }
  }

  const getTweet = async ({ queryKey }: QueryFunctionContext) => {
    return tryCatchFn<ITweet>(async () => {
      const [, id] = queryKey
      const url = `${EEndpoints.Tweet}/${id}`
      const response = await axiosClient.get(url)
      return new TweetModel(response?.data?.data).getData()
    })
  }

  const getMedias = (limit: number) => {
    return ({ pageParam }: QueryFunctionContext) => {
      const url = `${EEndpoints.Tweet}/medias`
      const response = getList<ITweet>(url, pageParam, { limit })
      return response
    }
  }

  const getUserMedias = (limit: number) => {
    return ({ queryKey, pageParam }: QueryFunctionContext) => {
      const [, userId] = queryKey
      const url = `${EEndpoints.Tweet}/user-medias/${userId}`
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

  const reactTweet = async (tweetId: string) => {
    return tryCatchFn<ITweet>(async () => {
      const url = `${EEndpoints.Tweet}/react/${tweetId}`
      const response = await axiosClient.post(url)
      return response?.data
    }, true)
  }

  const retweet = async (tweetId: string) => {
    return tryCatchFn<ITweet>(async () => {
      const url = `${EEndpoints.Tweet}/retweet/${tweetId}`
      const response = await axiosClient.post(url)
      return response?.data
    }, true)
  }

  const saveTweet = async (tweetId: string) => {
    return tryCatchFn<ITweet>(async () => {
      const response = await axiosClient.post(`${EEndpoints.Tweet}/save/${tweetId}`)
      return response?.data
    }, true)
  }

  const reportTweet = async (tweetId: string) => {
    return tryCatchFn(async () => {
      const response = await axiosClient.patch(`${EEndpoints.Tweet}/report/${tweetId}`)
      return response?.data
    }, true)
  }

  const createTweetMutation = useMutation([ETweetQuery.CreateTweet], createTweet)
  const updateTweetMutation = useMutation([ETweetQuery.UpdateTweet], updateTweet)
  const reactTweetMutation = useMutation([ETweetQuery.ReactTweet], reactTweet)
  const retweetMutation = useMutation([ETweetQuery.Retweet], retweet)
  const saveTweetMutation = useMutation([ETweetQuery.SaveTweet], saveTweet)
  const reportTweetMutation = useMutation([ETweetQuery.ReportTweet], reportTweet)

  return {
    getTweet,
    getLatestTweets,
    getPopularTweets,
    getSavedTweets,
    getTweetsByHashTag,

    getUserTweets,
    getUserLikedTweets,
    getUserMedias,

    getMedias,

    createTweetMutation,
    updateTweetMutation,
    reactTweetMutation,
    retweetMutation,
    saveTweetMutation,
    reportTweetMutation
  }
}
