import { IStory } from '@/types'

const isViewStoryHandler = (storiesData: IStory[], userId?: string) => {
  if (!userId) return false
  return storiesData?.every((story: IStory) => story.viewerIds.includes(userId))
}

const findTheLargestStoryCreatedAt = (storiesData: IStory[]) => {
  const theLargestDate =
    storiesData?.reduce((acc: Date, story: IStory) => {
      const storyTime = new Date(story.createdAt)
      return storyTime.getTime() > new Date(acc).getTime() ? storyTime : acc
    }, new Date('1990-01-01')) || new Date()

  return theLargestDate
}

export { isViewStoryHandler, findTheLargestStoryCreatedAt }
