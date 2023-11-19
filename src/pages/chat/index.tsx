import { CommonSpinner, PageMetaData } from '@/components'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useChat } from './hook'
import { useParams } from 'react-router-dom'
import { LayoutChattingTwoSideBar } from '@/layouts'
import { ChatContentHeader, ChatContentMain, ChatLeftSidebar, ChatRightSidebar } from './components'

const ChatPage = () => {
  const { t } = useTranslation()
  const { roomId = '' } = useParams()
  const {
    room,
    guest,
    messageImage,
    data: { convertedData, images },
    hasMore,
    isLoading,
    isShowMemberList,
    roomInfos,
    currentUser,

    fetchNextPage,
    onSubmitForm,
    onOpenCreateNewGroupChatModal,
    onCloseImageMessageForm,
    onChangeInputFile,
    onChangeInputMessage,
    onChangeShowMemberList
  } = useChat(roomId)

  const renderLoading = () => {
    if (isLoading) {
      return <CommonSpinner />
    }

    return null
  }

  return (
    <React.Fragment>
      <PageMetaData title={t('pages.chat.title')} />
      {renderLoading()}
      <LayoutChattingTwoSideBar
        leftSideBar={<ChatLeftSidebar onOpenCreateNewGroupChatModal={onOpenCreateNewGroupChatModal} />}
        rightSideBar={
          <ChatRightSidebar
            guest={guest}
            room={room}
            chatImages={images}
            onChangeShowMemberList={onChangeShowMemberList}
          />
        }
        content={
          <React.Fragment>
            <ChatContentHeader guest={guest} room={room} roomInfos={roomInfos} />
            <ChatContentMain
              hasMore={hasMore}
              messages={convertedData}
              messageImage={messageImage}
              currentUserId={currentUser?._id ?? ''}
              onCloseImageMessageForm={onCloseImageMessageForm}
              onFetchNextPage={fetchNextPage}
              onSubmit={onSubmitForm}
              onChangeInputMessage={onChangeInputMessage}
              onChangeInputFile={onChangeInputFile}
            />
          </React.Fragment>
        }
      />
    </React.Fragment>
  )
}

export default ChatPage
