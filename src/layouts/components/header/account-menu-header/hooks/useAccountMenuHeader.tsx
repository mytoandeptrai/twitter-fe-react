import { ELocalStorageKey } from '@/constants'
import { useLocalStorage } from '@/hooks'
import { ROUTES_PATH } from '@/routes'
import { EventBusName, onPushEventBusHandler, useAuthService, useUserService } from '@/services'
import { AppDispatch } from '@/store'
import { setGlobalLoading } from '@/store/app/app.slice'
import { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { EAccountMenuHeaderOptions, generateOptions } from '../account-menu-header.config'

export const useAccountMenuHeader = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()

  const [, setAccessToken] = useLocalStorage(ELocalStorageKey.AccessToken, '')
  const { logoutMutation, refreshGetMe } = useAuthService()
  const { getCurrentUser } = useUserService()
  const user = getCurrentUser()

  const options = useMemo(() => {
    return generateOptions(t)
  }, [t])

  const onLogout = useCallback(async () => {
    dispatch(
      setGlobalLoading({
        visible: true
      })
    )

    try {
      await logoutMutation.mutateAsync()
      setAccessToken('')
      navigate(ROUTES_PATH.auth)
      await refreshGetMe()
    } catch (error) {
      onPushEventBusHandler({
        type: EventBusName.Error,
        payload: 'auth.logout.error'
      })
    } finally {
      dispatch(
        setGlobalLoading({
          visible: false
        })
      )
    }
  }, [dispatch, navigate, refreshGetMe, logoutMutation, setAccessToken])

  const onNavigate = useCallback((path: string) => navigate(path), [navigate])

  const onChange = useCallback(
    async (type: EAccountMenuHeaderOptions) => {
      switch (type) {
        case EAccountMenuHeaderOptions.Logout:
          await onLogout()
          break
        case EAccountMenuHeaderOptions.Notifications:
          onNavigate(ROUTES_PATH.notifications)
          break
        default:
          onNavigate(ROUTES_PATH.home)
          break
      }
    },
    [onLogout, onNavigate]
  )

  return {
    user,
    options,
    onChange,
    onLogout
  }
}
