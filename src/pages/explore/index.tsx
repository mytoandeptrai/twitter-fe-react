import React from 'react'
import { useTranslation } from 'react-i18next'
import { useExplore } from './hooks'
import { PageMetaData } from '@/components'
import { LayoutOneSideBar, LayoutWithHeader } from '@/layouts'

const Explore = () => {
  const { t } = useTranslation()
  const { ExploreContentRender, ExploreSidebarRender } = useExplore()

  return (
    <React.Fragment>
      <PageMetaData title={t('pages.explore.index')} />
      <LayoutWithHeader>
        <LayoutOneSideBar sideBar={ExploreSidebarRender} content={ExploreContentRender} />
      </LayoutWithHeader>
    </React.Fragment>
  )
}

export default Explore
