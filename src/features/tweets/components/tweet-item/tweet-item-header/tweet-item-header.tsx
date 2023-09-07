import { CommonModal, IconLink, SmallAvatar, StyledFlex, TweetActionSelector } from '@/components'
import { EFormType } from '@/constants'
import { ROUTES_PATH } from '@/routes'
import { ITweet, IUser } from '@/types'
import { calcDiffTimeString } from '@/utils'
import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { AiOutlineRetweet } from 'react-icons/ai'
import { BiDotsVertical } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { TweetForm } from '../../tweet-form'
import { useTweetItemHeader } from './hooks'
type Props = {
  tweet: ITweet
}

const TweetItemHeader = ({ tweet }: Props) => {
  const { t } = useTranslation()

  const {
    currentUser,
    profileAuthorUrl,
    isAuthor,

    editTweetModalRef,
    deleteTweetModalRef,

    onSelectTweetActionItem,
    onCloseModalEdit,
    onCloseModalDelete
  } = useTweetItemHeader(tweet)

  const renderTweetActionMenu = useCallback(() => {
    return (
      <StyledDropdownButton>
        <BiDotsVertical />
      </StyledDropdownButton>
    )
  }, [])

  const renderModalForAuthor = () => {
    if (isAuthor) {
      return (
        <React.Fragment>
          <CommonModal
            ref={editTweetModalRef}
            header={<h3>{t('pages.tweet.edit')}</h3>}
            body={<TweetForm type={EFormType.Update} data={tweet} onCancel={onCloseModalEdit} />}
          />
          <CommonModal
            ref={deleteTweetModalRef}
            header={<h3>{t('pages.tweet.delete')}</h3>}
            body={<div>{t('pages.tweet.delete_confirm')}</div>}
            onOk={onCloseModalDelete}
            onCancel={onCloseModalDelete}
          />
        </React.Fragment>
      )
    }

    return null
  }

  const renderReTweetBy = () => {
    if (tweet?.retweetedBy?._id && tweet?.isRetweet) {
      const to = `${ROUTES_PATH.profile}/${tweet?.retweetedBy?._id}`
      const text = `${tweet?.retweetedBy.name} retweeted`
      return <IconLink icon={<AiOutlineRetweet />} to={to} text={text} />
    }

    return null
  }

  const renderUserInfo = () => {
    return (
      <StyledAuthorWrapper>
        <Link to={profileAuthorUrl}>
          <SmallAvatar user={tweet?.author as IUser} />
        </Link>
        <StyledAuthorInfo>
          <Link to={profileAuthorUrl}>
            <StyledAuthorName>{tweet?.author?.name || ''}</StyledAuthorName>
          </Link>
          <StyledDateCreated>{(tweet?.createdAt && calcDiffTimeString(tweet?.createdAt)) || ''}</StyledDateCreated>
        </StyledAuthorInfo>
      </StyledAuthorWrapper>
    )
  }

  const renderTweetActionSelector = () => {
    if (!!currentUser?._id) {
      return (
        <TweetActionSelector
          isAuthor={isAuthor}
          onChange={onSelectTweetActionItem}
          renderValue={renderTweetActionMenu}
        />
      )
    }
  }

  return (
    <React.Fragment>
      <StyledHeader>
        {renderReTweetBy()}
        <StyledFlex align='center' justify='space-between'>
          {renderUserInfo()}
          {renderTweetActionSelector()}
        </StyledFlex>
      </StyledHeader>
      {renderModalForAuthor()}
    </React.Fragment>
  )
}

export default TweetItemHeader

const StyledHeader = styled.header`
  position: relative;
`

const StyledAuthorWrapper = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 1rem;
`
const StyledAuthorInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

const StyledAuthorName = styled.h4`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100px;
  font-weight: 600;
  font-size: 1.6rem;
`

const StyledDateCreated = styled.p`
  color: var(--gray-4);
  font-weight: 500;
`

const StyledDropdownButton = styled.button`
  cursor: pointer;
`
