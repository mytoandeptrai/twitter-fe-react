import { setSocket } from '@/store/app/app.slice'
import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SocketConnector } from './socketConnector'
import { useNotificationService, useUserService } from '@/services'
import { useQueryClient } from '@tanstack/react-query'
import { selectNewMessageState } from '@/store/message/message.slice'
import { setConnectedUsers } from '@/store/user/user.slice'
import { EMessageQuery, ENotificationQuery } from '@/constants'
import { selectJoinedRoom, updateConnectedRoom } from '@/store/room/room.slice'
import { useNavigate } from 'react-router-dom'
import { ROUTES_PATH } from '@/routes'

export const useSocket = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const queryClient = useQueryClient()
  const { spawnNotification } = useNotificationService()
  const { getCurrentUser } = useUserService()

  const currentUser = getCurrentUser()

  const socketInstanceRef = useRef<any>(null)
  const newMessage = useSelector(selectNewMessageState)
  const joinedRooms = useSelector(selectJoinedRoom)

  const initSocket = () => {
    const socketConnector = new SocketConnector()
    const socketInstance = socketConnector.instance
    socketInstanceRef.current = socketInstance

    socketInstance.on('connect', () => {
      dispatch(setSocket(socketInstance))
    })

    socketInstance.on('usersConnected', (connectedUsers: any) => {
      if (!!connectedUsers.length) {
        dispatch(setConnectedUsers(connectedUsers))
      }
    })

    socketInstance.on('newMessage', (newMessageSocket: any) => {
      if (newMessageSocket?.roomId) {
        queryClient.invalidateQueries([EMessageQuery.GetMessagesByRoomId, newMessageSocket?.roomId])
      }
    })

    socketInstance.on('newDMRoom', (newDMRoomData: any) => {
      const newRoomId = newDMRoomData?.roomId
      if (newRoomId) {
        const url = `${ROUTES_PATH.chat}/${newRoomId}`
        dispatch(updateConnectedRoom(newDMRoomData))
        navigate(url)
      }
    })

    socketInstance.on('newNotification', (newNotification: any) => {
      if (newNotification?._id) {
        spawnNotification(newNotification?.text, newNotification?.sender?.avatar, newNotification?.url || '', 'Tweeter')
        queryClient.invalidateQueries([ENotificationQuery.GetNotifications])
      }
    })

    return () => {}
  }

  useEffect(() => {
    if (!socketInstanceRef.current) {
      initSocket()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /** side effect for create new direction room */
  useEffect(() => {
    if (!socketInstanceRef.current) return

    if (joinedRooms && joinedRooms?.owner) {
      socketInstanceRef.current?.emit('newDMRoom', joinedRooms)
    }
  }, [joinedRooms])

  /** side effect for create new message */
  useEffect(() => {
    if (!socketInstanceRef.current) return

    const hasMessageText = newMessage && newMessage?.content?.length > 0
    const hasMessageImage = newMessage && newMessage?.file
    if (hasMessageText || hasMessageImage) {
      socketInstanceRef.current?.emit('newMessage', newMessage)
    }
  }, [newMessage])

  /** side effect for connect/disconnect users */
  useEffect(() => {
    if (currentUser?._id && socketInstanceRef.current) {
      socketInstanceRef.current.emit('userOn', currentUser)
    }

    return () => {
      if (currentUser?._id && socketInstanceRef.current) {
        socketInstanceRef.current.emit('userOff', currentUser)
      }
    }
  }, [currentUser])

  return {}
}
