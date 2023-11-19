import { IMessage } from '@/types'
import React, { memo } from 'react'
import { useChatContentMain } from './hook'
import styled from 'styled-components'
import { ImageMessageForm, MessageContent, TextMessageForm } from '@/features'

type IMessageImage = {
  file: File | null
  url: string
  messageText: string
}

type Props = {
  messages: IMessage[]
  messageImage: IMessageImage
  hasMore: boolean
  currentUserId: string
  onCloseImageMessageForm: () => void
  onSubmit: (e: any) => void
  onFetchNextPage: () => void
  onChangeInputMessage: (e: any) => void
  onChangeInputFile: (file: File) => void
}

const ChatContentMain = (props: Props) => {
  const {
    messageImage,
    messages,
    hasMore,
    currentUserId,

    onSubmit,
    onChangeInputMessage,
    onChangeInputFile,
    onCloseImageMessageForm
  } = props
  const { loadMoreRef, messageDiv, onChangeShouldJumpToEnd } = useChatContentMain(props)

  const renderImageMessageForm = () => {
    if (messageImage.url) {
      return (
        <ImageMessageForm
          data={messageImage}
          onChangeInputMessage={onChangeInputMessage}
          onCancel={onCloseImageMessageForm}
          onSubmit={(e) => {
            onChangeShouldJumpToEnd(true)
            onSubmit(e)
          }}
        />
      )
    }

    return null
  }

  const renderListMessages = () => {
    if (!!messages.length) {
      return (
        <React.Fragment>
          {messages?.map((ms) => {
            if (ms?.author?._id) {
              return (
                <MessageContent
                  key={`message-${ms?._id}`}
                  message={ms}
                  isMyMessage={ms?.author?._id === currentUserId}
                />
              )
            }

            return null
          })}
        </React.Fragment>
      )
    }
    return null
  }

  const renderTextMessageForm = () => {
    return (
      <TextMessageForm
        onChangeInputMessage={onChangeInputMessage}
        onChangeInputFile={onChangeInputFile}
        onSubmit={(e) => {
          onChangeShouldJumpToEnd(true)
          onSubmit(e)
        }}
        value={messageImage.messageText}
      />
    )
  }

  const renderMessageContent = () => {
    return (
      <StyledMessageContainer ref={messageDiv}>
        {hasMore && <StyledMessageLoading ref={loadMoreRef}>Loading...</StyledMessageLoading>}
        {renderListMessages()}
      </StyledMessageContainer>
    )
  }

  return (
    <StyledRoot>
      <StyledContent>
        {renderImageMessageForm()}
        {renderMessageContent()}
        {renderTextMessageForm()}
      </StyledContent>
    </StyledRoot>
  )
}

export default memo(ChatContentMain)

const StyledRoot = styled.section`
  padding-bottom: 2.5rem;
  width: 100%;
  margin: 0 auto;
  height: calc(100vh - 8rem);
`

const StyledContent = styled.div`
  position: relative;
  height: 100%;
  padding: 1.5rem;
`

const StyledMessageContainer = styled.div`
  height: 90%;
  overflow: overlay;
  padding-right: 0.75rem;

  ::-webkit-scrollbar {
    width: 0.8rem;
  }
`

const StyledMessageLoading = styled.div`
  display: block;
`
