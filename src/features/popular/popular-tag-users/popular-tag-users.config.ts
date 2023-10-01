import { IUser } from '@/types'

const mappingPopularUsers = (usersData: IUser[], currentUserId: string) => {
  /**
   * Filter users by two cases
   * - If user is not current user
   * - If user do not follow the current user
   */
  return usersData.filter((user) => {
    return user._id !== currentUserId && !user.followers.some((us) => us.id === currentUserId)
  })
}

const DEFAULT_POPULAR_SKELETON = 5
const DEFAULT_POPULAR_SKELETON_WIDTH = 220

export { mappingPopularUsers, DEFAULT_POPULAR_SKELETON, DEFAULT_POPULAR_SKELETON_WIDTH }
