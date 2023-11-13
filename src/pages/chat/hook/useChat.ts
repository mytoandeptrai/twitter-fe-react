import { EMessageQuery } from '@/constants'
import { useInfinityMessageList } from '@/hooks'
import { ROUTES_PATH } from '@/routes'
import { useMessageService, useUploadService, useUserService } from '@/services'
import { RootState } from '@/store'
import { setModal } from '@/store/app/app.slice'
import { setNewMessage } from '@/store/message/message.slice'
import { IRoom, IUser } from '@/types'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const MESSAGE_LIST_LIMIT = 20

const initialMessageImage = {
  file: null,
  url: '',
  messageText: ''
}

type IMessageImage = {
  file: File | null
  url: string
  messageText: string
}

export const useChat = (roomId = '') => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [messageImage, setMessageImage] = useState<IMessageImage>(initialMessageImage)
  const [room, setRoom] = useState<IRoom | null>(null)
  const [guest, setGuest] = useState<IUser | null>(null)
  const [isShowMemberList, setIsShowMemberList] = useState(false)
  const connectedRooms = useSelector((state: RootState) => state.roomState.connectedRooms)

  const { getCurrentUser } = useUserService()
  const { getMessages } = useMessageService()
  const { uploadMedia } = useUploadService()
  const currentUser = getCurrentUser()
  const { data, hasMore, isLoading, totalRecords, fetchNextPage } = useInfinityMessageList({
    queryKey: [EMessageQuery.GetMessagesByRoomId, roomId],
    queryFunction: getMessages(MESSAGE_LIST_LIMIT),
    queryConfig: {
      staleTime: 0,
      retry: false
    }
  })

  const roomInfos = useMemo(() => {
    if (!room && !guest) {
      return {
        roomImage: '',
        roomName: ''
      }
    }

    if (room?.isDm) {
      return {
        roomImage: guest?.avatar || '',
        roomName: guest?.name || ''
      }
    }

    return {
      roomImage: room?.image || '',
      roomName: room?.name || ''
    }
  }, [room, guest])

  const onChangeShowMemberList = useCallback((newShowMemberList: boolean) => setIsShowMemberList(newShowMemberList), [])

  const generateNewMessage = useCallback((currentUser: IUser, message: string, roomId: string) => {
    const payload = {
      author: currentUser,
      content: message,
      roomId: roomId
    }
    return payload
  }, [])

  const onCloseImageMessageForm = useCallback(() => setMessageImage(initialMessageImage), [])

  const onSubmitForm = async (event: any) => {
    event.preventDefault()
    if (!currentUser?._id) return
    const newMessage: any = generateNewMessage(currentUser, messageImage.messageText, roomId)

    if (messageImage.file) {
      const imageResponse = await uploadMedia(messageImage.file)
      if (!imageResponse) return
      newMessage.file = imageResponse
    }

    dispatch(setNewMessage(newMessage))
    onCloseImageMessageForm()
  }

  const onOpenCreateNewGroupChatModal = useCallback(() => {
    const payload = {
      visible: true,
      props: null
    }
    dispatch(setModal(payload))
  }, [dispatch])

  const onChangeInputMessage = (event: any) => {
    const value = event.target.value
    setMessageImage((prev) => ({
      ...prev,
      messageText: value
    }))
  }

  const onChangeInputFile = (file: File) => {
    if (!file) {
      return
    }

    const newPhoto = {
      file,
      url: URL.createObjectURL(file)
    }
    setMessageImage((prev) => ({ ...prev, ...newPhoto }))
  }

  const checkUserIsMember = useCallback(
    (room: IRoom) => room.members.some((member: IUser) => member._id === currentUser?._id),
    [currentUser?._id]
  )

  useEffect(() => {
    const currentRoom = connectedRooms?.find((room) => room._id === roomId)
    if (!roomId || connectedRooms?.length === 0 || !currentRoom) return navigate(ROUTES_PATH.home)

    const detectUserIsMemberOfCurrentRoom = checkUserIsMember(currentRoom)
    if (!detectUserIsMemberOfCurrentRoom) return navigate(ROUTES_PATH.home)
    const otherPerson = currentRoom?.members?.find((mb) => mb._id !== currentUser?._id)

    if (otherPerson) {
      setGuest(otherPerson)
    }

    setRoom(currentRoom)

    return () => {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connectedRooms, roomId])

  return {
    room,
    guest,
    messageImage,
    data,
    hasMore,
    isLoading,
    isShowMemberList,
    totalRecords,
    roomInfos,

    fetchNextPage,
    onSubmitForm,
    onOpenCreateNewGroupChatModal,
    onCloseImageMessageForm,
    onChangeInputFile,
    onChangeInputMessage,
    onChangeShowMemberList
  }
}
