import { DEFAULT_LIST_LIMIT } from '@/constants'
import { UserCard, UserCardSkeleton } from '@/features'
import { useInfinityList } from '@/hooks'
import { useUserService } from '@/services'
import { IUser } from '@/types'
import React from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

type Props = {
  queryKey: string
}

const InfinityUserVirtualList = ({ queryKey }: Props) => {
  const { getPopularUsers } = useUserService()

  const {
    data: peopleData,
    isLoading,
    hasMore,
    fetchNextPage
  } = useInfinityList<IUser>({
    queryFunction: getPopularUsers(DEFAULT_LIST_LIMIT),
    queryKey,
    queryConfig: {
      limit: DEFAULT_LIST_LIMIT
    }
  })

  if (isLoading || peopleData.length === 0) {
    return <UserCardSkeleton numberOfSkeletons={8} />
  }

  return (
    <React.Fragment>
      <InfiniteScroll
        dataLength={peopleData.length}
        next={fetchNextPage}
        hasMore={hasMore}
        loader={<UserCardSkeleton numberOfSkeletons={3} />}
      >
        {peopleData?.map((user: IUser) => <UserCard data={user} key={`infinity-user-list-${user._id}`} />)}
      </InfiniteScroll>
    </React.Fragment>
  )
}

export default InfinityUserVirtualList
