import { EStoryQuery } from '@/constants'
import { useInfinityList } from '@/hooks'
import { UserModel } from '@/models'
import { ROUTES_PATH } from '@/routes'
import { useStoryService } from '@/services'
import { IStory, IStoryUserMetadata, IUser } from '@/types'
import _ from 'lodash'
import { useCallback, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const MAX_SHOWN_STORY_COUNT = 1000
const DEFAULT_ACTIVE_STORY_LIST = 0

export const useViewStory = (userId: string) => {
  const navigate = useNavigate()
  const { getStoryList } = useStoryService()
  const [activeStoryIdx, setActiveStoryIdx] = useState<number>(DEFAULT_ACTIVE_STORY_LIST)

  const { data: storiesData } = useInfinityList<IStory>({
    queryFunction: getStoryList(MAX_SHOWN_STORY_COUNT),
    queryKey: EStoryQuery.GetStories,
    queryConfig: {}
  })

  const groupedStoryByUsers = useMemo(() => {
    return _.groupBy(storiesData, 'owner._id')
  }, [storiesData])

  const currentStoryOfUser = useMemo(() => {
    return groupedStoryByUsers[userId] || null
  }, [groupedStoryByUsers, userId])

  const ownersOfAllStories = useMemo(() => {
    if (!!Object.values(groupedStoryByUsers).length) {
      const owners = Object.values(groupedStoryByUsers)?.map((stories: IStory[]) => {
        return new UserModel(stories?.[0]?.owner).getData()
      })

      return owners as IUser[]
    }

    return []
  }, [groupedStoryByUsers])

  const usersStoryMetadataSelector: IStoryUserMetadata | null = useMemo(() => {
    if (!userId || Object.values(groupedStoryByUsers).length === 0) {
      return null
    }

    /** convert stories data from object to array based on this [userId, [stories[] (stories of left userId) ]] */
    const convertedStoryToArray = Object.entries(groupedStoryByUsers)
    const idxInList = convertedStoryToArray.findIndex(([key]) => key === userId)
    const hasNext = idxInList < convertedStoryToArray.length - 1
    const hasPrev = idxInList > 0
    const nextUserId = hasNext ? convertedStoryToArray[idxInList + 1]?.[0] : null
    const prevUserId = hasPrev ? convertedStoryToArray[idxInList - 1]?.[0] : null

    return {
      idxInList,
      nextUserId,
      prevUserId
    }
  }, [groupedStoryByUsers, userId])

  const activeStory = useMemo(() => {
    return currentStoryOfUser?.[activeStoryIdx] || null
  }, [currentStoryOfUser, activeStoryIdx])

  const onViewUserStories = useCallback(
    (newUserId: string) => {
      /** Prevent click multiple time into one user */
      if (newUserId !== userId) {
        navigate(`${ROUTES_PATH.story.view}/${newUserId}`)
        setActiveStoryIdx(0)
      }
    },
    [navigate, userId]
  )

  const onChangeActiveStoryIdx = useCallback((newActiveStoryId: number) => setActiveStoryIdx(newActiveStoryId), [])

  return {
    groupedStoryByUsers,
    currentStoryOfUser,
    ownersOfAllStories,
    usersStoryMetadataSelector,
    activeStory,

    activeStoryIdx,

    onViewUserStories,
    onChangeActiveStoryIdx
  }
}
