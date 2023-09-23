import { EEndpoints } from '@/constants'
import { ESearchType } from '@/types'
import { getList } from '@/utils/query'
import { useState } from 'react'

type TSearch = {
  search: string
  category: ESearchType
}

type TResponse = {
  type: ESearchType
  data: any[]
}

const initialQuery = {
  search: '',
  category: ESearchType.Tweet
}

const requestSearch = async <T>(query: TSearch) => {
  if (!query.search || !query.category) return { data: [], total: 0 }

  const url = `${EEndpoints.Search}?search=${query.search}&category=${query.category}`
  return getList<T>(url, 0, {
    limit: 1000
  })
}

export const useSearch = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [query, setQuery] = useState<TSearch>(initialQuery)
  const [response, setResponse] = useState<TResponse | null>(null)

  const onChange = (e: any) => {
    const { name, value } = e.target
    setQuery({
      ...query,
      [name]: value
    })
  }

  const onSubmit = async (e: any) => {
    e.preventDefault()
    if (!query.search.trim()) return

    setIsLoading(true)
    const { data } = await requestSearch(query)
    setResponse({
      type: query.category,
      data
    })
    setIsLoading(false)
  }

  return {
    query,
    isLoading,
    response,

    onSubmit,
    onChange
  }
}
