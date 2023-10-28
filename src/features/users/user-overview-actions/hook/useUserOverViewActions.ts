import { ROUTES_PATH } from '@/routes'
import { useUserService } from '@/services'
import { RootState } from '@/store'
import { setJoinedRoom } from '@/store/room/room.slice'
import { BaseControlledRef, IRoom } from '@/types'
import { useCallback, useMemo, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
export const useUserOverViewActions = (userId: string) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const connectedRoom = useSelector((state: RootState) => state.roomState.connectedRooms)
  const [isLoading, setIsLoading] = useState(false)
  const editUserInfoFormRef = useRef<BaseControlledRef>(null)
  const { getCurrentUser, reportUserMutation } = useUserService()

  const currentUser = getCurrentUser()
  const isMe = useMemo(() => currentUser?._id === userId, [currentUser?._id, userId])

  const onShowEditUserInfoForm = useCallback(() => {
    if (editUserInfoFormRef.current && editUserInfoFormRef.current?.show) {
      editUserInfoFormRef.current.show()
    }
  }, [])

  const onCheckExistedRoom = useCallback((roomArray: IRoom[] | null, userIds: string[]) => {
    if (!roomArray) return null
    const existedRoom = roomArray?.find((room: IRoom) => {
      if (room.isDm) {
        const roomMembers = (room?.members ?? []).map((ru) => ru?._id)?.sort()
        return JSON.stringify(roomMembers) === JSON.stringify(userIds)
      }

      return false
    })

    return existedRoom
  }, [])

  const onGoToChat = useCallback(
    (userId: string) => {
      if (!currentUser?._id) return
      const userIds = [currentUser?._id, userId].sort()
      const existedRoom = onCheckExistedRoom(connectedRoom, userIds as string[])
      if (!existedRoom) {
        const payload = {
          owner: currentUser?._id,
          members: [currentUser?._id, userId]
        }
        dispatch(setJoinedRoom(payload))
        return
      }

      const url = `${ROUTES_PATH.chat}/${existedRoom._id}`
      navigate(url)
    },
    [connectedRoom, currentUser?._id, dispatch, navigate, onCheckExistedRoom]
  )

  const onReportUser = useCallback(
    (userId: string) => {
      setIsLoading(true)
      reportUserMutation.mutate(userId, {
        onError: (error: any) => {
          console.log('🚀 ~ ', error)
        },
        onSettled: () => {
          setIsLoading(false)
        }
      })
    },
    [reportUserMutation]
  )

  return {
    isLoading,
    currentUser,
    isMe,
    editUserInfoFormRef,

    onShowEditUserInfoForm,
    onGoToChat,
    onReportUser
  }
}
