import { InfinityMediasList } from '@/components'
import { ETweetQuery } from '@/constants'
import React from 'react'
import { useParams } from 'react-router-dom'

const ProfileMediaPage = () => {
  const { userId = '' } = useParams()

  if (!userId) return
  return <InfinityMediasList queryKey={[ETweetQuery.GetTweetMediaByUser, userId]} />
}

export default ProfileMediaPage
