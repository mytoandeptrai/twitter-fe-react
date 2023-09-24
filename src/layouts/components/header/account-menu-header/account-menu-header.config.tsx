import { TFunction } from 'i18next'
import { GrNotification } from 'react-icons/gr'
import { MdExplore } from 'react-icons/md'
import { RiAccountCircleFill, RiLogoutBoxRLine } from 'react-icons/ri'
import { v4 as uuid } from 'uuid'

enum EAccountMenuHeaderOptions {
  Profile = 'profile',
  Notifications = 'notifications',
  Logout = 'logout',
  Explore = 'Explore'
}

const generateOptions = (t: TFunction) => {
  return [
    {
      value: EAccountMenuHeaderOptions.Profile,
      label: t('common.button.profile'),
      id: uuid(),
      icon: <RiAccountCircleFill />
    },
    {
      value: EAccountMenuHeaderOptions.Notifications,
      label: t('common.button.notifications'),
      id: uuid(),
      icon: <GrNotification />
    },
    {
      value: EAccountMenuHeaderOptions.Explore,
      label: t('common.button.explore'),
      id: uuid(),
      icon: <MdExplore />
    },
    {
      value: EAccountMenuHeaderOptions.Logout,
      label: t('common.button.logout'),
      id: uuid(),
      icon: <RiLogoutBoxRLine />
    }
  ]
}

export { EAccountMenuHeaderOptions, generateOptions }
