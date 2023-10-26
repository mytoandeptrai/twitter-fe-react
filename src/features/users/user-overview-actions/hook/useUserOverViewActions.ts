import { useUserService } from '@/services'
import { BaseControlledRef } from '@/types'
import { useCallback, useMemo, useRef, useState } from 'react'

export const useUserOverViewActions = (userId: string) => {
  const [isLoading, setIsLoading] = useState(false)
  const { getCurrentUser, reportUserMutation } = useUserService()
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
