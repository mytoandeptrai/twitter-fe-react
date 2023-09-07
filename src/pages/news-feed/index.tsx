import { InfinityTweetList, PageMetaData } from '@/components'
import { EFormType, ETweetQuery } from '@/constants'
import { TweetForm } from '@/features'
import { LayoutTwoSideBar, LayoutWithHeader } from '@/layouts'
import React from 'react'
import { useTranslation } from 'react-i18next'

const NewFeeds = () => {
  const { t } = useTranslation()

  return (
    <React.Fragment>
      <PageMetaData title={t('pages.home')} />
      <LayoutWithHeader>
        <LayoutTwoSideBar
          leftSideBar={<>LeftSidebar</>}
          content={
            <React.Fragment>
              {/* TODO : Implement Story List  */}
              <TweetForm type={EFormType.Create} />
              <InfinityTweetList queryKey={ETweetQuery.GetLatestTweets} />
            </React.Fragment>
          }
          rightSideBar={<>RightSidebar</>}
        />
      </LayoutWithHeader>
    </React.Fragment>
  )
}

export default NewFeeds
