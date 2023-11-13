import { IDefaultListResponse, IGetList, IMessage, IQueryInfinityListParams } from '@/types'
import { flattenInfinityMessageList, generateInfinityQueryListConfig } from '@/utils/query'
import { QueryFunctionContext, useInfiniteQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

type Props = {
  queryKey: string[]
  queryFunction: (context: QueryFunctionContext) => Promise<IGetList<IMessage>> | IDefaultListResponse
  queryConfig: {
    staleTime?: number
    limit?: number
    retry?: boolean
  }
}

export const useInfinityMessageList = ({ queryFunction, queryKey, queryConfig }: Props) => {
  const query = useInfiniteQuery(
    queryKey,
    queryFunction,
    generateInfinityQueryListConfig(queryConfig.staleTime, queryConfig.limit)
  )

  const { data: fetchedData, isLoading, fetchNextPage } = query

  const data = useMemo(() => {
    return flattenInfinityMessageList(fetchedData as IQueryInfinityListParams<IMessage>)
  }, [fetchedData])

  const pages = fetchedData?.pages
  const totalRecords = pages?.[0].total || 0
  const hasMore = data.convertedData.length < totalRecords

  return {
    data,
    isLoading,
    fetchNextPage,
    hasMore,
    totalRecords
  }
}
