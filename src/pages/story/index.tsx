/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useMemo } from 'react'
import { useCreateStory } from './hooks'
import { useUploadService } from '@/services'
import { EStoryType } from '@/constants'
import { ImageStoryForm, TextStoryForm, TextStoryViewer, ImageStoryViewer, StoryCard } from 'facebook-story'
const DEFAULT_WIDTH_IMAGE_FORM = 500
const DEFAULT_HEIGHT_IMAGE_FORM = 500

const CreateStoryPage = () => {
  const { onCancelCreateStory, onSubmitStory, setStoryAudience, setStoryType, storyType } = useCreateStory()
  const { uploadImage } = useUploadService()

  // const content = useMemo(() => {
  //   switch (storyType) {
  //     case EStoryType.Text:
  //       return <TextStoryForm onCancel={onCancelCreateStory} onSubmit={onSubmitStory} />
  //     case EStoryType.Media:
  //       return (
  //         <ImageStoryForm
  //           height={DEFAULT_HEIGHT_IMAGE_FORM}
  //           width={DEFAULT_WIDTH_IMAGE_FORM}
  //           onSubmit={onSubmitStory}
  //           uploadType={EImageFormUploadType.File}
  //           uploadFunction={uploadImage}
  //         />
  //       )
  //     default:
  //       return <div>Not found</div>
  //   }
  // }, [onCancelCreateStory, onSubmitStory, storyType, uploadImage])

  return <div>CreateStoryPage</div>
}

export default CreateStoryPage
