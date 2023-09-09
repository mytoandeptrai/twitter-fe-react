import { axiosClient } from '@/apis'
import { EEndpoints, EUserQuery } from '@/constants'
import { UserModel } from '@/models'
import { IUser } from '@/types'
import { tryCatchFn } from '@/utils'
import { QueryFunctionContext, useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'

export const useUserService = () => {
  const queryClient = useQueryClient()

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
    tryCatchFn<IUser>(async () => {
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

  return {
    validateUser,
    getMe,
    getUser,
    getCurrentUser
  }
}
