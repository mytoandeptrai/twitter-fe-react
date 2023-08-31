import { ITweet } from '@/types'
import { eliminateSerializeType } from '@/utils'

const defaultTweet: ITweet = {
  _id: '',
  author: null,
  save: [],
  tags: [],
  saved: [],
  likes: [],
  media: [],
  content: '',
  location: '',
  audience: 0,
  isRetweet: false,
  retweeted: [],
  retweetedBy: null,
  comments: []
}

export class TweetModel {
  private data: ITweet = { ...defaultTweet }

  constructor(tweet: ITweet | undefined | null) {
    Object.keys(defaultTweet).forEach((key) => {
      this.data[key as keyof ITweet] = tweet?.[key as keyof ITweet] || defaultTweet[key as keyof ITweet]
    })
  }

  public getData(): ITweet {
    return eliminateSerializeType(this.data) as ITweet
  }
}
