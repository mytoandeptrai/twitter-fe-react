import { APP_DISPATCH_ACTIONS, EMedia, EThemes } from '@/constants'
import { IModalProps } from './modal.type'
import { AnimatePresenceProps } from 'framer-motion'

export type TScreenSize = 'DESKTOP' | 'TABLET' | 'MOBILE'

export type TLoading = {
  visible: boolean
  component: any
}

type TModalAppState = {
  visible: boolean
  props?: IModalProps | null
}

export enum ELanguage {
  En = 'en',
  Vi = 'vi'
}

export type TAppAction =
  | {
      type: APP_DISPATCH_ACTIONS.SET_LOADING
      payload: TLoading
    }
  | {
      type: APP_DISPATCH_ACTIONS.SET_MODAL
      payload: TModalAppState
    }

export type TAppState = {
  loading: TLoading
  theme: EThemes
  language: ELanguage
  modal: TModalAppState
}

export type TAppDispatch = (action: TAppAction) => void

export type TAppContextProps = {
  children: React.ReactNode
}

export interface NewAnimatePresenceProps extends Omit<AnimatePresenceProps, 'children'> {
  children: React.ReactNode
}

export interface BaseControlledRef {
  show?: () => void
  hide?: () => void
  visible?: boolean
}

export interface ISize {
  width: number | undefined
  height: number | undefined
}

export interface IApiResponse<T = any> {
  readonly data?: T
  readonly total?: number
  readonly error?: Error
  readonly message?: string
  readonly statusCode?: number
}

export interface IPaginationParams {
  limit: number
  page: number
}

export interface IGetList<T> {
  data: T[]
  total: number
}
export interface IMedia {
  id?: string
  url: string
  type?: EMedia
  file?: File | null
}

export interface IInfinityListDataPage<T> {
  data: T[]
  total: number
}

export interface IInfinityListData<T> {
  pages: IInfinityListDataPage<T>[]
  pageParams: any[]
}

export enum ESearchType {
  Tweet = 'tweet',
  User = 'user',
  Hashtag = 'hashtag',
  Comment = 'comment'
}

export interface IOptionSidebar<T> {
  name: string
  id: string
  icon?: JSX.Element
  value: T
}

export interface IMediaWithTweetId extends IMedia {
  tweetId: string
}
