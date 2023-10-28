import { IMessage } from './message.type'
import { IUser } from './user.type'

export interface IRoom {
  _id: string
  owner: IUser
  name: string
  isDm: boolean
  image?: string
  createdAt: Date
  updatedAt: Date
  members: IUser[]
  isPrivate?: boolean
  messages: IMessage[]
  description: string
}

export interface IJoinedRoom {
  owner: string
  member: string[]
}

export interface ICreateRoomDTO {
  name?: string
  isDm?: boolean
  image?: string
  members: string[]
  description?: string
}
