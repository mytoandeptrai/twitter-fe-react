import { SOCKET_URL } from '@/constants'
import io, { Socket } from 'socket.io-client'

export class SocketConnector {
  instance: Socket
  constructor() {
    const item = window.localStorage.getItem('token')
    const jwt = item ? JSON.parse(item) : ''
    const url = SOCKET_URL || 'http://locahost:8081'
    this.instance = io(url, {
      transports: ['websocket'],
      query: {
        token: jwt
      }
    })
  }
}
