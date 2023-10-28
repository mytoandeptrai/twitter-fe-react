import { axiosClient } from '@/apis'
import { EEndpoints, ERoomQuery } from '@/constants'
import { ICreateRoomDTO, IRoom } from '@/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useRoomService = () => {
  const queryClient = useQueryClient()

  const getUserRooms = async (): Promise<IRoom[] | undefined> => {
    const url = `${EEndpoints.Room}/myRoom`
    const response = await axiosClient.get(url)
    return response.data?.data
  }

  const createNewRoom = async (newCreatedRoomDTO: ICreateRoomDTO) => {
    try {
      const url = `${EEndpoints.Room}`
      const response = await axiosClient.post(url, newCreatedRoomDTO)
      queryClient.invalidateQueries([ERoomQuery.GetUserRooms])
      return response?.data?.data
    } catch (error: any) {
      throw error?.response?.data
    }
  }

  const createNewRoomMutation = useMutation([ERoomQuery.CreateRoom], createNewRoom)
  return {
    getUserRooms,
    createNewRoomMutation
  }
}
