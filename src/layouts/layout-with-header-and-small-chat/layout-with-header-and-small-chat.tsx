import React from 'react'
import { Header } from '../components'
import { SmallChatList } from '@/features'

type Props = {
  children: React.ReactNode
}

const LayoutWithHeaderAndSmallChat = ({ children }: Props) => {
  return (
    <React.Fragment>
      <Header />
      {children}
      <SmallChatList />
    </React.Fragment>
  )
}

export default LayoutWithHeaderAndSmallChat
