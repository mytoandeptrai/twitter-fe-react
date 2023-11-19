import { ImageWithPlaceHolder } from '@/components'
import { IRoom, IUser } from '@/types'
import React, { memo } from 'react'
import { IoCallSharp } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

interface IRoomInfos {
  roomImage: string
  roomName: string
}

type Props = {
  room: IRoom | null
  guest: IUser | null
  roomInfos: IRoomInfos
  triggerCall?: () => void
}

const ChatContentHeader = ({ guest, room, roomInfos, triggerCall }: Props) => {
  const { roomImage, roomName } = roomInfos
  const { isDm } = room || {}
  const renderChatLeftSidebar = () => {
    const url = `/profile/${guest?._id}`
    return (
      <StyledLeftSidebar>
        <StyledRoomImage>
          <ImageWithPlaceHolder src={roomImage} alt={`${guest?.name}-wallpaper`} />
        </StyledRoomImage>
        {isDm ? (
          <StyledRoomNameLink to={url}>{roomName}</StyledRoomNameLink>
        ) : (
          <StyledRoomName>{roomName}</StyledRoomName>
        )}
      </StyledLeftSidebar>
    )
  }

  const renderChatRightSideBar = () => {
    return (
      <StyledCallButton>
        <IoCallSharp />
      </StyledCallButton>
    )
  }

  return (
    <StyledRoot>
      <StyledContent>
        {renderChatLeftSidebar()}
        {renderChatRightSideBar()}
      </StyledContent>
    </StyledRoot>
  )
}

export default memo(ChatContentHeader)

const StyledRoot = styled.section`
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  padding: 1rem;
`

const StyledContent = styled.div`
  margin: 0 auto;
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;

  @media (max-width: 1024px) {
    justify-content: center;
  }
`

const StyledLeftSidebar = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`

const StyledRightSidebar = styled.div``

const StyledCallButton = styled.button`
  --size: 2rem;
  width: var(--size);
  height: var(--size);
`

const StyledRoomImage = styled.figure`
  --size: 5.6rem;
  width: var(--size);
  height: var(--size);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
`

const StyledRoomName = styled.h2`
  font-weight: 500;
  font-size: 1.3rem;
  color: #000;
`

const StyledRoomNameLink = styled(Link)`
  font-weight: 500;
  font-size: 1.3rem;
  color: #000;
`
