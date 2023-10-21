import { EUserListType } from '@/constants'
import { IUser } from '@/types'
import { TFunction } from 'i18next'

export const generateUserListHeader = (t: TFunction, type: EUserListType | '') => {
  let userList = ''
  switch (type) {
    case EUserListType.Following:
      userList = t('common.text.following')
      break
    case EUserListType.Followed:
      userList = t('common.text.followed')
      break
    default:
      userList = ''
      break
  }

  return userList
}

export const generateUserList = (user: IUser, type: EUserListType | ''): IUser[] => {
  let userListData: IUser[] = []

  switch (type) {
    case EUserListType.Following:
      userListData = user.followers
      break
    case EUserListType.Followed:
      userListData = user.following
      break
    default:
      userListData = []
      break
  }

  return userListData
}
