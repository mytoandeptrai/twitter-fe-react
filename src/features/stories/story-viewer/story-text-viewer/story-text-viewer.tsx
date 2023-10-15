import { IStoryText } from '@/types'
import React, { memo } from 'react'
import styled from 'styled-components'

type Props = {
  story: IStoryText
  customStyles?: string
}

const StoryTextViewer = ({ story, customStyles }: Props) => {
  const { background, text } = story

  return (
    <StyledRoot style={{ background }}>
      <StyledText>{text}</StyledText>
    </StyledRoot>
  )
}

export default memo(StoryTextViewer)

const StyledRoot = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 1rem;
`

const StyledText = styled.div`
  color: #fff;
  font-size: 1rem;
  text-align: center;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word;
`
