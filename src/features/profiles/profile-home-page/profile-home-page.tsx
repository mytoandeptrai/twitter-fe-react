import { InfinityTweetList } from '@/components'
import { EFormType, ETweetQuery } from '@/constants'
import { TweetForm } from '@/features/tweets'
import { useUserService } from '@/services'
import React, { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

const ProfileHomePage = () => {
  const { t } = useTranslation()
  const { getCurrentUser } = useUserService()
  const { userId } = useParams()
  const currentUser = getCurrentUser()

  const isMe = currentUser?._id === userId

  const renderTweetCreateForm = () => {
    if (!isMe) return
    return <TweetForm type={EFormType.Create} />
  }

  const renderTweetInfinity = () => {
    if (!userId) return
    return <InfinityTweetList queryKey={[ETweetQuery.GetTweetByUser, userId].join(',')} />
  }

  return (
    <React.Fragment>
      {renderTweetCreateForm()}
      {renderTweetInfinity()}
    </React.Fragment>
  )
}

export default memo(ProfileHomePage)
