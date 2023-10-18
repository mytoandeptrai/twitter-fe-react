import { PageMetaData, StyledContainer } from '@/components'
import { ENotificationScreen } from '@/constants'
import { NotificationList } from '@/features'
import { LayoutWithHeader } from '@/layouts'
import React from 'react'
import { useTranslation } from 'react-i18next'

const NotificationPage = () => {
  const { t } = useTranslation()

  return (
    <React.Fragment>
      <PageMetaData title={t('pages.notification.title')} />
      <LayoutWithHeader>
        <StyledContainer>
          <NotificationList screen={ENotificationScreen.Notification} />
        </StyledContainer>
      </LayoutWithHeader>
    </React.Fragment>
  )
}

export default NotificationPage
