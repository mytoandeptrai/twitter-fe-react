/* eslint-disable no-lone-blocks */
import { EUpdateType } from '@/constants'
import { IInfinityListData, IInfinityListDataPage } from '@/types'
import { useQueryClient } from '@tanstack/react-query'

interface IOptimisticQuery<T> {
  type: EUpdateType
  data: T
  queryKey: string | string[]
}

type ICachedDataQuery<T> = IInfinityListData<T> | undefined

export const useQueryService = () => {
  const queryClient = useQueryClient()

  const cancelQueries = async (queryKey: string | string[]) => {
    await queryClient.cancelQueries([queryKey])
  }

  const getCreateUpdatedPages = <T extends { _id: string }>(
    cachedDataQuery: ICachedDataQuery<T>,
    data: T
  ): IInfinityListDataPage<T>[] => {
    const newCreateUpdatedPages = cachedDataQuery?.pages?.map((page, index: number) => {
      if (index === 0) {
        return {
          ...page,
          data: [data, ...page.data]
        }
      }
      return page
    })
    return newCreateUpdatedPages || []
  }

  const getUpdateUpdatedPages = <T extends { _id: string }>(
    cachedDataQuery: ICachedDataQuery<T>,
    data: T
  ): IInfinityListDataPage<T>[] => {
    const newEditedUpdatedPages = cachedDataQuery?.pages?.map((page: IInfinityListDataPage<T>) => {
      return {
        ...page,
        data: page.data.map((item: any) => {
          if (item?._id === data?._id) {
            return {
              ...item,
              ...data
            }
          }
          return item
        })
      }
    })
    return newEditedUpdatedPages || []
  }

  const getDeleteUpdatedPages = <T extends { _id: string }>(
    cachedDataQuery: ICachedDataQuery<T>,
    data: T
  ): IInfinityListDataPage<T>[] => {
    const newDeletedUpdatedPages = cachedDataQuery?.pages?.map((page: IInfinityListDataPage<T>) => {
      return {
        ...page,
        data: page?.data?.filter((item: any) => {
          return item?._id !== data?._id
        })
      }
    })
    return newDeletedUpdatedPages || []
  }

  const getUpdatedPages = <T extends { _id: string }>(
    cachedDataQuery: ICachedDataQuery<T>,
    data: T,
    type: EUpdateType
  ): IInfinityListDataPage<T>[] => {
    switch (type) {
      case EUpdateType.Create:
        return getCreateUpdatedPages(cachedDataQuery, data)
      case EUpdateType.Update:
        return getUpdateUpdatedPages(cachedDataQuery, data)
      case EUpdateType.Delete:
        return getDeleteUpdatedPages(cachedDataQuery, data)
      default:
        return []
    }
  }

  const updateQueryData = <T extends { _id: string }>(
    queryKey: string | string[],
    cachedDataQuery: ICachedDataQuery<T>,
    updatedPages: IInfinityListDataPage<T>[]
  ) => {
    queryClient.setQueryData([queryKey], {
      ...cachedDataQuery,
      pages: updatedPages
    })
  }

  const optimisticUpdateInfinityList = async <T extends { _id: string }>(
    queryData: IOptimisticQuery<T>
  ): Promise<void> => {
    const { data, queryKey, type } = queryData

    await cancelQueries(queryKey)

    const cachedDataQuery: ICachedDataQuery<T> = queryClient.getQueryData([queryKey])
    const updatedPages = getUpdatedPages(cachedDataQuery, data, type)

    updateQueryData(queryKey, cachedDataQuery, updatedPages)
  }

  return { optimisticUpdateInfinityList }
}
