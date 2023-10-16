import { IStory, IStoryUserMetadata } from '@/types'

interface IPayloadButton {
  storiesData: IStory[]
  activeStoryIdx: number
  userStoryMetadata: IStoryUserMetadata | null
}

const hasPreviousButtonHandler = (payload: IPayloadButton) => {
  const { activeStoryIdx, storiesData, userStoryMetadata } = payload
  const hasPreviousUserId = !!userStoryMetadata?.prevUserId
  const hasUserStories = storiesData && storiesData?.length > 1 && activeStoryIdx > 0
  return hasUserStories || hasPreviousUserId
}

const hasNextButtonHandler = (payload: IPayloadButton) => {
  const { activeStoryIdx, storiesData, userStoryMetadata } = payload
  const hasNextUserId = !!userStoryMetadata?.nextUserId
  const hasUserStories = storiesData && storiesData?.length > 1 && activeStoryIdx < storiesData.length - 1
  return hasUserStories || hasNextUserId
}

export { hasPreviousButtonHandler, hasNextButtonHandler }
