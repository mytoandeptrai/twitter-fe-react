import { useUploadService, useUserService } from '@/services'
import { IUser } from '@/types'
import { useCallback, useMemo } from 'react'

export const useUserOverView = (user: IUser) => {
  const { getCurrentUser, updateUserMutation } = useUserService()
  const { uploadMedia } = useUploadService()

  const currentUser = getCurrentUser()
  const isMe = useMemo(() => currentUser?._id === user?._id, [currentUser?._id, user?._id])

  const onUpdateAvatar = useCallback(
    async (file: File): Promise<void> => {
      if (!currentUser?._id) return
      const newAvatarUrl = await uploadMedia(file)

      if (newAvatarUrl) {
        const payload = {
          userId: currentUser?._id,
          updatedUserDto: {
            avatar: newAvatarUrl
          }
        }

        updateUserMutation.mutate(payload, {
          onError: (error: any) => {}
        })
      }
    },
    [currentUser?._id, updateUserMutation, uploadMedia]
  )

  return {
    currentUser,
    isMe,
    onUpdateAvatar
  }
}
