import { useIntersectionObserver } from '@/hooks'
import { IMessage } from '@/types'
import { useCallback, useEffect, useRef, useState } from 'react'

type IMessageImage = {
  file: File | null
  url: string
  messageText: string
}

type Props = {
  messages: IMessage[]
  messageImage: IMessageImage
  hasMore: boolean
  currentUserId: string
  onCloseImageMessageForm: () => void
  onSubmit: (e: any) => void
  onFetchNextPage: () => void
  onChangeInputMessage: (e: any) => void
  onChangeInputFile: (file: File) => void
}

export const useChatContentMain = ({ messages, hasMore, onFetchNextPage }: Props) => {
  const messageDiv = useRef() as React.RefObject<HTMLDivElement>
  const loadMoreRef = useRef() as React.RefObject<HTMLDivElement>

  const [shouldJumpToEnd, setShouldJumpToEnd] = useState(true)
  const onChangeShouldJumpToEnd = useCallback((newShouldJump: boolean) => setShouldJumpToEnd(newShouldJump), [])

  useEffect(() => {
    if (shouldJumpToEnd && messageDiv && messageDiv.current) {
      messageDiv.current.scrollTop = messageDiv.current.scrollHeight
    }
  }, [messages, shouldJumpToEnd])

  useIntersectionObserver({
    target: loadMoreRef,
    enabled: hasMore,
    onIntersect: () => {
      setShouldJumpToEnd(false)
      onFetchNextPage()
    }
  })

  return {
    messageDiv,
    loadMoreRef,
    onChangeShouldJumpToEnd
  }
}
