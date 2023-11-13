import { Logo } from '@/components'
import { RoomList } from '@/features'
import React from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

type Props = {
  onOpenCreateNewGroupChatModal: () => void
}

const ChatLeftSidebar = ({ onOpenCreateNewGroupChatModal }: Props) => {
  const { t } = useTranslation()
  return (
    <StyledRoot>
      <StyledHeader>
        <StyledLogo>
          <Logo />
        </StyledLogo>
        <StyledButton onClick={onOpenCreateNewGroupChatModal}>{t('pages.chat.text.createNewGroupChat')}</StyledButton>
      </StyledHeader>
      <RoomList />
    </StyledRoot>
  )
}

export default ChatLeftSidebar

const StyledRoot = styled.div`
  display: block;
`

const StyledHeader = styled.div`
  display: flex;
`

const StyledLogo = styled.div`
  margin: 1rem;
`

const StyledButton = styled.button`
  padding: 1rem;
  background: #2f80ed;
  color: #fff;
  font-weight: 500;
  border-radius: 0.5rem;
  margin-left: auto;
`
