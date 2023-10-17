import { ENotificationQuery, ENotificationScreen, NOTIFICATION_SMALL_LIMIT, NOTIFICATION_STALE_TIME } from '@/constants'
import { useInfinityList } from '@/hooks'
import { useNotificationService, useUserService } from '@/services'
import { INotification } from '@/types'
import { useMemo } from 'react'

export const useNotificationList = (screen: ENotificationScreen) => {
  const { getNotificationList } = useNotificationService()
  const { getCurrentUser } = useUserService()

  const currentUser = getCurrentUser()
  const { data, isLoading, hasMore, fetchNextPage, totalRecords } = useInfinityList<INotification>({
    queryFunction: getNotificationList(NOTIFICATION_SMALL_LIMIT),
    queryKey: [ENotificationQuery.GetNotifications],
    queryConfig: {
      limit: NOTIFICATION_SMALL_LIMIT,
      staleTime: NOTIFICATION_STALE_TIME
    }
  })

  const shouldHaveViewAllButton = useMemo(() => {
    return screen === ENotificationScreen.NewFeed && totalRecords > NOTIFICATION_SMALL_LIMIT
  }, [screen, totalRecords])

  const isThereAnyUnReadNotification = useMemo(() => {
    if (currentUser?._id) {
      const isRead = data?.some((notification) => {
        return notification?.isRead && !notification.isRead.includes(currentUser?._id)
      })
      return isRead
    }

    return false
  }, [currentUser?._id, data])

  return {
    data,
    isLoading,
    hasMore,
    shouldHaveViewAllButton,
    isThereAnyUnReadNotification,
    fetchNextPage
  }
}
