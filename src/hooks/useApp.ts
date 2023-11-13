import { ELocalStorageKey, ERoomQuery, EUserQuery, LONG_STATE_TIME } from '@/constants'
import { EventBus, EventBusName, useNotificationService, useRoomService, useUserService } from '@/services'
import { IRoom, IUser } from '@/types'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect, useMemo } from 'react'
import { Subscription } from 'rxjs'
import { useLocalStorage } from './useLocalStorage'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store'
import { setConnectedRoom } from '@/store/room/room.slice'

export const useApp = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const { getMe } = useUserService()
  const { getUserRooms } = useRoomService()
  const queryClient = useQueryClient()
  const { createNotificationMutation } = useNotificationService()
  const modal = useSelector((state: RootState) => state.appState.modal)
  const socket = useSelector((state: RootState) => state.appState.socket)
  const [accessToken, setAccessToken] = useLocalStorage(ELocalStorageKey.AccessToken, '')

  const getMeQuery = useQuery<IUser | undefined>([EUserQuery.GetMe], getMe, {
    staleTime: LONG_STATE_TIME,
    retry: 0,
    onError: () => {
      localStorage.removeItem(ELocalStorageKey.AccessToken)
    }
  })

  useQuery<IRoom[] | undefined>([ERoomQuery.GetUserRooms], getUserRooms, {
    staleTime: LONG_STATE_TIME,
    retry: 0,
    enabled: !!getMeQuery?.data?._id,
    onSuccess: (roomsData: IRoom[] | undefined) => {
      dispatch(setConnectedRoom(roomsData))
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

      if (event.type === EventBusName.CreateNotification) {
        createNotificationMutation.mutate(event.payload, {
          onSuccess: (data) => {
            if (data && socket) {
              socket.emit('createNotification', data)
            }
          }
        })
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

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return {
    user: getMeQuery?.data,
    isLoadingUser,
    modal
  }
}
