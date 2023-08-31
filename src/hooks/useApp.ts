import { ELocalStorageKey, EUserQuery, LONG_STATE_TIME } from '@/constants'
import { useLocalStorage } from './useLocalStorage'
import { Subscription } from 'rxjs'
import { EventBus, EventBusName, useUserService } from '@/services'
import { useEffect, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { IUser } from '@/types'
export const useApp = () => {
  const [accessToken, setAccessToken] = useLocalStorage(ELocalStorageKey.AccessToken, '')
  const { getMe } = useUserService()

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
