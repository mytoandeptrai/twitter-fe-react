import { axiosClient } from '@/apis'
import { ECommentQuery, EEndpoints } from '@/constants'
import { CommentModel } from '@/models'
import { EAddCommentType, IComment, TCreateTweetComment, TReplyComment } from '@/types'
import { tryCatchFn } from '@/utils'
import { getList } from '@/utils/query'
import { QueryFunctionContext, useMutation } from '@tanstack/react-query'

type TAddComment = TCreateTweetComment | TReplyComment

export const useCommentService = () => {
  const getTweetComments = (limit: number) => {
    return ({ pageParam, queryKey }: QueryFunctionContext) => {
      const tweetId = queryKey[1]
      const url = `${EEndpoints.Comment}/${tweetId}`
      return getList<IComment>(url, pageParam, {
        limit
      })
    }
  }

  const createComment = (input: TAddComment) => {
    return tryCatchFn(async () => {
      const url = `${EEndpoints.Comment}/${
        input.type === EAddCommentType.CreateTweetComment ? input.tweetId : input.commentId
      }`
      const response = await axiosClient.post(url, input.comment)
      const comment = new CommentModel(response?.data?.data).getData()
      return comment
    }, true)
  }

  const reactTweet = (id: string) => {
    return tryCatchFn(async () => {
      const url = `${EEndpoints.Comment}/${id}/react`
      const response = await axiosClient.patch(url)
      return new CommentModel(response?.data?.data).getData()
    }, true)
  }

  const createCommentMutation = useMutation([ECommentQuery.CreateComment], createComment)
  const reactCommentMutation = useMutation([ECommentQuery.ReactComment], reactTweet)

  return { getTweetComments, reactCommentMutation, createCommentMutation }
}
