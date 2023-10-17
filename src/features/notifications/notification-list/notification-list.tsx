import {
  EFontSize,
  EFontWeight,
  ENotificationScreen,
  NOTIFICATION_SKELETON_NUMBER,
  NOTIFICATION_SMALL_LIMIT
} from '@/constants'
import { useUserService } from '@/services'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useNotificationList } from './hook'
import { NotificationItem } from '../notification-item'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { LayoutWithSectionHeading } from '@/layouts'
import { ROUTES_PATH } from '@/routes'
import { NotificationAction } from '../notification-action'
import { NotificationSkeleton } from '../notification-skeleton'
import InfiniteScroll from 'react-infinite-scroll-component'

type Props = {
  screen: ENotificationScreen
}

const NotificationList = ({ screen }: Props) => {
  const { t } = useTranslation()

  const { data, isLoading, hasMore, shouldHaveViewAllButton, isThereAnyUnReadNotification, fetchNextPage } =
    useNotificationList(screen)

  const notificationList = useMemo(() => {
    return data?.map((notification) => (
      <NotificationItem key={`notification-item-${notification._id}`} notification={notification} />
    ))
  }, [data])

  const renderNotificationHeader = () => {
    if (isThereAnyUnReadNotification) {
      return (
        <StyledHeader>
          <NotificationAction notifications={data} />
        </StyledHeader>
      )
    }

    return null
  }

  const renderNotificationSkeleton = () => {
    if (isLoading) {
      return <NotificationSkeleton numberOfSkeletons={NOTIFICATION_SKELETON_NUMBER} />
    }

    return null
  }

  const renderNotificationContent = () => {
    if (screen === ENotificationScreen.NewFeed) {
      return notificationList?.slice(0, NOTIFICATION_SMALL_LIMIT)
    }

    return (
      <InfiniteScroll
        dataLength={data.length}
        next={fetchNextPage}
        hasMore={hasMore}
        loader={<NotificationSkeleton numberOfSkeletons={1} />}
      >
        {notificationList}
      </InfiniteScroll>
    )
  }

  const renderNotificationMain = () => {
    return (
      <StyledMainContent>
        {renderNotificationSkeleton()}
        {renderNotificationContent()}
      </StyledMainContent>
    )
  }

  const renderNotificationFooter = () => {
    if (screen === ENotificationScreen.NewFeed) {
      return (
        <StyledGoToNotificationListPage to={ROUTES_PATH.notifications}>
          {t('pages.notification.text.viewAllNotification')}
        </StyledGoToNotificationListPage>
      )
    }

    return null
  }

  return (
    <LayoutWithSectionHeading
      title={<StyledHeading>{t('pages.notification.title')}</StyledHeading>}
      content={
        <StyledContainer screen={screen}>
          {renderNotificationHeader()}
          {renderNotificationMain()}
          {renderNotificationFooter()}
        </StyledContainer>
      }
    />
  )
}

export default NotificationList

const StyledContainer = styled.div<{
  screen: ENotificationScreen
}>``

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`
const StyledHeading = styled.h4`
  color: var(--gray-2);
  border-bottom: 1px solid var(--gray-5);
  font-weight: ${EFontWeight.FontWeight600};
  font-size: ${EFontSize.Font3};
`

const StyledMainContent = styled.div``

const StyledGoToNotificationListPage = styled(Link)`
  font-size: ${EFontSize.Font2};
  color: var(--gray-5);

  &:hover {
    text-decoration: underline;
    transition: all 0.2s linear;
  }
`
