import { PageMetaData } from '@/components'
import { LayoutOneSideBar } from '@/layouts'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useCreateStory } from '../../hooks'
import { CreateStoryContent, CreateStorySideBar } from '../../components'

const CreateStoryPage = () => {
  const { t } = useTranslation()
  const { onCancelCreateStory, onSubmitStory, storyType, onChangeStoryType, onChangeStoryAudience } = useCreateStory()

  return (
    <React.Fragment>
      <PageMetaData title={t('pages.story.text.create-story')} />
      <LayoutOneSideBar
        isFullWidth
        customSideBarWidth='20%'
        sideBar={<CreateStorySideBar onChangeAudience={onChangeStoryAudience} onChangeStoryType={onChangeStoryType} />}
        content={<CreateStoryContent onCancel={onCancelCreateStory} onSubmit={onSubmitStory} storyType={storyType} />}
      />
    </React.Fragment>
  )
}

export default CreateStoryPage
