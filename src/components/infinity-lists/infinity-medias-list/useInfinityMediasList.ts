import { DEFAULT_LIST_LIMIT, ETweetQuery } from '@/constants'
import { useTweetService } from '@/services'

type IPartialMediasStrategies = Partial<Record<ETweetQuery, (limit: number) => void>>

export const useInfinityMediasList = (queryKey: string[]) => {
  const { getMedias, getUserMedias } = useTweetService()

  const getMediasStrategies: IPartialMediasStrategies = {
    [ETweetQuery.GetTweetMedias]: getMedias,
    [ETweetQuery.GetTweetMediaByUser]: getUserMedias
  }

  const mediaFilterStrategy = getMediasStrategies[queryKey[0] as ETweetQuery] as Function

  return { queryFunction: mediaFilterStrategy(DEFAULT_LIST_LIMIT) }
}
