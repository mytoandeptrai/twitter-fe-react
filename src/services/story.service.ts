import { EEndpoints } from '@/constants'
import { IStory, IStoryGroup } from '@/types'
import { getList } from '@/utils/query'
import { QueryFunctionContext } from '@tanstack/react-query'

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

  return {
    getStoryList,
    groupStoryByUser
  }
}
