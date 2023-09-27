import { InfinityMediasList, InfinityTweetList, InfinityUserVirtualList, LeftSelectableSideBar } from '@/components'
import { EExploreType, ETweetQuery, EUserQuery } from '@/constants'
import { IOptionSidebar } from '@/types'
import { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'
import { v4 as uuid } from 'uuid'

const renderExploreScreenTab = (screen: string) => {
  switch (screen) {
    case EExploreType.LatestTweets:
      return <InfinityTweetList queryKey={ETweetQuery.GetLatestTweets} />
    case EExploreType.PopularTweets:
      return <InfinityTweetList queryKey={ETweetQuery.GetPopularTweets} />
    case EExploreType.PopularUser:
      return <InfinityUserVirtualList queryKey={EUserQuery.GetPopularUser} />
    case EExploreType.LatestMedias:
      return <InfinityMediasList queryKey={[ETweetQuery.GetTweetMedias]} />
    default:
      return <></>
  }
}

export const useExplore = () => {
  const location = useLocation()
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { hash } = location
  const screen = hash.substring(1)

  const onChangeScreen = useCallback(
    (nextScreen: EExploreType) => {
      if (screen !== nextScreen) {
        navigate({
          pathname: location.pathname,
          hash: nextScreen
        })
      }
    },
    [location.pathname, navigate, screen]
  )

  const options = useMemo((): IOptionSidebar<EExploreType>[] => {
    return [
      {
        id: uuid(),
        name: t('pages.explore.latest-tweets'),
        value: EExploreType.LatestTweets
      },
      {
        id: uuid(),
        name: t('pages.explore.latest-medias'),
        value: EExploreType.LatestMedias
      },
      {
        id: uuid(),
        name: t('pages.explore.popular-users'),
        value: EExploreType.PopularUser
      },
      {
        id: uuid(),
        name: t('pages.explore.popular-tweets'),
        value: EExploreType.PopularTweets
      }
    ]
  }, [t])

  const ExploreSidebarRender = useMemo(() => {
    return (
      <LeftSelectableSideBar<EExploreType>
        options={options}
        defaultValue={screen as EExploreType}
        onChange={onChangeScreen}
      />
    )
  }, [onChangeScreen, options, screen])

  const ExploreContentRender = useMemo(() => renderExploreScreenTab(screen), [screen])

  return {
    ExploreContentRender,
    ExploreSidebarRender
  }
}
