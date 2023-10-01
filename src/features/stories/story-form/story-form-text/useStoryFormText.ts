import { ChangeEvent, useCallback, useState } from 'react'
import { IStoryFormValue, initialStoryFormValue } from './story-form-text.config'
import _ from 'lodash'
import { MAX_LENGTH_STORY_TEXT } from '@/constants'

type Props = {
  onCancel: () => void
  onSubmit: (text: string) => void
}

export const useStoryFormText = ({ onSubmit }: Props) => {
  const [storyFormValue, setStoryFormValue] = useState<IStoryFormValue>(initialStoryFormValue)

  const onShowError = useCallback(() => {
    _.throttle(function () {
      console.log('Function throttled after 1000ms!')
    }, 1000)
  }, [])

  const onChangeText = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      const text = e.target.value
      if (text.length > MAX_LENGTH_STORY_TEXT) {
        return onShowError()
      }

      setStoryFormValue((prev) => ({
        ...prev,
        text
      }))
    },
    [onShowError]
  )

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

    onChangeText,
    onChangeBackground,
    onSubmitHandler
  }
}
