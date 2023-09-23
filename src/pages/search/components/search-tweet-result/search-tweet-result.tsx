import { SmallAvatar, StyledFlex } from '@/components'
import { EFontSize, EFontWeight } from '@/constants'
import { ITweet, IUser } from '@/types'
import React, { memo } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

type Props = {
  tweet: ITweet
}

const SearchTweetResult = ({ tweet }: Props) => {
  const medias = tweet?.media || []
  const firstMediaUrl = medias?.[0] || ''
  const isFirstMediaVideo = (firstMediaUrl as any)?.includes('video')

  const renderTweetHeader = () => {
    return (
      <StyledHeader>
        <SmallAvatar user={tweet?.author as IUser} />
        <p>{tweet?.author?.name || 'author'}</p>
      </StyledHeader>
    )
  }

  const renderTweetContent = () => {
    return (
      <StyledFlex gap={1} justify='space-between' align='center'>
        <StyledContent>{tweet?.content?.slice(0, Math.min(tweet.content.length, 100))}</StyledContent>

        <StyledMedia>
          {!!medias?.length &&
            (isFirstMediaVideo ? (
              <video src={firstMediaUrl} controls autoPlay muted />
            ) : (
              <img src={firstMediaUrl} alt={`tweet media`} loading='lazy' />
            ))}
        </StyledMedia>
      </StyledFlex>
    )
  }

  return (
    <StyledRoot to={`/tweet/${tweet._id}`}>
      {renderTweetHeader()}
      {renderTweetContent()}
    </StyledRoot>
  )
}

export default memo(SearchTweetResult)

const StyledRoot = styled(Link)`
  margin-top: 1rem;
  background-color: ${({ theme }) => theme.backgroundColor1};
  padding: 1rem 2rem;
  display: block;
  color: #000;
  width: 100%;
  margin: 2rem 0;
`

const StyledHeader = styled.div`
  border-bottom: 1px solid #e1e4e8;
  display: flex;
  align-items: center;
  padding: 1rem 0;
  gap: 1.5rem;
  margin-bottom: 1rem;
  font-size: 1.5rem;
  font-weight: ${EFontWeight.FontWeight500};
`

const StyledContent = styled.p`
  font-size: ${EFontSize.Font4};
`

const StyledMedia = styled.div`
  video,
  img {
    max-width: 100%;
    max-height: 20rem;
  }
`
