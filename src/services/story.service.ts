import { axiosClient } from '@/apis'
import { EEndpoints, EStoryQuery } from '@/constants'
import { IStory, IStoryCreate, IStoryGroup, IStoryUpdate } from '@/types'
import { tryCatchFn } from '@/utils'
import { getList } from '@/utils/query'
import { QueryFunctionContext, useMutation } from '@tanstack/react-query'

export const useStoryService = () => {
  const getStoryList = (limit: number) => {
    return ({ pageParam }: QueryFunctionContext) => {
      const url = `${EEndpoints.Story}`
      const response = getList<IStory>(url, pageParam, { limit })
      return response
    }
  }

  const groupStoryByUser = (stories: IStory[]): IStoryGroup => {
    return stories?.reduce((res: IStoryGroup, curr: IStory) => {
      const { owner } = curr
      if (owner?._id) {
        if (res.hasOwnProperty(owner._id)) {
          res[owner._id].push(curr)
        } else {
          res[owner._id] = [curr]
        }
      }
      return res
    }, {})
  }

  const createStory = async (payload: IStoryCreate) => {
    return tryCatchFn<IStory | null>(
      async () => {
        const url = `${EEndpoints.Story}`
        const response = await axiosClient.post(url, payload)
        return response?.data
      },
      undefined,
      undefined,
      true
    )
  }

  const updateStory = async (payload: IStoryUpdate) => {
    return tryCatchFn<IStory | null>(async () => {
      const url = `${EEndpoints.Story}/${payload.storyId}`
      const response = await axiosClient.patch(url)
      return response?.data
    })
  }

  const deleteStory = async (payload: IStoryUpdate) => {
    return tryCatchFn<IStory | null>(async () => {
      const url = `${EEndpoints.Story}/${payload.storyId}`
      const response = await axiosClient.delete(url)
      return response?.data
    })
  }

  const createStoryMutation = useMutation([EStoryQuery.CreateStory], createStory)
  const updateStoryMutation = useMutation([EStoryQuery.UpdateStory], updateStory)
  const deleteStoryMutation = useMutation([EStoryQuery.DeleteStory], deleteStory)

  return {
    getStoryList,
    groupStoryByUser,

    createStoryMutation,
    updateStoryMutation,
    deleteStoryMutation
  }
}
