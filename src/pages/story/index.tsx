import React from 'react'
import { useCreateStory } from './hooks'
import { useUploadService } from '@/services'
import { EStoryType } from '@/constants'
import { LayoutOneSideBar } from '@/layouts'
import { CreateStorySideBar } from './components'
import { StoryFormImage, StoryFormText } from '@/features'
import { PageMetaData } from '@/components'
import { useTranslation } from 'react-i18next'

const CreateStoryPage = () => {
  const { t } = useTranslation()
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
    <React.Fragment>
      <PageMetaData title={t('pages.story.text.create-story')} />
      <LayoutOneSideBar
        isFullWidth
        customSideBarWidth='20%'
        sideBar={<CreateStorySideBar onChangeAudience={onChangeStoryAudience} onChangeStoryType={onChangeStoryType} />}
        content={content()}
      />
    </React.Fragment>
  )
}

export default CreateStoryPage
