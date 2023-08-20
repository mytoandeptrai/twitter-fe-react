import { ELocalStorageKey } from '../constants'
import { useLocalStorage } from './useLocalStorage'
import { Subscription } from 'rxjs'
import { EventBus, EventBusName } from '@/services'
import { useEffect } from 'react'
export const useApp = () => {
  const [accessToken, setAccessToken] = useLocalStorage(ELocalStorageKey.AccessToken, '')

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
    user: {},
    isLoadingUser: false
  }
}
