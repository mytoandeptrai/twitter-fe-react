import { ELocalStorageKey, EUserQuery, LONG_STATE_TIME } from '@/constants'
import { EventBus, EventBusName, useUserService } from '@/services'
import { IUser } from '@/types'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect, useMemo } from 'react'
import { Subscription } from 'rxjs'
import { useLocalStorage } from './useLocalStorage'

export const useApp = () => {
  const { getMe } = useUserService()
  const queryClient = useQueryClient()

  const [accessToken, setAccessToken] = useLocalStorage(ELocalStorageKey.AccessToken, '')

  const getMeQuery = useQuery<IUser | undefined>([EUserQuery.GetMe], getMe, {
    staleTime: LONG_STATE_TIME,
    retry: 0,
    onError: () => {
      localStorage.removeItem(ELocalStorageKey.AccessToken)
    }
  })

  const isLoadingUser = useMemo(() => {
    const hasAccessToken = !!accessToken
    if (!hasAccessToken) {
      return false
    }

    return getMeQuery?.isLoading
  }, [getMeQuery?.isLoading, accessToken])

  const subscription = new Subscription()

  const subscribeEventBus = () => {
    return EventBus.getInstance().events.subscribe((event: any) => {
      if (event.type === EventBusName.Logout) {
        if (accessToken) {
          setAccessToken('')
          queryClient.invalidateQueries([EUserQuery.GetMe])
        }
      }
    })
  }

  const registerEventBusHandler = () => {
    subscription.add(subscribeEventBus())
  }

  useEffect(() => {
    registerEventBusHandler()

    return () => {
      subscription.unsubscribe()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    user: getMeQuery?.data,
    isLoadingUser
  }
}
