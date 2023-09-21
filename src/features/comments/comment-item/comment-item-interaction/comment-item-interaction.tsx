import { StyledFlex } from '@/components'
import { EFontSize, EFontWeight } from '@/constants'
import { IComment } from '@/types'
import React from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { useCommentItemInteraction } from './hooks'
import { AiOutlineHeart } from 'react-icons/ai'

type Props = {
  comment: IComment
  onShowReplyForm: () => void
}

const CommentItemInteraction = ({ comment, onShowReplyForm }: Props) => {
  const { t } = useTranslation()

  const { toggleReact, didUserLiked, likedCount } = useCommentItemInteraction(comment)

  const renderLikeCount = () => {
    if (likedCount > 0) {
      return (
        <StyledLikeCounter>
          {likedCount}{' '}
          {likedCount === 1 ? ` ${t('common.button.like-lowercase')}` : ` ${t('common.button.likes-lowercase')}`}
        </StyledLikeCounter>
      )
    }
    return null
  }

  const renderCommentInteraction = () => {
    return (
      <StyledInteractionWrapper>
        <StyledButtonWrapper onClick={toggleReact} liked={didUserLiked}>
          <AiOutlineHeart />
          {didUserLiked ? t('common.button.liked-lowercase') : t('common.button.like-lowercase')}
        </StyledButtonWrapper>
        {renderLikeCount()}
      </StyledInteractionWrapper>
    )
  }

  const renderReplyComment = () => {
    if (!comment.isChild) {
      return <StyledReplyButton onClick={onShowReplyForm}>{t('common.button.reply-lowercase')}</StyledReplyButton>
    }
  }

  return (
    <StyledFlex gap={1}>
      {renderCommentInteraction()}
      {renderReplyComment()}
    </StyledFlex>
  )
}

export default CommentItemInteraction

const StyledInteractionWrapper = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  font-size: ${EFontSize.Font3};
  color: ${({ theme }) => theme.textColor7};
`

const StyledLikeCounter = styled.div`
  word-spacing: 0.5rem;
`

const StyledButtonWrapper = styled.button<{
  liked?: boolean
}>`
  cursor: pointer;
  display: flex;
  color: ${({ theme, liked }) => (liked ? theme.backgroundColor2 : theme.textColor7)};
  align-items: center;
  font-size: ${EFontSize.Font3};
  gap: 0.5rem;
  font-weight: ${({ liked }) => (liked ? EFontWeight.FontWeight500 : EFontWeight.FontWeight400)};
`

const StyledReplyButton = styled(StyledButtonWrapper)``
