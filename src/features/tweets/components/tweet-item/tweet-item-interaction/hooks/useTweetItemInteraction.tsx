/* eslint-disable react-hooks/exhaustive-deps */
import { EInteractionButton, EUserListType } from '@/constants'
import { useTweetService, useUserService } from '@/services'
import { BaseControlledRef, ITweet, IUser } from '@/types'
import { useCallback, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { get as _get, uniqBy as _uniqBy } from 'lodash'
import { TFunction } from 'i18next'
import { UseMutationResult } from '@tanstack/react-query'
import { v4 as uuid } from 'uuid'
import { BiBookmark } from 'react-icons/bi'
import { FaRegHeart } from 'react-icons/fa'
import { FiRefreshCw } from 'react-icons/fi'

interface IUpdateTweetMutation {
  tweetId: string
  type: 'likes' | 'retweeted' | 'saved'
  currentStatus: boolean
  mutation: UseMutationResult<ITweet | null, unknown, string, unknown>
}

interface IUserListData {
  userListData: IUser[]
  usersSavedTweet: IUser[]
  usersLikedTweet: IUser[]
  usersRetweetedTweet: IUser[]
}

const generateModalUserListHeader = (userListType: EUserListType | null, t: TFunction) => {
  let modalUserListHeader = null

  switch (userListType) {
    case EUserListType.Liked:
      modalUserListHeader = t('pages.tweet.heading.userLikedTweet')
      break
    case EUserListType.Saved:
      modalUserListHeader = t('pages.tweet.heading.userSavedTweet')
      break
    case EUserListType.Retweeted:
      modalUserListHeader = t('pages.tweet.heading.userRetweetedTweet')
      break
  }

  return modalUserListHeader
}

const generateUserListData = (tweet: ITweet, userListType: EUserListType | null): IUserListData => {
  let userListData: IUser[] = []
  const usersSavedTweet = _uniqBy(_get(tweet, 'saved', []), '_id')
  const usersLikedTweet = _uniqBy(_get(tweet, 'likes', []), '_id')
  const usersRetweetedTweet = _uniqBy(_get(tweet, 'retweeted', []), '_id')

  switch (userListType) {
    case EUserListType.Liked:
      userListData = usersLikedTweet
      break
    case EUserListType.Saved:
      userListData = usersSavedTweet
      break
    case EUserListType.Retweeted:
      userListData = usersRetweetedTweet
      break
  }

  return { userListData, usersSavedTweet, usersLikedTweet, usersRetweetedTweet }
}

export const useTweetItemInteraction = (tweet: ITweet) => {
  const { t } = useTranslation()
  const userListModalRef = useRef<BaseControlledRef>(null)
  const [userListType, setUserListType] = useState<EUserListType | null>(null)

  const { getCurrentUser } = useUserService()
  const { reactTweetMutation, retweetMutation, saveTweetMutation } = useTweetService()

  const currentUser = getCurrentUser()
  const modalUserListHeader = generateModalUserListHeader(userListType, t)
  const { userListData, usersLikedTweet, usersRetweetedTweet, usersSavedTweet } = generateUserListData(
    tweet,
    userListType
  )

  const currentUserId = _get(currentUser, '_id', '')
  const retweeted = usersRetweetedTweet.some((user) => user._id === currentUserId)
  const liked = usersLikedTweet.some((user) => user._id === currentUserId)
  const saved = usersSavedTweet.some((user) => user._id === currentUserId)

  const tweetLikeCount = usersLikedTweet.length
  const tweetSavedCount = usersSavedTweet.length
  const tweetRetweetCount = usersRetweetedTweet.length
  const totalTweetComments = 0

  const onUpdateTweetInteractionMutate = (data: IUpdateTweetMutation) => {
    const { currentStatus, mutation, tweetId, type } = data
    const initialList = _get(tweet, type, [])
    const filteredList = currentStatus
      ? initialList.filter((u: IUser) => u._id !== currentUser?._id)
      : [...initialList, currentUser]

    tweet[type] = filteredList as IUser[]

    mutation.mutate(tweetId, {
      onError: () => {
        tweet[type] = initialList
      }
    })
  }

  const onRetweet = () => {
    onUpdateTweetInteractionMutate({
      currentStatus: !!retweeted,
      tweetId: tweet._id,
      type: 'retweeted',
      mutation: retweetMutation
    })
  }

  const onReactTweet = () => {
    onUpdateTweetInteractionMutate({
      currentStatus: !!liked,
      tweetId: tweet._id,
      type: 'likes',
      mutation: reactTweetMutation
    })
  }

  const onSaveTweet = () => {
    onUpdateTweetInteractionMutate({
      currentStatus: !!saved,
      tweetId: tweet._id,
      type: 'saved',
      mutation: saveTweetMutation
    })
  }

  const onShowUserListModal = useCallback((userListType: EUserListType) => {
    if (userListModalRef.current) {
      setUserListType(userListType)
      userListModalRef.current?.show && userListModalRef.current?.show()
    }
  }, [])

  const tweetSummaryOptions = useMemo(() => {
    return [
      {
        id: uuid(),
        onClick: () => onShowUserListModal(EUserListType.Liked),
        count: tweetLikeCount,
        text: 'common.button.like'
      },
      {
        id: uuid(),
        onClick: () => {},
        count: totalTweetComments,
        text: 'common.button.comment'
      },
      {
        id: uuid(),
        onClick: () => onShowUserListModal(EUserListType.Retweeted),
        count: tweetRetweetCount,
        text: 'common.button.retweet'
      },
      {
        id: uuid(),
        onClick: () => onShowUserListModal(EUserListType.Saved),
        count: tweetSavedCount,
        text: 'common.button.save'
      }
    ]
  }, [onShowUserListModal, totalTweetComments, tweetLikeCount, tweetRetweetCount, tweetSavedCount])

  const tweetGroupButtonOptions = useMemo(() => {
    return [
      {
        id: uuid(),
        onClick: onReactTweet,
        interactionType: EInteractionButton.Like,
        liked,
        retweeted: false,
        saved: false,
        text: liked ? 'common.button.liked' : 'common.button.like',
        icon: <FaRegHeart />
      },
      {
        id: uuid(),
        onClick: onRetweet,
        interactionType: EInteractionButton.Share,
        liked: false,
        retweeted,
        saved: false,
        text: retweeted ? 'common.button.retweeted' : 'common.button.retweet',
        icon: <FiRefreshCw />
      },
      {
        id: uuid(),
        onClick: onSaveTweet,
        interactionType: EInteractionButton.Save,
        liked: false,
        retweeted: false,
        saved,
        text: saved ? 'common.button.save' : 'common.button.save',
        icon: <BiBookmark />
      }
    ]
  }, [liked, onReactTweet, onRetweet, onSaveTweet, retweeted, saved])

  return {
    userListData,
    userListModalRef,
    modalUserListHeader,
    tweetSummaryOptions,
    tweetGroupButtonOptions
  }
}
