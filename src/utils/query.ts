import { axiosClient } from '@/apis'
import { DEFAULT_LIST_LIMIT, SORT_STALE_TIME } from '@/constants'
import {
  IGetList,
  IMessage,
  IPaginationParams,
  IQueryInfinityListParams,
  IQueryPageInfinityParams,
  IQueryPaginationInput
} from '@/types'

const getList = async <T>(endpoint: string, pageParam = 0, configParams = {}): Promise<IGetList<T>> => {
  const optionsParams = {
    params: {
      limit: DEFAULT_LIST_LIMIT,
      page: pageParam + 1,
      ...configParams
    }
  }
  const response = await axiosClient.get(endpoint, optionsParams)

  return {
    data: response?.data?.data || [],
    total: response?.data?.total || 0
  }
}

const generateInfinityQueryListConfig = (staleTime = SORT_STALE_TIME, limit = DEFAULT_LIST_LIMIT) => {
  return {
    staleTime,
    getPreviousPageParam: (lastPage: any, pages: any) => {
      return pages.length - 1
    },
    getNextPageParam: (lastPage: any, pages: any) => {
      const totalPage = lastPage.total / limit
      return pages.length < totalPage ? pages.length : null
    }
  }
}

const getPaginationFromInput = (input: IQueryPaginationInput): IPaginationParams => {
  return {
    page: input.page || input.pageParam || 0,
    limit: input.limit || input.limitParam || DEFAULT_LIST_LIMIT
  }
}

const flattenInfinityList = <T>(data: IQueryInfinityListParams<T>): T[] => {
  if (!data || data?.pages?.length === 0) {
    return []
  }

  return data?.pages?.reduce((res: T[], curr: IQueryPageInfinityParams<T>) => [...res, ...curr.data], [])
}

const flattenInfinityMessageList = (
  data: IQueryInfinityListParams<IMessage>
): {
  images: string[]
  convertedData: IMessage[]
} => {
  if (!data || data?.pages?.length === 0) {
    return {
      convertedData: [],
      images: []
    }
  }

  const images: string[] = []

  const convertedData = data?.pages
    ?.reduce((res: IMessage[], curr: IQueryPageInfinityParams<IMessage>) => {
      const pageMessages = curr?.data
      if (pageMessages && !!pageMessages.length) {
        pageMessages.forEach((message: IMessage) => {
          if (message.file && message.file.includes('.jpg')) {
            images.push(message.file)
          }
        })

        return [...res, ...curr?.data]
      }

      return res
    }, [])
    .reverse()

  return {
    convertedData,
    images
  }
}

export {
  getList,
  generateInfinityQueryListConfig,
  getPaginationFromInput,
  flattenInfinityList,
  flattenInfinityMessageList
}
