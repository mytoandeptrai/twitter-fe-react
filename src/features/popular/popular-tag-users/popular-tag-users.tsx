import { SmallAvatar, StyledFlex } from '@/components'
import { EFontSize, EFontWeight, EProfileType, EUserQuery, LONG_STATE_TIME } from '@/constants'
import { LayoutWithSectionHeading } from '@/layouts'
import { ROUTES_PATH } from '@/routes'
import { useUserService } from '@/services'
import { IUser } from '@/types'
import { useQuery } from '@tanstack/react-query'
import React, { memo, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { PopularTagSkeleton } from '../popular-tag-skeleton'
import {
  DEFAULT_POPULAR_SKELETON,
  DEFAULT_POPULAR_SKELETON_WIDTH,
  mappingPopularUsers
} from './popular-tag-users.config'

const PopularTagUsers = () => {
  const { t } = useTranslation()
  const { getLimitPopularUsers, getCurrentUser } = useUserService()
  const currentUser = getCurrentUser()

  const { data, isLoading } = useQuery<IUser[] | null>([EUserQuery.GetLimitPopularUser], getLimitPopularUsers, {
    staleTime: LONG_STATE_TIME
  })

  const filteredUsers = useMemo(() => {
    if (!!(data || []).length) {
      return mappingPopularUsers(data as IUser[], currentUser?._id ?? '')
    }

    return []
  }, [data, currentUser?._id])

  const content = useMemo(() => {
    if (isLoading || filteredUsers.length === 0) {
      return <PopularTagSkeleton numberOfTags={DEFAULT_POPULAR_SKELETON} />
    }

    const isEnoughData = filteredUsers.length === DEFAULT_POPULAR_SKELETON
    const restNumberData = isEnoughData ? 0 : DEFAULT_POPULAR_SKELETON - filteredUsers.length
    return (
      <React.Fragment>
        {filteredUsers?.map((user) => {
          const followersCount = user?.followers.length || 0
          return (
            <StyledWrapper key={user._id}>
              <StyledFlex gap={1.8}>
                <SmallAvatar user={user} />
                <Link to={`${ROUTES_PATH.profile}/${user._id}?screen=${EProfileType.Home}`}>
                  <StyledUserName>{user.name}</StyledUserName>
                  <StyledUserFollowers>
                    {followersCount} {`${t('follower')}${followersCount > 1 ? 's' : ''}`}
                  </StyledUserFollowers>
                </Link>
              </StyledFlex>
            </StyledWrapper>
          )
        })}
        {!isEnoughData && (
          <StyledWrapperSkeleton>
            <PopularTagSkeleton numberOfTags={restNumberData} width={DEFAULT_POPULAR_SKELETON_WIDTH} />
          </StyledWrapperSkeleton>
        )}
      </React.Fragment>
    )
  }, [filteredUsers, isLoading, t])

  return (
    <LayoutWithSectionHeading
      title={<StyledHeading>{t('common.text.popular-users')}</StyledHeading>}
      content={content}
    />
  )
}

export default memo(PopularTagUsers)

const StyledHeading = styled.h4`
  color: var(--gray-2);
  border-bottom: 1px solid var(--gray-5);
  font-weight: ${EFontWeight.FontWeight600};
  font-size: ${EFontSize.Font3};
`

const StyledWrapper = styled.div`
  padding-bottom: 1rem;
  border-bottom: 1px solid #ccc;

  &:not(:first-child) {
    padding-top: 1rem;
  }
`

const StyledWrapperSkeleton = styled.div`
  padding-top: 1rem;
`

const StyledUserName = styled.p`
  font-size: ${EFontSize.Font7};
`

const StyledUserFollowers = styled.p`
  font-size: ${EFontSize.Font3};
  color: ${({ theme }) => theme.textColor6};
`
