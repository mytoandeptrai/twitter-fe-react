import { useNotificationService, useUserService } from '@/services'
import { INotification } from '@/types'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import _ from 'lodash'
import { EBorderRadius, EFontSize, EFontWeight } from '@/constants'
import { styled } from 'styled-components'
import { SmallAvatar } from '@/components'
import { calcDiffTimeString } from '@/utils'

type Props = {
  notification: INotification
}

const NotificationItem = ({ notification }: Props) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { getCurrentUser } = useUserService()
  const user = getCurrentUser()
  const { readNotificationMutation } = useNotificationService()

  const isUnRead = useMemo(() => {
    const userId = user?._id || ''
    if (!userId) {
      return false
    }

    return !notification?.isRead?.includes(userId)
  }, [notification?.isRead, user?._id])
  console.log('🚀 ~ file: notification-item.tsx:31 ~ isUnRead ~ isUnRead:', isUnRead);

  const onClick = async () => {
    if (!notification._id) return
    const hasReadNotification = notification?.isRead?.some((id) => id === user?._id)
    if (!hasReadNotification) {
      readNotificationMutation.mutate(notification._id, {
        onSuccess: () => {
          navigate(notification.url)
        }
      })
    }
  }

  const renderNotificationAuthorAvatar = () => {
    const notificationAuthor = _.pick(notification.sender, ['avatar', 'name', 'gender', '_id'])
    return (
      <StyledSenderAvatarWrapper>
        <SmallAvatar user={notificationAuthor} />
      </StyledSenderAvatarWrapper>
    )
  }

  const renderNotificationContent = () => {
    const description = _.get(notification, 'sender.name', '')
    const subDescription = t(notification?.text || '')
    const time = calcDiffTimeString(notification?.createdAt || new Date())
    return (
      <StyledMainContent>
        <StyledContent>
          <strong>{description} </strong>
          {subDescription}
        </StyledContent>
        <StyledTime>{time}</StyledTime>
      </StyledMainContent>
    )
  }

  return (
    <StyledRoot isUnRead={isUnRead} onClick={onClick}>
      {renderNotificationAuthorAvatar()}
      {renderNotificationContent()}
    </StyledRoot>
  )
}

export default React.memo(NotificationItem, (prevProps, nextProps) => {
  return _.isEqual(prevProps.notification, nextProps.notification)
})

const StyledRoot = styled.article<{
  isUnRead: boolean
}>`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1rem;
  border-radius: ${EBorderRadius.BorderRadius2};
  margin-bottom: 1.5rem;
  width: 100%;
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: ${(props) => (props.isUnRead ? `${props.theme.backgroundColor4}` : `unset`)};

  &:hover {
    background-color: ${({ theme }) => theme.backgroundColor4};
  }
`

const StyledSenderAvatarWrapper = styled.div``

const StyledMainContent = styled.div``

const StyledContent = styled.p`
  font-size: ${EFontSize.Font1};
  color: ${({ theme }) => theme.textColor1};
  text-align: left;
  font-weight: ${EFontWeight.FontWeight400};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word;
`

const StyledTime = styled.p`
  font-size: ${EFontSize.Font1};
  font-weight: ${EFontWeight.FontWeight500};
  color: ${({ theme }) => theme.textColor5};
  text-align: left;
`
