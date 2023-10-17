export enum ENotificationQuery {
  GetNotifications = 'GetNotifications',
  ReadNotification = 'ReadNotification',
  ReadAllNotification = 'ReadAllNotification',
  CreateNotification = 'CreateNotification'
}

export enum ENotificationScreen {
  NewFeed = 'new-feed',
  Notification = 'notification'
}

export const NOTIFICATION_SMALL_LIMIT = 5
export const NOTIFICATION_STALE_TIME = 5 * 60 * 1000
export const NOTIFICATION_SKELETON_NUMBER = 5
