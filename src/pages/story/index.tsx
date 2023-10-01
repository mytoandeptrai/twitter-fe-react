import React from 'react'
import { useCreateStory } from './hooks'
import { useUploadService } from '@/services'
import { EStoryType } from '@/constants'
import { LayoutOneSideBar } from '@/layouts'
import { CreateStorySideBar } from './components'
import { StoryFormImage, StoryFormText } from '@/features'

const CreateStoryPage = () => {
  const { onCancelCreateStory, onSubmitStory, storyType, onChangeStoryType, onChangeStoryAudience } = useCreateStory()
  const { uploadImage } = useUploadService()

  const content = () => {
    switch (storyType) {
      case EStoryType.Media:
        return <StoryFormImage onCancel={onCancelCreateStory} onSubmit={onSubmitStory} />
      case EStoryType.Text:
        return <StoryFormText onCancel={onCancelCreateStory} onSubmit={onSubmitStory} />
      default:
        return <React.Fragment />
    }
  }

  return (
    <LayoutOneSideBar
      isFullWidth
      customSideBarWidth='20%'
      sideBar={<CreateStorySideBar onChangeAudience={onChangeStoryAudience} onChangeStoryType={onChangeStoryType} />}
      content={content()}
    />
  )
}

export default CreateStoryPage
