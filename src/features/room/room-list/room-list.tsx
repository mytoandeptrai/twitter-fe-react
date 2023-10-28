import React from 'react'
import { useRoomList } from './hook'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { IRoom, IUser } from '@/types'
import { RoomItem } from '../room-item'

const RoomList = () => {
  const { t } = useTranslation()
  const { connectedRooms, currentUser } = useRoomList()

  const renderDirectMessageRoom = (room: IRoom, currentUser: IUser) => {
    const guestUser = room.members.find((u: IUser) => u._id !== currentUser._id)

    if (!guestUser) return null

    return <RoomItem key={`room-item-${room._id}`} image={guestUser?.avatar} name={guestUser?.name} id={room._id} />
  }

  const renderGroupRoom = (room: IRoom) => {
    const { name, image, members } = room

    let roomName = name
    if (!name) {
      const memberNames = members.map((member: IUser) => member.name)
      roomName = memberNames.slice(0, 2).join(', ') + (memberNames.length > 2 ? ' and others' : '')
    }

    return <RoomItem image={image || ''} name={roomName} id={room._id} key={`room-item-${room._id}`} />
  }

  const renderConnectedRooms = () => {
    if (!!connectedRooms && currentUser) {
      return (
        <React.Fragment>
          {connectedRooms?.map((room) => {
            if (room.isDm) {
              return renderDirectMessageRoom(room, currentUser)
            } else {
              return renderGroupRoom(room)
            }
          })}
        </React.Fragment>
      )
    }

    return null
  }

  if (!connectedRooms) {
    return <StyledNotFound>{t('pages.chat.text.noChattingRoom')}</StyledNotFound>
  }

  return <StyledRoot>{renderConnectedRooms()}</StyledRoot>
}

export default RoomList

const StyledRoot = styled.div`
  display: block;
`

const StyledNotFound = styled.div`
  display: block;
`
