import { EEndpoints } from '@/constants'
import { IGetList, TSearch } from '@/types'
import { getList } from '@/utils/query'

export const useSearchService = () => {
  const getSearchRequest = async <T>(query: TSearch): Promise<IGetList<T>> => {
    if (!query.category || !query.search) {
      return {
        data: [],
        total: 0
      }
    }

    const url = `${EEndpoints.Search}/?search=${query.search}&category=${query.category}`
    const response = getList<T>(url, 0, { limit: 1000 })
    return response
  }

  return {
    getSearchRequest
  }
}
