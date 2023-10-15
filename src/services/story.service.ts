import { axiosClient } from '@/apis'
import { EEndpoints, EStoryQuery } from '@/constants'
import { IStory, IStoryCreate, IStoryGroup } from '@/types'
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

  return {
    getStoryList,
    groupStoryByUser,

    createStoryMutation: useMutation([EStoryQuery.CreateStory], createStory)
  }
}
