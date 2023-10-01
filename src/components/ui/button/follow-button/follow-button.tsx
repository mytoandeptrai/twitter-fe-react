import { safeCallFn } from '@/utils'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { IoPersonAdd, IoPersonRemove } from 'react-icons/io5'
import styled from 'styled-components'

type Props = {
  isFollowed: boolean
  onClick?: () => void
}

const FollowButton = ({ isFollowed, onClick = () => {} }: Props) => {
  const { t } = useTranslation()

  const onClickHandler = () => {
    safeCallFn(onClick)
  }

  const renderText = isFollowed ? t('common.button.unFollow') : t('common.button.follow')
  const renderIcon = isFollowed ? <IoPersonRemove /> : <IoPersonAdd />
  return (
    <StyleFollowButton onClick={onClickHandler}>
      <IoPersonAdd />
      {renderIcon}
      {renderText}
    </StyleFollowButton>
  )
}

export default FollowButton

const StyleFollowButton = styled.button`
  cursor: pointer;
  background: var(--blue-1);
  color: #fff;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.4rem 1.4rem;
  border-radius: 0.4rem;
  justify-self: flex-end;
`
