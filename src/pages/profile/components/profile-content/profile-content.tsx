import { EProfileScreen } from '@/constants'
import { ProfileHomePage, ProfileLikedTweetPage, ProfileMediaPage } from '@/features'
import React from 'react'

type Props = {
  screen: EProfileScreen
}

const ProfileContent = ({ screen }: Props) => {
  const renderProfileContent = (screen: EProfileScreen) => {
    switch (screen) {
      case EProfileScreen.Home:
        return <ProfileHomePage />
      case EProfileScreen.Liked:
        return <ProfileLikedTweetPage />
      case EProfileScreen.Medias:
        return <ProfileMediaPage />
      default:
        return <ProfileHomePage />
    }
  }
  return <React.Fragment>{renderProfileContent(screen)}</React.Fragment>
}

export default ProfileContent
