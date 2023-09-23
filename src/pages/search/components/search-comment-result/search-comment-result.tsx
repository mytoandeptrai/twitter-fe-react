import { SmallAvatar, StyledFlex } from '@/components'
import { EFontSize } from '@/constants'
import { IComment } from '@/types'
import React, { memo } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

type Props = {
  comment: IComment
}

const DEFAULT_LIMIT_COMMENT_NUMBER = 200

const SearchCommentResult = ({ comment }: Props) => {
  const media = comment?.media
  const isMediaVideo = media?.includes('video')
  const to = `/tweet/${comment?.tweet?._id || 0}`

  const renderSearchHeader = () => {
    return (
      <StyledHeader>
        <SmallAvatar user={comment?.author} />
        <StyledSubHeader>{comment.author.name}</StyledSubHeader>
      </StyledHeader>
    )
  }

  const renderSearchContent = () => {
    const decreaseSearchContent = comment?.content?.slice(
      0,
      Math.min(comment.content.length, DEFAULT_LIMIT_COMMENT_NUMBER)
    )

    return (
      <StyledFlex gap={1} align='center'>
        <StyledContent>{decreaseSearchContent}</StyledContent>

        <div>
          {media &&
            (isMediaVideo ? (
              <video src={media} controls autoPlay muted />
            ) : (
              <img src={media} alt={`comment media`} loading='lazy' />
            ))}
        </div>
      </StyledFlex>
    )
  }

  return (
    <StyledRoot to={to}>
      {renderSearchHeader()}
      {renderSearchContent()}
    </StyledRoot>
  )
}

export default memo(SearchCommentResult)

const StyledRoot = styled(Link)`
  margin-top: 1rem;
  background-color: ${({ theme }) => theme.backgroundColor1};
  padding: 1rem 2rem;
  display: block;
  color: #000;
  width: 100%;
`

const StyledHeader = styled.div`
  border-bottom: 1px solid #e1e4e8;
  display: flex;
  align-items: center;
  padding: 1rem 0;
  gap: 1.5rem;
  margin-bottom: 1rem;
`

const StyledSubHeader = styled.p``

const StyledContent = styled.p`
  font-size: ${EFontSize.Font4};
`
