import { EStoryQuery } from '@/constants'
import { switchRenderAuthenticatedComponent } from '@/hoc'
import { useInfinityList } from '@/hooks'
import { useStoryService } from '@/services/story.service'
import { IStory } from '@/types'
import { eliminateSerializeType } from '@/utils'
import _ from 'lodash'
import React, { FC, useMemo } from 'react'
import styled from 'styled-components'

const MAX_SHOWN_STORY_COUNT = 50

const StoryList: FC = () => {
  const { getStoryList } = useStoryService()

  const {
    data: storiesData,
    isLoading,
    hasMore,
    fetchNextPage
  } = useInfinityList<IStory>({
    queryFunction: getStoryList(MAX_SHOWN_STORY_COUNT),
    queryKey: EStoryQuery.GetStories,
    queryConfig: {}
  })

  const groupedStoryByUsers = useMemo(() => {
    return _.groupBy(storiesData, 'userId')
  }, [storiesData])

  const renderStoryList = () => {
    if (!!storiesData.length) {
      return (
        <StyledItemWrapper>
          {Object.keys(groupedStoryByUsers)
            .slice(0, MAX_SHOWN_STORY_COUNT)
            .map((key: string) => {
              const values = groupedStoryByUsers[key]
              return <div key={`story-item-${values[0]._id}`}>Story Item</div>
            })}
        </StyledItemWrapper>
      )
    }

    return null
  }

  return (
    <StyledRoot>
      <StyledItemWrapper>Create Story Link</StyledItemWrapper>
      {renderStoryList()}
    </StyledRoot>
  )
}

export default switchRenderAuthenticatedComponent(React.memo(StoryList))

const StyledRoot = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-bottom: 2rem;
`

const StyledItemWrapper = styled.article`
  background-color: rgb(36, 37, 38);
  width: 10rem;
  height: 17rem;
  border-radius: 1rem;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;
`
