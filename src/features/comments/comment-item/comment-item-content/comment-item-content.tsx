import { MediaViewer } from '@/components'
import { EFontSize, EFontWeight, EMedia } from '@/constants'
import { IComment } from '@/types'
import { calcDiffTimeString } from '@/utils'
import React, { memo } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

type Props = {
  comment: IComment
}

const CommentItemContent = ({ comment }: Props) => {
  const renderCommentUserInfo = () => {
    const url = `/profile/${comment?.author?._id}`
    return (
      <StyledMeta>
        <StyledAuthorName to={url}>{comment?.author?.name}</StyledAuthorName>
        <StyledCreatedAt>{calcDiffTimeString(new Date(comment?.createdAt))}</StyledCreatedAt>
      </StyledMeta>
    )
  }

  const renderCommentMedias = () => {
    const commentMedia = comment?.media
    if (commentMedia) {
      return (
        <StyledMediaWrapper>
          <MediaViewer
            data={{
              id: `comment-media-${comment._id}`,
              url: commentMedia,
              type: commentMedia.includes(EMedia.Image) ? EMedia.Image : EMedia.Video
            }}
          />
        </StyledMediaWrapper>
      )
    }

    return null
  }

  return (
    <StyledRoot>
      {renderCommentUserInfo()}
      <StyledContent>{comment?.content}</StyledContent>
      {renderCommentMedias()}
    </StyledRoot>
  )
}

export default memo(CommentItemContent)

const StyledRoot = styled.div`
  background: ${({ theme }) => theme.backgroundColor5};
  padding: 0 1.5rem;
  border-radius: 0.8rem;

  & > div:first-of-type {
    display: flex;
    gap: 1rem;
    align-items: center;
  }
`

const StyledMeta = styled.div`
  display: block;
`
const StyledAuthorName = styled(Link)`
  font-size: ${EFontSize.Font4};
  font-weight: ${EFontWeight.FontWeight500};
  color: ${({ theme }) => theme.textColor3};
  &:hover {
    text-decoration: underline;
    transition: all 0.5s linear;
  }
`

const StyledContent = styled.p`
  font-size: ${EFontSize.Font5};
`

const StyledCreatedAt = styled.p`
  font-size: ${EFontSize.Font2};
  color: ${({ theme }) => theme.textColor7};
`

const StyledMediaWrapper = styled.div`
  height: 15rem;
  max-width: 20rem;
`
