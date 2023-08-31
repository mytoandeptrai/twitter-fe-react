import { EMedia } from '@/constants'
import { EventBusName, onPushEventBusHandler } from '@/services'
import { IMedia } from '@/types'
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

export const initMediaFromUrl = (url: string): IMedia => {
  return {
    id: uuid(),
    url,
    type: url?.includes(EMedia.Video) ? EMedia.Video : EMedia.Image
  }
}

export const extractMetadata = (
  body: string
): {
  hashtags: string[]
  urls: string[]
} => {
  const regexIsHashtags = /(#[\w]+)/g
  const regexIsUrl = /https?:\/\/\S+/g
  const hashtags = body?.match(regexIsHashtags) || []
  const urls = body?.match(regexIsUrl) || []
  const uniqueHashtags = Array.from(new Set(hashtags)).map((h) => h.toString().substring(1))

  return {
    hashtags: uniqueHashtags,
    urls
  }
}

export const removeUrlsInData = (str: string): string => {
  const regexIsUrl = /\b((?!https?:\/\/)\S)+\b/g
  const filteredWords = str.match(regexIsUrl)
  const filteredText = filteredWords ? filteredWords.join(' ') : ''
  return filteredText
}
