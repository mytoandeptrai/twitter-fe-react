import { EStoryType } from '@/constants'
import { IStory } from '@/types'
import React from 'react'
import { StoryTextViewer } from './story-text-viewer'
import { StoryImageViewer } from './story-image-viewer'
import styled from 'styled-components'

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

    return <StoryImageViewer story={parseStory} isSmall={isSmall} />
  }

  return <StyledRoot>{renderStoryView()}</StyledRoot>
}

export default StoryViewer

const StyledRoot = styled.div`
  width: 100%;
  height: 100%;
`
