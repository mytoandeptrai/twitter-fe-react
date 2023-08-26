import { APP_DISPATCH_ACTIONS, EThemes } from '@/constants'
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
