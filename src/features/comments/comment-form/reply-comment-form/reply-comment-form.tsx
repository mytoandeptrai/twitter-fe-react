import { useToggle } from '@/hooks'
import { BaseControlledRef, IComment } from '@/types'
import React, { Ref, forwardRef, memo, useImperativeHandle } from 'react'
import styled from 'styled-components'
import { CreateCommentForm } from '../create-comment-form'

type Props = {
  comment: IComment
}

const ReplyCommentForm = ({ comment }: Props, ref: Ref<BaseControlledRef>) => {
  const { show, hide, visible } = useToggle()
  useImperativeHandle(ref, () => ({ show, hide, visible }), [show, hide, visible])

  return (
    <StyledRoot visible={visible}>
      <CreateCommentForm tweet={comment.tweet} comment={comment} />
    </StyledRoot>
  )
}

export default memo(forwardRef(ReplyCommentForm))

const StyledRoot = styled.div<{
  visible: boolean
}>`
  display: ${({ visible }) => (visible ? 'block' : 'none')};
`
