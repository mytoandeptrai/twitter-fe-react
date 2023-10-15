import { EStoryType } from '@/constants'
import { IStory } from '@/types'
import React from 'react'
import { StoryTextViewer } from './story-text-viewer'
import { StoryImageViewer } from './story-image-viewer'

type Props = {
  story: IStory
  isSmall?: boolean
}

const StoryViewer = ({ story, isSmall }: Props) => {
  const parseStory = JSON.parse(story.content)

  const renderStoryView = () => {
    if (story.type === EStoryType.Text) {
      return <StoryTextViewer story={parseStory} />
    }

    return <StoryImageViewer story={parseStory} />
  }

  return <React.Fragment>{renderStoryView()}</React.Fragment>
}

export default StoryViewer
