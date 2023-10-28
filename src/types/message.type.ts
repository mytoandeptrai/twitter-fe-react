import { IUser } from './user.type'

export interface IMessage {
  _id: string
  content: string
  file?: string
  createdAt: Date
  roomId: string
  author: IUser
}

export interface ICreateMessageDTO {
  content: string
  file?: string
  author: IUser
  roomId: string
  createdAt?: Date
  updatedAt?: Date
}

export interface IFile {
  file: File | null
  url: string
}
