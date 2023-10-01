import { EStoryType } from '@/constants'
import { useCallback, useState } from 'react'

export const useCreateStory = () => {
  const [storyAudience, setStoryAudience] = useState<number>(0)
  const [storyType, setStoryType] = useState<EStoryType>(EStoryType.Text)

  const onCancelCreateStory = useCallback(() => {
    setStoryAudience(0)
    setStoryType(EStoryType.Text)
  }, [])

  const onSubmitStory = (text: string, file?: string) => {
    console.log('🚀 ~ file: useCreateStory.ts:15 ~ onSubmitStory ~ text:', text, file, storyAudience, storyType)
  }

  const onChangeStoryType = useCallback((newStoryType: EStoryType) => {
    setStoryType(newStoryType)
  }, [])

  const onChangeStoryAudience = useCallback((newStoryAudience: number) => {
    setStoryAudience(newStoryAudience)
  }, [])

  return {
    storyAudience,
    setStoryAudience,
    storyType,
    setStoryType,
    onCancelCreateStory,
    onSubmitStory,
    onChangeStoryType,
    onChangeStoryAudience
  }
}
