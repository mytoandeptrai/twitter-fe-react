import { InfinityTweetList, PageMetaData } from '@/components'
import { EFormType, ENotificationScreen, ETweetQuery } from '@/constants'
import { NotificationList, PopularTagList, PopularTagUsers, StoryList, TweetForm } from '@/features'
import { LayoutTwoSideBar, LayoutWithHeader } from '@/layouts'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'

const NewFeeds: FC = () => {
  const { t } = useTranslation()

  return (
    <React.Fragment>
      <PageMetaData title={t('pages.home')} />
      <LayoutWithHeader>
        <LayoutTwoSideBar
          leftSideBar={<NotificationList screen={ENotificationScreen.NewFeed} />}
          content={
            <React.Fragment>
              <StoryList />
              <TweetForm type={EFormType.Create} />
              <InfinityTweetList queryKey={ETweetQuery.GetLatestTweets} />
            </React.Fragment>
          }
          rightSideBar={
            <React.Fragment>
              <PopularTagList />
              <PopularTagUsers />
            </React.Fragment>
          }
        />
      </LayoutWithHeader>
    </React.Fragment>
  )
}

export default NewFeeds
