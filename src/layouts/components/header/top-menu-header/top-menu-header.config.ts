import { EExploreType } from '@/constants'
import { ROUTES_PATH } from '@/routes'
import { IUser } from '@/types'
import { TFunction } from 'i18next'
import { v4 as uuid } from 'uuid'

const generateBookMarkLink = (t: TFunction, userId?: string) => {
  if (!!userId) {
    return [
      {
        name: t('common.routes.bookmark'),
        path: ROUTES_PATH.bookmark,
        id: uuid()
      }
    ]
  }

  return []
}

const generateMenuLinks = (t: TFunction, currentUser: IUser | undefined) => {
  return [
    {
      name: t('common.routes.home'),
      path: ROUTES_PATH.home,
      id: uuid()
    },
    {
      name: t('common.routes.explore'),
      path: `${ROUTES_PATH.explore}#${EExploreType.LatestTweets}`,
      id: uuid()
    },
    {
      name: t('common.routes.search'),
      path: ROUTES_PATH.search,
      id: uuid()
    },
    ...generateBookMarkLink(t, currentUser?._id)
  ]
}

export { generateMenuLinks }
