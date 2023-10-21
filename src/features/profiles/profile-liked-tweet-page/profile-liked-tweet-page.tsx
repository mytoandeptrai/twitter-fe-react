import { InfinityTweetList } from '@/components'
import { ETweetQuery } from '@/constants'
import React from 'react'
import { useParams } from 'react-router-dom'

const ProfileLikedTweetPage = () => {
  const { userId = '' } = useParams()

  if (!userId) return null

  return <InfinityTweetList queryKey={[ETweetQuery.GetLikedTweetByUser, userId].join(',')} />
}

export default ProfileLikedTweetPage
