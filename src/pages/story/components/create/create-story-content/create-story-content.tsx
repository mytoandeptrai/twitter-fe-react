import { EStoryType } from '@/constants'
import { StoryFormImage, StoryFormText } from '@/features'
import React from 'react'

type Props = {
  storyType: EStoryType
  onCancel: () => void
  onSubmit: (text: string, file?: string) => void
}

const CreateStoryContent = ({ onCancel, onSubmit, storyType }: Props) => {
  const content = () => {
    switch (storyType) {
      case EStoryType.Media:
        return <StoryFormImage onCancel={onCancel} onSubmit={onSubmit} />
      case EStoryType.Text:
        return <StoryFormText onCancel={onCancel} onSubmit={onSubmit} />
      default:
        return <React.Fragment />
    }
  }
  return <React.Fragment>{content()}</React.Fragment>
}

export default CreateStoryContent
