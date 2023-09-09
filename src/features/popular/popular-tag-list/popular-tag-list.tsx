import { EFontSize, EFontWeight, EHashTagQuery, LONG_STATE_TIME } from '@/constants'
import { LayoutWithSectionHeading } from '@/layouts'
import { useHashtagService } from '@/services'
import { IHashtag } from '@/types'
import { useQuery } from '@tanstack/react-query'
import React, { FC, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { PopularTagItem } from '../popular-tag-item'
import { PopularTagSkeleton } from '../popular-tag-skeleton'

const DEFAULT_POPULAR_SKELETON = 10
const MINIMUM_POPULAR_ITEM = 0
const MAXIMUM_POPULAR_ITEM = 5

const PopularTagList: FC = () => {
  const { t } = useTranslation()

  const { getMostPopularHashTags } = useHashtagService()
  const { data } = useQuery([EHashTagQuery.GetPopularTags], getMostPopularHashTags, {
    staleTime: LONG_STATE_TIME
  })

  let content = useMemo(() => {
    return <PopularTagSkeleton numberOfTags={DEFAULT_POPULAR_SKELETON} />
  }, [])

  if (!!data?.length) {
    content = (
      <React.Fragment>
        {data?.slice(MINIMUM_POPULAR_ITEM, Math.min(data?.length, MAXIMUM_POPULAR_ITEM))?.map((hashtag: IHashtag) => {
          const { _id } = hashtag
          return <PopularTagItem data={hashtag} key={`hashtag-${_id}`} />
        })}
      </React.Fragment>
    )
  }

  return (
    <LayoutWithSectionHeading
      title={<StyledHeading>{t('common.text.popular-tags')}</StyledHeading>}
      content={content}
    />
  )
}

export default PopularTagList

const StyledHeading = styled.h4`
  color: var(--gray-2);
  border-bottom: 1px solid var(--gray-5);
  font-weight: ${EFontWeight.FontWeight600};
  font-size: ${EFontSize.Font3};
`
