import { IGetList, IQueryInfinityListParams } from '@/types'
import { flattenInfinityList, generateInfinityQueryListConfig } from '@/utils/query'
import { QueryFunctionContext, useInfiniteQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

type Props<T> = {
  queryKey: string | string[]
  queryFunction: (context: QueryFunctionContext) => Promise<IGetList<T>>
  queryConfig: {
    staleTime?: number
    limit?: number
  }
}

export const useInfinityList = <T>({ queryFunction, queryKey, queryConfig }: Props<T>) => {
  const query = useInfiniteQuery(
    typeof queryKey === 'string' ? [queryKey] : queryKey,
    queryFunction,
    generateInfinityQueryListConfig(queryConfig.staleTime, queryConfig.limit)
  )

  const { data: fetchedData, isLoading, fetchNextPage } = query

  const data = useMemo(() => {
    return flattenInfinityList<T>(fetchedData as IQueryInfinityListParams<T>)
  }, [fetchedData])

  const pages = fetchedData?.pages
  const totalRecords = pages?.[0].total || 0
  const hasMore = data.length < totalRecords

  return {
    data,
    isLoading,
    fetchNextPage,
    hasMore
  }
}
