import { useAppContext } from '@/contexts'
import { SocketConnector } from './socketConnector'
import { APP_DISPATCH_ACTIONS } from '@/constants'
import { useEffect } from 'react'

export const useSocket = () => {
  const { dispatch } = useAppContext()

  const initSocket = () => {
    const socketConnector = new SocketConnector()
    const socketInstance = socketConnector.instance

    socketInstance.on('connect', () => {
      console.log('Connected')
      // dispatch({
      //   type: APP_DISPATCH_ACTIONS.SET_SOCKET,
      //   payload: socketInstance
      // })
    })
  }

  useEffect(() => {
    initSocket()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {}
}
