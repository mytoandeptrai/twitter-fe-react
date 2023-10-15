import { EStoryType } from '@/constants'
import { ROUTES_PATH } from '@/routes'
import { useStoryService } from '@/services'
import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const useCreateStory = () => {
  const navigate = useNavigate()
  const [storyAudience, setStoryAudience] = useState<number>(0)
  const [storyType, setStoryType] = useState<EStoryType>(EStoryType.Text)
  const { createStoryMutation } = useStoryService()

  const onCancelCreateStory = useCallback(() => {
    setStoryAudience(0)
    setStoryType(EStoryType.Text)
  }, [])

  const onSubmitStory = (text: string) => {
    const payload = {
      audience: storyAudience,
      content: text,
      type: storyType
    }

    createStoryMutation.mutate(payload, {
      onSuccess: () => {
        navigate(ROUTES_PATH.home)
      },
      onError: () => {
        console.log('🚀 ~ file error')
      }
    })
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
