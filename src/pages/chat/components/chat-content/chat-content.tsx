import { IRoom, IUser } from '@/types'
import React from 'react'

interface IRoomInfos {
  roomImage: string
  roomName: string
}

type Props = {
  room: IRoom | null
  guest: IUser | null
  roomInfos: IRoomInfos
}

const ChatContent = ({}: Props) => {
  return <div>ChatContent</div>
}

export default ChatContent
