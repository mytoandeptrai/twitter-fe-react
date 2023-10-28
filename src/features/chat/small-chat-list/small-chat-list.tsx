import React from 'react'
import styled from 'styled-components'
import { useSmallChatList } from './hook'
import { CommonButton, StyledBoundUpDown } from '@/components'
import { AiOutlineMessage } from 'react-icons/ai'
import { useTranslation } from 'react-i18next'
import { RoomList } from '@/features/room'

const SmallChatList = () => {
  const { t } = useTranslation()
  const { isChatOpen, onToggleChat, onOpenCreateNewGroupChatModal } = useSmallChatList()

  const renderChatList = () => {
    return (
      <StyledContent isOpen={isChatOpen}>
        <StyledHeading>{t('pages.chat.text.contact')}</StyledHeading>
        <StyledChatList>
          <RoomList />
        </StyledChatList>
        <CommonButton onClick={onOpenCreateNewGroupChatModal}>{t('common.button.createNewGroupChat')}</CommonButton>
      </StyledContent>
    )
  }

  const renderChatGroupButton = () => {
    return (
      <StyledToggleChatButtons onClick={onToggleChat}>
        <AiOutlineMessage />
      </StyledToggleChatButtons>
    )
  }

  return (
    <StyledRoot>
      {renderChatList()}
      {renderChatGroupButton()}
    </StyledRoot>
  )
}

export default SmallChatList

const StyledRoot = styled.div`
  position: fixed;
  width: 28rem;
  padding: 1.5rem;
  z-index: 2;
  bottom: 5rem;
  right: 5rem;
  border-radius: 10px;
`

const StyledHeading = styled.div`
  font-size: 1.5rem;
  font-weight: 500;
  line-height: 2;
  border-bottom: 1px solid #e0e0e0;
`

const StyledChatList = styled.div`
  padding: 1rem 0;
  max-height: 40rem;
  overflow: auto;
`

const StyledToggleChatButtons = styled.button`
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 1rem;
  border: 1.5rem solid #2d9cdb;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${StyledBoundUpDown} 3s ease-in-out infinite;

  svg {
    --size: 2rem;
    width: var(--size);
    height: var(--size);
  }
`

const StyledContent = styled('div')<{
  isOpen: boolean
}>`
  transform: translate(-10%, -25%) scale(${(props) => (props.isOpen ? 1 : 0)});
  position: absolute;
  bottom: 2rem;
  background: #fff;
  padding: 2rem;
  border-radius: 1rem;
  width: 30rem;
  transform-origin: bottom center;
  transition: all 0.5s ease-in-out;
`
