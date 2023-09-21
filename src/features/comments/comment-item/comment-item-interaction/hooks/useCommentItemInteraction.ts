import { ECommentQuery } from '@/constants'
import { CommentModel } from '@/models'
import { EventBusName, onPushEventBusHandler, useCommentService, useUserService } from '@/services'
import { IComment } from '@/types'
import { useQueryClient } from '@tanstack/react-query'
import React, { useCallback } from 'react'

export const useCommentItemInteraction = (comment: IComment) => {
  const queryClient = useQueryClient()
  const { reactCommentMutation } = useCommentService()
  const { getCurrentUser } = useUserService()

  const { _id: currentUserId = '' } = getCurrentUser() || {}
  const [visibleReplyForm, setVisibleReplyForm] = React.useState(false)
  const replyFormRef = React.useRef<HTMLFormElement>(null)

  const onShowReplyForm = useCallback(() => {
    setVisibleReplyForm(true)
    if (replyFormRef.current) {
      replyFormRef?.current?.focus()
    }
  }, [])

  const getNotificationPayload = (comment: IComment) => {
    const { author, tweet } = comment
    const receivers = [author._id]
    const url = `/tweet/${tweet?._id}`

    return {
      type: EventBusName.CreateNotification,
      payload: {
        text: 'likedYourComment',
        receivers,
        url,
        type: 'likedComment'
      }
    }
  }

  const handleSuccess = (updatedData: IComment, currentUserId: string) => {
    if (updatedData) {
      const updatedComment = new CommentModel(updatedData).getData()
      queryClient.invalidateQueries([ECommentQuery.GetTweetComments, comment.tweet._id])

      if (updatedComment?.likes?.includes(currentUserId)) {
        const notificationPayload = getNotificationPayload(updatedComment)
        onPushEventBusHandler(notificationPayload)
      }
    }
  }

  const filterCommentLikes = (comment: IComment, userId: string) => {
    const cloneCommentArray = { ...comment }
    if (cloneCommentArray.likes.includes(userId)) {
      cloneCommentArray.likes = cloneCommentArray.likes.filter((id) => id !== userId)
    } else {
      cloneCommentArray.likes = [...cloneCommentArray.likes, userId]
    }

    return cloneCommentArray
  }

  const toggleReact = async () => {
    const newComment = filterCommentLikes(comment, currentUserId)

    reactCommentMutation.mutate(newComment._id, {
      onSuccess: (data) => handleSuccess(data as IComment, currentUserId)
    })
  }

  const didUserLiked = comment.likes?.includes(currentUserId)
  const likedCount = comment.likes?.length || 0

  return {
    likedCount,
    didUserLiked,
    visibleReplyForm,

    onShowReplyForm,
    toggleReact
  }
}
