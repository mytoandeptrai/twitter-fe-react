import React from 'react'
import { useProfile } from './hooks'
import { PageMetaData } from '@/components'
import { LayoutOneSideBar, LayoutWithHeader } from '@/layouts'
import { EProfileScreen } from '@/constants'
import { ProfileContent, ProfileSidebar } from './components'
import { UserOverview } from '@/features'
import { IUser } from '@/types'

const ProfilePage = () => {
  const { userData, isLoading, screen, onChangeScreen } = useProfile()
  return (
    <React.Fragment>
      <PageMetaData title={`${userData?.name || ''}`} />
      <LayoutWithHeader>
        <UserOverview isLoading={isLoading} user={userData as IUser} />
        <LayoutOneSideBar
          sideBar={<ProfileSidebar<EProfileScreen> defaultValue={screen as EProfileScreen} onChange={onChangeScreen} />}
          content={<ProfileContent screen={screen as EProfileScreen} />}
        />
      </LayoutWithHeader>
    </React.Fragment>
  )
}

export default ProfilePage
