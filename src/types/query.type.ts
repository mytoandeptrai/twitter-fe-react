export interface IQueryPageInfinityParams<T> {
  data: T[]
  total: number
}

export interface IQueryInfinityListParams<T> {
  pages: IQueryPageInfinityParams<T>[]
}

export interface IQueryPaginationInput {
  page?: number
  pageParam?: number
  limit?: number
  limitParam?: number
}
