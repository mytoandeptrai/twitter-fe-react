import React from 'react'
import { useInfinityMediasList } from './useInfinityMediasList'
import { useInfinityList } from '@/hooks'
import { IMediaWithTweetId, ITweet } from '@/types'
import { DEFAULT_LIST_LIMIT, MASONRY_CONFIG_BREAKPOINTS } from '@/constants'
import classes from './infinity-medias-list.module.css'
import Masonry from 'react-masonry-css'
import { generateTweetMediaSkeleton, generateTweetMedias } from './infinity-medias-list.config'
import InfiniteScroll from 'react-infinite-scroll-component'
import { v4 as uuid } from 'uuid'
import { MediaCard } from '@/components/ui'
import { Loader } from '@/components/shared'

type Props = {
  queryKey: string[]
}

const InfinityMediasList = ({ queryKey }: Props) => {
  const { queryFunction } = useInfinityMediasList(queryKey)
  const { data, isLoading, hasMore, fetchNextPage } = useInfinityList<ITweet>({
    queryFunction,
    queryKey,
    queryConfig: {
      limit: DEFAULT_LIST_LIMIT
    }
  })

  const medias: IMediaWithTweetId[] = React.useMemo(() => {
    return generateTweetMedias(data)
  }, [data])

  if (isLoading || medias.length === 0) {
    return (
      <Masonry className={classes.grid} columnClassName={classes.column} breakpointCols={MASONRY_CONFIG_BREAKPOINTS}>
        {generateTweetMediaSkeleton(6)}
      </Masonry>
    )
  }

  return (
    <InfiniteScroll dataLength={medias.length} next={fetchNextPage} hasMore={hasMore} loader={hasMore && <Loader />}>
      <Masonry className={classes.grid} columnClassName={classes.column} breakpointCols={MASONRY_CONFIG_BREAKPOINTS}>
        {medias?.map((tweet: IMediaWithTweetId) => {
          return <MediaCard tweet={tweet} key={uuid()} />
        })}
      </Masonry>
    </InfiniteScroll>
  )
}

export default InfinityMediasList
