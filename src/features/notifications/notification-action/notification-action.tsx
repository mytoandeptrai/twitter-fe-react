import { EBorderRadius, EFontSize, EFontWeight } from '@/constants'
import { useNotificationService, useUserService } from '@/services'
import { INotification, IUser } from '@/types'
import React, { memo, useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { ClipLoader } from 'react-spinners'
import { styled } from 'styled-components'

type Props = {
  notifications: INotification[]
}

const NotificationAction = ({ notifications }: Props) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const { getCurrentUser } = useUserService()
  const user = getCurrentUser()
  const { markAsReadHandler } = useNotificationService()

  const getUnReadNotificationIds = (notifications: INotification[], user: IUser) => {
    const unReadNotificationsIds = notifications
      .filter((notification) => notification.isRead && !notification.isRead.includes(user._id))
      .map((el) => el?._id)
      .filter(Boolean)

    return unReadNotificationsIds
  }

  const maskAllReadNotifications = useCallback(async () => {
    if (user) {
      const unReadNotificationsIds = getUnReadNotificationIds(notifications, user)

      if (!!unReadNotificationsIds.length) {
        setIsLoading(true)
        await markAsReadHandler(unReadNotificationsIds)
        setIsLoading(false)
      }
    }
  }, [markAsReadHandler, notifications, user])

  return (
    <StyledReadAllButton onClick={maskAllReadNotifications} disabled={isLoading}>
      {t('pages.notification.text.readAllNotification')}
      {isLoading && <StyledLoader />}
    </StyledReadAllButton>
  )
}

export default memo(NotificationAction)

const StyledReadAllButton = styled.button`
  font-size: ${EFontSize.Font2};
  padding: 0.5rem 1rem;
  background: ${({ theme }) => theme.backgroundColor2};
  color: ${({ theme }) => theme.textColor4};
  border-radius: ${EBorderRadius.BorderRadius1};
  font-weight: ${EFontWeight.FontWeight500};
  display: flex;
  gap: 0.5rem;
  align-items: center;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`

const StyledLoader = styled(ClipLoader)`
  --size: 1.5rem;
  width: var(--size) !important;
  height: var(--size) !important;
`
