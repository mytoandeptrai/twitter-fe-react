import { ICreateRoomDTO, IMedia, IRoom, IUser } from '@/types'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { v4 as uuid } from 'uuid'
import _ from 'lodash'
import { DEFAULT_URL_GROUP, EMedia } from '@/constants'
import { setModal } from '@/store/app/app.slice'
import { useRoomService, useUploadService, useUserService } from '@/services'
import { ROUTES_PATH } from '@/routes'
import { BsCardImage } from 'react-icons/bs'

const initialRoomInfo = {
  name: '',
  description: '',
  members: []
}

const generateInputGroup = (onChange: (e: React.ChangeEvent<HTMLInputElement>) => void) => {
  return [
    {
      label: {
        htmlFor: 'groupName',
        title: 'pages.chat.text.groupChatName'
      },
      input: {
        id: 'groupName',
        type: 'text',
        name: 'name',
        placeholder: 'pages.chat.text.groupChatName',
        onChange
      }
    },
    {
      label: {
        htmlFor: 'groupChatDescription',
        title: 'pages.chat.text.groupChatDescription'
      },
      input: {
        id: 'groupChatDescription',
        type: 'text',
        name: 'description',
        placeholder: 'pages.chat.text.groupChatDescription',
        onChange
      }
    }
  ]
}

const generateInputImageGroup = (onChange: (e: React.ChangeEvent<HTMLInputElement>) => void) => {
  return {
    label: {
      htmlFor: 'newRoomImage',
      title: 'pages.chat.text.roomImage',
      icon: <BsCardImage />
    },
    input: {
      type: 'file',
      name: 'image',
      id: 'newRoomImage',
      onChange
    }
  }
}

export const useGroupChatCreateModal = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { getCurrentUser } = useUserService()
  const { uploadMedia } = useUploadService()
  const { createNewRoomMutation } = useRoomService()

  const [roomInfoDTO, setRoomInfoDTO] = useState<ICreateRoomDTO>(initialRoomInfo)
  const [loading, setLoading] = useState<boolean>(false)
  const [media, setMedia] = useState<IMedia | null>(null)
  const [isAddMemberForOpened, setIsAddMemberForOpened] = useState<boolean>(false)
  const [newGroupChatUserList, setNewGroupUserList] = useState<IUser[]>([])

  const currentUser = getCurrentUser()

  const onAddToNewGroupList = useCallback((users: IUser[], newGroupChatUserList: IUser[]) => {
    const mergedUsers = _.merge(newGroupChatUserList, users)
    setNewGroupUserList(mergedUsers)
  }, [])

  const onRemoveUserFromGroupList = useCallback((user: IUser) => {
    setNewGroupUserList((prev) => [...prev].filter((us) => us._id !== user._id))
  }, [])

  const onChangeImageFile = useCallback((file: File | null) => {
    if (file) {
      const newMedia: IMedia = {
        id: uuid(),
        file,
        url: URL.createObjectURL(file),
        type: EMedia.Image
      }
      setMedia(newMedia)
    }
  }, [])

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value, files } = e.target
      setRoomInfoDTO((prev) => ({
        ...prev,
        [name]: value
      }))

      if (files && files?.length > 0) {
        const file = files?.[0]
        onChangeImageFile(file)
      }
    },

    [onChangeImageFile]
  )

  const onCloseModal = useCallback(() => {
    const payload = {
      visible: false,
      props: null
    }
    dispatch(setModal(payload))
  }, [dispatch])

  const onOpenAddMemberModal = useCallback(() => setIsAddMemberForOpened(true), [])

  const onCloseAddMemberModal = useCallback(() => setIsAddMemberForOpened(false), [])

  const onImageUpload = useCallback(
    async (media: IMedia | null) => {
      let image = DEFAULT_URL_GROUP
      if (media?.file) {
        image = await uploadMedia(media.file)
        if (!image) return null
      }

      return image
    },
    [uploadMedia]
  )

  const onGenerateMemberIds = useCallback((newGroupChatUserList: IUser[]) => {
    return Array.from(new Set(newGroupChatUserList.map((u: IUser) => u._id) || []))
  }, [])

  const onGenerateRoomDTO = useCallback((roomInfo: ICreateRoomDTO, image: string, membersIds: string[]) => {
    const roomDTO = {
      ...roomInfo,
      image,
      members: membersIds,
      isDm: membersIds.length === 2,
      isPrivate: true
    }
    return roomDTO
  }, [])

  const onSubmitSuccess = useCallback(
    (newRoom: IRoom) => {
      const url = `${ROUTES_PATH.chat}/${newRoom._id}`
      navigate(url)
    },
    [navigate]
  )

  const onSubmit = useCallback(async () => {
    if (!currentUser?._id) return
    const currentNewGroupChatUserList = [currentUser, ...newGroupChatUserList]

    if (currentNewGroupChatUserList.length < 2) return

    setLoading(true)
    const uploadedImage = await onImageUpload(media)
    if (!uploadedImage) return setLoading(false)

    const membersIds = onGenerateMemberIds(currentNewGroupChatUserList)
    if (membersIds.length < 2) return setLoading(false)

    const createdRoomDTO = onGenerateRoomDTO(roomInfoDTO, uploadedImage, membersIds)
    createNewRoomMutation.mutate(createdRoomDTO, {
      onSuccess: (data: any) => onSubmitSuccess(data),
      onError: (error: any) => {
        console.log('🚀 ~ file: useGroupChatCreateModal.tsx:185 ~ onSubmit ~ error:', error)
      },
      onSettled: () => {
        onCloseModal()
        setLoading(false)
      }
    })
  }, [
    createNewRoomMutation,
    currentUser,
    media,
    newGroupChatUserList,
    onCloseModal,
    onGenerateMemberIds,
    onGenerateRoomDTO,
    onImageUpload,
    onSubmitSuccess,
    roomInfoDTO
  ])

  const inputGroupChatList = useMemo(() => {
    return generateInputGroup(onChange)
  }, [onChange])

  const inputImageGroupChatList = useMemo(() => {
    return generateInputImageGroup(onChange)
  }, [onChange])

  const disabledOkButton = useMemo(() => {
    const currentNewGroupChatUserList = [currentUser, ...newGroupChatUserList]
    return currentNewGroupChatUserList.length < 2 || !roomInfoDTO.name || !roomInfoDTO.description || loading
  }, [currentUser, loading, newGroupChatUserList, roomInfoDTO.description, roomInfoDTO.name])

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])

  return {
    media,
    loading,
    isAddMemberForOpened,
    newGroupChatUserList,
    inputGroupChatList,
    inputImageGroupChatList,
    disabledOkButton,

    onCloseModal,
    onCloseAddMemberModal,
    onRemoveUserFromGroupList,
    onOpenAddMemberModal,
    onAddToNewGroupList,
    onSubmit
  }
}
