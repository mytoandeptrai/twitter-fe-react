import { ECommentQuery } from '@/constants'
import { CommentModel } from '@/models'
import { EventBusName, onPushEventBusHandler, useCommentService, useUploadService } from '@/services'
import { EAddCommentType, IComment, IMedia, ITweet, TCreateTweetComment, TReplyComment } from '@/types'
import { initMediaFromFile } from '@/utils'
import { useQueryClient } from '@tanstack/react-query'
import { pick } from 'lodash'
import { ChangeEvent, useCallback, useState } from 'react'

type Props = {
  tweet: ITweet
  comment?: IComment
}

interface ICommentInput {
  content: string
  media: string
}

type TAddComment = TCreateTweetComment | TReplyComment

export const useCreateCommentForm = ({ tweet, comment }: Props) => {
  const queryClient = useQueryClient()

  const [loading, setLoading] = useState<boolean>(false)
  const [content, setContent] = useState<string>('')
  const [media, setMedia] = useState<IMedia | null>(null)

  const { uploadMedia } = useUploadService()
  const { createCommentMutation } = useCommentService()

  const onChangeContent = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value)
  }, [])

  const onChangeFile = useCallback((files: FileList) => {
    const file = files?.[0]
    if (file) {
      setMedia(initMediaFromFile(file))
    }
  }, [])

  const onCancelMedia = useCallback(() => setMedia(null), [])

  const resetFields = useCallback(() => {
    onCancelMedia()
    setContent('')
  }, [onCancelMedia])

  const onEmojiClick = useCallback((emoji: string) => {
    setContent((content) => `${content}${emoji}`)
  }, [])

  const getCommentInput = (newComment: ICommentInput, currentComment?: IComment): TAddComment => {
    if (!!currentComment) {
      return {
        type: EAddCommentType.ReplyComment,
        commentId: currentComment._id,
        comment: newComment
      }
    } else {
      return {
        type: EAddCommentType.CreateTweetComment,
        tweetId: tweet._id,
        comment: newComment
      }
    }
  }

  const handleSettled = () => {
    setLoading(false)
    resetFields()
  }

  const handleSuccess = (updatedData: IComment) => {
    if (updatedData) {
      const updatedComment = new CommentModel(updatedData as IComment).getData()
      queryClient.invalidateQueries([ECommentQuery.GetTweetComments, tweet._id])

      const notificationPayload = getNotificationPayload(updatedComment as IComment)
      onPushEventBusHandler(notificationPayload)
    }
  }

  const getNotificationPayload = (updatedComment: IComment) => {
    const receivers = !!comment
      ? [pick(updatedComment, ['author', '_id'])]
      : [pick(updatedComment, ['tweet', 'author', '_id'])]

    const url = `/tweet/${pick(updatedComment, ['tweet', '_id'])}`

    return {
      type: EventBusName.CreateNotification,
      payload: {
        text: !!comment ? 'repliedYourComment' : 'commentedYourTweet',
        receivers,
        url,
        type: 'comment'
      }
    }
  }

  const onSubmit = async (event: any) => {
    event.preventDefault()

    setLoading(true)
    let url = ''

    try {
      if (media?.file) {
        url = await uploadMedia(media.file)
        if (!url) {
          setLoading(false)
          return
        }
      }

      const newComment = {
        content,
        media: url
      }

      const input = getCommentInput(newComment, comment)

      createCommentMutation.mutate(input, {
        onSettled: handleSettled,
        onSuccess: (data) => handleSuccess(data as IComment)
      })
    } catch (error) {
      // Handle any errors here
      setLoading(false)
    }
  }

  return {
    media,
    loading,
    content,

    onCancelMedia,
    onEmojiClick,
    onChangeContent,
    onChangeFile,
    onSubmit
  }
}
