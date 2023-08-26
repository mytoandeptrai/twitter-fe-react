import { EventBusName, onPushEventBusHandler } from '@/services'
import { v4 as uuid } from 'uuid'

export const safeCallFn = (fn: Function, ...args: any[]) => {
  fn && typeof fn === 'function' && fn(...args)
}

export const tryCatchFn = async <T>(fn: Function, shouldShowError?: boolean, customMsg?: string): Promise<T | null> => {
  try {
    return await fn()
  } catch (error: any) {
    shouldShowError &&
      onPushEventBusHandler({
        type: EventBusName.Error,
        payload: customMsg || error?.response?.data?.message
      })

    return null
  }
}

export const eliminateSerializeType = <T>(obj: T): Record<string, any> => {
  return JSON.parse(JSON.stringify(obj))
}
