import { IUser } from './user.type'

export interface ITweet {
  _id: string
  author: IUser | null
  save: IUser[]
  tags: string[]
  saved: IUser[]
  likes: IUser[]
  media: string[]
  content: string
  location: string
  audience: number
  isRetweet: boolean
  retweeted: IUser[]
  retweetedBy: IUser | null
  comments?: any[]
  createdAt?: Date
  updatedAt?: Date
  [key: string]: any
}

export interface ICreateTweetDTO {
  content: string
  audience: number
  tags?: string[]
  media?: string[]
}

export interface IUpdateTweetDTO {
  tweetId: string
  updatedTweet: Partial<ICreateTweetDTO>
}

export interface IReportTweetDTO {
  userId: string
  reportTime: Date
}
