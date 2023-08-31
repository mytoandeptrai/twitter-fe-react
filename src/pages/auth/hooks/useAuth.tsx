import { EGender, ELocalStorageKey } from '@/constants'
import { useLocalStorage } from '@/hooks'
import { AppDispatch } from '@/store'
import { useRef, useState, useCallback, useMemo } from 'react'
import { IconType } from 'react-icons'
import { BiLock, BiMailSend, BiUserCircle, BiUserPin } from 'react-icons/bi'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import _ from 'lodash'
import { setGlobalLoading } from '@/store/app/app.slice'
import { useAuthService } from '@/services'
import { ROUTES_PATH } from '@/routes'

export enum EAuthScreen {
  Login = 'login',
  Register = 'register'
}

export type TInputField = {
  label: string
  name: string
  Icon: IconType
  type: string
}

export const loginFields: TInputField[] = [
  {
    label: 'username',
    name: 'username',
    Icon: BiUserCircle,
    type: 'text'
  },
  {
    label: 'password',
    name: 'password',
    Icon: BiLock,
    type: 'password'
  }
]

export const registerFields: TInputField[] = [
  {
    name: 'passwordConfirm',
    label: 'Confirm Password',
    Icon: BiLock,
    type: 'password'
  },
  {
    label: 'Name',
    name: 'name',
    Icon: BiUserPin,
    type: 'text'
  },
  {
    label: 'Email',
    name: 'email',
    Icon: BiMailSend,
    type: 'text'
  }
]

const getFieldNames = (fields: TInputField[]) => fields.map(({ name }) => name)

export const useAuth = () => {
  const navigate = useNavigate()
  const [screen, setScreen] = useState<EAuthScreen>(EAuthScreen.Login)
  const [gender, setGender] = useState<EGender>(EGender.UNKNOWN)
  const [, setAccessToken] = useLocalStorage(ELocalStorageKey.AccessToken, '')
  const { loginMutation, registerMutation, refreshGetMe } = useAuthService()

  const formRef = useRef<HTMLFormElement>(null)
  const dispatch = useDispatch<AppDispatch>()

  const isRegisterScreen = screen === EAuthScreen.Register
  const isLoginScreen = screen === EAuthScreen.Login

  const mutationMapper = useMemo(() => {
    return {
      [EAuthScreen.Login]: loginMutation,
      [EAuthScreen.Register]: registerMutation
    }
  }, [loginMutation, registerMutation])

  const onAuthSuccess = useCallback((data: any) => setAccessToken(data?.accessToken), [setAccessToken])

  const mutationOptions = useMemo(() => {
    return {
      onSuccess: onAuthSuccess
    }
  }, [onAuthSuccess])

  const onChangeGender = useCallback((newGender: EGender) => setGender(newGender), [])

  const getInputFieldsBasedOnScreen = useCallback((isLoginScreen: boolean, fieldsValues: any) => {
    const fieldsName = isLoginScreen
      ? getFieldNames(loginFields)
      : [...getFieldNames(loginFields), ...getFieldNames(registerFields)]

    const input = _.pick(fieldsValues, fieldsName)

    return input
  }, [])

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const fieldValues = Object.fromEntries(formData.entries())
    const mappingData = getInputFieldsBasedOnScreen(isLoginScreen, fieldValues)

    const input = isLoginScreen ? mappingData : { ...mappingData, gender }

    dispatch(
      setGlobalLoading({
        visible: true
      })
    )

    try {
      await mutationMapper[screen].mutateAsync(input, mutationOptions)
      await refreshGetMe()
      navigate(ROUTES_PATH.home)
      console.log('file vao day')
    } catch (error) {
    } finally {
      dispatch(
        setGlobalLoading({
          visible: false
        })
      )
      event.currentTarget?.reset()
    }
  }

  const onChangeScreen = useCallback(
    (newScreen: EAuthScreen) => {
      if (screen !== newScreen) {
        if (formRef.current) {
          formRef.current.reset()
        }

        setScreen(newScreen)
      }
    },
    [screen]
  )

  return {
    isRegisterScreen,
    isLoginScreen,
    formRef,
    screen,
    onSubmit,
    onChangeGender,
    onChangeScreen
  }
}
