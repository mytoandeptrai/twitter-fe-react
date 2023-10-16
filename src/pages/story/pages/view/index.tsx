import { PageMetaData } from '@/components'
import { LayoutOneSideBar, LayoutWithHeader } from '@/layouts'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { useViewStory } from '../../hooks'
import { ViewStoryContent, ViewStorySidebar } from '../../components'

const StoryView = () => {
  const { t } = useTranslation()
  const { userId = '' } = useParams()
  const {
    groupedStoryByUsers,
    currentStoryOfUser,
    ownersOfAllStories,
    usersStoryMetadataSelector,
    activeStory,
    activeStoryIdx,

    onViewUserStories,
    onChangeActiveStoryIdx
  } = useViewStory(userId)

  return (
    <React.Fragment>
      <PageMetaData title={t('pages.story.text.view-story')} />
      <LayoutWithHeader>
        <LayoutOneSideBar
          sideBar={
            <ViewStorySidebar
              storyOwners={ownersOfAllStories}
              storyGroups={groupedStoryByUsers}
              activeStory={activeStory}
              onViewUserStories={onViewUserStories}
            />
          }
          content={
            <ViewStoryContent
              currentStory={currentStoryOfUser}
              storyOwners={ownersOfAllStories}
              activeStory={activeStory}
              activeStoryIdx={activeStoryIdx}
              userStoryMetadata={usersStoryMetadataSelector}
              onViewUserStories={onViewUserStories}
              onChangeActiveStoryIdx={onChangeActiveStoryIdx}
            />
          }
        />
      </LayoutWithHeader>
    </React.Fragment>
  )
}

export default StoryView
