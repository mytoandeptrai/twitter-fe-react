import { IUser } from '@/types'
import React, { Suspense } from 'react'
import { useUserOverViewStatistics } from './hook'
import { CommonModal, InfinityVirtualList, Loader } from '@/components'
import { UserCard } from '../user-card'
import { EFontSize, EFontWeight, EUserListType } from '@/constants'
import { nFormatter } from '@/utils'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

type Props = {
  user: IUser
}

const UserOverViewStatistics = ({ user }: Props) => {
  const { t } = useTranslation()
  const { modalUserLisHeader, userListModalRef, userList, showUserListModal } = useUserOverViewStatistics(user)

  const renderUserListStatistics = () => {
    if (!!userList.length) {
      return (
        <InfinityVirtualList
          Item={UserCard}
          hasNextPage={false}
          isNextPageLoading={false}
          loadNextPage={() => {
            return
          }}
          items={userList}
          height={400}
        />
      )
    }

    return null
  }

  const renderUserListStatisticsActions = () => {
    const followingUsers = user?.following?.length || 0
    const followersUsers = user?.followers?.length || 0

    return (
      <React.Fragment>
        <StyledButton onClick={() => showUserListModal(EUserListType.Followed)} disabled={followingUsers === 0}>
          <span>{nFormatter(followingUsers)}</span>
          {t('common.text.following')}
        </StyledButton>
        <StyledButton onClick={() => showUserListModal(EUserListType.Following)} disabled={followersUsers === 0}>
          <span>{nFormatter(followersUsers)}</span>
          {t('common.text.followers')}
        </StyledButton>
      </React.Fragment>
    )
  }

  return (
    <React.Fragment>
      <Suspense fallback={<Loader />}>
        <CommonModal header={modalUserLisHeader} body={renderUserListStatistics()} ref={userListModalRef} />
      </Suspense>
      {renderUserListStatisticsActions()}
    </React.Fragment>
  )
}

export default UserOverViewStatistics

const StyledButton = styled.button`
  font-size: ${EFontSize.Font3};
  line-height: 1.8rem;
  color: ${({ theme }) => theme.textColor9};

  span {
    font-weight: ${EFontWeight.FontWeight600};
    color: ${({ theme }) => theme.textColor1};
    margin-right: 0.5rem;
  }

  &:disabled {
    cursor: initial;
    opacity: 0.7;
  }
`
