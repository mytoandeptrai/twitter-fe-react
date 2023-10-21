import { axiosClient } from '@/apis'
import { DEFAULT_POPULAR_LIMIT, DEFAULT_POPULAR_PAGE, EEndpoints, EUserQuery } from '@/constants'
import { UserModel } from '@/models'
import { IGetList, IUser } from '@/types'
import { tryCatchFn } from '@/utils'
import { getList } from '@/utils/query'
import { QueryFunctionContext, useMutation, useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'
import { EventBusName, onPushEventBusHandler } from './event-bus.service'

export const useUserService = () => {
  const queryClient = useQueryClient()

  const invalidateQueriesAfterSuccess = useCallback(
    (userId?: string) => {
      queryClient.invalidateQueries([EUserQuery.GetMe])
      queryClient.invalidateQueries([EUserQuery.GetPopularUser])
      queryClient.invalidateQueries([EUserQuery.GetUser])

      if (userId) queryClient.invalidateQueries([EUserQuery.GetUser, userId])
    },
    [queryClient]
  )

  const validateUser = useCallback(async (username: string): Promise<IUser | null> => {
    const users = await axiosClient.get(EEndpoints.User)
    const foundUser = users?.data.find((us: IUser) => us.username === username)
    return foundUser
  }, [])

  const getMe = useCallback(async (): Promise<IUser | undefined> => {
    const url = `${EEndpoints.User}/me`
    const response = await axiosClient.get(url)
    const me = new UserModel((response?.data?.data as IUser) || {}).getData()

    return me
  }, [])

  const getUser = useCallback(async ({ queryKey }: QueryFunctionContext) => {
    return tryCatchFn<IUser>(async () => {
      const [, id] = queryKey
      const url = `${EEndpoints.User}/${id}`
      const response = await axiosClient.get(url)
      const user = new UserModel(response?.data?.data as IUser).getData()

      return user
    })
  }, [])

  const getCurrentUser = useCallback((): IUser | undefined => {
    const user = queryClient.getQueryData([EUserQuery.GetMe])
    return new UserModel(user as IUser).getData()
  }, [queryClient])

  const getPopularUsers = (limit: number) => {
    return ({ pageParam }: QueryFunctionContext): Promise<IGetList<IUser>> => {
      const url = `${EEndpoints.User}/popular`
      const response = getList<IUser>(url, pageParam, { limit })
      return response
    }
  }

  const getLimitPopularUsers = async () => {
    return tryCatchFn<IUser[] | null>(async () => {
      const params = { page: DEFAULT_POPULAR_PAGE, limit: DEFAULT_POPULAR_LIMIT }
      const url = `${EEndpoints.User}/popular`
      const response = await axiosClient.get(url, { params })
      return response.data?.data
    })
  }

  const followUser = async (userId: string): Promise<IUser | void> => {
    try {
      const url = `${EEndpoints.User}/follow/${userId}`
      const response = await axiosClient.post(url)
      invalidateQueriesAfterSuccess(userId)
      return response?.data
    } catch (error) {
      onPushEventBusHandler({
        type: EventBusName.Error,
        payload: 'users.follow.error'
      })
    }
  }

  const unFollowUser = async (userId: string): Promise<IUser | void> => {
    try {
      const url = `${EEndpoints.User}/un-follow/${userId}`
      const response = await axiosClient.post(url)
      invalidateQueriesAfterSuccess(userId)
      return response?.data
    } catch (error) {
      onPushEventBusHandler({
        type: EventBusName.Error,
        payload: 'users.follow.error'
      })
    }
  }

  const followUserMutation = useMutation([EUserQuery.FollowUser], followUser)
  const unFollowUserMutation = useMutation([EUserQuery.UnFollowUser], unFollowUser)

  return {
    validateUser,

    getMe,
    getUser,
    getCurrentUser,
    getPopularUsers,
    getLimitPopularUsers,

    followUserMutation,
    unFollowUserMutation
  }
}
