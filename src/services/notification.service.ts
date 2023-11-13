import { axiosClient } from '@/apis'
import { EEndpoints, ENotificationQuery } from '@/constants'
import { INotification, INotificationDTO } from '@/types'
import { tryCatchFn } from '@/utils'
import { getList } from '@/utils/query'
import { QueryFunctionContext, useMutation, useQueryClient } from '@tanstack/react-query'

export const useNotificationService = () => {
  const queryClient = useQueryClient()
  const getNotificationList = (limit: number) => {
    return ({ pageParam }: QueryFunctionContext) => {
      const url = `${EEndpoints.Notification}`
      const response = getList<INotification>(url, pageParam, { limit })
      return response
    }
  }

  const createNotification = async (newNotification: INotificationDTO) => {
    return tryCatchFn(async (): Promise<INotification | null> => {
      const url = `${EEndpoints.Notification}`
      const response = await axiosClient.post(url, newNotification)
      return response?.data
    })
  }

  const readAllNotification = async (notificationsIds: string[]) => {
    return tryCatchFn(async (): Promise<void> => {
      const url = `${EEndpoints.Notification}/read`
      const payload = { ids: notificationsIds }
      await axiosClient.patch(url, payload)
    })
  }

  const readNotification = async (idNotification: string) => {
    return tryCatchFn(async (): Promise<void> => {
      const url = `${EEndpoints.Notification}/read/${idNotification}`
      await axiosClient.patch(url)
    })
  }

  const readAllNotificationMutation = useMutation([ENotificationQuery.ReadAllNotification], readAllNotification)
  const readNotificationMutation = useMutation([ENotificationQuery.ReadNotification], readNotification)
  const createNotificationMutation = useMutation([ENotificationQuery.ReadNotification], createNotification)

  const markAsReadHandler = async (ids: string[]) => {
    const response = await readAllNotificationMutation.mutateAsync(ids)
    if (response) {
      queryClient.invalidateQueries([ENotificationQuery.GetNotifications])
    }
  }

  const spawnNotification = (body: any, icon: any, url: any, title: any) => {
    const options = {
      body,
      icon
    }
    const n = new Notification(title, options)

    n.onclick = (e) => {
      e.preventDefault()
      window.open(url, '_blank')
    }
  }

  return {
    getNotificationList,
    readNotification,
    createNotification,
    markAsReadHandler,
    spawnNotification,

    createNotificationMutation,
    readNotificationMutation
  }
}
