import { useUserService } from '@/services'
import { BaseControlledRef } from '@/types'
import { useCallback, useMemo, useRef } from 'react'

export const useUserOverViewActions = (userId: string) => {
  const { getCurrentUser } = useUserService()
  const currentUser = getCurrentUser()
  const editUserInfoFormRef = useRef<BaseControlledRef>(null)

  const isMe = useMemo(() => currentUser?._id === userId, [currentUser?._id, userId])

  const onShowEditUserInfoForm = useCallback(() => {
    if (editUserInfoFormRef.current && editUserInfoFormRef.current?.show) {
      editUserInfoFormRef.current.show()
    }
  }, [])

  const onGoToChat = useCallback((userId: string) => {
    /** TODO: GO TO CHAT */
  }, [])

  const onReportUser = useCallback((userId: string) => {
    /** TODO: REPORT USER */
  }, [])

  return {
    currentUser,
    isMe,
    editUserInfoFormRef,

    onShowEditUserInfoForm,
    onGoToChat,
    onReportUser
  }
}
