import { EMedia } from '@/constants'
import { EventBusName, onPushEventBusHandler } from '@/services'
import { IMedia } from '@/types'
import { SyntheticEvent } from 'react'
import { v4 as uuid } from 'uuid'

export const safeCallFn = (fn: Function, ...args: any[]) => {
  fn && typeof fn === 'function' && fn(...args)
}

export const tryCatchFn = async <T>(
  fn: Function,
  shouldShowError?: boolean,
  customMsg?: string,
  showThrowError?: boolean
): Promise<T | null> => {
  try {
    return await fn()
  } catch (error: any) {
    if (shouldShowError) {
      onPushEventBusHandler({
        type: EventBusName.Error,
        payload: customMsg || error?.response?.data?.message
      })

      return null
    }

    if (showThrowError) {
      throw error
    }

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

export const initMediaFromFile = (file: File): IMedia => {
  return {
    id: uuid(),
    file,
    type: file?.type?.includes(EMedia.Video) ? EMedia.Video : EMedia.Image,
    url: URL.createObjectURL(file)
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

export const isUUID = (str: string): boolean => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
  return uuidRegex.test(str)
}

export const calcDiffTimeString = (date: Date): string => {
  if (!(date instanceof Date)) {
    date = new Date(date)
  }

  const diff = Math.floor((Date.now() - date.getTime()) / 1000)

  if (diff < 60) {
    return `${diff} seconds ago`
  }
  if (diff < 3600) {
    return `${Math.floor(diff / 60)} minutes ago`
  }
  if (diff < 86400) {
    return `${Math.floor(diff / 3600)} hours ago`
  }

  return date.toLocaleDateString()
}

export const stopPropagation = (e: SyntheticEvent) => e.stopPropagation()

export const nFormatter = (num: number, digits = 2): string => {
  const lookup = [
    { value: 1, symbol: '' },
    { value: 1e3, symbol: 'k' },
    { value: 1e6, symbol: 'M' },
    { value: 1e9, symbol: 'G' },
    { value: 1e12, symbol: 'T' },
    { value: 1e15, symbol: 'P' },
    { value: 1e18, symbol: 'E' }
  ]
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/
  const item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return num >= item.value
    })
  return item ? (num / item.value).toFixed(digits).replace(rx, '$1') + item.symbol : '0'
}

/**
 * Init a model with the _id field from string
 */
export const transformFieldToObjectWithId = <T>(field: keyof T, data: T): void => {
  if (typeof data[field] === 'string') {
    data[field] = {
      _id: data[field]
    } as unknown as T[keyof T]
  }
}
