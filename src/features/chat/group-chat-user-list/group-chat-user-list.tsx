import { IUser } from '@/types'
import React from 'react'
import styled from 'styled-components'

type Props = {
  groupChatUserList: IUser[] | []
  onRemoveUser: (user: IUser) => void
}

const GroupChatUserList = ({ groupChatUserList, onRemoveUser }: Props) => {
  const renderUserList = () => {
    if (!!groupChatUserList.length) {
      return (
        <StyledRoot>
          {groupChatUserList?.map((user) => (
            <StyledContent key={`group-chat-user-list-${user._id}`}>
              {user.name}
              <StyledContentButton onClick={() => onRemoveUser(user)}>x</StyledContentButton>
            </StyledContent>
          ))}
        </StyledRoot>
      )
    }

    return null
  }

  return <React.Fragment>{renderUserList()}</React.Fragment>
}

export default GroupChatUserList

const StyledRoot = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`

const StyledContent = styled.article`
  background: #2d9cdb;
  display: inline-block;
  padding: 0.5rem;
  border-radius: 0.5rem;
  color: #fff;
  font-size: 1.2rem;
  font-weight: 500;
`

const StyledContentButton = styled.button`
  color: #fff;
`
