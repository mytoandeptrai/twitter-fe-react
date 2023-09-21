import { SmallAvatar, StyledFlex } from '@/components'
import { BaseControlledRef, IComment } from '@/types'
import React, { useCallback, useRef } from 'react'
import styled from 'styled-components'
import { CommentItemContent } from './comment-item-content'
import { CommentItemInteraction } from './comment-item-interaction'
import { ReplyCommentForm } from '../comment-form'

type Props = {
  comment: IComment
}

const CommentItem = ({ comment }: Props) => {
  const replyFormRef = useRef<BaseControlledRef>(null)

  const onShowReplyForm = useCallback(() => {
    if (replyFormRef.current) {
      const visible = replyFormRef.current?.visible
      const functionOfRef = visible ? replyFormRef.current?.hide : replyFormRef.current.show
      functionOfRef && functionOfRef()
    }
  }, [])

  const renderCommentReplies = () => {
    if (!!comment?.replies?.length) {
      return (
        <StyledReplyWrapper>
          {comment?.replies?.map((reply: IComment) => (
            <CommentItem comment={reply} key={`reply-comment-${reply._id}`} />
          ))}
        </StyledReplyWrapper>
      )
    }

    return null
  }

  return (
    <div>
      <StyledFlex gap={0.5}>
        <SmallAvatar user={comment?.author} />
        <StyledMain>
          <CommentItemContent comment={comment} />
          <CommentItemInteraction comment={comment} onShowReplyForm={onShowReplyForm} />
          {renderCommentReplies()}
        </StyledMain>
      </StyledFlex>
      <ReplyCommentForm comment={comment} ref={replyFormRef} />
    </div>
  )
}

export default CommentItem

const StyledMain = styled.div`
  flex: 1;
`

const StyledReplyWrapper = styled.div`
  margin-top: 1rem;
`
