import { setModal } from '@/store/app/app.slice'
import { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'

export const useSmallChatList = () => {
  const dispatch = useDispatch()
  const [isChatOpen, setIsChatOpen] = useState(false)

  const onToggleChat = () => setIsChatOpen((prev) => !prev)

  const onOpenCreateNewGroupChatModal = useCallback(() => {
    const payload = {
      visible: true,
      props: null
    }
    dispatch(setModal(payload))
  }, [dispatch])

  return {
    isChatOpen,
    onToggleChat,
    onOpenCreateNewGroupChatModal
  }
}
