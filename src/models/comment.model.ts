import { IComment, IUser } from '@/types'
import { eliminateSerializeType, transformFieldToObjectWithId } from '@/utils'
import { TweetModel } from './tweet.model'
import { UserModel } from './user.model'

const defaultComment: IComment = {
  _id: '',
  author: new UserModel(null).getData() as IUser,
  content: '',
  isEdited: false,
  likes: [],
  media: '',
  replies: [],
  tweet: new TweetModel(null).getData(),
  createdAt: new Date().toLocaleDateString(),
  modifiedAt: new Date().toLocaleDateString(),
  isChild: false
}

export class CommentModel {
  private data: IComment = { ...defaultComment }
  private shouldHaveIdFields: (keyof IComment)[] = ['author', 'tweet']

  constructor(comment: IComment | undefined | null) {
    Object.keys(defaultComment).forEach((key) => {
      this.data[key as keyof IComment] = comment?.[key as keyof IComment] || defaultComment[key as keyof IComment]
    })
    this.shouldHaveIdFields.forEach((key) => {
      transformFieldToObjectWithId(key, this.data)
    })
  }

  public getData = (): IComment | undefined => {
    return eliminateSerializeType(this.data) as IComment
  }
}
