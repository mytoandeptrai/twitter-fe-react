import { ChangeEvent, useCallback, useState } from 'react'
import { IStoryFormValue, initialStoryFormValue } from './story-form-text.config'
import _ from 'lodash'
import { MAX_LENGTH_STORY_TEXT } from '@/constants'

type Props = {
  onCancel: () => void
  onSubmit: (text: string) => void
}

export const useStoryFormText = ({ onSubmit, onCancel }: Props) => {
  const [storyFormValue, setStoryFormValue] = useState<IStoryFormValue>(initialStoryFormValue)

  const onCancelStoryText = useCallback(() => {
    setStoryFormValue(initialStoryFormValue)
    onCancel()
  }, [onCancel])

  const onChangeText = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value
    if (text.length <= MAX_LENGTH_STORY_TEXT) {
      setStoryFormValue((prev) => ({
        ...prev,
        text
      }))
    }
    /** TODO: Add toast error */
  }, [])

  const onChangeBackground = useCallback((background: string) => {
    setStoryFormValue((prev) => ({
      ...prev,
      background
    }))
  }, [])

  const onSubmitHandler = useCallback(() => {
    if (!!storyFormValue.text.trim().length) {
      onSubmit(JSON.stringify(storyFormValue))
    }
  }, [onSubmit, storyFormValue])

  return {
    storyFormValue,

    onCancelStoryText,
    onChangeText,
    onChangeBackground,
    onSubmitHandler
  }
}
