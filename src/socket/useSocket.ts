import { setSocket } from '@/store/app/app.slice'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { SocketConnector } from './socketConnector'

export const useSocket = () => {
  const dispatch = useDispatch()

  const initSocket = () => {
    const socketConnector = new SocketConnector()
    const socketInstance = socketConnector.instance

    socketInstance.on('connect', () => {
      dispatch(setSocket(socketInstance))
    })
  }

  useEffect(() => {
    initSocket()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {}
}
