import { InfinityTweetList, PageMetaData, StyledContainer } from '@/components'
import { ETweetQuery } from '@/constants'
import { LayoutWithHeader } from '@/layouts'
import React from 'react'
import { useTranslation } from 'react-i18next'

const Bookmark = () => {
  const { t } = useTranslation()

  return (
    <React.Fragment>
      <PageMetaData title={t('pages.bookmark')} />
      <LayoutWithHeader>
        <StyledContainer>
          <InfinityTweetList queryKey={ETweetQuery.GetBookmarkTweets} />
        </StyledContainer>
      </LayoutWithHeader>
    </React.Fragment>
  )
}

export default Bookmark
