import { axiosClient } from '@/apis'
import { EAuthQuery, EEndpoints, EUserQuery } from '@/constants'
import { UserModel } from '@/models'
import { ILogin, ILoginResponse } from '@/types'
import { tryCatchFn } from '@/utils'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useAuthService = () => {
  const queryClient = useQueryClient()

  const login = async (inputBody: ILogin): Promise<ILoginResponse | null> => {
    return tryCatchFn(async () => {
      const url = `${EEndpoints.Auth}/signin`
      const response = await axiosClient.post(url, inputBody)
      const { user, accessToken } = response?.data
      const userModel = new UserModel(user)

      return {
        accessToken,
        user: userModel
      }
    })
  }

  const register = async (inputBody: any): Promise<ILoginResponse | null> => {
    return tryCatchFn(async () => {
      const url = `${EEndpoints.Auth}/signup`
      const response = await axiosClient.post(url, inputBody)
      return response?.data?.accessToken || ''
    })
  }

  const logout = async (): Promise<void | null> => {
    return tryCatchFn(async () => {
      const url = `${EEndpoints.Auth}/logout`
      await axiosClient.post(url)
    })
  }

  const refreshGetMe = async () => {
    await queryClient.invalidateQueries([EUserQuery.GetMe])
  }

  const loginMutation = useMutation([EAuthQuery.Login], login)
  const registerMutation = useMutation([EAuthQuery.Register], register)
  const logoutMutation = useMutation([EAuthQuery.Logout], logout)

  return {
    logout,
    refreshGetMe,
    logoutMutation,
    loginMutation,
    registerMutation
  }
}
