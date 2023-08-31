import { axiosClient } from '@/apis'
import { EEndpoints, EHashTagQuery } from '@/constants'
import { IHashtag, IUpdateHashtagDTO } from '@/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'

interface ITagsExistenceMap {
  [key: string]: boolean
}

type IHashtags = string[]

export const useHashtagService = () => {
  const queryClient = useQueryClient()

  const getMostPopularHashTags = async (): Promise<IHashtag[] | undefined> => {
    try {
      const url = `${EEndpoints.HashTag}/most-popular`
      const response = await axiosClient.get(url)
      return response?.data?.data || []
    } catch (error) {
      console.log('Error in getMostPopularHashTags:', error)
    }
  }

  const updateHashtag = async (bodyData: IUpdateHashtagDTO) => {
    const { count, name } = bodyData
    try {
      const url = `${EEndpoints.HashTag}/${name}`
      const response = await axiosClient.patch(url, { count })
      return response?.data
    } catch (error) {
      console.log('Error in updateHashtag:', error)
    }
  }

  const updateHashtagMutation = useMutation([EHashTagQuery.UpdateHashTag], updateHashtag, {
    onSuccess: () => {
      queryClient.invalidateQueries([EHashTagQuery.GetPopularTags])
    }
  })

  const getTagsExistenceMap = (tags: IHashtags = []): ITagsExistenceMap => {
    const tagsExistenceMap: ITagsExistenceMap = {}

    if (tags && tags.length > 0) {
      tags.forEach((tag) => {
        tagsExistenceMap[tag] = true
      })
    }

    return tagsExistenceMap
  }

  const updateHashTags = async (oldHashtags: IHashtags, newHashtags: IHashtags) => {
    const oldTagsExistenceMap = getTagsExistenceMap(oldHashtags)
    const newTagsExistenceMap = getTagsExistenceMap(newHashtags)

    const updateHashtagObjects: IUpdateHashtagDTO[] = []

    newHashtags.forEach((tag) => {
      if (!oldTagsExistenceMap[tag]) {
        updateHashtagObjects.push({ name: tag, count: 1 })
      }
    })

    oldHashtags.forEach((tag) => {
      if (!newTagsExistenceMap[tag]) {
        updateHashtagObjects.push({ name: tag, count: -1 })
      }
    })

    const updateHashtagResponse = await Promise.all(
      updateHashtagObjects.map(async (updateObj: IUpdateHashtagDTO) => {
        return updateHashtagMutation.mutateAsync(updateObj)
      })
    )

    return updateHashtagResponse
  }

  return {
    updateHashtagMutation,
    getMostPopularHashTags,
    updateHashTags
  }
}
