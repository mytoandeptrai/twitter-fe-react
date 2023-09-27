import { ITweet } from '@/types'
import { initMediaFromUrl } from '@/utils'
import Skeleton from 'react-loading-skeleton'

const generateTweetMedias = (tweets: any[]) => {
  return tweets?.reduce((acc: [], tweet: ITweet) => {
    const medias = tweet.media.map((url) => {
      return {
        tweetId: tweet._id,
        ...initMediaFromUrl(url)
      }
    })

    return [...acc, ...medias]
  }, [])
}

const generateTweetMediaSkeleton = (num: number) => {
  return [...Array(num)].map((_, idx: number) => {
    return (
      <Skeleton
        height={Math.floor(Math.random() * 500)}
        key={`tweet-media-skeleton-${idx}`}
        style={{
          marginBottom: '1rem'
        }}
      />
    )
  })
}

export { generateTweetMedias, generateTweetMediaSkeleton }
