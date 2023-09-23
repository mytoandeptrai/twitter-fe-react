import { InfinityTweetList, PageMetaData, StyledContainer } from '@/components'
import { EFontSize, EFontWeight, ETweetQuery } from '@/constants'
import { LayoutWithHeader } from '@/layouts'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'

const HashTagPage = () => {
  const { t } = useTranslation()
  const { hashTag } = useParams()

  const queryKey = useMemo(() => {
    return `${ETweetQuery.GetTweetByHashTag},${hashTag}`
  }, [hashTag])

  return (
    <React.Fragment>
      <PageMetaData title={`${t('pages.hashtag.title')} ${hashTag}`} />
      <LayoutWithHeader>
        <StyledContainer>
          <div>
            <StyledHeading>
              {t('pages.hashtag.text.allTweetByHashtag')} {hashTag}
            </StyledHeading>
          </div>
          <InfinityTweetList queryKey={queryKey} />
        </StyledContainer>
      </LayoutWithHeader>
    </React.Fragment>
  )
}

export default HashTagPage

const StyledHeading = styled.h4`
  margin: 5rem 0;
  font-size: ${EFontSize.Font7};
  text-align: center;

  span {
    color: ${({ theme }) => theme.backgroundColor2};
    font-weight: ${EFontWeight.FontWeight600};
  }
`
