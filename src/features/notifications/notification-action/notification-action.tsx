import { useNotificationService, useUserService } from '@/services'
import { INotification } from '@/types'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

type Props = {
  notifications: INotification[]
}

const NotificationAction = ({ notifications }: Props) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { getCurrentUser } = useUserService()
  const user = getCurrentUser()
  const { markAsReadHandler } = useNotificationService()

  return <div>NotificationAction</div>
}

export default NotificationAction
