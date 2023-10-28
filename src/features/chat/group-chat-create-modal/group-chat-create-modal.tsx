import React, { Suspense, memo } from 'react'
import { useGroupChatCreateModal } from './hook'
import styled from 'styled-components'
import { CommonButton, CommonModal, Loader } from '@/components'
import { GroupChatInputField } from '../group-chat-input-field'
import { GroupChatInputImageField } from '../group-chat-input-image-field'
import { useTranslation } from 'react-i18next'
import { GroupChatUserList } from '../group-chat-user-list'
import { RoomAddUser } from '@/features/room'
import { IUser } from '@/types'

const GroupChatCreateModal = () => {
  const { t } = useTranslation()
  const {
    media,
    loading,
    isAddMemberForOpened,
    newGroupChatUserList,
    inputGroupChatList,
    inputImageGroupChatList,
    disabledOkButton,

    onCloseModal,
    onCloseAddMemberModal,
    onRemoveUserFromGroupList,
    onOpenAddMemberModal,
    onAddToNewGroupList,
    onSubmit
  } = useGroupChatCreateModal()

  const renderLoading = () => {
    if (loading) {
      return <Loader />
    }

    return null
  }

  const renderInputImageChatList = () => {
    return <GroupChatInputImageField {...inputImageGroupChatList} media={media} />
  }

  const renderInputChatList = () => {
    return (
      <React.Fragment>
        {inputGroupChatList.map((chat, index) => {
          return <GroupChatInputField key={`chat-group-input-${index}`} {...chat} />
        })}
      </React.Fragment>
    )
  }

  const renderAddMemberButton = () => {
    return (
      <StyledGroupChatInput>
        <CommonButton onClick={onOpenAddMemberModal}>{t('pages.chat.text.addNewMembers')}</CommonButton>
      </StyledGroupChatInput>
    )
  }

  const renderGroupChatAddMember = () => {
    if (isAddMemberForOpened) {
      return (
        <RoomAddUser
          members={newGroupChatUserList}
          onCloseAddMember={onCloseAddMemberModal}
          onAddNewMember={(users: IUser[]) => onAddToNewGroupList(users, newGroupChatUserList)}
        />
      )
    }

    return null
  }

  const renderGroupChatUserList = () => {
    if (!!newGroupChatUserList.length) {
      return <GroupChatUserList groupChatUserList={newGroupChatUserList} onRemoveUser={onRemoveUserFromGroupList} />
    }

    return null
  }

  const renderContent = () => {
    return (
      <StyledRoot>
        {renderInputChatList()}
        {renderAddMemberButton()}
        {renderGroupChatAddMember()}
        {renderGroupChatUserList()}
        {renderInputImageChatList()}
      </StyledRoot>
    )
  }

  return (
    <React.Fragment>
      {renderLoading()}
      <Suspense fallback={<Loader />}>
        <CommonModal
          body={renderContent()}
          isOpen={true}
          onCancel={onCloseModal}
          onOk={onSubmit}
          header={<StyledHeading>{t('pages.chat.text.createNewGroupChat')}</StyledHeading>}
          disabledOk={disabledOkButton}
          disabledCancel={loading}
        />
      </Suspense>
    </React.Fragment>
  )
}

export default memo(GroupChatCreateModal)

const StyledRoot = styled.div`
  min-width: 40rem;
`

const StyledHeading = styled.p`
  font-size: 1.5rem;
  font-weight: 500;
  line-height: 2;
`

const StyledGroupChatInput = styled.div`
  position: relative;
  margin-bottom: 1.5rem;
`
