import { PageMetaData, StyledContainer } from '@/components'
import { EFontSize } from '@/constants'
import { UserCard } from '@/features'
import { LayoutWithHeader } from '@/layouts'
import { ESearchType, IComment, IHashtag, ITweet, IUser } from '@/types'
import React, { Suspense } from 'react'
import { useTranslation } from 'react-i18next'
import { ClipLoader } from 'react-spinners'
import styled from 'styled-components'
import { SearchCommentResult, SearchHashTagResult, SearchSelectionForm, SearchTweetResult } from './components'
import { useSearch } from './hooks'

const RenderSearchComponent: React.FC<{ children: React.ReactNode; key: string }> = ({ children, key }) => {
  return (
    <Suspense fallback={<div>Loading...</div>} key={key}>
      {children}
    </Suspense>
  )
}

const Search = () => {
  const { t } = useTranslation()
  const { query, isLoading, response, onChange, onSubmit } = useSearch()

  const resultContent = React.useMemo(() => {
    if (!response || !response.data) return null

    switch (response.type) {
      case ESearchType.Tweet:
        return response?.data?.map((tweet: ITweet) => (
          <RenderSearchComponent key={`tweet-result-${tweet._id}`}>
            <SearchTweetResult tweet={tweet} />
          </RenderSearchComponent>
        ))
      case ESearchType.Hashtag:
        return response?.data?.map((hashtag: IHashtag) => (
          <RenderSearchComponent key={`hashtag-result-${hashtag._id}`}>
            <SearchHashTagResult hashtag={hashtag} />
          </RenderSearchComponent>
        ))
      case ESearchType.Comment:
        return response?.data?.map((comment: IComment) => (
          <RenderSearchComponent key={`comment-result-${comment._id}`}>
            <SearchCommentResult comment={comment} />
          </RenderSearchComponent>
        ))
      case ESearchType.User:
        return response?.data?.map((user: IUser) => (
          <RenderSearchComponent key={`user-result-${user._id}`}>
            <UserCard data={user} />
          </RenderSearchComponent>
        ))
      default:
        return null
    }
  }, [response])

  const renderLoading = () => {
    if (isLoading) {
      return (
        <StyledLoading>
          <ClipLoader />
        </StyledLoading>
      )
    }
    return null
  }

  const renderSearchResults = () => {
    if (!isLoading && response) {
      return (
        <React.Fragment>
          <StyledSearchResult>
            {(!!response?.data?.length && resultContent) || (
              <StyledNoResultFound>{t('searchNoResult')}</StyledNoResultFound>
            )}
          </StyledSearchResult>
        </React.Fragment>
      )
    }

    return null
  }
  return (
    <React.Fragment>
      <PageMetaData title={t('pages.search')} />
      <LayoutWithHeader>
        <StyledContainer>
          <StyledRoot>
            <SearchSelectionForm
              onChange={onChange}
              onSubmit={onSubmit}
              valueInput={query.search}
              disabled={isLoading}
            />
            {renderLoading()}
            {renderSearchResults()}
          </StyledRoot>
        </StyledContainer>
      </LayoutWithHeader>
    </React.Fragment>
  )
}

export default Search

const StyledRoot = styled.div`
  margin-top: 2rem;
`
const StyledSearchResult = styled.section`
  margin-top: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const StyledNoResultFound = styled.p`
  font-size: ${EFontSize.Font6};
  text-align: center;
`

const StyledLoading = styled.div`
  text-align: center;
  margin-top: 5rem;
`
