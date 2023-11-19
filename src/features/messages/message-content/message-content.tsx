import { SmallAvatar } from '@/components'
import { IMessage } from '@/types'
import { convertDataToHTML } from '@/utils'
import React from 'react'
import styled from 'styled-components'

type Props = {
  message: IMessage
  isMyMessage: boolean
}

const MessageContent = ({ message, isMyMessage }: Props) => {
  const messageDate = new Date(message.createdAt)
  const time = messageDate.toLocaleTimeString('en-US')
  const date = messageDate.toLocaleString().split(',')[0]
  const fullName = message?.author?.name

  const renderMessageFileContent = () => {
    if (message?.file) {
      return (
        <StyledMessageContentFile isMyMessage={isMyMessage}>
          <StyledMessageContentFileImageWrapper>
            <StyledMessageContentFileImage src={message?.file || ''} alt={`${fullName}-message`} loading='lazy' />
          </StyledMessageContentFileImageWrapper>
        </StyledMessageContentFile>
      )
    }

    return null
  }

  const renderMessageUserAvatar = () => {
    if (message?.author) {
      return (
        <StyledUserAvatarWrapper>
          <SmallAvatar user={message?.author} />
        </StyledUserAvatarWrapper>
      )
    }

    return null
  }

  const renderMessageContent = () => {
    if (message?.content) {
      return (
        <StyledMessageContent
          isMyMessage={isMyMessage}
          dangerouslySetInnerHTML={{
            __html: convertDataToHTML(message?.content)
          }}
        />
      )
    }

    return null
  }

  const renderMessageContainer = () => {
    if (message?._id) {
      return (
        <StyledMessageContainer>
          <StyledMessageUserInfo isMyMessage={isMyMessage}>
            <StyledMessageUserName>{fullName}</StyledMessageUserName>
            <StyledMessageUserTime>
              {date} at {time}
            </StyledMessageUserTime>
          </StyledMessageUserInfo>
          {renderMessageContent()}
          {renderMessageFileContent()}
        </StyledMessageContainer>
      )
    }

    return null
  }

  return (
    <StyledRoot isMyMessage={isMyMessage}>
      {renderMessageUserAvatar()}
      {renderMessageContainer()}
    </StyledRoot>
  )
}

export default MessageContent

const StyledRoot = styled.article<{
  isMyMessage?: boolean
}>`
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1rem;
  ${({ isMyMessage }) => isMyMessage && `flex-direction: row-reverse`}
`

const StyledUserAvatarWrapper = styled.figure``

const StyledMessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const StyledMessageUserInfo = styled.div<{
  isMyMessage?: boolean
}>`
  text-align: left;
  ${({ isMyMessage }) => isMyMessage && `text-align: right`}
`

const StyledMessageUserName = styled.span`
  font-size: 1.1rem;
  font-weight: 600;
`

const StyledMessageUserTime = styled.span`
  font-size: 1rem;
  margin-left: 1rem;
  display: inline-block;
  color: #c0c0c0;
`

const StyledMessageContent = styled.div<{
  isMyMessage?: boolean
}>`
  position: relative;
  max-width: 80%;
  border-radius: 1rem;
  padding: 1rem;
  color: #000;
  font-size: 1.4rem;
  word-wrap: break-word;
  background: #fff;
  margin-right: auto;
  border-top-left-radius: unset;
  display: inline-block;

  ${({ isMyMessage }) => isMyMessage && `border-top-left-radius: 1rem;`}
  ${({ isMyMessage }) => isMyMessage && `border-top-right-radius: unset;`}
  ${({ isMyMessage }) => isMyMessage && `margin-left: auto;`}
  ${({ isMyMessage }) => isMyMessage && `margin-right: initial;`}
  ${({ isMyMessage }) => isMyMessage && `background: #2f80ed;`}
  ${({ isMyMessage }) => isMyMessage && `color: #fff;`}

  @media (max-width: 500px) {
    width: 100%;
  }
`

const StyledMessageContentFile = styled.div<{
  isMyMessage?: boolean
}>`
  position: relative;
  max-width: 80%;
  border-radius: 0.5rem;
  padding: 1rem;
  color: #000;
  font-size: 1.4rem;
  word-wrap: break-word;
  background: #fff;
  margin-right: auto;
  border-top-left-radius: unset;
  display: inline-block;

  figure {
    border-radius: 1rem;
    overflow: hidden;
    border-top-left-radius: unset;

    img {
      --size: 10rem;
      width: var(--size);
      height: var(--size);
      border-radius: unset;
    }

    ${({ isMyMessage }) => isMyMessage && `border-top-left-radius: 1rem;`}
    ${({ isMyMessage }) => isMyMessage && `border-top-right-radius: unset;`}
    cursor: pointer;
  }

  ${({ isMyMessage }) => isMyMessage && `border-top-left-radius: 1rem;`}
  ${({ isMyMessage }) => isMyMessage && `border-top-right-radius: unset;`}
  ${({ isMyMessage }) => isMyMessage && `margin-left: auto;`}
  ${({ isMyMessage }) => isMyMessage && `margin-right: initial;`}
  ${({ isMyMessage }) => isMyMessage && `background: #2f80ed;`}
  ${({ isMyMessage }) => isMyMessage && `color: #fff;`}

  @media (max-width: 500px) {
    width: 100%;
  }
`

const StyledMessageContentFileImageWrapper = styled.figure``

const StyledMessageContentFileImage = styled.img`
  --size: 3rem;
  width: var(--size);
  height: var(--size);
  border-radius: 50%;
  object-fit: cover;
`
