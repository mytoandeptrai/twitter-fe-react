import { SmallAvatar } from '@/components'
import { IUser } from '@/types'
import React from 'react'
import styled from 'styled-components'
import { TiTickOutline } from 'react-icons/ti'

type Props = {
  user: IUser
  isSelected: boolean
  onSelected: (user: IUser) => void
}

const RoomSelectedUser = ({ isSelected, user, onSelected }: Props) => {
  const renderRoomUserInfo = () => {
    return (
      <StyledRoomUserInfoMain>
        <StyledRoomUserInfo>
          <StyledRoomUserInfoName>{user.name}</StyledRoomUserInfoName>
          <StyledRoomUserInfoEmail>{user.email}</StyledRoomUserInfoEmail>
          <StyledRoomUserInfoUserName>@{user.username}</StyledRoomUserInfoUserName>
        </StyledRoomUserInfo>
        <StyledRoomUserInfoButton active={isSelected}>{isSelected && <TiTickOutline />}</StyledRoomUserInfoButton>
      </StyledRoomUserInfoMain>
    )
  }

  return (
    <StyledRoot onClick={() => onSelected(user)}>
      <SmallAvatar user={user} />
      {renderRoomUserInfo()}
    </StyledRoot>
  )
}

export default RoomSelectedUser

const StyledRoot = styled.article`
  display: flex;
  gap: 2rem;
  margin: 1rem 0;
`
const StyledRoomUserInfoMain = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
`

const StyledRoomUserInfo = styled.div``

const StyledRoomUserInfoEmail = styled.p`
  font-size: 1.1rem;
  color: #828282;
`

const StyledRoomUserInfoName = styled.p`
  font-size: 1.2rem;
  font-weight: 500;
`

const StyledRoomUserInfoUserName = styled.p`
  font-size: 1.1rem;
  font-weight: 500;
  color: #2f80ed;
`

const StyledRoomUserInfoButton = styled('button')<{
  active: boolean
}>`
  border: 1px solid #000;
  --size: 2.5rem;
  width: var(--size);
  height: var(--size);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  ${(props) =>
    props.active &&
    `
     background-color: #2f80ed;
     border: none;

     svg {
        fill: #fff
      }
    `}
`
