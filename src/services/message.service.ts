import { DEFAULT_LIST_RESPONSE, EEndpoints } from '@/constants'
import { IMessage } from '@/types'
import { getList } from '@/utils/query'
import { QueryFunctionContext } from '@tanstack/react-query'

export const useMessageService = () => {
  const getMessages = (limit: number) => {
    return ({ pageParam, queryKey }: QueryFunctionContext) => {
      const [, roomId] = queryKey
      if (queryKey?.length < 2 || !roomId) {
        return DEFAULT_LIST_RESPONSE
      }

      const url = `${EEndpoints.Message}/${roomId}`
      const response = getList<IMessage>(url, pageParam, { limit })
      return response
    }
  }

  return {
    getMessages
  }
}
