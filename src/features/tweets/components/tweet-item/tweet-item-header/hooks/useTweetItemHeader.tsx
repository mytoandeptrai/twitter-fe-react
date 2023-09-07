import { EFormType, EProfileType } from '@/constants'
import { useUserService } from '@/services'
import { BaseControlledRef, ITweet } from '@/types'
import { TFunction } from 'i18next'
import { useCallback, useMemo, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'
import { MdReportProblem } from 'react-icons/md'
import { v4 as uuid } from 'uuid'

type IRefObject = React.RefObject<BaseControlledRef>

const generateAuthorOptions = (t: TFunction) => {
  return [
    {
      value: EFormType.Update,
      label: t('pages.tweet.update'),
      id: uuid(),
      icon: <AiOutlineEdit />
    },
    {
      value: EFormType.Delete,
      label: t('pages.tweet.delete'),
      id: uuid(),
      icon: <AiOutlineDelete />
    }
  ]
}

const generateNonAuthorOptions = (t: TFunction) => {
  return [
    {
      value: EFormType.Report,
      label: t('pages.tweet.report'),
      id: uuid(),
      icon: <MdReportProblem />
    }
  ]
}

export const useTweetItemHeader = (tweet: ITweet) => {
  const { t } = useTranslation()

  const { getCurrentUser } = useUserService()

  const currentUser = getCurrentUser()

  const editTweetModalRef = useRef<BaseControlledRef>(null)
  const deleteTweetModalRef = useRef<BaseControlledRef>(null)

  const profileAuthorUrl = useMemo(() => {
    return `/profile/${tweet?.author?._id}?screen=${EProfileType.Home}`
  }, [tweet.author?._id])

  const isAuthor = useMemo(() => {
    return currentUser?._id === tweet.author?._id
  }, [currentUser?._id, tweet.author?._id])

  const authorOptions = useMemo(() => {
    return generateAuthorOptions(t)
  }, [t])

  const nonAuthorOptions = useMemo(() => {
    return generateNonAuthorOptions(t)
  }, [t])

  const onOpenModal = useCallback((ref: IRefObject) => ref.current && ref.current?.show && ref.current?.show(), [])
  const onCloseModal = useCallback((ref: IRefObject) => ref.current && ref.current?.hide && ref.current?.hide(), [])

  const onCloseModalDelete = useCallback(() => onCloseModal(deleteTweetModalRef), [deleteTweetModalRef, onCloseModal])
  const onCloseModalEdit = useCallback(() => onCloseModal(editTweetModalRef), [editTweetModalRef, onCloseModal])

  const onSelectTweetActionItem = useCallback(
    async (value: EFormType) => {
      switch (value) {
        case EFormType.Update:
          onOpenModal(editTweetModalRef)
          break
        case EFormType.Delete:
          onOpenModal(deleteTweetModalRef)
          break
        case EFormType.Report:
          break
      }
    },
    [onOpenModal]
  )

  return {
    currentUser,
    profileAuthorUrl,
    isAuthor,

    editTweetModalRef,
    deleteTweetModalRef,
    authorOptions,
    nonAuthorOptions,

    onSelectTweetActionItem,
    onCloseModalEdit,
    onCloseModalDelete
  }
}
