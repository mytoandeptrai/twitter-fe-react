import { IUser } from '@/types'
import React, { Suspense } from 'react'
import styled from 'styled-components'
import { useRoomAddUser } from './hook'
import { useTranslation } from 'react-i18next'
import { CommonModal, ControlledInput, Loader } from '@/components'
import { RoomSelectedUser } from '../room-selected-user'

type Props = {
  members: IUser[]
  onCloseAddMember: () => void
  onAddNewMember: (users: IUser[]) => void
}

const RoomAddUser = (props: Props) => {
  const { t } = useTranslation()
  const {
    isLoading,
    selectedUsers,
    suggestions,
    onAddUsersToMemberList,
    onSearch,
    onToggleAddSelectedUser,
    onCloseAddMember
  } = useRoomAddUser(props)

  const renderLoading = () => {
    if (isLoading) {
      return <StyledLoading>Loading...</StyledLoading>
    }

    return null
  }

  const renderSuggestionUsers = () => {
    if (!!suggestions.length) {
      return (
        <StyledUserSuggestionList>
          {suggestions?.map((suggestion) => {
            const isSelected = selectedUsers.some((user) => user._id === suggestion._id)
            return (
              <RoomSelectedUser
                key={`selection-user-${suggestion._id}`}
                user={suggestion}
                isSelected={isSelected}
                onSelected={onToggleAddSelectedUser}
              />
            )
          })}
        </StyledUserSuggestionList>
      )
    }

    return null
  }

  const renderSuggestionInput = () => {
    return (
      <StyledInputForm>
        <StyledInputLabel htmlFor='user'>{t('pages.chat.text.search')}</StyledInputLabel>
        <ControlledInput
          disabled={isLoading}
          name='user'
          id='user'
          type='text'
          onFocus={onSearch}
          onChange={onSearch}
          placeholder={t('pages.chat.text.searchInput')}
          customStyles='border: 1px solid #f2f2f2'
        />
      </StyledInputForm>
    )
  }

  const renderContent = () => {
    return (
      <StyledRoot>
        {renderSuggestionInput()}
        {renderLoading()}
        {renderSuggestionUsers()}
      </StyledRoot>
    )
  }

  return (
    <Suspense fallback={<Loader />}>
      <CommonModal
        body={renderContent()}
        isOpen={true}
        onCancel={onCloseAddMember}
        onOk={() => onAddUsersToMemberList(selectedUsers)}
        header={<StyledHeading>{t('pages.chat.text.addRoomMember')}</StyledHeading>}
        disabledOk={isLoading || selectedUsers.length === 0}
        disabledCancel={isLoading}
      />
    </Suspense>
  )
}

export default RoomAddUser

const StyledRoot = styled.div`
  min-width: 40rem;
  min-height: 30rem;
  position: relative;
`

const StyledInputForm = styled.div`
  position: sticky;
  top: 0;
  background-color: #fff;
`

const StyledInputLabel = styled.label``

const StyledLoading = styled.p`
  color: #c4bbbbc6;
`

const StyledHeading = styled.p`
  font-size: 1.5rem;
  font-weight: 500;
  line-height: 2;
`

const StyledUserSuggestionList = styled.div`
  max-height: 30rem;
  overflow: overlay;
  overflow-x: hidden;
  padding-right: 3rem;
`
