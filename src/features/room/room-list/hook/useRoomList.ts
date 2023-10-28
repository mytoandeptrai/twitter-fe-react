import { useUserService } from '@/services'
import { RootState } from '@/store'
import { useSelector } from 'react-redux'

export const useRoomList = () => {
  const connectedRooms = useSelector((state: RootState) => state.roomState.connectedRooms)
  const { getCurrentUser } = useUserService()
  const currentUser = getCurrentUser()

  return {
    connectedRooms,
    currentUser
  }
}
